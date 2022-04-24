import React, { useState, useEffect } from 'react';
import { handleAPIRequest } from '../utils/request';
import { config } from '../../config/config';
import { format as formatDate } from 'date-fns';
import Pagination from '../Components/Pagination/Pagination';
import type { ReactElement } from 'react';

interface IClient {
	clientId: string;
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	dateTimeCreated: string;
}

const Loading = (): ReactElement => {
	return (
		<div
			className={`
				flex items-center justify-center
				custom-h-full
			`}
		>
			<p className="font-extralight mt-10">Loading...</p>
		</div>
	);
};

interface IClientsTableProps {
	data: IClient[] | undefined;
}

const ClientsTable = ({ data }: IClientsTableProps): ReactElement => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState<string>();
	const [searchFilter, setSearchFilter] = useState(data);

	// PAGINATION
	const clientsPerPage = 10;
	const idxLastClient = currentPage * clientsPerPage;
	const idxFirstClient = idxLastClient - clientsPerPage;
	const currentClients = searchFilter?.slice(idxFirstClient, idxLastClient);

	const paginate = (page: number): void => setCurrentPage(page);

	const filterClients = (clients: IClient[], query: string): IClient[] => {
		if (!query) {
			return clients;
		}

		setCurrentPage(1);

		return clients.filter((client) => {
			const firstName = client.firstName.toLowerCase();
			const lastName = client.lastName.toLowerCase();
			const clientId = client.clientId.toLowerCase();
			const company = client.company.toLowerCase();
			const email = client.email.toLowerCase();

			const searchTerm = `${firstName} ${lastName} ${clientId} ${company} ${email}`;

			return searchTerm.includes(query);
		});
	};

	useEffect(() => {
		if (searchQuery && data) {
			setSearchFilter(filterClients(data, searchQuery.toLowerCase()));
		}
		if (!searchQuery) setSearchFilter(data);
	}, [searchQuery]);

	return (
		<div
			className={`
			mx-auto
			custom-width-1080
			py-8 px-4
			font-extralight
			text-sm
		`}
		>
			{/* SEARCH BOX */}
			<div className="flex justify-center">
				<div className="mb-3 xl:w-96">
					<div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
						<input
							type="search"
							className="form-control relative flex-auto block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Search"
							aria-label="Search"
							onInput={(e): void => setSearchQuery(e.currentTarget.value)}
						/>
					</div>
				</div>
			</div>

			{/* CLIENTS TABLE || NO RESULTS */}
			{searchFilter?.length ? (
				<div>
					<table className="table-fixed rounded bg-gray-100 w-full text-center border-separate border">
						<thead className="border-b p-4">
							<tr>
								<th className="p-1 font-normal">First Name</th>
								<th className="p-1 font-normal">Last Name</th>
								<th className="p-1 font-normal">Email</th>
								<th className="p-1 font-normal">Company</th>
								<th className="p-1 font-normal">Date Added</th>
							</tr>
						</thead>
						<tbody>
							{currentClients?.map((client) => {
								return (
									<tr
										className="bg-white hover:bg-gray-100"
										key={client.clientId}
									>
										<td className="p-1">{client.firstName}</td>
										<td className="p-1">{client.lastName}</td>
										<td className="p-1">{client.email}</td>
										<td className="p-1">{client.company}</td>
										<td className="p-1">
											{formatDate(
												new Date(client.dateTimeCreated),
												`do MMM yyyy`
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="flex justify-center mt-3">
						<p>
							Showing {currentClients?.length} of {searchFilter.length} results.
						</p>
					</div>
					<Pagination
						pageSize={clientsPerPage}
						totalItems={searchFilter.length}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>
			) : (
				<div className="flex justify-center">
					<span className="text-gray-400">No clients to show</span>
				</div>
			)}
		</div>
	);
};

const Page = (): ReactElement => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<IClient[] | undefined>();

	const getClientData = async (): Promise<void> => {
		setLoading(true);

		const [err, res] = await handleAPIRequest(`GET`, `${config.API_DOMAIN}`);

		setLoading(false);

		if (err || res === undefined) {
			console.log(`Get client data failed`, { error: err });
			return;
		}

		setData(res.data);
	};

	useEffect(() => {
		void getClientData();
	}, []);

	return loading || !data ? <Loading /> : <ClientsTable data={data} />;
};

export default Page;
