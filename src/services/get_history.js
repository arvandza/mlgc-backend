import { Firestore } from "@google-cloud/firestore";

const getPredictionHistory = async () => {
    const db = new Firestore({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.DATABASE_ID,
    });
    
    const collection = db.collection(process.env.COLLECTION);
    const snapshot = await collection.orderBy('createdAt', 'desc').get();

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        history: doc.data()
    }));

    return { data };
}

export default getPredictionHistory;