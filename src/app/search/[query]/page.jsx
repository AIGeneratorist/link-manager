import Link from "next/link";
import Paginator from "@/components/paginator.jsx";
import SearchBox from "@/components/search-box.jsx";
import ViewOptions from "@/components/view-options.jsx";

async function searchLinks(query, {sort = "createdAtDesc", limit = 25}) {
	const res = await fetch(`http://localhost:3000/api/links/search/${encodeURIComponent(query)}` +
		`?sort=${sort}&limit=${limit}`);
	if (!res.ok) {
		throw new Error("Failed to search links");
	}
	return res.json();
}

export default async function LinkSearch({params, searchParams}) {
	const {query} = await params;
	const {sort, limit} = await searchParams;

	const parsedLimit = limit && parseInt(limit);
	const parsedQuery = decodeURIComponent(query);
	const prefix = `/search/${query}`;

	const res = await searchLinks(parsedQuery, {sort, limit: parsedLimit});
	const links = res.results;
	const count = res.count;

	return (
		<>
			<h1>Search: {parsedQuery}</h1>
			<SearchBox query={parsedQuery} />

			<ul>
				{links.map(link => (
					<li key={link.linkId}>
						<Link href={`/link/${link.linkId}`}>{link.url}</Link>
					</li>
				))}
			</ul>
			<Paginator count={count} limit={parsedLimit} prefix={prefix} />

			<h2>View Options</h2>
			<ViewOptions sort={sort} limit={parsedLimit} prefix={prefix} />
		</>
	);
}
