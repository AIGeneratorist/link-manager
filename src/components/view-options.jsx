"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {getViewURL} from "@/utils/client-utils.js";

export default function ViewOptions({
	sort: rawSort = "createdAtDesc",
	limit: rawLimit = 25,
	prefix = "/"
}) {
	const [sort, setSort] = useState(rawSort);
	const [limit, setLimit] = useState(rawLimit);
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleSortChange(newSort) {
		setSort(newSort);
		router.push(
			getViewURL(prefix, searchParams, {page: 1, newSearchParams: {sort: newSort}})
		);
	}

	function handleLimitChange(newLimit) {
		setLimit(newLimit);
		router.push(
			getViewURL(prefix, searchParams, {page: 1, newSearchParams: {limit: newLimit}})
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
			</select><br />

			<label htmlFor="sel-limit">Limit:</label>{" "}
			<select
				name="limit"
				value={limit}
				id="sel-limit"
				onChange={ev => handleLimitChange(ev.target.value)}
			>
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</form>
	);
}
