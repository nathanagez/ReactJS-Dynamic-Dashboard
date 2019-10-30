import React, { useEffect } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
	max-width: 300px;
	min-width: 300px;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
`;

interface IForm {
	username: String;
	password: String;
	email: String;
}

const Login: React.FC = (props: any, state) => {
	let history = useHistory();
	const { getFieldDecorator } = props.form;
	const handleSubmit = (e: any) => {
		e.preventDefault();
		props.form.validateFields(async (err: any, values: IForm) => {
			if (!err) {
				// console.log("Received values of form: ", values);
				props.logUserIn({email: values.email, password: values.password});
			}
		});
	};

	useEffect(() => {
		const {user, error} = props;
		if (user) {
			message.success('Successfully connected! 😛')
			history.push('/dashboard')
		}
	})

	return (
		<Container>
			<Form onSubmit={handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator("email", {
						rules: [
							{
								required: true,
								type: "email",
								message: "Please input your email!"
							}
						]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Username"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("password", {
						rules: [{ required: true, message: "Please input your Password!" }]
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						style={{ width: "100%" }}
						htmlType="submit"
						loading={props.loading}
						className="login-form-button"
					>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</Container>
	);
};

const Wrapper = Form.create({ name: "login" })(Login);

export { Wrapper };
