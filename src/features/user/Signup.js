import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNewUserMutation } from "../user/userSlice";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
	name: yup.string().min(3, "Please enter Full Name").required(),
	email: yup.string().email("Please enter valid email").required(),
	password: yup.string().required(),
	confirmPassword: yup
		.string()
		.when("password", {
			is: (val) => (val && val.length > 0 ? true : false),
			then: yup
				.string()
				.oneOf([yup.ref("password")], "Password doesn't match!!"),
		})
		.required(),
});

function Signup() {
	const [newUser] = useNewUserMutation();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { confirmPassword, ...data } = values;
		console.log(data);
		try {
			newUser(data).unwrap();
			formik.resetForm();
			navigate("/user");
		} catch (err) {
			console.log(err);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validateOnBlur: true,
		onSubmit,
		validationSchema,
	});

	console.log("errors", formik.errors);
	return (
		<>
			<div className="page-section">
				<form className="form-box" onSubmit={formik.handleSubmit}>
					<h2 className="text-center">Signup</h2>
					<div className="my-3">
						{formik.touched.name && formik.errors.name ? (
							<span className="text-danger text-small error-text">
								{formik.errors.name}
							</span>
						) : (
							""
						)}
						<label>Name</label>
						<input
							type="text"
							name="name"
							value={formik.values.name}
							placeholder="Enter Full Name"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</div>
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
							placeholder="Enter email ID"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
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
							placeholder="Enter password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</div>
					<div className="my-3">
						{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
							<span className="text-danger text-small error-text">
								{formik.errors.confirmPassword}
							</span>
						) : (
							""
						)}
						<label>Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							value={formik.values.confirmPassword}
							placeholder="Confirm password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</div>
					<div className="my-3 text-center">
						<button
							type="submit"
							className="btn-comm"
							disabled={!formik.isValid}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Signup;
