import React from 'react';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { MainLayout } from './pages/MainLayout';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import dashboard from './redux';

const store = createStore(dashboard, applyMiddleware(thunk));

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<MainLayout />
		</Provider>
	);
};

export default App;
