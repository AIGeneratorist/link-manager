import Link from "next/link";
import SearchBox from "@/components/search-box.jsx";

async function searchLinks(query) {
	const res = await fetch(`http://localhost:3000/api/links/search/${encodeURIComponent(query)}`);
	if (!res.ok) {
		throw new Error("Failed to search links");
	}
	return res.json();
}

export default async function LinkSearch({params}) {
	const {query} = await params;
	const parsedQuery = decodeURIComponent(query);
	const links = await searchLinks(parsedQuery);

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
		</>
	);
}
