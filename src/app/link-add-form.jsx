"use client";

import {useState} from "react";

const Priority = {
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3
};

export default function LinkAddForm() {
	const [inputData, setInputData] = useState({
		url: "",
		title: "",
		folder: "",
		category: "",
		type: "",
		foundAt: "",
		readAt: "",
		priority: Priority.MEDIUM,
		favorited: false,
		comments: ""
	});

	async function handleSubmit(ev) {
		ev.preventDefault();

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
				foundAt: inputData.foundAt || null,
				readAt: inputData.readAt || null,
				comments: inputData.comments || null
			})
		});

		if (!res.ok) {
			throw new Error("Failed to add link");
		}

		setInputData({
			url: "",
			title: "",
			folder: "",
			category: "",
			type: "",
			foundAt: "",
			readAt: "",
			priority: Priority.MEDIUM,
			favorited: false,
			comments: ""
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="input-url">URL:</label>{" "}
			<input
				type="text"
				name="url"
				value={inputData.url}
				autoComplete="off"
				id="input-url"
				onChange={ev => setInputData({...inputData, url: ev.target.value})}
			/><br />

			<label htmlFor="input-title">Title:</label>{" "}
			<input
				type="text"
				name="title"
				value={inputData.title}
				id="input-title"
				onChange={ev => setInputData({...inputData, title: ev.target.value})}
			/><br />

			<label htmlFor="input-folder">Folder:</label>{" "}
			<input
				type="text"
				name="folder"
				value={inputData.folder}
				id="input-folder"
				onChange={ev => setInputData({...inputData, folder: ev.target.value})}
			/><br />

			<label htmlFor="input-category">Category:</label>{" "}
			<input
				type="text"
				name="category"
				value={inputData.category}
				id="input-category"
				onChange={ev => setInputData({...inputData, category: ev.target.value})}
			/><br />

			<label htmlFor="input-type">Type:</label>{" "}
			<input
				type="text"
				name="type"
				value={inputData.type}
				id="input-type"
				onChange={ev => setInputData({...inputData, type: ev.target.value})}
			/><br />

			<label htmlFor="input-found-at">Found Date:</label>{" "}
			<input
				type="date"
				name="foundAt"
				value={inputData.foundAt}
				id="input-found-at"
				onChange={ev => setInputData({...inputData, foundAt: ev.target.value})}
			/><br />

			<label htmlFor="input-read-at">Read Date:</label>{" "}
			<input
				type="date"
				name="readAt"
				value={inputData.readAt}
				id="input-read-at"
				onChange={ev => setInputData({...inputData, readAt: ev.target.value})}
			/><br />

			<label htmlFor="sel-priority">Priority:</label>{" "}
			<select
				name="priority"
				value={inputData.priority}
				id="sel-priority"
				onChange={ev => setInputData({...inputData, priority: ev.target.value})}
			>
				<option value={Priority.LOW}>Low</option>
				<option value={Priority.MEDIUM}>Medium</option>
				<option value={Priority.HIGH}>High</option>
			</select><br />

			<label htmlFor="chk-favorited">Favorite:</label>{" "}
			<input
				type="checkbox"
				name="favorited"
				checked={inputData.favorited}
				id="chk-favorited"
				onChange={ev => setInputData({...inputData, favorited: ev.target.checked})}
			/><br />

			<label htmlFor="ta-comments">Comments:</label>{" "}
			<textarea
				name="comments"
				value={inputData.comments}
				id="ta-comments"
				onChange={ev => setInputData({...inputData, comments: ev.target.value})}
			/><br />

			<button type="submit">Add</button>
		</form>
	);
}
