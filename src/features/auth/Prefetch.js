import { store } from "../../app/store";
import { postSlice } from "../posts/postSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
	useEffect(() => {
		console.log("subscribing");
		const posts = store.dispatch(postSlice.endpoints.getPosts.initiate());

		return () => {
			console.log("unsubscribing");
			posts.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;
