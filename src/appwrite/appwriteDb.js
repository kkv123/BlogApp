
import { Client, Databases, ID, Query, Storage, TablesDB } from "appwrite"
import { conf } from "../conf/conf";
// const sdk = require('node-appwrite');


class DatabaseService {
    client = new Client();
    bucket;
    database;

    constructor() {
        this.client.setProject(conf.appwriteProject)
        this.client.setEndpoint(conf.appwriteUrl)
         
       
        this.database = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(title, content, featuredImage, status, userId, slug) {
        try {
            console.log("creating post with " + title + " " + content + " " + featuredImage + " " + status + " " + userId);
            console.log(conf.appwriteDatabaseId + " " + conf.appwriteTableId);
            const post =this.database.createRow(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId,      // Table ID (⚠️ must be the actual ID, not the name)
                slug || ID.unique(),       // Row ID (use slug if you want custom, or ID.unique() for auto)
                {
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status,
                    userId: userId,
                    createdDate: new Date().toISOString()
                }
            );
            console.log(post);

            console.log("Post created:", post);
            return post;
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

}

const appwriteDB = new DatabaseService();
export default appwriteDB;