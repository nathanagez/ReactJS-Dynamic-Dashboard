import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
	List,
	Menu,
	Card,
	Badge,
	Dropdown,
	Icon,
	Tag,
	Popover
} from "antd";
import { dragHelper } from '../../drag-help';

const { SubMenu } = Menu;
const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any = 0;

const OutlookMailsWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const outlookService = props.services.find(
		(item: any) => item.serviceName === "office365"
	);
	const [messages, setMessages] = useState([]);
	const [folders, setFolders] = useState([]);
	const [folderName, setFolderName] = useState("Boite de réception");
	const [loading, setLoading] = useState(true);
	const [limit, setLimit] = useState(20);
	const [timer, setTimer] = useState(5);

	const getMails = () => {
		setLoading(true);
		axios
			.get("https://graph.microsoft.com/v1.0/me/messages", {
				headers: {
					Authorization: outlookService.serviceToken
				}
			})
			.then(res => {
				setMessages(res.data.value);
				setLoading(false);
			})
			.catch(err => {
				if (err.response.data.error.message === "Access token has expired.") {
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

	const getFolders = () => {
		setLoading(true);
		axios
			.get("https://graph.microsoft.com/v1.0/me/mailFolders/", {
				headers: {
					Authorization: outlookService.serviceToken
				}
			})
			.then(res => {
				setFolders(res.data.value);
				setLoading(false);
			});
	};

	const getFolderContent = (folderId: any) => {
		setLoading(true);
		axios
			.get(
				`https://graph.microsoft.com/v1.0/me/mailFolders/${folderId}/messages`,
				{
					headers: {
						Authorization: outlookService.serviceToken
					}
				}
			)
			.then(res => {
				setMessages(res.data.value);
				setLoading(false);
			});
	};

	useEffect(() => {
		dragHelper();
		getMails();
		getFolders();
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getMails();
			getFolders();
		}, timer * 60 * 1000);
	}, [timer]);

	const limits = [{ key: 5 }, { key: 10 }, { key: 15 }, { key: 20 }];

	const handleClick = (ev: any) => {
		setFolderName(ev.item.props.children);
		const folderId = ev.key;
		setLimit(parseInt(ev.keyPath[1]));
		getFolderContent(folderId);
	};

	const menu = (
		<Menu onClick={handleClick}>
			{limits.map(submenu => (
				<SubMenu title={submenu.key} key={submenu.key}>
					{folders.map((group: any, key) => (
						<Menu.Item key={group.id}>{group.displayName}</Menu.Item>
					))}
				</SubMenu>
			))}
		</Menu>
	);

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

	return (
		<Container>
			<Card
				loading={loading}
				style={{ height: "100%", overflow: "auto" }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Last {limit} mails from {folderName} <Icon type="down" />
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
					dataSource={messages}
					renderItem={(item: any, key) => (
						<List.Item>
							<div>
								<Badge
									count={item.sender.emailAddress.name}
									style={{ backgroundColor: "#52c41a" }}
								/>
								&nbsp;
								<Tag color="magenta">{item.importance}</Tag>
								<br />
								<Popover
									content={
										<div
											dangerouslySetInnerHTML={{ __html: item.body.content }}
										></div>
									}
									title={"Preview"}
								>
									<Badge
										style={{ cursor: "pointer" }}
										status={item.isRead ? "success" : "processing"}
										key={key}
										text={`${item.subject}`}
									/>
								</Popover>
							</div>
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { OutlookMailsWrapper };
