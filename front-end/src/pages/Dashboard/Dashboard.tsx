import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Menu, Tabs, Button } from 'antd';
import ResponsiveReactGridLayout from 'react-grid-layout';
import { MessageWidget } from '../../components/YammerWidgets/MessagesWidget';
import { FollowingMessages } from '../../components/YammerWidgets/FollwingMessages';
import { OutlookMails } from '../../components/OfficeWidgets/OutlookMails';
import { Alerts } from '../../components/EpitechWidgets/Alerts';
import { Modules } from '../../components/EpitechWidgets/Modules';
import { PersonnalMessages } from '../../components/YammerWidgets/PersonnalMessages';
import { SchoolNotes } from '../../components/EpitechWidgets/SchoolNotes';
import { CalendarEvents } from '../../components/OfficeWidgets/CalendarEvents';
import { SharedFiles } from '../../components/OfficeWidgets/SharedFiles';
import CityWeather from '../../components/WeatherApi/CityWeather/CityWeather';
import PopularMovies from '../../components/Cinema/PopularMovies/PopularMovies';
import PopularTv from '../../components/Cinema/PopularTv/PopularTv';
import MovieSearch from '../../components/Cinema/MovieSearch/MovieSearch';
import CocktailReceipt from '../../components/Cocktails/CocktailReceipt';
import IngredientSearch from '../../components/Cocktails/IngredientDescription';

const { TabPane } = Tabs;
const { SubMenu } = Menu;
let globalId = 0;

const Container = styled.div`
	width: 100%;
	height: calc(100% - 63px);
	display: flex;
`;

const WidgetContainer =
	styled.div <
	any >
	`

-webkit-box-shadow: ${(props: any) => (props.anim ? '0px 0px 12px 6px rgba(212,212,212,1);' : 'inherit;')}
-moz-box-shadow: ${(props: any) => (props.anim ? '0px 0px 12px 6px rgba(212,212,212,1);' : 'inherit;')}
box-shadow: ${(props: any) => (props.anim ? '0px 0px 12px 6px rgba(212,212,212,1);' : 'inherit;')}

`;

