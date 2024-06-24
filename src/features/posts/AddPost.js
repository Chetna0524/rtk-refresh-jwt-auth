import React, { useState } from "react";
import { useAddPostMutation } from "./postSlice";

const initialValues = {
	title: "",
	description: "",
};

function AddPost() {
	const [values, setValues] = useState(initialValues);

	const [addPost] = useAddPostMutation();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPost({ ...values });
	};

	return (
		<div className="page-section">
			<form className="form-box" onSubmit={handleSubmit}>
				<div className="my-3">
					<label>Title</label>
					<input
						type="text"
						name="title"
						value={values.title}
						placeholder="Please add title...."
						onChange={handleChange}
					/>
				</div>
				<div className="my-3">
					<label>Description</label>
					<textarea
						type="text"
						name="description"
						value={values.description}
						placeholder="Please add Description...."
						onChange={handleChange}
					></textarea>
				</div>
			</form>
		</div>
	);
}

export default AddPost;
