import { useEffect, useState } from "react";
import authObj from "../appwrite/auth";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../post-form/PostForm";
import Container from "../container/Container";


export default function EditPost() {

    const [posts, setPosts] = useState([]);
    const slug = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {
            authObj.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate("/")
        }

    }, [slug])

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