const Dashboard: React.FC = (props: any) => {
	const menuLayout: any = [];
	const [ layout1, setLayout1 ] = useState(menuLayout);
	const [ layout2, setLayout2 ] = useState(menuLayout);
	const [ layout3, setLayout3 ] = useState(menuLayout);
	const [ activeTab, setActiveTab ] = useState('tab1');

	const [ visible, setVisible ] = useState({ id: null, state: false });

	const handleDoubleClick = (ev: any, id: any) => {
		setVisible({ id: id, state: !visible.state });
	};

	useEffect(() => {
		console.log(props.layout);
	});

	const createElement = (el: any) => {
		return (
			<WidgetContainer
				anim={visible.state && visible.id === el.i}
				onDoubleClick={(ev) => handleDoubleClick(ev, el.i)}
				key={el.i}
			>
				{visible.state && visible.id === el.i ? (
					<Button
						type="danger"
						onClick={() => handleClose(el.i)}
						shape="circle"
						style={{
							position: 'absolute',
							zIndex: 1,
							right: '-15px',
							top: '-15px'
						}}
					>
						<Icon type="close" />
					</Button>
				) : null}
				{el.component}
			</WidgetContainer>
		);
	};

	const handleClose = (id: any) => {
		let removeIndex = 0;

		setVisible({ id: null, state: false });

		switch (activeTab) {
			case 'tab1':
				removeIndex = layout1
					.map(function(item: any) {
						return item.i;
					})
					.indexOf(id);
				layout1.splice(removeIndex, 1);
				setLayout1([ ...layout1 ]);
				break;
			case 'tab2':
				removeIndex = layout2
					.map(function(item: any) {
						return item.i;
					})
					.indexOf(id);
				layout2.splice(removeIndex, 1);
				setLayout2([ ...layout2 ]);
				break;
			case 'tab3':
				removeIndex = layout3
					.map(function(item: any) {
						return item.i;
					})
					.indexOf(id);
				layout3.splice(removeIndex, 1);
				setLayout3([ ...layout3 ]);
				break;
		}
	};

	const handleClick = (ev: any) => {
		switch (ev.key) {
			case 'yammer#message':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MessageWidget />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MessageWidget />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MessageWidget />
							}
						]);
						break;
				}
				break;
			case 'yammer#group':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <FollowingMessages />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <FollowingMessages />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <FollowingMessages />
							}
						]);
						break;
				}
				break;
			case 'yammer#personnalMsg':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PersonnalMessages />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PersonnalMessages />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PersonnalMessages />
							}
						]);
						break;
				}
				break;
			case 'outlook#calendar':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CalendarEvents />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CalendarEvents />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CalendarEvents />
							}
						]);
						break;
				}
				break;
			case 'outlook#mails':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <OutlookMails />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <OutlookMails />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <OutlookMails />
							}
						]);
						break;
				}
				break;
			case 'epi#alerts':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Alerts />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Alerts />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Alerts />
							}
						]);
						break;
				}
				break;
			case 'outlook#files':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SharedFiles />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SharedFiles />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SharedFiles />
							}
						]);
						break;
				}
				break;
			case 'epi#grades':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Modules />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Modules />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <Modules />
							}
						]);
						break;
				}
				break;
			case 'epi#notes':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SchoolNotes />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SchoolNotes />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <SchoolNotes />
							}
						]);
						break;
				}
				break;
			case 'weather#city':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CityWeather />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CityWeather />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CityWeather />
							}
						]);
						break;
				}
				break;
			case 'cinema#popularmovie':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularMovies />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularMovies />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularMovies />
							}
						]);
						break;
				}
				break;
			case 'cinema#populartv':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularTv />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularTv />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <PopularTv />
							}
						]);
						break;
				}
				break;
			case 'cinema#search':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MovieSearch />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MovieSearch />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <MovieSearch />
							}
						]);
						break;
				}
				break;
				case 'cocktail#receipt':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CocktailReceipt />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CocktailReceipt />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <CocktailReceipt />
							}
						]);
						break;
				}
				break;
				case 'cocktail#ingredient':
				switch (activeTab) {
					case 'tab1':
						setLayout1([
							...layout1,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <IngredientSearch />
							}
						]);
						break;
					case 'tab2':
						setLayout2([
							...layout2,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <IngredientSearch />
							}
						]);
						break;
					case 'tab3':
						setLayout3([
							...layout3,
							{
								i: (globalId++).toString(),
								x: 0,
								y: 0,
								w: 6,
								h: 10,
								component: <IngredientSearch />
							}
						]);
						break;
				}
				break;
		}
	};

	const tabChange = (tab: any) => {
		setActiveTab(tab);
	};

	const yammerService = props.services.find((item: any) => item.serviceName === 'yammer');
	const office365Service = props.services.find((item: any) => item.serviceName === 'office365');
	const epitechService = props.services.find((item: any) => item.serviceName === 'epitech');

	return (
		<Container>
			<Menu style={{ width: 256 }} mode="inline">
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="code" />
							<span>Epitech</span>
						</span>
					}
				>
					<Menu.Item disabled={epitechService === undefined} onClick={handleClick} key={'epi#alerts'}>
						<Icon
							type={epitechService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={epitechService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Notifications
					</Menu.Item>
					<Menu.Item disabled={epitechService === undefined} onClick={handleClick} key={'epi#grades'}>
						<Icon
							type={epitechService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={epitechService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Grades
					</Menu.Item>
					<Menu.Item disabled={epitechService === undefined} key={'epi#notes'} onClick={handleClick}>
						<Icon
							type={epitechService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							onClick={handleClick}
							twoToneColor={epitechService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						School Notes
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<Icon type="usergroup-add" />
							<span>Yammer</span>
						</span>
					}
				>
					<Menu.Item disabled={yammerService === undefined} onClick={handleClick} key={'yammer#message'}>
						<Icon
							type={yammerService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={yammerService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Feed messages
					</Menu.Item>
					<Menu.Item disabled={yammerService === undefined} onClick={handleClick} key={'yammer#group'}>
						<Icon
							type={yammerService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={yammerService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Group threads
					</Menu.Item>
					<Menu.Item onClick={handleClick} disabled={yammerService === undefined} key={'yammer#personnalMsg'}>
						<Icon
							type={yammerService === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={yammerService === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Personnal Messages
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub4"
					title={
						<span>
							<Icon type="mail" />
							<span>Office365</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={'outlook#mails'} disabled={office365Service === undefined}>
						<Icon
							type={office365Service === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={office365Service === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Outlook Mails
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={'outlook#calendar'} disabled={office365Service === undefined}>
						<Icon
							type={office365Service === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={office365Service === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Outlook Calendar
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={'outlook#files'} disabled={office365Service === undefined}>
						<Icon
							type={office365Service === undefined ? 'close-circle' : 'plus-circle'}
							theme="twoTone"
							twoToneColor={office365Service === undefined ? '#eb2f96' : '#52c41a'}
						/>
						Shared Files
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub5"
					title={
						<span>
							<Icon type="cloud" />
							<span>City Weather</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={'weather#city'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Weather widget
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub6"
					title={
						<span>
							<Icon type="video-camera" />
							<span>Cinema</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={'cinema#popularmovie'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Popular Movies
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={'cinema#populartv'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Popular TV
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={'cinema#search'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Movie search
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub7"
					title={
						<span>
							<Icon type="filter" />
							<span>Cocktails</span>
						</span>
					}
				>
					<Menu.Item onClick={handleClick} key={'cocktail#receipt'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Cocktail Receipt
					</Menu.Item>
					<Menu.Item onClick={handleClick} key={'cocktail#ingredient'}>
						<Icon type={'plus-circle'} theme="twoTone" twoToneColor={'#52c41a'} />
						Ingredient description
					</Menu.Item>
				</SubMenu>
			</Menu>
			<Tabs
				onChange={tabChange}
				defaultActiveKey="tab1"
				tabPosition="top"
				style={{ width: '100%', overflow: 'auto' }}
			>
				<TabPane tab="Dashboard #1" key="tab1">
					<ResponsiveReactGridLayout
						className="layout"
						draggableHandle=".react-grid-dragHandler"
						layout={layout1}
						cols={20}
						autoSize={true}
						rowHeight={30}
						width={window.screen.width}
					>
						{layout1.map((item: any) => createElement(item))}
					</ResponsiveReactGridLayout>
				</TabPane>
				<TabPane tab="Dashboard #2" key="tab2">
					<ResponsiveReactGridLayout
						className="layout"
						draggableHandle=".react-grid-dragHandler"
						layout={layout2}
						cols={20}
						autoSize={true}
						rowHeight={30}
						width={window.screen.width}
					>
						{layout2.map((item: any) => createElement(item))}
					</ResponsiveReactGridLayout>
				</TabPane>
				<TabPane tab="Dashboard #3" key="tab3">
					<ResponsiveReactGridLayout
						className="layout"
						draggableHandle=".react-grid-dragHandler"
						layout={layout3}
						cols={20}
						autoSize={true}
						rowHeight={30}
						width={window.screen.width}
					>
						{layout3.map((item: any) => createElement(item))}
					</ResponsiveReactGridLayout>
				</TabPane>
			</Tabs>
		</Container>
	);
};

export { Dashboard };
