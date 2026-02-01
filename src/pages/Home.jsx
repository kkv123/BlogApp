import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { getUserData } from '../store/authSlice';

function Home() {
    const [posts, setPosts] = useState([])
    // const userData = JSON.stringify(getUserData());

    useEffect(() => {
        try {
            appwriteService.listPosts().then((posts) => {
                if (posts) {
                    setPosts(posts)
                }
            })
        } catch (e) {
            console.log("Error in Home " + e);
        }
    }, [])
    posts.map((p) => (
        console.log("ppp "+JSON.stringify({...p}))
    )
    )
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* {post} */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home