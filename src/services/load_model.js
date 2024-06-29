import tf from "@tensorflow/tfjs-node";

const load = async() => tf.loadGraphModel(process.env.MODELURL);

export default load;