import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Form, useCatch, useLoaderData } from "@remix-run/react";

import type { DocumentType, DocumentTypeEnum } from "~/models/type";
import { deleteDocument } from "~/models/document.server";
import { getDocument } from "~/models/document.server";
import { showType, showDate } from "~/utils"
import styles from "~/styles/routes/documents/$documentId.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles }
  ];
}

type LoaderData = {
  document: DocumentType;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const document = await getDocument(params.documentId || "");
  if (!document) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ document });
};

export const action: ActionFunction = async ({ request, params }) => {
  const result = await deleteDocument(params.documentId || "");

  if (!result) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect("/documents");
};

export default function DocumentDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="document">
      <h2>{data.document.title}</h2>
      <div className="body">
        {!!data.document.image &&
          <div className="img">
            <img src={data.document.image} alt={data.document.title} />
          </div>
        }
        <div className="info">
          {data.document.text}
          <div className="footer">
            <div>{showType(data.document.type as DocumentTypeEnum)}</div>
            <div className="date">{showDate(data.document.createdAt)}</div>
          </div>
          <Form method="post">
            <Link to="/documents" className="">
              <button>Close</button>
            </Link>
            <button
              type="submit"
              className=""
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
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
