import styles from "~/styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  return (
    <div className="index">
      <span>Welcome to Remix</span>
    </div>
  );
}
