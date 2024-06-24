import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";

function RequireAuth() {
	const token = useSelector(selectCurrentToken);
	const location = useLocation();

	return (
		<div>
			{token ? (
				<>
					<Outlet />
				</>
			) : (
				<Navigate to="/user" state={{ from: location }} replace />
			)}
		</div>
	);
}

export default RequireAuth;
