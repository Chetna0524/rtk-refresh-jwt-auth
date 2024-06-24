import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

function Layout() {
	return (
		<>
			<div className="d-block">
				<Header />
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
