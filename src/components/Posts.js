export default function Posts() {
    const posts = [
        {
            id: 1,
            text: 'Hello, world!',
            timestamp: 'a minute ago',
            author: {
              username: 'susan',
            },
        },
        {
            id: 2,
            text: 'Second post',
            timestamp: 'an hour ago',
            author: {
              username: 'john',
            },
        }
    ];

    return (
        <>
            {posts.length === 0 ?
                <p>Тут не на что смотреть!</p>
             :
                posts.map(post => {
                    return (
                    <p key={post.id}>
                        <b>{post.author.username}</b> &mdash; <b>{post.timestamp}</b>
                        <br />
                        {post.text}
                    </p>
                    );
            })}
        </>
    );
}