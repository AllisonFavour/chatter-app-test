"use client";

import { useState } from "react";
import SearchForm from "../(components)/SearchForm";
import PostCard from "../(components)/PostCard";

export default function SearchPage() {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = async (searchQuery: string) => {
        const res = await fetch(`/api/posts/search?query=${searchQuery}`);
        const data = await res.json();
        setPosts(data);
    };

    return (
        <><div>
            <h1>Search for blog posts</h1>
            <SearchForm onSearch={handleSearch} />
            {posts.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <div>
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
        </>
    )
}