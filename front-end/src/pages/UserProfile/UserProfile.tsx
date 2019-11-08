import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Form, Modal, Button, Icon, Card, Tag } from "antd";
import axios from "axios";

const gridStyle = {
	width: "25%",
	textAlign: "center"
};

const Container = styled.div`
	width: 100%;
	height: calc(100% - 63px);
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

function callback(key: any) {
	console.log(key);
}

const UserProfile: React.FC = (props: any) => {
	const [isVisible, setVisible] = useState(false);
	const { form } = props;
	const { getFieldDecorator } = form;

	useEffect(() => {
		handleCallbackUrl(window.location.href);
		props.getServices();
	}, []);

	const handleCallbackUrl = (url: String) => {
		const url_arr = url.split("/");

		if (url.includes("yammer")) {
			const serviceName = url_arr[4].split("#")[0];
			const serviceToken = url_arr[4].split("#")[1].split("=")[1];
			props.saveServiceToken({
				serviceToken: serviceToken,
				serviceName: serviceName
			});
		} else if (url.includes("office365")) {
			const serviceToken = url_arr[4].split("=")[1];
			console.log(serviceToken.split("&")[0]);
			props.saveOfficeToken(serviceToken.split("&")[0]);
		}
	};

	const onButtonClick = (link: string) => {
		console.log("button click");
		window.open(link, "_self");
	};

	const handleForm = () => {
		form.validateFields((err: any, values: any) => {
			if (err) {
				return;
			}

			console.log("Received values of form: ", values);
			form.resetFields();
			setVisible(false);
			props.saveServiceToken({
				serviceToken: values.token,
				serviceName: "epitech"
			});
		});
	};

	return (
		<Container>
			<Card
				hoverable
				style={{ width: 240 }}
				title={"Office365"}
				extra={
					props.services.filter((e: any) => e.serviceName === "office365")
						.length > 0 ? (
						<Tag color="green">Linked</Tag>
					) : (
						<Tag color="red">Not link</Tag>
					)
				}
				onClick={() =>
					onButtonClick(
						"https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize?client_id=77bf8547-6358-43aa-b5c3-7ec5c96022e3&scope=offline_access%20Mail.Read%20Mail.Read.Shared%20User.Read%20" +
							"MailboxSettings.Read%20MailboxSettings.ReadWrite%20Calendars.Read%20Sites.ReadWrite.All%20Files.ReadWrite.All&response_type=code"
					)
				}
			>
				<ul>
					<li>Outlook Mails</li>
					<li>Outlook Calendar</li>
					<li>Shared Files</li>
				</ul>
			</Card>
			<Card
				hoverable
				style={{ width: 240 }}
				title={"Yammer"}
				extra={
					props.services.filter((e: any) => e.serviceName === "yammer").length >
					0 ? (
						<Tag color="green">Linked</Tag>
					) : (
						<Tag color="red">Not link</Tag>
					)
				}
				onClick={() =>
					onButtonClick(
						"https://www.yammer.com/oauth2/authorize?client_id=oaeaGzaLetwE3X0U3JirQ&response_type=token&redirect_uri=http://localhost:8080/oauth/yammer"
					)
				}
			>
				<ul>
					<li>Feed Messages</li>
					<li>Group Threads</li>
					<li>Personnal Messages</li>
				</ul>
			</Card>
			<Card
				hoverable
				onClick={() => {
					window.open("https://intra.epitech.eu/admin/autolog", "_blank");
					setVisible(true);
				}}
				style={{ width: 240 }}
				title={"Epitech"}
				extra={
					props.services.filter((e: any) => e.serviceName === "epitech")
						.length > 0 ? (
						<Tag color="green">Linked</Tag>
					) : (
						<Tag color="red">Not link</Tag>
					)
				}
			>
				<ul>
					<li>Notifications</li>
					<li>Grades</li>
					<li>School Notes</li>
				</ul>
			</Card>
			<Modal
				title="Autologin link"
				visible={isVisible}
				okText={"Link account"}
				onOk={handleForm}
				onCancel={() => setVisible(false)}
			>
				<Form layout="vertical">
					<Form.Item label="Autologin token">
						{getFieldDecorator("token", {
							rules: [
								{
									required: true,
									message: "Please input yout autologin"
								}
							]
						})(<Input addonBefore="http://intra.epitech.eu/auth-" />)}
					</Form.Item>
				</Form>
			</Modal>
		</Container>
	);
};

const Wrapper = Form.create({ name: "epitech" })(UserProfile);

export { Wrapper };
