type Document = {
  id: string;
  title: string;
  date: string;
};

// Fake database :/
const documents = [
  {
    id: "aaaa1",
    title: "Post 1",
    date: "01-01-2020",
  },
  {
    id: "aaaa2",
    title: "Post 2",
    date: "05-02-2020",
  },
  {
    id: "aaaa3",
    title: "Post 3",
    date: "11-05-2020",
  },
];

export async function getDocuments(): Promise<Document[]> {
  return documents;
}
