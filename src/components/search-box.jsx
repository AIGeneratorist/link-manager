"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function SearchBox({query: rawQuery = ""}) {
	const [query, setQuery] = useState(rawQuery);
	const router = useRouter();

	function handleSubmit(ev) {
		ev.preventDefault();

		if (query.length == 0) return;
		router.push(`/search/${encodeURIComponent(query)}`);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={query} onChange={ev => setQuery(ev.target.value)} />
			<button type="submit">Search</button>
		</form>
	);
}
