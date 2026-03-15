import { useState } from "react";
import { SearchQueryProps } from "../types/types";

function SearchQuery({ setSearchQuery }: SearchQueryProps) {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {    e.preventDefault();
    // Handle the search query submission here
    console.log("Search query submitted:", query);
    setQuery(query); // Update the query state with the current input value
    setSearchQuery(query); // Pass the query to the parent component
  }
  return (
    <div>
      <h1>Search Query</h1>
      <form onSubmit={handleSubmit}>
        <input className="mt-3 border pl-3"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchQuery;
