import type { LoaderFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  Form,
  useSearchParams,
  useSubmit,
  Outlet,
} from "@remix-run/react";

import { Select, Paginator, DocumentCard } from "~/components";
import { getDocuments } from "~/models/document.server";
import type { GetDocumentsType } from "~/models/type";
import { DocumentTypeEnum } from "~/models/type";

import styles from "~/styles/routes/documents.css";
import stylesPaginator from "~/styles/Components/Paginator/index.css";
import stylesDocumentCard from "~/styles/Components/DocumentCard/index.css";

// TODO
// Check if this is the correct way to add styles from a component
export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: stylesPaginator },
    { rel: "stylesheet", href: stylesDocumentCard },
  ];
}

type LoaderData = {
  documents: Awaited<GetDocumentsType>;
  urlSearched: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const urlSearched = url.search;
  const search = new URLSearchParams(urlSearched);

  const filter = search.get("filter");
  const page = parseInt(search.get("page") || "1");
  const length = parseInt(search.get("length") || "10");

  return json<LoaderData>({
    documents: await getDocuments(filter as DocumentTypeEnum, page, length),
    urlSearched,
  });
};

const FILTERS = [
  {
    id: "",
    label: "All",
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
  const { documents, urlSearched }: LoaderData = useLoaderData();
  const [params] = useSearchParams();
  const submit = useSubmit();

  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  const page = parseInt(params.get("page") || "1");
  const length = parseInt(params.get("length") || "10");
  const filter = params.get("filter") || null;

  return (
    <div className="documents">
      <div className="sidebar">
        <h1>Documents</h1>
        <Form method="get" onChange={handleChange}>
          <div className="header">
            <Link to={`new${urlSearched}`} className="">
              + New document
            </Link>

            <Select
              name="filter"
              options={FILTERS}
              selected={filter}
            />
          </div>

          <hr />

          {documents.totalFiltered ? (
            <>
              <ul className="document-list">
                {documents.data.map((document) => (
                  <li key={document.id}>
                    <Link to={`${document.id}${urlSearched}`} className="link">
                      <DocumentCard document={document} />
                    </Link>
                  </li>
                ))}
              </ul>
              <h5 className="amount">
                Documents: {!!filter && `${documents.totalFiltered}/`}{documents.total}
              </h5>
              <Paginator
                name="page"
                total={documents.total}
                actual={page}
                length={length}
              />
            </>
          ) : documents.total === 0 ? (
            <h3>There is no document available</h3>
          ) : (
            <h3>There is no document available with this filter</h3>
          )}
        </Form>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
