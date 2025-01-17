import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			.
			<Router>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
