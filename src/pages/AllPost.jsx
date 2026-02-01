import { useEffect, useState } from "react";
import authObj from "../appwrite/auth";
import Container from "../container/Container";
import { PostCard } from "../components";



export default function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            authObj.AllPost([]).then((post) => {
                if (post) {
                    setPosts(post);
                }
            });

        } catch (e) {
            console.log(e.message);
        }
    }, [])


    return (
        <div className="w-full" py-8>
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post) => {
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard post={post}/>
                            </div>
                        })
                    }
                </div>
            </Container>
        </div>
    )


}