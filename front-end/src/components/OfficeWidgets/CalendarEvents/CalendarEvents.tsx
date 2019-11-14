import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { Calendar, Menu, Card, Dropdown, Icon, Badge, Popover } from "antd";
import { dragHelper } from '../../drag-help';
import moment from "moment";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any = 0;

const CalendarWrapper: React.FC = (props: any) => {
	const token = window.localStorage.getItem("token");
	const outlookService = props.services.find(
		(item: any) => item.serviceName === "office365"
	);
	const [calendar, setCalendar] = useState([]);
	const [loading, setLoading] = useState(true);
	const [timer, setTimer] = useState(5);

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
		dragHelper();
		getCalendar();
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getCalendar();
		}, timer * 60 * 1000);
	}, [timer]);


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

	const handleClick = (ev: any) => {
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
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
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
