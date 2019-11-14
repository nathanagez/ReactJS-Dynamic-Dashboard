import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Badge, Card, Tag, Icon, Dropdown, Menu, Tree } from 'antd';
import { dragHelper } from '../../drag-help';
import styled from 'styled-components';

const { TreeNode } = Tree;
const { SubMenu } = Menu;
const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any;

const SharedFilesWrapper = (props: any) => {
	const token = window.localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);
	const [ files, setFiles ] = useState([]);
	const [ users, setUsers ] = useState([]);
	const [ filter, setFilter ] = useState('all');
	const [ protectedFiles, setProtectedFiles ] = useState([]);
	const [ timer, setTimer ] = useState(5);
	const outlookService = props.services.find((item: any) => item.serviceName === 'office365');

	const getFiles = () => {
		setLoading(true);
		axios
			.get('https://graph.microsoft.com/v1.0/me/drive/sharedWithMe', {
				headers: {
					Authorization: outlookService.serviceToken
				}
			})
			.then((res) => {
				setProtectedFiles(res.data.value);
				getSubFolders(res.data.value);
			})
			.catch((err) => {
				if (err.response.data.error.message === 'Access token has expired.') {
					setLoading(true);
					axios
						.get(`${process.env.REACT_APP_BASEURL}/update_officeToken`, {
							headers: {
								Authorization: token
							}
						})
						.then(() => {
							setLoading(false);
						})
						.catch(() => setLoading(false));
				}
			});
	};

	const getSubFolders = (data: any) => {
		let tmpUsers: any = [];
		Promise.all(
			data.map(async (file: any) => {
				// createdBy.user.displayName
				tmpUsers.push(file.createdBy.user.displayName);
				if (file.folder) {
					const res = await axios.get(
						`https://graph.microsoft.com/v1.0/drives/${file.remoteItem.parentReference
							.driveId}/items/${file.id}/children`,
						{
							headers: {
								Authorization: outlookService.serviceToken
							}
						}
					);
					file.childs = res.data.value;
				}
				return file;
			})
		).then((results: any) => {
			let uniq: any = [ ...new Set(tmpUsers) ];
			setUsers(uniq);
			setFiles(results);
			setLoading(false);
		});
	};

	const handleTimer = (ev: any) => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		setTimer(ev.key);
	};

	const timerMenu = (
		<Menu onClick={handleTimer}>
			<Menu.Item key={5}>5</Menu.Item>
			<Menu.Item key={10}>10</Menu.Item>
			<Menu.Item key={15}>15</Menu.Item>
		</Menu>
	);

	useEffect(
		() => {
			dragHelper();
			getFiles();
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				getFiles();
			}, timer * 60 * 1000);
		},
		[ timer ]
	);

	const fileType = (item: any) => {
		switch (item.file.mimeType) {
			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				return <Icon type="file-excel" />;
			case 'application/pdf':
				return <Icon type="file-pdf" />;
			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				return <Icon type="file-word" />;
			case 'video/mp4':
				return <Icon type="video-camera" />;
			default:
				return <Icon type="file" />;
		}
	};

	const handleClick = (ev: any) => {
		const len = ev.keyPath.length;
		setFilter(ev.keyPath[1]);
		switch (len > 1 ? ev.keyPath[1] : ev.key) {
			case 'all':
				setFiles(protectedFiles);
				break;
			case 'folder':
				let filteredFolders = protectedFiles.filter((item: any) => {
					if (item.folder && item.createdBy.user.displayName === ev.keyPath[0]) {
						return item;
					}
				});
				setFiles(filteredFolders);
				break;
			case 'file':
				let filteredFiles = protectedFiles.filter((item: any) => {
					if (item.file && item.createdBy.user.displayName === ev.keyPath[0]) {
						return item;
					}
				});
				setFiles(filteredFiles);
				break;
		}
	};

	const menu = (
		<Menu onClick={handleClick}>
			<Menu.Item key={'all'}>all</Menu.Item>
			<SubMenu title="folder" key={'folder'}>
				{users.map((user: any, key) => <Menu.Item key={user}>{user}</Menu.Item>)}
			</SubMenu>
			<SubMenu title="file" key={'file'}>
				{users.map((user: any, key) => <Menu.Item key={user}>{user}</Menu.Item>)}
			</SubMenu>
		</Menu>
	);

	return (
		<Container>
			<Card
				loading={loading}
				style={{ height: '100%', overflow: 'auto' }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Filter: {filter} <Icon type="down" />
						</a>
					</Dropdown>
				}
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={files}
					renderItem={(item: any, key) => (
						<List.Item key={key}>
							<Badge count={item.createdBy.user.displayName} style={{ backgroundColor: '#52c41a' }} />
							&nbsp;
							{item.folder ? (
								<Tag
									style={{ cursor: 'pointer' }}
									onClick={() => window.open(item.remoteItem.webUrl, '_blank')}
									color="cyan"
								>
									<Icon type="folder-open" />
									&nbsp;
									{item.folder.childCount}
									&nbsp;
									<Icon type="link" />
								</Tag>
							) : (
								<Tag
									style={{ cursor: 'pointer' }}
									onClick={() => window.open(item.remoteItem.webUrl, '_blank')}
									color="cyan"
								>
									Open {fileType(item)}
								</Tag>
							)}
							<br />
							{!item.folder ? (
								<Badge status={'processing'} text={item.name} />
							) : (
								<Tree
									showIcon
									defaultExpandAll={false}
									onSelect={(url) => window.open(url[0], '_blank')}
									switcherIcon={<Icon type="down" />}
								>
									<TreeNode
										icon={<Icon type="folder-open" />}
										title={item.name}
										key={item.remoteItem.webUrl}
									>
										{item.childs.map((node: any) => (
											<TreeNode
												icon={node.file ? fileType(node) : <Icon type="folder-open" />}
												title={node.name}
												key={node.webUrl}
											/>
										))}
									</TreeNode>
								</Tree>
							)}
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { SharedFilesWrapper };
