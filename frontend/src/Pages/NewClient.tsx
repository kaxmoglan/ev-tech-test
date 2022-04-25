import React, { useState } from 'react';
import { handleAPIRequest } from '../utils/request';
import type { ReactElement } from 'react';
import { config } from '../../config/config';

const NewClientForm = (): ReactElement => {
	const [firstName, setFirstName] = useState(``);
	const [lastName, setLastName] = useState(``);
	const [email, setEmail] = useState(``);
	const [company, setCompany] = useState(``);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		const firstNameTrim = firstName?.trim();
		const lastNameTrim = lastName?.trim();
		const emailTrim = email?.trim();
		const companyTrim = company?.trim();

		if (!firstNameTrim || !lastNameTrim || !emailTrim || !companyTrim) {
			setLoading(false);
			alert(
				`Something doesn't quite look right with your form... Make sure all fields are filled out!`
			);
			return;
		}

		const reqBody = {
			firstName: firstNameTrim,
			lastName: lastNameTrim,
			email: emailTrim,
			company: companyTrim,
		};

		const [err] = await handleAPIRequest(`POST`, config.API_DOMAIN, reqBody);
		if (err) {
			setLoading(false);
			alert(`Oops! Something went wrong!`);
			return;
		}

		setLoading(false);
		alert(`New user successfully created!`);
	};

	return (
		<form className="w-full max-w-lg text-center mt-10">
			<div className="flex flex-wrap -mx-3 mb-6">
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="grid-first-name"
					>
						First Name
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="grid-first-name"
						type="text"
						placeholder="Jane"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="grid-last-name"
					>
						Last Name
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-last-name"
						type="text"
						placeholder="Doe"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="grid-first-name"
					>
						Email
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
						id="grid-first-name"
						type="email"
						placeholder="newuser@email.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="grid-last-name"
					>
						Company
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-last-name"
						type="text"
						placeholder="Apple"
						onChange={(e) => setCompany(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex justify-center">
				<button
					className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
					type="button"
					disabled={loading}
					onClick={() => handleSubmit()}
				>
					{loading ? `Loading` : `Create`}
				</button>
			</div>
		</form>
	);
};

const Page = (): ReactElement => {
	return (
		<div
			className={`
				flex flex-col items-center
			`}
		>
			<h2 className="font-extralight text-center mt-10">
				<span className="block text-xl">Create New Client</span>
			</h2>
			<NewClientForm />
		</div>
	);
};

export default Page;
