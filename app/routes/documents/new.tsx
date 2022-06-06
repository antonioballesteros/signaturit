import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createDocument } from "~/models/document.server";
import type { DocumentTypeEnum, NewDocumentType } from "~/models/type";

type ActionData = {
    errors?: {
        title?: string;
        type?: string;
        text?: string;
        image?: string
    };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const type = formData.get("type") as DocumentTypeEnum;
    const text = formData.get("text") as string;
    const image = formData.get("image") as string;

    if (typeof title !== "string" || title.length === 0) {
        return json<ActionData>(
            { errors: { title: "Title is required" } },
            { status: 400 }
        );
    }

    // if (typeof body !== "string" || body.length === 0) {
    //     return json<ActionData>(
    //         { errors: { body: "Body is required" } },
    //         { status: 400 }
    //     );
    // }

    const newDocument: NewDocumentType = {
        title,
        type,
        text,
        image
    }

    const note = await createDocument(newDocument);

    return redirect(`/documents/${note.id}`);
};

export default function NewDocumentPage() {
    const actionData = useActionData() as ActionData;
    const titleRef = React.useRef<HTMLInputElement>(null);
    const textRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (actionData?.errors?.title) {
            titleRef.current?.focus();
        } else if (actionData?.errors?.text) {
            textRef.current?.focus();
        }
    }, [actionData]);

    return (
        <Form
            method="post"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
            }}
        >
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Title: </span>
                    <input
                        ref={titleRef}
                        name="title"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        aria-invalid={actionData?.errors?.title ? true : undefined}
                        aria-errormessage={
                            actionData?.errors?.title ? "title-error" : undefined
                        }
                    />
                </label>
                {actionData?.errors?.title && (
                    <div className="pt-1 text-red-700" id="title-error">
                        {actionData.errors.title}
                    </div>
                )}
            </div>

            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Text: </span>
                    <textarea
                        ref={textRef}
                        name="body"
                        rows={8}
                        className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                        aria-invalid={actionData?.errors?.text ? true : undefined}
                        aria-errormessage={
                            actionData?.errors?.text ? "text-error" : undefined
                        }
                    />
                </label>
                {actionData?.errors?.text && (
                    <div className="pt-1 text-red-700" id="text-error">
                        {actionData.errors.text}
                    </div>
                )}
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Save
                </button>
            </div>
        </Form>
    );
}
