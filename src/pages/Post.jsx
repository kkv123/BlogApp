import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [zoomed, setZoomed] = useState(false);

    const userData = JSON.parse(useSelector((state) => state.auth.userData));
    // console.log("userId in PostCard "+userData.$id )

    // console.log("post wala Data "+JSON.stringify(post))

    const isAuthor = post && userData ? (post.userId === userData.$id) : false;
    console.log("Author is : " + isAuthor)
    if (post && userData) {
        console.log("userId " + post.userId + " " + userData.$id)
    }
    // console.log("post "+ JSON.stringify(post) + "\n userData:  "+ JSON.stringify(userData) )
    // console.log("post "+ JSON.stringify(post) + "\n userData:  "+ JSON.stringify(userData) )
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            console.log("Delete post() " + post.$id)
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div
                    className="relative border border-gray-700 rounded-xl p-4 
             w-full min-w-[350px] max-w-[1200px] 
             bg-black md:bg-gray-900 shadow-lg 
             flex flex-col md:flex-row gap-6 
             hover:shadow-xl transition-shadow duration-300"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 h-[300px] overflow-hidden rounded-xl relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
                        />

                        {/* Zoom Button */}
                        <button
                            onClick={() => setZoomed(true)}
                            className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white 
                 rounded-full w-10 h-10 flex items-center justify-center 
                 hover:bg-opacity-80 transition"
                        >
                            +
                        </button>
                    </div>

                    {/* Text Section */}
                    <div className="flex-1 flex flex-col justify-start">
                        {/* Header + Buttons Row */}
                        <div className="flex items-center justify-between mb-3">
                            <h1 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
                                {post.title}
                            </h1>

                            {isAuthor && (
                                <div className="flex space-x-3">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none text-gray-300">
                            {parse(post.content)}
                        </div>
                    </div>

                    {/* Zoom Modal */}
                    {zoomed && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                            onClick={() => setZoomed(false)}
                        >
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
                            />
                        </div>
                    )}
                </div>

            </Container>
        </div>
    ) : null;
}