async function getLink(id) {
	const res = await fetch(`http://localhost:3000/api/links/${id}`, {cache: "no-store"});
	if (!res.ok) {
		throw new Error("Failed to fetch link");
	}
	return res.json();
}

export default async function LinkView({params}) {
	const link = await getLink(params.id);
	return (
		<>
			<h1>View Link</h1>
			<p><a href={link.url} target="_blank">{link.url}</a></p>
			<p>ID: {link.link_id}</p>
		</>
	);
}
