import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import { Link } from "react-router-dom";

function SinglePostBox({ postId }) {
	const post = useSelector((state) => selectPostById(state, postId));

	return (
		<>
			{post && (
				<div className="col-lg-3 my-2">
					<div className="post-box">
						<h2 className="post-title">{post.title}</h2>
						<p>{post.description}</p>
						<Link to={`/post/edit/${post._id}`}>View more</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default SinglePostBox;
