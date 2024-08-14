export default function AnalyticsCard ({postId, data}: {postId: string, data: any}) {
    return (
        <div>
            <h3>Post ID: {postId}</h3>
            <p>Views: {data.views}</p>
            <p>Likes: {data.likes}</p>
            <p>Comments: {data.comments}</p>
            <p>Bookmarks: {data.bookmarks}</p>
        </div>
    )
}