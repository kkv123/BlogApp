
import { Client, Databases, ID, Query, Storage } from "appwrite"
import { conf } from "../conf/conf";


class DatabaseBuckertsService {
    client = new Client();
    bucket;
    database;

    constructor() {
        this.client.setProject(conf.appwriteProject)
        this.client.setEndpoint(conf.appwriteUrl)
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, featuredImage, status, userId, slug }) {
        try {
            const post = await this.database.createDocument(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId, // Table ID
                slug,                                        // Document ID (or "unique()" for auto ID)
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            console.log("Post created:", post);
            return post;
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const updatedPost = await this.database.updateDocument(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            console.log("Post updated:", updatedPost);
            return updatedPost;
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId,
                slug
            );
            console.log("Post deleted:", slug);
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            console.log("slug is : " + slug)
            const post = await this.database.getDocument(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId,
                slug
            );
            return post;
        } catch (error) {
            console.error("Error fetching post:", error);
            return null;
        }
    }

    async listPosts() {
        try {
            const posts = await this.database.listDocuments(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteTableId,
                [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
            );
            return posts.documents;
        } catch (error) {
            console.error("Error listing posts:", error);
            return [];
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log("File uploaded successfully");
            return response;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        console.log("working  getFilePreview() "+fileId)
        const value = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        console.log(value);
    }
}
const appwriteObj = new DatabaseBuckertsService()
export default appwriteObj;