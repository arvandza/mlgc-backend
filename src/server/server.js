import routes from './routes.js';
import InputError from '../error/input_error.js';
import load from '../services/load_model.js';
import Hapi from '@hapi/hapi';

const httpServer = async() => {
    const server = Hapi.server({
        port: process.env.PORT || 9000,
        host: process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const model = await load();

    server.app.model = model;
    server.route(routes);

    server.ext('onPreResponse', (request, reply) => {
        const{response} = request;

        if(response instanceof InputError) {
            return reply.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            }).code(400);
        }

        if(response.isBoom && response.output.statusCode === 413) {
            return reply.response({
                status: 'fail',
                message: 'Payload content length greate than maximum allowed: 1000000',
            }).code(413);
        }

        return reply.continue;
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

export default httpServer;