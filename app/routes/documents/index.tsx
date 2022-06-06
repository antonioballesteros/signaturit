import { Link } from "@remix-run/react";

import styles from "~/styles/routes/documents/index.css";

export function links() {
    return [
        { rel: "stylesheet", href: styles }
    ];
}

export default function DocumentIndexPage() {
    return (
        <div className="document-index">
            <h2>Select a document on the left, or</h2>
            <Link to="new" className="">
                create a new document.
            </Link>
        </div>
    );
}
