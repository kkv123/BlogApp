import { Link } from "react-router-dom";
import appwriteObj from "../appwrite/config";

export default function PostCard({ $id, title, featuredImage }) {
    console.log("PostCard() "+$id);
    return (
        <Link to={`post/${$id}`}>
            <div className="w-full bg-grey-400 p-4">
                <div className="w-full justify-center">
                    <img src={`${appwriteObj.getFilePreview(featuredImage)}`} alt="Post Img" />
                </div>
                <h1 className="text-xl text-bold">Title</h1>
            </div>
        </Link>
    )

}