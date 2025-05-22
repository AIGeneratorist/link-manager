"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {getViewURL} from "@/utils/client-utils.js";

export default function ViewOptions({sort: rawSort = "createdAtDesc", prefix = "/"}) {
	const [sort, setSort] = useState(rawSort);
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleSortChange(newSort) {
		setSort(newSort);
		router.push(
			getViewURL(prefix, searchParams, {page: 1, newSearchParams: {sort: newSort}})
		);
	}

	return (
		<form>
			<label htmlFor="sel-sort">Sort:</label>{" "}
			<select
				name="sort"
				value={sort}
				id="sel-sort"
				onChange={ev => handleSortChange(ev.target.value)}
			>
				<option value="urlAsc">URL (A-Z)</option>
				<option value="urlDesc">URL (Z-A)</option>
				<option value="createdAtDesc">Newest</option>
				<option value="createdAtAsc">Oldest</option>
			</select>
		</form>
	);
}
