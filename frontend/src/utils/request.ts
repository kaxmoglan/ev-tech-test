export async function handleAPIRequest(
	method: string,
	url: string,
	reqBody?: {}
): Promise<[undefined | string, undefined | any]> {
	try {
		const opts = {
			method,
			body: reqBody ? JSON.stringify(reqBody) : undefined,
			headers: {
				'content-type': `application/json`,
			},
		};

		const res = await fetch(url, opts);
		const resBody = await res.json();

		return [undefined, resBody];
	} catch (e: unknown) {
		const err = e as Error;
		return [`UNKNOWN_HANDLE_API_REQUEST_ERROR`, undefined];
	}
}
