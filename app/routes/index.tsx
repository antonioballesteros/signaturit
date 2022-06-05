import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDocuments } from "~/models/document.server";

import styles from "~/styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getDocuments>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getDocuments(),
  });
};

export default function Index() {
  const { posts } = useLoaderData();
  console.log("posts", posts);

  return (
    <div className="root">
      <h1>List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={post.id}
              className="link"
            >
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
