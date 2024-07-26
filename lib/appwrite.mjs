import { Client, Databases } from "node-appwrite";

export function getAppwriteConfig() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  return {
    databases,
    DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
    USERS_COLLECTION_ID: process.env.APPWRITE_USERS_COLLECTION_ID,
  };
}
