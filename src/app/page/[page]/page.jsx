import Link from "next/link";
import Paginator from "@/components/paginator.jsx";
import SearchBox from "@/components/search-box.jsx";
import LinkAddForm from "../../link-add-form.jsx";

async function getLinks(page) {
	const res = await fetch(`http://localhost:3000/api/links?page=${page}`);
	if (!res.ok) {
		throw new Error("Failed to fetch links");
	}
	return res.json();
}

export default async function LinkPageView({params}) {
	const {page} = await params;
	const parsedPage = parseInt(page);

	const res = await getLinks(parsedPage);
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
			<Paginator page={parsedPage} count={count} prefix="/" />

			<h2>Add New Link</h2>
			<LinkAddForm />
		</>
	);
}
