import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { List, Tag, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any;

const AlertsWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [scope, setScope] = useState("missed");
	const [timer, setTimer] = useState(5);
	const title = scope.charAt(0).toUpperCase() + scope.slice(1);

	useEffect(() => {
		getNotifications();
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getNotifications();
		}, timer * 60 * 1000);
	}, [scope, timer]);

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

	const getNotifications = () => {
		setLoading(true);
		if (scope === "alert") {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/epitech/${scope}`, {
					headers: {
						Authorization: token
					}
				})
				.then(res => {
					setLoading(false);
					setMessages([]);
					setMessages(res.data.alerts);
				})
				.catch(err => {
					setLoading(false);
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
					setMessages([]);
					setMessages(res.data.alerts);
				})
				.catch(err => {
					setLoading(false);
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
					setMessages(res.data.alerts.others);
				})
				.catch(err => {
					setLoading(false);
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
