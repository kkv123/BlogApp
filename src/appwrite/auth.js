import {conf} from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";
class AppWriteConfig {
    client = new Client();
    account;
    constructor() {
        this.client.setProject(conf.appwriteProject)
        this.client.setEndpoint(conf.appwriteUrl)

        this.account = new Account(this.client);
        console.log("Appwrite Client Configured:", this.account);
    }

    async createAccount(email, password, name) {
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            // if (user) {
            //     this.login(email, password);
            // }
            // console.log(user)
        } catch (e) {
            throw e;
        }
    }

    async login(email, password) {
        const result = await this.account.createEmailPasswordSession(
            email,
            password
        );
        return result;
    }

    async getAccount() {
        try {
            const result = await this.account.get();
            console.log("Active session found:", result);
            return result;
        } catch (e) {
            if (e.code === 401) {
                // No session
                return null;
            }

            console.error(e);
            console.log("No active session");
            throw e;
        }
    }

    async logout() {
        try {
            const current = this.getAccount();
            console.log("Current account before logout:", current);
            if (current) {
                console.log("Logging out user:", current);
                const result = await this.account.deleteSessions();
                return true;
            }
            return false;
        } catch (e) {
            if (e.code === 401) {
                console.log("No active session found, nothing to logout.");
                return false;
            }

            console.error(e)
            console.log("error in logout process:: AppwriteConfig.js")
        }
        return false;
    }


}
const authObj = new AppWriteConfig();
export default authObj;