import { client } from "@/lib/appwrite";
import { appWriteDataProvider } from "ra-appwrite";

// Create the data provider for React Admin using Appwrite
export const dataProvider = appWriteDataProvider({
    client,
    databaseId: "68c12a5f000af4a5b92c",
    collectionMapping: {
        // Example: 'posts': 'blog_posts_collection_id',
        // 'users': 'users_collection_id',
    },
});
