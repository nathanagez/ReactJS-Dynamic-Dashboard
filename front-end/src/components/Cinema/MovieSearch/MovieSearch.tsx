import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, Card, Dropdown, Icon, Input, List } from 'antd';
import axios from 'axios';
import { dragHelper } from '../../drag-help';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;
const { Search } = Input;

let intervalId: any;

const MovieSearch = () => {
	const [ timer, setTimer ] = useState(5);
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dragHelper();
		clearInterval(intervalId);
	}, [timer]);

	const searchMovie = async (query: String) => {
		setLoading(true);
		const res = await axios.get(
			`${process.env.REACT_APP_MOVIEDB_APIURL}search/movie?query=${query}&api_key=${process.env
				.REACT_APP_MOVIEDB_APIKEY}`
		);
		setMovies(res.data.results);
		setLoading(false);
	};

	const handleSearch = (query: String) => {
		clearInterval(intervalId);
		searchMovie(query);
		intervalId = setInterval(() => {
			searchMovie(query);
		}, timer * 60 * 1000);
	}

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

	const IconText = ({ type, text, theme, twoToneColor }) => (
		<span>
			<Icon type={type} style={{ marginRight: 8 }} theme={theme} twoToneColor={twoToneColor} />
			{text}
		</span>
	);

	return (
		<Container>
			<Card
				style={{ height: '100%', overflow: 'auto' }}
				title={'Seach a movie'}
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<Search placeholder="The Hitchhiker's Guide to the Galaxy" onSearch={(movie) => handleSearch(movie)} enterButton />
				<List
					itemLayout="vertical"
					size="large"
					loading={loading}
					dataSource={movies}
					pagination={{
						pageSize: 3
					}}
					renderItem={(item: any) => (
						<List.Item
							key={item.original_title}
							actions={[
								<IconText
									type="fire"
									theme="twoTone"
									twoToneColor="#eb2f96"
									text={`${Math.round(item.popularity)} (popularity)`}
									key="list-vertical-star-o"
								/>,
								<IconText
									type="like-o"
									theme="twoTone"
									twoToneColor="#52c41a"
									text={`${Math.round(item.vote_count)} (vote count)`}
									key="list-vertical-like-o"
								/>
							]}
							extra={
								<img
									width={272}
									alt="logo"
									src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
								/>
							}
						>
							<List.Item.Meta
								title={<a href={item.original_title}>{item.original_title}</a>}
								description={item.overview}
							/>
							{item.content}
						</List.Item>
					)}
				/>
			</Card>
		</Container>
	);
};
export default MovieSearch;
