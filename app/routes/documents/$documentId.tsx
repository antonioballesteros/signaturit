import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Form, useCatch, useLoaderData } from "@remix-run/react";

import type { DocumentType, DocumentTypeEnum, NearestDocumentsType } from "~/models/type";
import { deleteDocument } from "~/models/document.server";
import { getDocument, getNearestDocuments } from "~/models/document.server";
import { showType, showDate } from "~/utils"
import styles from "~/styles/routes/documents/$documentId.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles }
  ];
}

type LoaderData = {
  document: DocumentType;
  urlSearched: string;
  nearestDocuments: NearestDocumentsType;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const urlSearched = url.search;

  const document = await getDocument(params.documentId || "");
  if (!document) {
    throw new Response("Not Found", { status: 404 });
  }

  // TIP:
  // never use params.documentId as parameter here
  // we will execute a raw query, it could be a security problem
  const nearestDocuments = await getNearestDocuments(document.id)

  return json<LoaderData>({ document, urlSearched, nearestDocuments });
};

export const action: ActionFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const urlSearched = url.search;

  const result = await deleteDocument(params.documentId || "");

  if (!result) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect(`/documents${urlSearched}`);
};

export default function DocumentDetailsPage() {
  const { document, urlSearched, nearestDocuments } = useLoaderData() as LoaderData;

  return (
    <div className="document">
      <h2>{document.title}</h2>
      <div className="body">
        {!!document.image &&
          <div className="img">
            <img src={document.image} alt={document.title} />
          </div>
        }
        <div className="info">
          {document.text}
          <div className="footer">
            <div>{showType(document.type as DocumentTypeEnum)}</div>
            <div className="date">{showDate(document.createdAt)}</div>
          </div>
          <Form method="post" action={`/ documents / ${document.id} ${urlSearched}`}>
            <div className="nearest">
              {!!nearestDocuments.prev && (
                <Link to={`/documents/${nearestDocuments.prev}`}>
                  <button>Prev</button>
                </Link>
              )}
              {!!nearestDocuments.next && (
                <Link to={`/documents/${nearestDocuments.next}`}>
                  <button>Next</button>
                </Link>
              )}

            </div>
            <div className="actions">
              <button
                type="submit"
                className=""
              >
                Delete
              </button>
              <Link to={`/documents${urlSearched}`} >
                <button>Close</button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Document not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
