import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../post-form/PostForm";
import Container from "../container/Container";
import appwriteObj from "../appwrite/config";


export default function EditPost() {

    const [posts, setPosts] = useState(null);
    const {slug }= useParams();
    const navigate = useNavigate();
    console.log("entered in Edit post() "+JSON.stringify(slug ))
    useEffect(() => {
        
        if (slug) {
            appwriteObj.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate("/")
        }
       
    }, [slug,navigate])
       
    return (
        posts ? (
            <div className="py-8">
                <Container>
                    <PostForm post={posts} />
                </Container>
            </div>
        ) : null
    )
}