type PaginatorType = {
    name: string,
    total: number,
    actual: number,
    length: number
}

const DELTA = 3
const Paginator = ({ name, total, actual, length }: PaginatorType) => {
    const totalPages = Math.ceil(total / length)
    if (actual > totalPages) {
        actual = totalPages
    }
    const lastPage = ((totalPages - actual) < DELTA) ? totalPages : actual + DELTA
    const firstPage = actual - DELTA > 1 ? actual - DELTA : 1

    return (
        <div className="paginator">
            <ul>
                {[...Array(lastPage - firstPage + 1).keys()].map((id) => {
                    const page = firstPage + id
                    return (
                        <li key={page}>
                            <button
                                name={name}
                                value={page}
                                type="submit"
                                disabled={page === actual}
                            >{page}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Paginator