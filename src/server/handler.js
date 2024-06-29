import storePrediction from "../services/store_data.js";
import getPredictionHistory from "../services/get_history.js";
import evaluateModel from "../services/inferences.js";
import InputError from "../error/input_error.js";

const saveHandler = async (req, res) => {
    try {
        const { model } = req.server.app;
        const { image } = req.payload;

        const { confidence, diagnosis, suggestion } = await evaluateModel(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: diagnosis, suggestion, createdAt
        }

        await storePrediction(id, data);

        return res.response({
            status: 'success',
            message: confidence >= 100 || confidence < 1 ? 'Model is predicted successfully' : 'Model is predicted unsuccessfully',
            data
        }).code(201);
    } catch (e) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
    }
};

const getHistoryHandler = async (req, res) => {
    try {
        const { data } = await getPredictionHistory();

        return res.response({
            status: 'success',
            data
        }).code(200);
    } catch (e) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
    }
};

const errorHandler = (req, res) =>
    res.response({
        status: 'fail',
        message: 'Tidak ditemukan route yang diinginkan',
    }).code(404);

export { saveHandler, getHistoryHandler, errorHandler }    