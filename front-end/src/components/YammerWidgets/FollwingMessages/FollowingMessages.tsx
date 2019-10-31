import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { message, List, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const headers = {
	headers: {
		Authorization: "Bearer 106950-zB7Tz0VUesP5CiwiCy8Uw"
	}
};

const FollowingMessagesWrapper: React.FC = () => {
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
		try {
			setLoading(true);
			const res = await axios.get(
				`https://api.yammer.com/api/v1/messages/in_group/${group_id}.json`,
				headers
			);
			setLoading(false);
			setMessages(res.data.messages);
		} catch (error) {
			setLoading(false);
		}
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
							Yammer last {limit} messages from {group}
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={messages.slice(0, limit)}
					renderItem={(item: any, key) => (
						<List.Item>
							<Badge status="processing" key={key} text={item.body.parsed} />
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { FollowingMessagesWrapper };
