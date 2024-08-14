export default function UserProfile({user}: {user: any}) {
    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Email: {user.email}</p>
            {/* add additional user details here. */}
        </div>
    )
}