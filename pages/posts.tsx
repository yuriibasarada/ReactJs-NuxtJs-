import {MainLayout} from "../layouts/MainLayout";
import {useState, useEffect} from 'react'
import Link from "next/link";
import {MyPost} from "../interfaces/post";
import {NextPageContext} from "next";


interface PostPageProps {
    posts: MyPost[]
}

export default function Posts({posts: serverPosts}: PostPageProps) {

    const [posts, setPosts] = useState(serverPosts)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts`)
            const data = await response.json()
            setPosts(data)
        }

        if(!serverPosts) {
            load()
        }
    }, [])

    if(!posts) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout title={'Posts Page'}>
            <h1>Posts Page</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/${post.id}`}><a>{post.title}</a></Link>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
    if(!req) {
        return {posts: null}
    }
    const response = await fetch(`${process.env.API_URL}/posts`)
    const posts: MyPost[] = await response.json()
    return {
        posts
    }
}