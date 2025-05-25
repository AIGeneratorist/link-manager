import Link from "next/link";
import Paginator from "@/components/paginator.jsx";
import SearchBox from "@/components/search-box.jsx";
import ViewOptions from "@/components/view-options.jsx";
import LinkAddForm from "../../link-add-form.jsx";

async function getLinks(page, {sort = "createdAtDesc", limit = 25}) {
	const res = await fetch(`http://localhost:3000/api/links?page=${page}&sort=${sort}&limit=${limit}`);
	if (!res.ok) {
		throw new Error("Failed to fetch links");
	}
	return res.json();
}

export default async function LinkPageView({params, searchParams}) {
	const {page} = await params;
	const {sort, limit} = await searchParams;

	const parsedPage = parseInt(page);
	const parsedLimit = limit && parseInt(limit);

	const res = await getLinks(parsedPage, {sort, limit: parsedLimit});
	const links = res.results;
	const count = res.count;

	return (
		<>
			<h1>Link Manager</h1>
			<SearchBox />

			<ul>
				{links.map(link => (
					<li key={link.linkId}>
						<Link href={`/link/${link.linkId}`}>{link.url}</Link>
					</li>
				))}
			</ul>
			<Paginator page={parsedPage} count={count} limit={parsedLimit} prefix="/" />

			<h2>View Options</h2>
			<ViewOptions sort={sort} limit={parsedLimit} prefix="/" />

			<h2>Add New Link</h2>
			<LinkAddForm />
		</>
	);
}
