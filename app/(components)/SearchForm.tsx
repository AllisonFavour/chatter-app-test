"use client";

import { useState } from "react";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a blog post..."
        />
        <button type="submit">Search Blog</button>
      </form>
    </div>
  );
}
