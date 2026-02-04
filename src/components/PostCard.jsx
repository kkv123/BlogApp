import { Link } from "react-router-dom";
import appwriteObj from "../appwrite/config";

export default function PostCard({ $id, title, featuredImage }) {
    console.log("Eneterd in PostCard() " + $id);
    // console.log("Eneterd in PostCard() "+pis);

    return (
        <Link to={`/post/${$id}`}>
            <div className="min-w-[330px] bg-gray-400 p-4">
                <div className="flex justify-center">
                    <img
                        src={appwriteObj.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-[300px] object-cover rounded-lg border-4 border-black shadow-lg"
                    />
                </div>
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
        </Link>
    )

}