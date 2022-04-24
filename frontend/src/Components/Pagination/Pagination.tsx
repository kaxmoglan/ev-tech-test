import React from 'react';
import Arrow from './Arrow';
import type { ReactElement } from 'react';

interface PaginationProps {
	pageSize: number;
	totalItems: number;
	paginate: (page: number) => void;
	currentPage: number;
}

const Pagination = ({
	pageSize,
	totalItems,
	paginate,
	currentPage,
}: PaginationProps): ReactElement => {
	const numberOfPages = Math.ceil(totalItems / pageSize);
	const pageNumbers: number[] = Array.from(
		Array(numberOfPages),
		(e, i) => i + 1
	);
	const lastPage = pageNumbers[pageNumbers.length - 1];

	const canPaginateNext = (page: number): boolean => {
		if (page === pageNumbers[pageNumbers.length - 1]) return false;
		return true;
	};

	const canPaginatePrev = (page: number): boolean => {
		if (page === pageNumbers[0]) return false;
		return true;
	};

	return (
		<div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
			<div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
				<div
					onClick={(): void => {
						canPaginatePrev(currentPage) && paginate(currentPage - 1);
					}}
					className="flex items-center pt-3 text-gray-600 hover:text-teal-700 cursor-pointer"
				>
					<Arrow direction={`LEFT`} />
					<p className="text-sm ml-3 font-medium leading-none ">Previous</p>
				</div>
				<div className="sm:flex hidden">
					{pageNumbers.length <= 4 ? (
						pageNumbers.map((page) => (
							<p
								key={page}
								onClick={(): void => paginate(page)}
								className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-teal-700 border-t border-transparent hover:border-teal-700 pt-3 mr-4 px-2"
							>
								{page}
							</p>
						))
					) : (
						<>
							<p
								onClick={(): void => paginate(1)}
								className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-teal-700 border-t border-transparent hover:border-teal-700 pt-3 mr-4 px-2"
							>
								1
							</p>
							{currentPage !== 1 && currentPage !== lastPage && (
								<>
									<p className="text-sm font-medium leading-none text-gray-600 border-t border-transparent pt-3 mr-4 px-2">
										...
									</p>
									<p className="text-sm font-medium leading-none text-gray-600 border-t border-transparent pt-3 mr-4 px-2">
										{currentPage}
									</p>
								</>
							)}
							<p className="text-sm font-medium leading-none text-gray-600 border-t border-transparent pt-3 mr-4 px-2">
								...
							</p>
							<p
								onClick={(): void => paginate(lastPage ?? 1)}
								className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-teal-700 border-t border-transparent hover:border-teal-700 pt-3 mr-4 px-2"
							>
								{lastPage}
							</p>
						</>
					)}
				</div>
				<div
					onClick={(): void => {
						canPaginateNext(currentPage) && paginate(currentPage + 1);
					}}
					className="flex items-center pt-3 text-gray-600 hover:text-teal-700 cursor-pointer"
				>
					<p className="text-sm font-medium leading-none mr-3">Next</p>
					<Arrow direction={`RIGHT`} />
				</div>
			</div>
		</div>
	);
};

export default Pagination;
