import { Firestore } from "@google-cloud/firestore";

const storePrediction = async (docId, data) => {
    const db = new Firestore({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.DATABASE_ID,
    });

    const predict = db.collection(process.env.COLLECTION);

    try {
        await predict.doc(docId).set(data);
    }catch (e) {
        return {
            success: false,
            message: 'Gagal Store Data: ${e.message}'
        };
    }
};

export default storePrediction;