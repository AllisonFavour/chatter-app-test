"use client";

import { useState } from "react";

export default function PostCard({post}: {post: any}) {
    const [likes, setLikes] = useState(post.likes);

    const handleLikes = async () => {
        await fetch('/api/likes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: post._id}),
        });

        setLikes(likes+1);
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={handleLikes}>Like ({likes})</button>
            {/* bookmark functionality */}
        </div>
    )
}