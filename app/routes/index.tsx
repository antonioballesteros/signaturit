import {
  Link,
} from "@remix-run/react";

import styles from "~/styles/index.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles }
  ];
}

export default function Index() {
  return (
    <div className="index">
      <h1>Signaturit</h1>
      <Link to="documents" className="">
        <button>Start Managing Documents</button>
      </Link>

    </div>

  );
}
