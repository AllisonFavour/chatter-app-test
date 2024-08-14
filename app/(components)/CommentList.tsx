

export default function CommentList({comments}: {comments: any[]}) {
    return (
        <div>
            <h4>Comments</h4>
            {comments.length === 0 ? (
                <p>No comment yet</p>
            ) : (
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id}>{comment.content}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}