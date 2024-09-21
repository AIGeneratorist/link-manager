"use client";

import {useState} from "react";

const Priority = {
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3
}

export default function AddLinkForm() {
	const [inputData, setInputData] = useState({
		url: "",
		title: "",
		folder: "",
		category: "",
		type: "",
		found_at: "",
		read_at: "",
		priority: Priority.MEDIUM,
		favorited: false,
		comments: ""
	});

	async function handleSubmit(e) {
		e.preventDefault();

		const res = await fetch("http://localhost:3000/api/links", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...inputData,
				title: inputData.title || null,
				folder: inputData.folder || null,
				category: inputData.category || null,
				type: inputData.type || null,
				found_at: inputData.found_at || null,
				read_at: inputData.read_at || null,
				comments: inputData.comments || null
			})
		})

		if (!res.ok) {
			throw new Error("Failed to add link");
		}

		setInputData({
			url: "",
			title: "",
			folder: "",
			category: "",
			type: "",
			found_at: "",
			read_at: "",
			priority: Priority.MEDIUM,
			favorited: false,
			comments: ""
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			URL:
			<input
				type="text"
				name="url"
				value={inputData.url}
				onChange={e => setInputData({...inputData, url: e.target.value})}
			/><br />

			Title:
			<input
				type="text"
				name="title"
				value={inputData.title}
				onChange={e => setInputData({...inputData, title: e.target.value})}
			/><br />

			Folder:
			<input
				type="text"
				name="folder"
				value={inputData.folder}
				onChange={e => setInputData({...inputData, folder: e.target.value})}
			/><br />

			Category:
			<input
				type="text"
				name="category"
				value={inputData.category}
				onChange={e => setInputData({...inputData, category: e.target.value})}
			/><br />

			Type:
			<input 
				type="text"
				name="type"
				value={inputData.type}
				onChange={e => setInputData({...inputData, type: e.target.value})}
			/><br />

			Found Date:
			<input
				type="date"
				name="found_at"
				value={inputData.found_at}
				onChange={e => setInputData({...inputData, found_at: e.target.value})}
			/><br />

			Read Date:
			<input
				type="date"
				name="read_at"
				value={inputData.read_at}
				onChange={e => setInputData({...inputData, read_at: e.target.value})}
			/><br />

			Priority:
			<select
				name="priority"
				value={inputData.priority}
				onChange={e => setInputData({...inputData, priority: e.target.value})}
			>
				<option value={Priority.LOW}>Low</option>
				<option value={Priority.MEDIUM}>Medium</option>
				<option value={Priority.HIGH}>High</option>
			</select><br />

			Favorite:
			<input
				type="checkbox"
				name="favorited"
				checked={inputData.favorited}
				onChange={e => setInputData({...inputData, favorited: e.target.checked})}
			/><br />

			Comments:
			<textarea
				name="comments"
				value={inputData.comments}
				onChange={e => setInputData({...inputData, comments: e.target.value})}
			/><br />

			<button type="submit">Add</button>
		</form>
	);
}
