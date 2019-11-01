import React, { useEffect } from "react";
import { Register } from "../../components";
import { Login } from "../../components/Login";
import { Navbar } from "../../components/Navbar";
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
	useHistory
} from "react-router-dom";
import { Dashboard } from "../Dashboard/";
import { PrivateRoute } from "../../components/Protected/";
import { UserProfile } from "../UserProfile";

const MainLayoutWrapper: React.FC = (props: any) => {
	//const history = useHistory();

	useEffect(() => {
		props.checkToken();
		props.getServices();
		console.log(props.services);
	}, []);

	return (
		<Router>
			{/*props.userData ? <Redirect to="/dashboard" /> : null*/}
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Redirect to="/dashboard" />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<PrivateRoute path="/dashboard">
					<Dashboard />
				</PrivateRoute>
				<PrivateRoute path="/profile">
					<UserProfile />
				</PrivateRoute>
				<Route path="/oauth/:service">
					<UserProfile />
				</Route>
			</Switch>
		</Router>
	);
};

export { MainLayoutWrapper };
