import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
// eslint-disable-next-line
import { BrowserRouter as Router, Link, NavLink, useHistory } from "react-router-dom";

const Container = styled.div`
	overflow: hidden;
	background-color: #fff;
	box-shadow: 0 4px 9px -9px grey;
	a {
		float: left;
		display: block;
		font-size: 1.1em;
		color: #1c2834;
		text-align: center;
		padding: 20px;
		text-decoration: none;
	}
	a:hover {
		font-size: 1.2em;
		transition: all 0.4s ease;
		-webkit-transition: all 0.4s ease;
	}
`;

const RightLinks = styled.div`
	float: right;
`;

const NavbarWrapper: React.FC<any> = (props: any) => {
	const history = useHistory();
	const logOutHandler = () => {
		props.logUserOut();
		history.push('/login');
	}

	return (
		<Fragment>
			{!props.user ? (
				<Container>
					<Link to="/">Dashboard</Link>
					<RightLinks>
						<NavLink exact activeStyle={{ color: "#1890ff" }} to="/login">
							Sign In
						</NavLink>
						<NavLink exact activeStyle={{ color: "#1890ff" }} to="/register">
							Register
						</NavLink>
					</RightLinks>
				</Container>
			) : (
				<Container>
					<Link to="/">Dashboard</Link>
					<RightLinks>
						<NavLink exact activeStyle={{ color: "#1890ff" }} to="/login">
							{props.user.username}
						</NavLink>
						<a onClick={() => logOutHandler()}>
							Disconnect
						</a>
					</RightLinks>
				</Container>
			)}
		</Fragment>
	);
};

export { NavbarWrapper };
