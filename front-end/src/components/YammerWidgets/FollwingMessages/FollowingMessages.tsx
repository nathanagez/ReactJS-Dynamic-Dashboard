import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { message, Tag, List, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const FollowingMessagesWrapper: React.FC = (props: any) => {
	let intervalId: number = 0;
	const [messages, setMessages] = useState([]);
	const [group, setGroup] = useState(null);
	const [limit, setLimit] = useState(0);
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(false);
	const { SubMenu } = Menu;

	useEffect(() => {
		getCurrentUser();
	}, []);

	const yammer = props.services.find(
		(item: any) => item.serviceName === "yammer"
	);

	const headers = {
		headers: {
			Authorization: `Bearer ${yammer.serviceToken}`
		}
	};

	const getCurrentUser = async () => {
		const res = await axios.get(
			"https://api.yammer.com/api/v1/users/current.json",
			headers
		);
		const userId = res.data.id;
		const groupId = await axios.get(
			`https://api.yammer.com/api/v1/groups/for_user/${userId}`,
			headers
		);
		setGroups(groupId.data);
	};

	const getMessage = async (group_id: any) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.yammer.com/api/v1/messages/in_group/${group_id}?threaded=true.json`,
			headers
		);
		const { messages } = res.data;
		Promise.all(
			messages.map(async (message: any) => {
				const res = await getUsers(message.sender_id);
				message.username = res.data.full_name;
				return message;
			})
		).then((results: any) => {
			console.log(results);
			setMessages(results);
			setLoading(false);
		});
	};

	const getUsers = (userId: any) => {
		return axios.get(
			`https://api.yammer.com/api/v1/users/${userId}.json`,
			headers
		);
	};

	const onMenuClick = (ev: any) => {
		// clearInterval(intervalId);
		setLimit(ev.keyPath[1]);
		setGroup(ev.item.props.children);
		getMessage(ev.keyPath[0]);
		/*
		intervalId = setInterval(() => {
			getMessage(ev.keyPath[0]);
        }, 5000);
        */
	};

	const menu = (
		<Menu onClick={onMenuClick}>
			<SubMenu title="5" key={5}>
				{groups.map((group: any, key) => (
					<Menu.Item key={group.id}>{group.full_name}</Menu.Item>
				))}
			</SubMenu>
			<SubMenu title="10" key={10}>
				{groups.map((group: any, key) => (
					<Menu.Item key={group.id}>{group.full_name}</Menu.Item>
				))}
			</SubMenu>
			<SubMenu title="15" key={15}>
				{groups.map((group: any, key) => (
					<Menu.Item key={group.id}>{group.full_name}</Menu.Item>
				))}
			</SubMenu>
			<SubMenu title="20" key={20}>
				{groups.map((group: any, key) => (
					<Menu.Item key={group.id}>{group.full_name}</Menu.Item>
				))}
			</SubMenu>
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
							Last {limit} threads from {group}
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={messages.slice(0, limit)}
					renderItem={(item: any, key) => (
						<List.Item>
							<div>
								<Tag
									color="green"
									style={{ cursor: "pointer" }}
									onClick={() => window.open(item.web_url, "_blank")}
								>
									{item.username} <Icon type="link" />
								</Tag>
								<Tag color="purple">
									{item.liked_by.count} <Icon type="like" />
								</Tag>
								<br />

								<Badge
									status={item.body.plain ? "processing" : "error"}
									key={key}
									text={item.body.plain ? item.body.plain : "No content"}
								/>
							</div>
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { FollowingMessagesWrapper };
