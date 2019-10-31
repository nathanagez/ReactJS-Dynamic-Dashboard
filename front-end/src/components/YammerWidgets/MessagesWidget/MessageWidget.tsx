import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { message, List, Menu, Card, Badge, Dropdown, Icon } from "antd";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const MessageWidgetWrapper: React.FC = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [limit, setLimit] = useState(20);

	useEffect(() => {
		getMessage();
	}, []);

	const getMessage = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				"https://api.yammer.com/api/v1/messages.json",
				{
					headers: {
						Authorization: "Bearer 106950-zB7Tz0VUesP5CiwiCy8Uw"
					}
				}
			);
			setLoading(false);
			setMessages(res.data.messages);
		} catch (error) {
			setLoading(false);
		}
	};
	const menu = (
		<Menu onClick={({ key }: any) => setLimit(key)}>
			<Menu.Item key="5">5</Menu.Item>
			<Menu.Item key="10">10</Menu.Item>
			<Menu.Item key="15">15</Menu.Item>
			<Menu.Item key="20">20</Menu.Item>
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
							Yammer last {limit} messages <Icon type="down" />
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

export { MessageWidgetWrapper };
