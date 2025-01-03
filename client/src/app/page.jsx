import Link from "next/link";
import AddLinkForm from "./link-input";

async function getLinks() {
	const res = await fetch("http://localhost:3000/api/links", {cache: "no-store"});
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
			<ul>
				{links.map(link => (
					<li key={link.link_id}>
						<Link href={`/link/${link.link_id}`}>{link.url}</Link>
					</li>
				))}
			</ul>

			<h2>Add New Link</h2>
			<AddLinkForm />
		</>
	);
}
