import { useState, useEffect } from "react";

type Item = { id: number; title: string; completed: boolean; };

export default function FetchDemoView() {
  const [items, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function handleData() {
      try {
        setLoading(true);
        const response = await fetch("/api/todos.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Item[] = await response.json();
        setItem(data);
        setLoading(false);
      }
      catch (e) {
        if (!cancelled) {
          setError("Something went wrong");
          setLoading(false);
        }
      }
    }
    handleData();

    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <h2 id="fetch-loading">Loading...</h2>
  }
  if (error) {
    return <p id="fetch-error">Error:{error}</p>
  }

  return (
    <>
      <div id="fetch-list">
        {
          items.map((item) => (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.title}</p>
              <p>{item.completed ? "Completed" : "Not Completed"}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}
