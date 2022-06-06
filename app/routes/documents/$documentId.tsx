import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";

import type { DocumentType, DocumentTypeEnum } from "~/models/type";
import { deleteDocument } from "~/models/document.server";
import { getDocument } from "~/models/document.server";
import { showType, showDate } from "~/utils"


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
    <div className="">
      <h3 className="">{data.document.title}</h3>
      {!!data.document.image && <img src={data.document.image} alt={data.document.title} />}
      <p className="">{showType(data.document.type as DocumentTypeEnum)}</p>
      <p className="">{data.document.text}</p>
      <p className="">{showDate(data.document.createdAt)}</p>

      <hr className="" />
      <Form method="post">
        <button
          type="submit"
          className=""
        >
          Delete
        </button>
      </Form>
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
