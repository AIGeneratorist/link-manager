export function getViewURL(prefix, searchParams, {page, newSearchParams = {}}) {
	let baseName;
	if (page == 1) {
		baseName = prefix;
	} else {
		baseName = prefix == "/" ? `/page/${page}` : `${prefix}/page/${page}`;
	}

	const searchParamsObj = new URLSearchParams(searchParams);
	for (const paramName in newSearchParams) {
		searchParamsObj.set(paramName, newSearchParams[paramName]);
	}

	return `${baseName}?${searchParamsObj.toString()}`;
}
