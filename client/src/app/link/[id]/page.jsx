const priorities = [null, "Low", "Medium", "High"];

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
			<p>Title: {link.title || <i>No title</i>}</p>
			<p>Folder: {link.folder || <i>No folder</i>}</p>
			<p>Category: {link.category || <i>No category</i>}</p>
			<p>Type: {link.type || <i>No type</i>}</p>
			<p>Found Date: {link.found_at || <i>No found date</i>}</p>
			<p>Read Date: {link.read_at || <i>No read date</i>}</p>
			<p>Priority: {priorities[link.priority] || <i>No priority</i>}</p>
			<p>Favorite: {link.favorited ? "Yes" : "No"}</p>
			<p>Comments: {link.comments || <i>No comments</i>}</p>
		</>
	);
}
