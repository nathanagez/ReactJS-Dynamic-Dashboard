import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { List, Tag, Menu, Card, Badge, Dropdown, Icon } from "antd";
import { dragHelper } from '../../drag-help';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any;

const ModulesWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const [grades, setGrades] = useState([]);
	const [loading, setLoading] = useState(true);
	const [limit, setLimit] = useState("2019");
	const [timer, setTimer] = useState(5);

	useEffect(() => {
		dragHelper();
		getModules();
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getModules();
		}, timer * 60 * 1000);
	}, [limit, timer]);

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

	const getModules = () => {
		setLoading(true);
		axios
			.get(`${process.env.REACT_APP_BASEURL}/epitech/user/`, {
				headers: {
					Authorization: token
				}
			})
			.then(res => {
				setLoading(false);
				setGrades(
					res.data.user_data.modules.filter(
						(grade: any) => grade.scolaryear == limit 
					)
				);
			})
			.catch(err => {
				setLoading(false);
			});
	};

	const handleClick = ({ key }: any) => {
		setLimit(key);
	};

	const menu = (
		<Menu onClick={handleClick}>
			<Menu.Item key="2012">2012</Menu.Item>
			<Menu.Item key="2013">2013</Menu.Item>
			<Menu.Item key="2014">2014</Menu.Item>
			<Menu.Item key="2015">2015</Menu.Item>
			<Menu.Item key="2016">2016</Menu.Item>
			<Menu.Item key="2017">2017</Menu.Item>
			<Menu.Item key="2018">2018</Menu.Item>
			<Menu.Item key="2019">2019</Menu.Item>
		</Menu>
	);

	const gradeColor = (item: any) => {
		switch (item.grade) {
			case "A":
				return <Tag color="green">{item.grade}</Tag>;
				break;
			case "B":
				return <Tag color="gold">{item.grade}</Tag>;
				break;
			case "C":
				return <Tag color="orange">{item.grade}</Tag>;
				break;
			case "D":
				return <Tag color="volcano">{item.grade}</Tag>;
				break;
			case "E":
				return <Tag color="red">{item.grade}</Tag>;
				break;
			case "Acquis":
					return <Tag color="cyan">Acquired</Tag>;
			case "-":
					return <Tag color="purple">Pending</Tag>;
			default:
				break;
		}
	};

	return (
		<Container>
			<Card
				loading={loading}
				style={{ height: "100%", overflow: "auto" }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Grades from {limit} <Icon type="down" />
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
					dataSource={grades}
					renderItem={(item: any, key) => (
						<List.Item>
							{gradeColor(item)}
							<Badge status="processing" key={key} text={`${item.title}`} />
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};

export { ModulesWrapper };
