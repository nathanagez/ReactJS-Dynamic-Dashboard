# Dashboard

## Table of content

* [How to start docker-compose in development mode ?](#dev-mode)
* [How to start docker-compose in "production mode" ?](#production-mode)
* [Front-End Architecture](#front-end-architecture)
* [REST API Routes](#api-routes)

## Dev mode

Use the following command within the folder containing docker-compose-dev.yml: 
```docker
docker-compose -f ./docker-compose-dev.yml up --force-recreate
```

## Production mode

Use the following command within the folder containing docker-compose.yml: 
```docker
docker-compose up --build
```

## Front-End Architecture

Dashboard front-end was made using multiple libraries compatible with Javascript and ReactJS
### Libraries:

* "@types/jest": "24.0.19",
* "@types/node": "12.11.1",
* "@types/react": "16.9.9",
* "@types/react-dom": "16.9.2",
* "@types/react-grid-layout": "^0.16.7",
* "@types/react-redux": "^7.1.5",
* "@types/react-router-dom": "^5.1.0",
* "@types/styled-components": "^4.1.19",
* "antd": "^3.24.2",
* "axios": "^0.19.0",
* "moment": "^2.24.0",
* "react": "^16.10.2",
* "react-dom": "^16.10.2",
* "react-grid-layout": "^0.17.1",
* "react-redux": "^7.1.1",
* "react-router-dom": "^5.1.2",
* "react-scripts": "3.2.0",
* "redux": "^4.0.4",
* "redux-thunk": "^2.3.0",
* "styled-components": "^4.4.0",
* "typescript": "3.6.4"

### Component Design
Every components that need shared props & states are wrapped with the following design:

├── YammerWidgets \
│   ├── FollwingMessages \
│   │   ├── **FollowingMessages.tsx** \
│   │   ├── **FollowingMessages.wrap.ts** \
│   │   └── **index.ts** \
│   ├── MessagesWidget \
│   │   ├── MessageWidget.tsx \
│   │   ├── MessageWidget.wrap.ts \
│   │   └── index.ts \
│   └── PersonnalMessages \
│       ├── PersonnalMessages.tsx \
│       ├── PersonnalMessages.wrap.ts \
│       └── index.ts

Each services contain a folder for each widgets\
**.tsx** files are the widgets sources\
**.wrap.ts** files are a redux wrapper used to separate component logic & redux logic\
**index.ts** files are used to export component in our app

### Redux/Reducers/Actions
At the root of src folder there is a redux folder used to managed all actions & reducers used in our app

Each folders inside manage logic for a specific usage, widget actions/reducers for example.

├── index.js \
├── login \
│   ├── login.actions.ts \
│   ├── login.reducers.ts \
│   └── login.types.ts \
├── services \
│   ├── services.actions.ts \
│   ├── services.reducers.ts \
│   └── services.types.ts \
└── widgets \
    ├── widgets.actions.ts \
    ├── widgets.reducer.ts \
    └── widgets.types.ts

### Actions
Actions are dispatched to reducers
```ts
export const logUserIn = (data: { email: String; password: String }) => {
	return (dispatch: any) => {
		dispatch({ type: LOGGIN_IN });
		axios
			.post(`${process.env.REACT_APP_BASEURL}/login`, {
				email: data.email,
				password: data.password
			})
			.then(res => {
				window.localStorage.setItem("token", res.data.token);
				dispatch({
					type: LOG_IN_SUCCESS,
					payload: res.data
				});
			})
			.catch(err => {
				message.error(`${err.response.data.message}`)
				dispatch({
					type: LOG_IN_FAILED
				});
			});
	};
};
```

### Reducers
Reducers return state to our components
```ts
export default (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case LOGGIN_IN:
			return { ...state, loading: true};
		case LOG_IN_SUCCESS:
			return { ...state, user: action.payload, loading: false };
		case LOG_IN_FAILED:
			return { ...state, user: null, loading: false};
		case LOG_OUT:
			return {...state, user: null}
		default:
			return state;
	}
};
```

## API Routes

All API routes are prefixed with /api/

### Register user
```http
POST /api/register

parameters:
{
    'username': String,
    'email': String,
    'password': String
}

Status 200
response:
{
    'success': Boolean, 
    'message': String
}
```

### Log user in
```http
POST /api/login

parameters:
{
    'username': String,
    'email': String
}

Status 200
response:
{
    'success': Boolean,
    'token': String (jwt token)
}

Status 403
response:
{
    'success': Boolean,
    'message': String
}
```

### Get user info
```http
GET /api/user

headers:
{
    'Authorization': String (jwt token)
}

Status 200
response:
{
    'success': Boolean,
    'userData': Object
}
```

### Add service
If service exist it's updated if not, it's added
```http
POST /api/add_service

headers:
{
    'Authorization': String (jwt token)
}

parameters:
{
    'serviceName': String,
    'serviceToken': String,
}

Status 200
response:
{
    'success': Boolean,
    'message': String
}
```

### Get services
```http
GET /api/services

headers:
{
    'Authorization': String (jwt token)
}

Status 200
response:
{
    'success': Boolean,
    'message': String
}
```

### Add Office service
If service exist it's updated if not, it's added
```http
POST /api/add_office

headers:
{
    'Authorization': String (jwt token)
}

parameters:
{
    'code': String
}

Status 200
response:
{
    'success': Boolean,
    'message': String
}
```

### Update token using refresh token (office365)
```http
GET /api/update_officeToken

headers:
{
    'Authorization': String (jwt token)
}

Status 200
response:
{
    'success': Boolean,
    'message': String
}
```

### Get Widget List
```http
GET /about.json
```
