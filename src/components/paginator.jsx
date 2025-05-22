"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {getViewURL} from "@/utils/client-utils.js";

export default function Paginator({page = 1, count, prefix = "/"}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const totalPages = Math.ceil(count / 25);
	const hasPreviousPage = page > 1 && totalPages > 0;
	const hasNextPage = page < totalPages && totalPages > 0;

	function handlePageChange(newPage) {
		router.push(getViewURL(prefix, searchParams, {page: newPage}));
	}

	return (
		<div>
			<button disabled={!hasPreviousPage} onClick={() => handlePageChange(1)}>
				&lt;&lt;
			</button>
			<button disabled={!hasPreviousPage} onClick={() => handlePageChange(page - 1)}>
				&lt;
			</button>

			{" "}
			{page} / {totalPages}
			{" "}

			<button disabled={!hasNextPage} onClick={() => handlePageChange(page + 1)}>
				&gt;
			</button>
			<button disabled={!hasNextPage} onClick={() => handlePageChange(totalPages)}>
				&gt;&gt;
			</button>

			{" "}
			{
				totalPages > 0 && page <= totalPages ?
				`(Showing ${(page - 1) * 25 + 1} - ${Math.min(page * 25, count)} of ${count})` :
				`(${count} results)`
			}
		</div>
	);
}
