import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon, Menu, Tabs, notification, Button } from "antd";
import GridLayout from "react-grid-layout";
import ResponsiveReactGridLayout from "react-grid-layout";
import { MessageWidget } from "../../components/YammerWidgets/MessagesWidget";
import { FollowingMessages } from "../../components/YammerWidgets/FollwingMessages";
import { OutlookMails } from "../../components/OfficeWidgets/OutlookMails";

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
		const removeIndex = layout
			.map(function(item) {
				return item.i;
			})
			.indexOf(id);
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
			case "outlook#mails":
				setLayout([
					...layout,
					{
						i: (globalId++).toString(),
						x: 0,
						y: 0,
						w: 6,
						h: 10,
						component: <OutlookMails />
					}
				]);
				break;
		}
	};
	useEffect(() => {
		const servs = `Actually ${props.services.length} services are up! Please link your accounts in settings section!`;
		notification["warning"]({
			message: "Link your accounts!",
			description: servs
		});
	}, []);

	const yammerService = props.services.find(
		(item: any) => item.serviceName === "yammer"
	);
	const office365Service = props.services.find(
		(item: any) => item.serviceName === "office365"
	);
	const epitechService = props.services.find(
		(item: any) => item.serviceName === "epitech"
	);

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
					<Menu.Item
						disabled={epitechService === undefined}
						onClick={handleClick}
						key={"epi#message"}
					>
						<Icon type={epitechService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={epitechService === undefined ? "#eb2f96" : "#52c41a"} />
						Messages
					</Menu.Item>
					<Menu.Item
						disabled={epitechService === undefined}
						onClick={handleClick}
						key={"epi#group"}
					>
						<Icon type={epitechService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={epitechService === undefined ? "#eb2f96" : "#52c41a"} />
						Group messages
					</Menu.Item>
					<Menu.Item disabled={epitechService === undefined} key="7">
					<Icon type={epitechService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={epitechService === undefined ? "#eb2f96" : "#52c41a"} />
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
					<Menu.Item
						disabled={yammerService === undefined}
						onClick={handleClick}
						key={"yammer#message"}
					>
						<Icon type={yammerService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={yammerService === undefined ? "#eb2f96" : "#52c41a"} />
						Messages
					</Menu.Item>
					<Menu.Item
						disabled={yammerService === undefined}
						onClick={handleClick}
						key={"yammer#group"}
					>
						<Icon type={yammerService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={yammerService === undefined ? "#eb2f96" : "#52c41a"} />
						Group messages
					</Menu.Item>
					<Menu.Item disabled={yammerService === undefined} key="7">
					<Icon type={yammerService === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={yammerService === undefined ? "#eb2f96" : "#52c41a"} />
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
					<Menu.Item
						onClick={handleClick}
						key={"outlook#mails"}
						disabled={office365Service === undefined}
					>
						<Icon type={office365Service === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={office365Service === undefined ? "#eb2f96" : "#52c41a"} />
						Outlook mails
					</Menu.Item>
					<Menu.Item key="10" disabled={office365Service === undefined}>
					<Icon type={office365Service === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={office365Service === undefined ? "#eb2f96" : "#52c41a"} />
						Option 10
					</Menu.Item>
					<Menu.Item key="11" disabled={office365Service === undefined}>
					<Icon type={office365Service === undefined ? "close-circle" : "plus-circle"} 
						theme="twoTone" twoToneColor={office365Service === undefined ? "#eb2f96" : "#52c41a"} />
						Option 11
					</Menu.Item>
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
