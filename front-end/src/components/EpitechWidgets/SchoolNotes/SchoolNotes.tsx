import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { Table, List, Tag, Menu, Card, Badge, Dropdown, Icon } from "antd";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const SchoolNotesWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const [grades, setGrades] = useState([]);
	const [modules, setModules] = useState([]);
	const [loading, setLoading] = useState(true);
	const [codeModule, setCodeModule] = useState(null);
	const { SubMenu } = Menu;

	useEffect(() => {
		getModules();
	}, []);

	const getModules = () => {
		setLoading(true);
		axios
			.get(`http://localhost:5000/epitech/user/`, {
				headers: {
					Authorization: token
				}
			})
			.then(res => {
				setLoading(false);
				setModules(res.data.user_data.modules);
				console.log(res.data.user_data.notes);
				setGrades(res.data.user_data.notes);
			})
			.catch(err => {
				setLoading(false);
				console.log(err);
			});
	};

	const handleClick = (ev: any) => {
		console.log(ev);
		setCodeModule(ev.key.split("#")[1]);
	};

	const semesters = [
		{ key: "S0" },
		{ key: "B0" },
		{ key: "B1" },
		{ key: "B2" },
		{ key: "B3" },
		{ key: "B4" },
		{ key: "B5" },
		{ key: "B6" },
		{ key: "B7" },
		{ key: "B8" },
		{ key: "B9" },
		{ key: "B10" }
	];

	const columns = [
		{
			title: "Module",
			dataIndex: "titlemodule",
			key: "titlemodule"
		},
		{
			title: "Activity",
			dataIndex: "title",
			key: "title"
		},
		{
			title: "Note",
			dataIndex: "final_note",
			key: "note",
			render: ((note: any) =>
				(note > 10 ? (<Tag color={"green"} key={note}>
					{note}
				</Tag>) : (<Tag color={"orange"} key={note}>
					{note}
				</Tag>))
			)
		},
		{
			title: "Year",
			dataIndex: "scolaryear",
			key: "scolaryear"
		}
	];
	const menu = (
		<Menu onClick={handleClick}>
			{semesters.map((semester: any) => (
				<SubMenu title={semester.key} key={semester.key}>
					{modules
						.filter((module: any) => module.title.includes(semester.key))
						.map((module: any, key) => {
							return (
								<Menu.Item key={key + "#" + module.codemodule}>
									{module.title}
								</Menu.Item>
							);
						})}
				</SubMenu>
			))}
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
							Notes from {codeModule} <Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<Table
					columns={columns}
					dataSource={grades.filter(
						(grade: any) => grade.codemodule === codeModule
					)}
				/>
				{/* <List
					dataSource={grades}
					renderItem={(item: any, key) => (
						<List.Item>
							<Badge status="processing" key={key} text={`${item.title}`} />
						</List.Item>
					)}
				/> */}
			</Card>
		</Container>
	);
};

export { SchoolNotesWrapper };
