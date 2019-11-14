import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Menu, Card, List, Dropdown, Tag, Avatar, Icon } from 'antd';
import axios from 'axios';
import { dragHelper } from '../drag-help';

const { Search } = Input;
const { Meta } = Card;
const Container = styled.div`
	width: 100%;
	height: 100%;
`;

let intervalId: any;

const IngredientSearch = () => {
	const [ ingredient, setIngredients ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ timer, setTimer ] = useState(5);

	useEffect(() => {
		dragHelper();
	}, []);

	const getIngredientInfo = (cocktailName: String) => {
		setLoading(true);
		axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${cocktailName}`).then((res) => {
			if (res.data.ingredients) setIngredients(res.data.ingredients);
			else setIngredients([]);
			setLoading(false);
			console.log(res);
		});
	};

	const handleTimer = (ev: any) => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		setTimer(ev.key);
	};

	const handleIngredientSearch = (cocktailName: String) => {
		getIngredientInfo(cocktailName);
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getIngredientInfo(cocktailName);
		}, timer * 60 * 1000);
	};

	const timerMenu = (
		<Menu onClick={handleTimer}>
			<Menu.Item key={5}>5</Menu.Item>
			<Menu.Item key={10}>10</Menu.Item>
			<Menu.Item key={15}>15</Menu.Item>
		</Menu>
	);

	return (
		<Container>
			<Card
				style={{ height: '100%', overflow: 'auto' }}
				title={'Cocktail Receipts'}
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<Search
					placeholder="Search a cocktail"
					onSearch={(cocktailName) => handleIngredientSearch(cocktailName)}
					enterButton
				/>
				<List
					loading={loading}
					itemLayout="horizontal"
					dataSource={ingredient}
					renderItem={(item: any) => (
						<List.Item>
							<List.Item.Meta
								title={item.strIngredient}
								description={item.strDescription ? item.strDescription : "No description"}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};
export default IngredientSearch;
