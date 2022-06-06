import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  Form,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";

import { Select } from "~/components";
import { getDocuments } from "~/models/document.server";
import type { DocumentType } from "~/models/type";
import { DocumentTypeEnum } from "~/models/type";

import styles from "~/styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type LoaderData = {
  documents: Awaited<DocumentType[]>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const filter = search.get("filter");
  console.log("LoaderFunction: filter", filter);

  return json<LoaderData>({
    documents: await getDocuments(filter as DocumentTypeEnum),
  });
};

const FILTERS = [
  {
    id: "",
    label: "all",
  },
  {
    id: DocumentTypeEnum.SIMPLE,
    label: "Simple",
  },
  {
    id: DocumentTypeEnum.CUSTOM,
    label: "Custom",
  },
  {
    id: DocumentTypeEnum.ADVANCED,
    label: "Advanced",
  },
];

export default function Index() {
  const { documents }: LoaderData = useLoaderData();
  const [params] = useSearchParams();
  const submit = useSubmit();

  console.log("documents", documents);
  console.log("filterId", params.get("query"));

  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className="root">
      <h1>Documents</h1>
      <Form method="get" onChange={handleChange} action="/">
        <Select name="filter" options={FILTERS} selected={params.get("filter")} />
      </Form>

      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <Link to={document.id} className="link">
              {document.type} - {document.title} - {document.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
