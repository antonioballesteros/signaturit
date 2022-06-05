import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import styles from "~/styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async () => {
  return json({
    posts: [
      {
        slug: "aaaa1",
        title: "Post 1",
        date: "01-01-2020"
      },
      {
        slug: "aaaa2",
        title: "Post 2",
        date: "05-02-2020"
      },
      {
        slug: "aaaa3",
        title: "Post 3",
        date: "11-05-2020"
      },
    ],
  });
};

export default function Index() {
  const { posts } = useLoaderData();
  console.log(posts);

  return (
    <div className="root">
      <h1>List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
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
