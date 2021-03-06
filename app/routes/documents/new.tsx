import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Form, useActionData, useLoaderData } from "@remix-run/react";
import * as React from "react";

import { createDocument } from "~/models/document.server";
import type { NewDocumentType } from "~/models/type";
import styles from "~/styles/routes/documents/new.css";

type ActionData = {
  errors?: {
    title?: string;
    type?: string;
    text?: string;
    image?: string;
  };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const text = (formData.get("text") as string) || undefined;
  const image = (formData.get("image") as string) || undefined;

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  const newDocument: NewDocumentType = {
    title,
    text,
    image,
  };

  const note = await createDocument(newDocument);

  return redirect(`/documents/${note.id}`);
};

type LoaderData = {
  urlSearched: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const urlSearched = url.search;

  return json<LoaderData>({
    urlSearched,
  });
};

export default function NewDocumentPage() {
  const { urlSearched }: LoaderData = useLoaderData();

  const actionData = useActionData() as ActionData;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="new">
      <h2>Create new document</h2>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div className="field">
          <label>
            <span>Title:</span>
            <input
              ref={titleRef}
              name="title"
              className=""
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title && (
            <div className="error" id="title-error">
              {actionData.errors.title}
            </div>
          )}
        </div>

        <div className="field">
          <label className="">
            <span>Text: </span>
            <textarea
              ref={textRef}
              name="text"
              rows={8}
              className=""
              aria-invalid={actionData?.errors?.text ? true : undefined}
              aria-errormessage={
                actionData?.errors?.text ? "text-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.text && (
            <div className="" id="text-error">
              {actionData.errors.text}
            </div>
          )}
        </div>

        <div className="field">
          <label className="">
            <span>Image: (write url here) </span>
            <input
              ref={imageRef}
              name="image"
              className=""
              aria-invalid={actionData?.errors?.image ? true : undefined}
              aria-errormessage={
                actionData?.errors?.image ? "image-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.image && (
            <div className="" id="text-error">
              {actionData.errors.image}
            </div>
          )}
        </div>

        <div className="buttons">
          <Link to={`/documents${urlSearched}`} className="">
            <button>Close</button>
          </Link>

          <button type="submit" className="">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
