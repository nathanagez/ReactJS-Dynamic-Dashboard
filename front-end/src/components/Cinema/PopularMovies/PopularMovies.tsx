import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, Card, Dropdown, Icon, Avatar, List } from 'antd';
import axios from 'axios';
import { dragHelper } from '../../drag-help';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const genres: Array<any> = [
	{
		id: 28,
		name: 'Action'
	},
	{
		id: 12,
		name: 'Adventure'
	},
	{
		id: 16,
		name: 'Animation'
	},
	{
		id: 35,
		name: 'Comedy'
	},
	{
		id: 80,
		name: 'Crime'
	},
	{
		id: 99,
		name: 'Documentary'
	},
	{
		id: 18,
		name: 'Drama'
	},
	{
		id: 10751,
		name: 'Family'
	},
	{
		id: 14,
		name: 'Fantasy'
	},
	{
		id: 36,
		name: 'History'
	},
	{
		id: 27,
		name: 'Horror'
	},
	{
		id: 10402,
		name: 'Music'
	},
	{
		id: 9648,
		name: 'Mystery'
	},
	{
		id: 10749,
		name: 'Romance'
	},
	{
		id: 878,
		name: 'Science Fiction'
	},
	{
		id: 10770,
		name: 'TV Movie'
	},
	{
		id: 53,
		name: 'Thriller'
	},
	{
		id: 10752,
		name: 'War'
	},
	{
		id: 37,
		name: 'Western'
	}
];

let intervalId: any;

const PopularMovies = () => {
	const [ timer, setTimer ] = useState(5);
	const [ genre, setGenre ] = useState({ id: null, title: '' });
	const [ movies, setMovies ] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(
		() => {
			dragHelper();
			getPopularMovies();
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				getPopularMovies();
			}, timer * 60 * 1000);
		},
		[ genre, timer ]
	);

	const getPopularMovies = async () => {
		setLoading(true);
		const res = await axios.get(
			`${process.env
				.REACT_APP_MOVIEDB_APIURL}discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&api_key=${process
				.env.REACT_APP_MOVIEDB_APIKEY}`
		);
		setMovies(res.data.results);
		setLoading(false);
	};

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

	const handleClick = (ev: any) => {
		setGenre({ id: ev.key, title: ev.item.props.children.toLowerCase() });
		getPopularMovies();
	};

	const menu = (
		<Menu onClick={handleClick}>{genres.map((genre) => <Menu.Item key={genre.id}>{genre.name}</Menu.Item>)}</Menu>
	);

	const IconText = ({ type, text, theme, twoToneColor }) => (
		<span>
			<Icon theme={theme} twoToneColor={twoToneColor} type={type} style={{ marginRight: 8 }} />
			{text}
		</span>
	);

	return (
		<Container>
			<Card
				style={{ height: '100%', overflow: 'auto' }}
				title={
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Popular movies in {genre.title}
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
			>
				<List
					loading={loading}
					itemLayout="vertical"
					size="large"
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
export default PopularMovies;
