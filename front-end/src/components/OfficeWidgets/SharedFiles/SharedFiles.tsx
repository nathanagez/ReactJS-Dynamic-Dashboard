import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Badge, Card, Tag, Icon, Dropdown, Menu, Tree } from "antd";
import styled from "styled-components";

const { TreeNode } = Tree;

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const SharedFilesWrapper = (props: any) => {
	const token = window.localStorage.getItem("token");
	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState([]);
	const [filter, setFilter] = useState("all");
	const [protectedFiles, setProtectedFiles] = useState([]);
	const outlookService = props.services.find(
		(item: any) => item.serviceName === "office365"
	);

	const getFiles = () => {
		setLoading(true);
		axios
			.get("https://graph.microsoft.com/v1.0/me/drive/sharedWithMe", {
				headers: {
					Authorization: outlookService.serviceToken
				}
			})
			.then(res => {
				setProtectedFiles(res.data.value);
				getSubFolders(res.data.value);
			})
			.catch(err => {
				if (err.response.data.error.message === "Access token has expired.") {
					setLoading(true);
					axios
						.get("http://localhost:5000/update_officeToken", {
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
		Promise.all(
			data.map(async (file: any) => {
				console.log("loul", file);
				if (file.folder) {
					const res = await axios.get(
						`https://graph.microsoft.com/v1.0/drives/${file.remoteItem.parentReference.driveId}/items/${file.id}/children`,
						{
							headers: {
								Authorization: outlookService.serviceToken
							}
						}
					);
					file.childs = res.data.value;
					console.log("files:", file);
				}
				return file;
			})
		).then((results: any) => {
			setFiles(results);
			setLoading(false);
		});
	};

	useEffect(() => {
		getFiles();
	}, []);

	const fileType = (item: any) => {
		switch (item.file.mimeType) {
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				return <Icon type="file-excel" />;
			case "application/pdf":
				return <Icon type="file-pdf" />;
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				return <Icon type="file-word" />;
			case "video/mp4":
				return <Icon type="video-camera" />;
			default:
				return <Icon type="file" />;
		}
	};

	const handleClick = ({ key }: any) => {
		setFilter(key);
		switch (key) {
			case "all":
				return protectedFiles;
			case "folder":
				let filteredFolders = protectedFiles.filter((item: any) => {
					if (item.folder) {
						return item;
					}
				});
				setFiles(filteredFolders);
				break;
			case "file":
				let filteredFiles = protectedFiles.filter((item: any) => {
					if (item.file) {
						return item;
					}
				});
				setFiles(filteredFiles);
				break;
		}
	};

	const menu = (
		<Menu onClick={handleClick}>
			<Menu.Item key={"all"}>all</Menu.Item>
			<Menu.Item key={"folder"}>folders</Menu.Item>
			<Menu.Item key={"file"}>file</Menu.Item>
		</Menu>
	);

	return (
		<Container>
			<Card
				loading={loading}
				style={{ height: "100%", overflow: "auto" }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Filter: {filter} <Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={files}
					renderItem={(item: any, key) => (
						<List.Item key={key}>
							<Badge
								count={item.createdBy.user.displayName}
								style={{ backgroundColor: "#52c41a" }}
							/>
							&nbsp;
							{item.folder ? (
								<Tag
									style={{ cursor: "pointer" }}
									onClick={() => window.open(item.remoteItem.webUrl, "_blank")}
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
									style={{ cursor: "pointer" }}
									onClick={() => window.open(item.remoteItem.webUrl, "_blank")}
									color="cyan"
								>
									Open {fileType(item)}
								</Tag>
							)}
							<br />
							{!item.folder ? (
								<Badge status={"processing"} text={item.name} />
							) : (
								<Tree
									showIcon
									defaultExpandAll={false}
									onSelect={url => window.open(url[0], "_blank")}
									switcherIcon={<Icon type="down" />}
								>
									<TreeNode
										icon={<Icon type="folder-open" />}
										title={item.name}
										key={item.remoteItem.webUrl}
									>
										{item.childs.map((node: any) => (
											<TreeNode
												icon={
													node.file ? (
														fileType(node)
													) : (
														<Icon type="folder-open" />
													)
												}
												title={node.name}
												key={node.webUrl}
											></TreeNode>
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
