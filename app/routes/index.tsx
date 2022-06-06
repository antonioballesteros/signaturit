import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  Form,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";

import { Select, Paginator, DocumentCard } from "~/components";
import { getDocuments } from "~/models/document.server";
import type { GetDocumentsType } from "~/models/type";
import { DocumentTypeEnum } from "~/models/type";

import styles from "~/styles/index.css";
import stylesPaginator from "~/styles/Components/Paginator/index.css";
import stylesDocumentCard from "~/styles/Components/DocumentCard/index.css";

// TODO
// Check if this is the correct way to add styles from a component
export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: stylesPaginator },
    { rel: "stylesheet", href: stylesDocumentCard }
  ];
}

type LoaderData = {
  documents: Awaited<GetDocumentsType>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const filter = search.get("filter");
  const page = parseInt(search.get("page") || "1");
  const length = parseInt(search.get("length") || "10");
  console.log("LoaderFunction: params", { filter, page });

  return json<LoaderData>({
    documents: await getDocuments(filter as DocumentTypeEnum, page, length),
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

  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  const page = parseInt(params.get("page") || "1");
  const length = parseInt(params.get("length") || "10");

  console.log("documents", documents);

  return (
    <div className="root">
      <h1>Documents</h1>
      <Form method="get" onChange={handleChange} action="/">
        <Select name="filter" options={FILTERS} selected={params.get("filter")} />
        <ul className="documents">
          {documents.data.map((document) => (
            <li key={document.id}>
              <Link to={"document/" + document.id} className="link">
                <DocumentCard document={document} />
              </Link>
            </li>
          ))}
        </ul>
        <Paginator name="page" total={documents.total} actual={page} length={length} />
      </Form>
    </div>
  );
}
