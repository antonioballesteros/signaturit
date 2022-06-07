import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { Link, useLoaderData, } from "@remix-run/react";

import styles from "~/styles/routes/documents/index.css";

export function links() {
    return [
        { rel: "stylesheet", href: styles }
    ];
}

type LoaderData = {
    urlSearched: string;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const urlSearched = url.search;

    return json<LoaderData>({
        urlSearched
    });
};
export default function DocumentIndexPage() {
    const { urlSearched }: LoaderData = useLoaderData();

    return (
        <div className="document-index">
            <h2>Select a document on the left, or</h2>
            <Link to={`new${urlSearched}`} className="">
                create a new document.
            </Link>
        </div>
    );
}
