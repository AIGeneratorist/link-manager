import Link from "next/link";
import SearchBox from "@/components/search-box.jsx";
import LinkAddForm from "./link-add-form.jsx";

async function getLinks() {
	const res = await fetch("http://localhost:3000/api/links");
	if (!res.ok) {
		throw new Error("Failed to fetch links");
	}
	return res.json();
}

export default async function Home() {
	const links = await getLinks();
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

			<h2>Add New Link</h2>
			<LinkAddForm />
		</>
	);
}
