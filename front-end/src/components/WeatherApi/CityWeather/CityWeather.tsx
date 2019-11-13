import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Menu, Card, Badge, Dropdown, Skeleton, Avatar, Icon } from 'antd';
import axios from 'axios';
import { dragHelper } from '../../drag-help';

const { Search } = Input;
const { Meta } = Card;
const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const CityWeather = () => {
	const [ weather, setWeather ] = useState();
	const [ loading, setLoading ] = useState(false);
	const [ timer, setTimer ] = useState(5);

	useEffect(() => {
		setLoading(true);
		dragHelper();
		navigator.geolocation.getCurrentPosition(success, error, options);
	}, []);

	const getWeatherCoord = async (lat: any, lon: any) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env
				.REACT_APP_WEATHER_APIKEY}`
		);
		setLoading(false);
		setWeather(res.data);
	};

	const getWeather = async (city: String) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_APIKEY}`
		);
		setLoading(false);
		setWeather(res.data);
	};

	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	const success = (pos) => {
		var crd = pos.coords;
		getWeatherCoord(crd.latitude, crd.longitude);
	}

	const error = (err) => {
		console.warn(`ERREUR (${err.code}): ${err.message}`);
	}

	const timerMenu = (
		<Menu>
			<Menu.Item key={5}>5</Menu.Item>
			<Menu.Item key={10}>10</Menu.Item>
			<Menu.Item key={15}>15</Menu.Item>
		</Menu>
	);

	return (
		<Container>
			<Card
				style={{ height: '100%', overflow: 'auto' }}
				title={'Weather'}
				extra={
					<Dropdown overlay={timerMenu}>
						<a className="ant-dropdown-link" href="#">
							Refresh {timer} min
							<Icon type="down" />
						</a>
					</Dropdown>
				}
			>
				<Search placeholder="City" onSearch={(city) => getWeather(city)} enterButton />
				<Card
					style={{ marginTop: 16 }}
					actions={[
						<div>
							<Icon type="cloud" />
							&nbsp;
							{weather ? weather.main.humidity + '%' : '-'}
						</div>,
						<div>
							<Icon type="fall" />
							&nbsp;
							{weather ? Math.round(weather.main.temp_min - 273.15) + '°C' : '-'}
						</div>,
						<div>
							<Icon type="rise" />
							&nbsp;
							{weather ? Math.round(weather.main.temp_max - 273.15) + '°C' : '-'}
						</div>
					]}
				>
					<Skeleton loading={loading} avatar active>
						<Meta
							avatar={
								<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
									{weather ? weather.sys.country : '-'}
								</Avatar>
							}
							title={weather ? weather.name : '-'}
							description={weather ? weather.weather[0].description.toUpperCase() : '-'}
						/>
					</Skeleton>
				</Card>
			</Card>
		</Container>
	);
};
export default CityWeather;
