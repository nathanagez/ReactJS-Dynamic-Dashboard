import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { Calendar, Menu, Card, Dropdown, Icon, Badge, Popover } from "antd";
import moment from "moment";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const CalendarWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const outlookService = props.services.find(
		(item: any) => item.serviceName === "office365"
	);
	const [calendar, setCalendar] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCalendar = () => {
		setLoading(true);
		axios
			.get("https://graph.microsoft.com/v1.0/me/calendar/events", {
				headers: {
					Authorization: outlookService.serviceToken
				}
			})
			.then(res => {
				setCalendar(res.data.value);
				setLoading(false);
			})
			.catch(err => {
				if (err.response.data.error.message === "Access token has expired.") {
					setLoading(true);
					axios
						.get(`${process.env.REACT_APP_BASEURL}/update_officeToken`, {
							headers: {
								Authorization: token
							}
						})
						.then(() => {
							setLoading(false);
						})
						.catch(() => setLoading(false));
				}
			});
	};

	useEffect(() => {
		getCalendar();
	}, []);


	const handleClick = (ev: any) => {
		console.log(ev);
	};

	const getCellData = (value: any) => {
		return calendar.filter(
			(item: any) =>
				moment(item.start.dateTime).format("YYYY/MM/DD") ==
				value.format("YYYY/MM/DD")
		);
	}

	const dateCellRender = (value: any) => {
		const listData = getCellData(value);
		return (
			<div>
				{listData.map((item: any) => (
					<Popover
						content={
							<div style={{ maxWidth: "400px" }}>{item.bodyPreview}</div>
						}
						title={"Preview"}
					>
						<Badge status="processing" text={item.subject.split("-")[0]} />
						<br />
					</Popover>
				))}
			</div>
		);
	};

	const getMonthData = (value: any) => {
		return calendar.filter(
			(item: any) =>
				moment(item.start.dateTime).format("YYYY/MM") == value.format("YYYY/MM")
		);
	}

	const monthCellRender = (value: any) => {
		const listData = getMonthData(value);
		return (
			<div>
				{listData.map((item: any) => (
					<Fragment>
						<Badge status="processing" text={item.subject.split("-")[0]} />
						<br />
					</Fragment>
				))}
			</div>
		);
	};

	const menu = <Menu onClick={handleClick}></Menu>;

	return (
		<Container>
			<Card
				loading={loading}
				style={{ height: "100%", overflow: "auto" }}
				title={"Calendar"}
			>
				<Calendar
					dateCellRender={dateCellRender}
					monthCellRender={monthCellRender}
				/>
			</Card>
		</Container>
	);
};

export { CalendarWrapper };
