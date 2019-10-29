import React, { useEffect, useState } from "react";
import {Register } from "../components";
import {Login} from "../components/Login/";
import {Navbar} from "../components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";

const MainLayout: React.FC = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Dashboard />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	);
};
export default MainLayout;
