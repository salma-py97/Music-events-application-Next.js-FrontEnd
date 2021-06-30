import Link from "next/link"

import {PER_PAGE} from '@/config/index'
const Pagination = ({ page, total }) => {
	const lastPage = Math.ceil(total / PER_PAGE)

	return (
		<>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a>{"<"} Previous</a>
				</Link>
			)}
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a>Next {">"}</a>
				</Link>
			)}
		</>
	)
}

export default Pagination
