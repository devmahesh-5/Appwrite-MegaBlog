import conf from "../conf/conf"
import { Client, ID ,Databases ,Storage,Query} from "appwrite";

export class Services{
    client=new Client();
    databases;
    storage;
    constructor(){
        this.client.setEndpoint(conf.AppWriteEndpoint)
        .setProject(conf.AppWriteProjectId);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.databases.createDocument(
                conf.AppWriteDatabaseId,
                conf.AppWriteCollectionId,
                slug,//id
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid//logged in user's id which is created at the time of login
                }
            )
        } catch (error) {
            console.log("Appwrite::createPost error",error);
            
        }
    }
    async updatePost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.AppWriteDatabaseId,
                conf.AppWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite::updatePost error",error);
            
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.AppWriteDatabaseId,
                conf.AppWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite::deletePost error",error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.AppWriteDatabaseId,
                conf.AppWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite::getPost error",error);
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.AppWriteDatabaseId,
                conf.AppWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite::getPosts error",error);
            
        }
    }
    //file upload services
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.AppWriteStorageBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite::uploadFile error",error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.AppWriteStorageBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite::deleteFile error",error);
            return false
        }
    }
     getFilePreview(fileId){
            return  this.storage.getFilePreview(
                conf.AppWriteStorageBucketId,
                fileId
            )
       
    }
}
const services=new Services();
export default services