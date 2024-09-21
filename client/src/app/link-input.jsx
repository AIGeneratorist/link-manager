"use client";

import {useState} from "react";

export default function AddLinkForm() {
	const [url, setURL] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const res = await fetch("http://localhost:3000/api/links", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({url})
		})

		if (!res.ok) {
			throw new Error("Failed to add link");
		}

		setURL("");
	}

	return (
		<form onSubmit={handleSubmit}>
			URL:
			<input
				type="text"
				name="url"
				value={url}
				onChange={e => setURL(e.target.value)}
			/><br />
			<button type="submit">Add</button>
		</form>
	);
}
