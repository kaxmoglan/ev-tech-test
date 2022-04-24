import React from 'react';
import type { ReactElement } from 'react';

const Page = (): ReactElement => {
	return (
		<div
			className={`
				flex items-center justify-center
				custom-h-full
			`}
		>
			<h2 className="font-extralight text-center mt-10">
				<span className="block text-xl">Welcome to Max's EV Tech Test.</span>
			</h2>
		</div>
	);
};

export default Page;
