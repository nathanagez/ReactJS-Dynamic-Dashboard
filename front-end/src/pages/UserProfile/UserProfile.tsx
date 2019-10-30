import React, { useEffect } from "react";
import styled from "styled-components";
import { Card, message, Button, Icon } from "antd";
import axios from "axios";

const gridStyle = {
	width: "25%",
	textAlign: "center"
};

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 10px;
`;

function callback(key: any) {
	console.log(key);
}

const UserProfile: React.FC = (props: any) => {
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
		}
		if (url.includes("office365")) {
			const serviceToken = url_arr[4].split("=")[1];
			console.log(serviceToken.split("&")[0]);
			props.saveOfficeToken(serviceToken.split("&")[0]);
		}
	};

	const onButtonClick = (link: string) => {
		console.log("button click");
		window.open(link, "_self");
	};

	return (
		<Container>
			<Button
				size={"large"}
				type="dashed"
				onClick={() =>
					onButtonClick(
						"https://www.yammer.com/oauth2/authorize?client_id=oaeaGzaLetwE3X0U3JirQ&response_type=token&redirect_uri=http://localhost:3000/oauth/yammer"
					)
				}
			>
				Yammer
				{props.services.filter((e: any) => e.serviceName === "yammer").length >
				0 ? (
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
				) : (
					<Icon type="close-circle" theme="twoTone" twoToneColor="red" />
				)}
			</Button>
			<Button
				size={"large"}
				type="dashed"
				onClick={() =>
					onButtonClick(
						"https://accounts.google.com/o/oauth2/v2/auth?client_id=660957174231-ljm3stnq13fc6pvu315pk4su036uijal.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&redirect_uri=http://localhost:3000/oauth/google"
					)
				}
			>
				Google
				{props.services.filter((e: any) => e.serviceName === "youtube").length >
				0 ? (
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
				) : (
					<Icon type="close-circle" theme="twoTone" twoToneColor="red" />
				)}
			</Button>
			<Button
				size={"large"}
				type="dashed"
				onClick={() =>
					onButtonClick(
						"https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize?client_id=77bf8547-6358-43aa-b5c3-7ec5c96022e3&scope=Mail.Read%20Mail.Read.Shared%20User.Read&response_type=code"
					)
				}
			>
				Office365
				{props.services.filter((e: any) => e.serviceName === "office365")
					.length > 0 ? (
					<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
				) : (
					<Icon type="close-circle" theme="twoTone" twoToneColor="red" />
				)}
			</Button>
			{/*<Card
				title="Yammer"
				extra={
					<a href="https://www.yammer.com/oauth2/authorize?client_id=oaeaGzaLetwE3X0U3JirQ&response_type=token&redirect_uri=http://localhost:3000/oauth/yammer">
						{props.name ? "Unlink your account" : "Link your account"}
					</a>
				}
				style={{ width: 300 }}
			></Card>
			<Card
				title="Google"
				extra={
					<a href="#">
						Link your account
					</a>
				}
				style={{ width: 300 }}
			></Card>
			<Card
				title="Office365"
				extra={<a href="#">Link your account</a>}
				style={{ width: 300 }}
			></Card>
			<Card
				title="Youtube"
				extra={<a href="#">Link your account</a>}
				style={{ width: 300 }}
			></Card>*/}
		</Container>
	);
};

export { UserProfile };
