import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error('FATAL ERROR: STREAM_API_KEY or STREAM_API_SECRET is not defined in the environment variables.');
    process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error(`Error upserting Stream user (ID: ${userData.id}): ${error.message}`);
        throw new Error('Failed to upsert Stream user.');
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.error(`Error generating Stream token for user (ID: ${userId}): ${error.message}`);
        throw new Error('Failed to generate Stream token.');
    }
};