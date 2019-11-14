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

const InlineContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

let intervalId: any;

const CocktailReceipt = () => {
	const [ cocktails, setCocktails ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ timer, setTimer ] = useState(5);

	useEffect(() => {
		dragHelper();
	}, [timer]);

	const getCocktailInfo = (cocktailName: String) => {
		setLoading(true);
		axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`).then((res) => {
			if (res.data.drinks) setCocktails(res.data.drinks);
			else setCocktails([]);
			setLoading(false);
		});
	};

	const handleTimer = (ev: any) => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		setTimer(ev.key);
	};

	const handleCocktailRequest = (cocktailName: String) => {
		getCocktailInfo(cocktailName);
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			getCocktailInfo(cocktailName);
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
					onSearch={(cocktailName) => handleCocktailRequest(cocktailName)}
					enterButton
				/>
				<List
					loading={loading}
					itemLayout="horizontal"
					dataSource={cocktails}
					renderItem={(item: any) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={item.strDrinkThumb} />}
								title={item.strDrink}
								description={item.strInstructions}
							/>
							<div
								style={{
									display: 'flex',
									borderLeft: 'solid 1px rgba(0, 0, 0, 0.45)',
									paddingLeft: '10px',
									marginLeft: '1em'
								}}
							>
								<div>
									<Tag color="cyan">Ingredients</Tag>
									<ul style={{ paddingLeft: '30px' }}>
										{item.strIngredient1 ? <li>{item.strIngredient1}</li> : null}
										{item.strIngredient2 ? <li>{item.strIngredient2}</li> : null}
										{item.strIngredient3 ? <li>{item.strIngredient3}</li> : null}
										{item.strIngredient4 ? <li>{item.strIngredient4}</li> : null}
										{item.strIngredient5 ? <li>{item.strIngredient5}</li> : null}
										{item.strIngredient6 ? <li>{item.strIngredient6}</li> : null}
										{item.strIngredient7 ? <li>{item.strIngredient7}</li> : null}
										{item.strIngredient8 ? <li>{item.strIngredient8}</li> : null}
										{item.strIngredient9 ? <li>{item.strIngredient9}</li> : null}
										{item.strIngredient10 ? <li>{item.strIngredient10}</li> : null}
										{item.strIngredient11 ? <li>{item.strIngredient11}</li> : null}
										{item.strIngredient12 ? <li>{item.strIngredient12}</li> : null}
										{item.strIngredient13 ? <li>{item.strIngredient13}</li> : null}
										{item.strIngredient14 ? <li>{item.strIngredient14}</li> : null}
										{item.strIngredient15 ? <li>{item.strIngredient15}</li> : null}
									</ul>
								</div>
								<div>
									<Tag color="magenta">Measures</Tag>
									<ul style={{ paddingLeft: '30px' }}>
										{item.strMeasure1 ? <li>{item.strMeasure1}</li> : null}
										{item.strMeasure2 ? <li>{item.strMeasure2}</li> : null}
										{item.strMeasure3 ? <li>{item.strMeasure3}</li> : null}
										{item.strMeasure4 ? <li>{item.strMeasure4}</li> : null}
										{item.strMeasure5 ? <li>{item.strMeasure5}</li> : null}
										{item.strMeasure6 ? <li>{item.strMeasure6}</li> : null}
										{item.strMeasure7 ? <li>{item.strMeasure7}</li> : null}
										{item.strMeasure8 ? <li>{item.strMeasure8}</li> : null}
										{item.strMeasure9 ? <li>{item.strMeasure9}</li> : null}
										{item.strMeasure10 ? <li>{item.strMeasure10}</li> : null}
										{item.strMeasure11 ? <li>{item.strMeasure11}</li> : null}
										{item.strMeasure12 ? <li>{item.strMeasure12}</li> : null}
										{item.strMeasure13 ? <li>{item.strMeasure13}</li> : null}
										{item.strMeasure14 ? <li>{item.strMeasure14}</li> : null}
										{item.strMeasure15 ? <li>{item.strMeasure15}</li> : null}
									</ul>
								</div>
							</div>
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};
export default CocktailReceipt;
