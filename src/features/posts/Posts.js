import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	useGetPostsQuery,
	selectPostsData,
	useAddPostMutation,
	selectPostsIds,
} from "./postSlice";

import SinglePostBox from "./SinglePostBox";

const initialValues = {
	title: "",
	description: "",
};

function Posts() {
	const [values, setValues] = useState(initialValues);
	const postsList = useSelector(selectPostsData);
	const postIds = useSelector(selectPostsIds);
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery(
		"PostList",
		{
			pollingInterval: 10000,
			refetchOnFocus: true,
			refetchOnMountOrArgChange: true,
		}
	);

	const [addPost] = useAddPostMutation();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addPost(values).unwrap();
			setValues(initialValues);
			console.log("posts", postsList);
		} catch (err) {
			console.log(err);
		}
	};

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = postIds.map((id) => <SinglePostBox key={id} postId={id} />);
	} else if (isError) {
		content = <p>{error.data}</p>;
	}

	return (
		<div className="page-section">
			{/* <div className="add-post-sec">
				<form className="form-box" onSubmit={handleSubmit}>
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

						<button type="submit" className="">
							Add
						</button>
					</div>
				</form>
			</div> */}
			<div className="row mx-5">{content}</div>
		</div>
	);
}

export default Posts;
