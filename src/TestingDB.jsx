import appwriteDB from "./appwrite/appwriteDB";
 


export default function TestingDB(){
   console.log("testing ");
   
                                    //  (title, content, featuredImage, status, userId, slug)
    const val= appwriteDB.createPost("blogTest", "nothing", "https://via.placeholder.com/150", "published", 123, "test-1")
    console.log(val);

}