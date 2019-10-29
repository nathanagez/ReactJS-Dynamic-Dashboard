import React from "react";
import styled from "styled-components";
import { UserProfile } from "./UserProfile";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Dashboard: React.FC = () => {
	return (
		<Container>
			<UserProfile />
		</Container>
	);
};

export { Dashboard };
