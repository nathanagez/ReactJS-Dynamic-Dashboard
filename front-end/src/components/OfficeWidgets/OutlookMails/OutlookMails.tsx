import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { message, List, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const OutlookMailsWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem('token');
	const outlookService = props.services.find((item: any) => item.serviceName === "office365");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [limit, setLimit] = useState(20);

	useEffect(() => {
		axios.get("https://graph.microsoft.com/v1.0/me/messages", {
			headers: {
				Authorization: outlookService.serviceToken
			}
		}).then((res) => {
			setLoading(false);
			console.log(res.data.value);
			setMessages(res.data.value);
		})
		.catch((err) => {
			if (err.response.data.error.message === "Access token has expired.") {
				axios.get("http://localhost:5000/update_officeToken", {
					headers: {
						Authorization: token
					}
				}).then(() => setLoading(false)).catch(() => setLoading(false));
				
			}
		});
	}, []);

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
							Oulook last {limit} messages <Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={messages.slice(0, limit)}
					renderItem={(item: any, key) => (
						<List.Item>
							<Badge count={item.sender.emailAddress.name} style={{ backgroundColor: '#52c41a' }} /> <br/>
							<Badge status="processing" key={key} text={`${item.subject}`} />
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { OutlookMailsWrapper };
