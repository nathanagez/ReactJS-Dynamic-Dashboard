import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon, Menu, Tabs, notification, Button } from "antd";
import GridLayout from "react-grid-layout";
import ResponsiveReactGridLayout from "react-grid-layout";
import { MessageWidget } from "../../components/YammerWidgets/MessagesWidget";
import { FollowingMessages } from "../../components/YammerWidgets/FollwingMessages";

const { TabPane } = Tabs;
const { SubMenu } = Menu;
let globalId = 0;

const Container = styled.div`
	width: 100%;
	height: calc(100% - 63px);
	display: flex;
`;

const Dashboard: React.FC = (props: any) => {
	const menuLayout: Array<any> = [];
	const [layout, setLayout] = useState(menuLayout);
	const createElement = (el: any) => {
		return (
			<div key={el.i}>
				<Button
					onClick={() => handleClose(el.i)}
					shape="circle"
					style={{
						position: "absolute",
						right: "12px",
						top: "12px",
						zIndex: 1
					}}
					type="dashed"
					icon="close"
				/>
				{el.component}
			</div>
		);
	};

	const handleClose = (id: any) => {
		const removeIndex = layout.map(function(item) { return item.i; }).indexOf(id);
		layout.splice(removeIndex, 1);
		setLayout([...layout]);
	};

	const handleClick = (ev: any) => {
		console.log(ev.key);
		switch (ev.key) {
			case "yammer#message":
				setLayout([
					...layout,
					{
						i: (globalId++).toString(),
						x: 0,
						y: 0,
						w: 6,
						h: 10,
						component: <MessageWidget />
					}
				]);
				break;
			case "yammer#group":
				setLayout([
					...layout,
					{
						i: (globalId++).toString(),
						x: 0,
						y: 0,
						w: 6,
						h: 10,
						component: <FollowingMessages />
					}
				]);
				break;
		}
	};
	useEffect(() => {
		const servs = `Actually ${props.services.length} services are up! Please link your accounts in settings section!`;
		console.log(props.services);
		notification["warning"]({
			message: "Link your accounts!",
			description: servs
		});
	}, []);

	return (
		<Container>
			<Menu style={{ width: 256 }} mode="inline">
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="code" />
							<span>Epitech</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={"epi#message"}>
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Messages
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={"epi#group"}>
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Group messages
					</Menu.Item>
					<Menu.Item key="7">
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Widget lol
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<Icon type="usergroup-add" />
							<span>Yammer</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={"yammer#message"}>
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Messages
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={"yammer#group"}>
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Group messages
					</Menu.Item>
					<Menu.Item key="7">
						<Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />
						Widget lol
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub4"
					title={
						<span>
							<Icon type="mail" />
							<span>Office365</span>
						</span>
					}
				>
					<Menu.Item key="9">Option 9</Menu.Item>
					<Menu.Item key="10">Option 10</Menu.Item>
					<Menu.Item key="11">Option 11</Menu.Item>
					<Menu.Item key="12">Option 12</Menu.Item>
				</SubMenu>
			</Menu>
			<Tabs tabPosition="top" style={{ width: "100%" }}>
				<TabPane tab="Dashboard #1" key="1">
					<ResponsiveReactGridLayout
						className="layout"
						layout={layout}
						cols={20}
						autoSize={true}
						rowHeight={30}
						width={window.screen.width}
					>
						{layout.map(item => createElement(item))}
					</ResponsiveReactGridLayout>
				</TabPane>
				<TabPane tab="Dashboard #2" key="2"></TabPane>
				<TabPane tab="Dashboard #3" key="3"></TabPane>
			</Tabs>
		</Container>
	);
};

export { Dashboard };
