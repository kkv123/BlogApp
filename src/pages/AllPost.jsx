import { useEffect, useState } from "react";
import authObj from "../appwrite/auth";
import Container from "../container/Container";
import { PostCard } from "../components";
import appwriteObj from "../appwrite/config";



export default function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            appwriteObj.listPosts([]).then((post) => {

                if (post) {
                    setPosts(post);
                }
            });

        } catch (e) {
            console.log(e.message);
        }

    }, [])

    console.log("all Post() :=>")
    console.log(posts)
    return (
        <div className="w-full py-8 bg-red" >
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))
 
                    }
                </div>
            </Container>
        </div>
    )


}