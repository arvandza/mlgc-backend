import * as tf from "@tensorflow/tfjs-node";

const evaluateModel = async (model, data) => {
    // Decode and preprocess the image
    const imageTensor = tf.node.decodeJpeg(data)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

    // Get the prediction from the model
    const prediction = model.predict(imageTensor);
    const predictionData = await prediction.data();
    const confidenceLevel = predictionData[0];

    // Determine the diagnosis based on the threshold
    const threshold = 0.5;
    const diagnosis = (confidenceLevel >= threshold) ? "Cancer" : "Non-cancer";
    const confidence = confidenceLevel * 100;

    // Provide suggestion based on the diagnosis
    const suggestion = (diagnosis === "Cancer") 
        ? "Segera lakukan pemeriksaan ke dokter" 
        : "Anda Sehat";

    // Return the result object
    return {
        confidence,
        diagnosis,
        suggestion
    };
};

export default evaluateModel;
