import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { List, Tag, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const AlertsWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [scope, setScope] = useState("missed");
	const title = scope.charAt(0).toUpperCase() + scope.slice(1);
	
	useEffect(() => {
		getNotifications();
	}, [scope]);

	const getNotifications = () => {
		setLoading(true);
		console.log(scope);
		if (scope === "alert") {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/epitech/${scope}`, {
					headers: {
						Authorization: token
					}
				})
				.then(res => {
					setLoading(false);
					console.log(res.data);
					setMessages([]);
					setMessages(res.data.alerts);
				})
				.catch(err => {
					setLoading(false);
					console.log(err);
				});
		} else if (scope === "activity") {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/epitech/message`, {
					headers: {
						Authorization: token
					}
				})
				.then(res => {
					setLoading(false);
					console.log(res.data);
					setMessages([]);
					setMessages(res.data.alerts);
				})
				.catch(err => {
					setLoading(false);
					console.log(err);
				});
		} else {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/epitech/${scope}`, {
					headers: {
						Authorization: token
					}
				})
				.then(res => {
					setLoading(false);
					console.log(res.data.alerts);
					setMessages(res.data.alerts.others);
				})
				.catch(err => {
					setLoading(false);
					console.log(err);
				});
		}
	};

	const handleClick = ({ key }: any) => {
		setScope(key);
	};

	const menu = (
		<Menu onClick={handleClick}>
			<Menu.Item key="activity">Activity</Menu.Item>
			<Menu.Item key="alert">Alert</Menu.Item>
			<Menu.Item key="missed">Missed</Menu.Item>
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
							{title} notifications <Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<List
					dataSource={messages}
					renderItem={(item: any, key) => (
						<List.Item>
							{scope === "missed" ? (
								<div>
									<Tag color="cyan">{item.module_title}</Tag>
									<Badge
										count={item.categ_title}
										style={{ backgroundColor: "#52c41a" }}
									/>
									<br />
									<Badge
										status="processing"
										key={key}
										text={`${item.acti_title}`}
									/>
								</div>
							) : scope === "alert" ? (
								<Badge status="processing" key={key} text={`${item.title}`} />
							) : (
								<div>
									<Tag color="cyan">{item.date}</Tag>
									<Badge
										count={item.class}
										style={{ backgroundColor: "#52c41a" }}
									/>
									<br />
									<Badge status="processing" key={key} text={`${item.title}`} />
								</div>
							)}
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { AlertsWrapper };
