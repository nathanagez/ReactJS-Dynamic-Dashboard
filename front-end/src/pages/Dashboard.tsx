import React from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Dashboard: React.FC = () => {
	return (
		<Container>
			<h1>Dashboard</h1>
		</Container>
	);
};

export { Dashboard };
