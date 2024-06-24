import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
	selectPostById,
	useUpdatePostMutation,
	useGetPostsQuery,
} from "./postSlice";

function EditPost() {
	const navigate = useNavigate();
	const { postId } = useParams();
	const post = useSelector((state) => selectPostById(state, postId));

	const [values, setValues] = useState(post);
	const [updatePost] = useUpdatePostMutation();
	/* console.log("post", post); */

	const { data: posts } = useGetPostsQuery();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await updatePost(values).unwrap();
			/* navigate("/post"); */
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="page-section">
				<form className="form-box" onSubmit={handleUpdate}>
					<div className="my-3">
						<label>Title</label>
						<input
							type="text"
							name="title"
							value={values.title}
							onChange={handleChange}
							placeholder="Please add title...."
						/>
					</div>
					<div className="my-3">
						<label>Description</label>
						<textarea
							type="text"
							name="description"
							value={values.description}
							onChange={handleChange}
							placeholder="Please add Description...."
						></textarea>
					</div>
					<div className="my-3">
						<button type="submit">Update</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditPost;
