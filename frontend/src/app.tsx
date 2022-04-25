import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Routes,
	useLocation,
} from 'react-router-dom';

// Pages
import HomePage from './Pages/Home';
import ClientsPage from './Pages/Clients';
import NewClientPage from './Pages/NewClient';

// Types
import type { ReactElement } from 'react';

const AppHeader = (): ReactElement => {
	const location = useLocation();

	return (
		<div
			className={`
				fixed
				flex items-center justify-between
				w-full
				px-4
				h-12
				border-b
				bg-white
				z-10
			`}
		>
			<div className="flex h-full items-center justify-center">
				<Link to="/">
					<h2>
						<span className="font-extralight hover:text-teal-700">
							EValue Tech Test
						</span>
					</h2>
				</Link>
				<div className="mx-3 h-2/5 w-px bg-gray-400" />
				<Link to="/clients">
					<h3
						className={`
							text-sm
							hover:text-teal-700
							${
								location.pathname === `/clients`
									? `font-normal underline`
									: `font-extralight`
							}
						`}
					>
						Clients
					</h3>
				</Link>
				<Link to="/new-client">
					<h3
						className={`
							text-sm
							ml-5
							hover:text-teal-500
							${
								location.pathname === `/new-client`
									? `font-normal underline`
									: `font-extralight`
							}
						`}
					>
						New Client
					</h3>
				</Link>
			</div>
		</div>
	);
};

const AppFrame = (): ReactElement => {
	return (
		<div className="pt-12 h-full">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/clients" element={<ClientsPage />} />
				<Route path="/new-client" element={<NewClientPage />}></Route>
			</Routes>
		</div>
	);
};

const App = (): ReactElement => {
	return (
		<div className="h-full">
			<Router>
				<AppHeader />
				<AppFrame />
			</Router>
		</div>
	);
};

export default App;
