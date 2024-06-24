import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./features/user/Login";
import Signup from "./features/user/Signup";
import Posts from "./features/posts/Posts";
import RequireAuth from "./features/auth/RequireAuth";
import AddPost from "./features/posts/AddPost";
import EditPost from "./features/posts/EditPost";
import Prefetch from "./features/auth/Prefetch";

function App() {
	return (
		<>
			<div className="main">
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />

						<Route path="user">
							<Route index element={<Login />} />
							<Route path="signup" element={<Signup />} />
						</Route>

						<Route element={<RequireAuth />}>
							<Route element={<Prefetch />}>
								<Route path="post">
									<Route index element={<Posts />} />
									<Route path="addpost" element={<AddPost />} />
									<Route path="edit/:postId" element={<EditPost />} />
								</Route>
							</Route>
						</Route>
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
