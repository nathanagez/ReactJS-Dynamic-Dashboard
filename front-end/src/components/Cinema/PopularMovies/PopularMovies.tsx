import React, {useState} from 'react';
import styled from 'styled-components';
import { Tag, List, Menu, Card, Badge, Dropdown, Icon } from 'antd';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const CityWind = () => {
    const [messages, setMessages] = useState([]);
	const [group, setGroup] = useState(null);
	const [limit, setLimit] = useState(0);
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(5);
    

	const timerMenu = (
		<Menu >
			<Menu.Item key={5}>5</Menu.Item>
			<Menu.Item key={10}>10</Menu.Item>
			<Menu.Item key={15}>15</Menu.Item>
		</Menu>
    );
    
    const menu = (
        <Menu >
            <Menu.Item key={5}>5</Menu.Item>
            <Menu.Item key={10}>10</Menu.Item>
            <Menu.Item key={15}>15</Menu.Item>
        </Menu>
	);

	return (
		<Container>
			<Card
				
				style={{ height: '100%', overflow: 'auto' }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Last {limit} threads from {group}
							<Icon type="down" />
						</a>
					</Dropdown>
				}
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			/>
		</Container>
	);
};
export default CityWind;
