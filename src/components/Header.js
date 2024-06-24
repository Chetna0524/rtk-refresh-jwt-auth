import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<>
			<header>
				<h2>Blog</h2>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/user">Login</Link>
						</li>
						<li>
							<Link to="/user/signup">Signup</Link>
						</li>
						<li>
							<Link to="/post">Posts</Link>
						</li>
						<li>
							<Link to="/post/addpost">Add Posts</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default Header;
