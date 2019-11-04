import React, { useState } from "react";
import { Form, Input, Icon, Button, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router";

const Container = styled.div`
	max-width: 500px;
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

const Register: React.FC = (props: any) => {
	const [confirmDirty, setConfirmDirty] = useState(false);

	const { getFieldDecorator } = props.form;
	const history = useHistory();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		props.form.validateFieldsAndScroll((err: any, values: IForm) => {
			if (!err) {
				console.log("Received values of form: ", values);
				axios
					.post(`${process.env.REACT_APP_BASEURL}/register`, {
						username: values.username,
						email: values.email,
						password: values.password
					})
					.then(function(response) {
						message.success('You can connect now! 👉👌')
						history.push('/login');
					})
					.catch(function(error) {
						if (error.response.data) {
							message.error(`${error.response.data.message} 👎`);
						}
					});
			}
		});
	};

	const handleConfirmBlur = (e: any) => {
		const { value } = e.target;
		setConfirmDirty(confirmDirty || !!value);
	};

	const compareToFirstPassword = (rule: any, value: any, callback: any) => {
		const { form } = props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	const validateToNextPassword = (rule: any, value: any, callback: any) => {
		const { form } = props;
		if (value && confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Item>
					{getFieldDecorator("username", {
						rules: [
							{
								required: true,
								message: "Please input your username!"
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
					{getFieldDecorator("email", {
						rules: [
							{
								type: "email",
								message: "The input is not valid E-mail!"
							},
							{
								required: true,
								message: "Please input your E-mail!"
							}
						]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Email"
						/>
					)}
				</Form.Item>
				<Form.Item hasFeedback>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "Please input your password!"
							},
							{
								validator: validateToNextPassword
							}
						]
					})(
						<Input.Password
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>
				<Form.Item hasFeedback>
					{getFieldDecorator("confirm", {
						rules: [
							{
								required: true,
								message: "Please confirm your password!"
							},
							{
								validator: compareToFirstPassword
							}
						]
					})(
						<Input.Password
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Confirm password"
							onBlur={handleConfirmBlur}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Container>
	);
};

const Wrapper = Form.create({ name: "login" })(Register);

export { Wrapper as Register };
