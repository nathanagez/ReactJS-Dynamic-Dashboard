import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteWrapper = (props: any) => {
	return (
		<Route path={props.path}>
			{props.user ? props.children : <Redirect to={"/login"} />}
		</Route>
	);
};

export { PrivateRouteWrapper };
