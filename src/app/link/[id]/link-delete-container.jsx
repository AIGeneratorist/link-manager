"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function LinkDeleteContainer({linkId}) {
	const [isOpen, setOpen] = useState(false);
	const router = useRouter();

	async function handleDelete() {
		const res = await fetch(`http://localhost:3000/api/links/${linkId}`, {
			method: "DELETE"
		});

		if (!res.ok) {
			throw new Error("Failed to delete link");
		}

		router.back();
	}

	return (
		<>
			<button disabled={isOpen} onClick={() => setOpen(true)}>Delete</button>
			{isOpen && (
				<>
					<p>Are you sure you want to delete this link?</p>
					<button onClick={handleDelete}>Yes</button>
					<button onClick={() => setOpen(false)}>No</button>
				</>
			)}
		</>
	);
}
