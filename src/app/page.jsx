import Link from "next/link";
import Paginator from "@/components/paginator.jsx";
import SearchBox from "@/components/search-box.jsx";
import ViewOptions from "@/components/view-options.jsx";
import LinkAddForm from "./link-add-form.jsx";

async function getLinks({sort = "createdAtDesc"}) {
	const res = await fetch(`http://localhost:3000/api/links?sort=${sort}`);
	if (!res.ok) {
		throw new Error("Failed to fetch links");
	}
	return res.json();
}

export default async function Home({searchParams}) {
	const {sort} = await searchParams;

	const res = await getLinks({sort});
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
			<Paginator count={count} prefix="/" />

			<h2>View Options</h2>
			<ViewOptions sort={sort} prefix="/" />

			<h2>Add New Link</h2>
			<LinkAddForm />
		</>
	);
}
