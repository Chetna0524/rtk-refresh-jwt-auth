import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./userSlice";
import { setCredentials } from "../auth/authSlice";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

const validateSchema = yup.object({
	email: yup.string().email("Please Enter valid email").required(),
	password: yup.string().required(),
});

function Login() {
	const [login] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		try {
			const data = await login(values).unwrap();
			dispatch(setCredentials({ ...data }));
			navigate("/post");
		} catch (err) {
			console.log(err);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validateOnBlur: true,
		onSubmit,
		validationSchema: validateSchema,
	});

	return (
		<>
			<div className="page-section">
				<form className="form-box" onSubmit={formik.handleSubmit}>
					<h2>Login</h2>
					<div className="my-3">
						{formik.touched.email && formik.errors.email ? (
							<span className="text-danger text-small error-text">
								{formik.errors.email}
							</span>
						) : (
							""
						)}
						<label>Email</label>
						<input
							type="text"
							name="email"
							value={formik.values.email}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							placeholder="Enter email ID"
						/>
					</div>
					<div className="my-3">
						{formik.touched.password && formik.errors.password ? (
							<span className="text-danger text-small error-text">
								{formik.errors.password}
							</span>
						) : (
							""
						)}
						<label>password</label>
						<input
							type="password"
							name="password"
							value={formik.values.password}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							placeholder="Enter password"
						/>
					</div>
					<div className="my-3 text-center">
						<button
							type="submit"
							className="btn-comm"
							disabled={!formik.isValid}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
