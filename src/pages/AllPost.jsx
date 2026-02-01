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
     

    return (
        <div className="w-full" py-8>
            <Container>
                <div className="flex flex-wrap">
                    {
                        (posts).map((post) => {
                             
                            console.log(JSON.stringify(post))
                            console.log("posting ------- "+post.$id);
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