import {
    saveHandler,
    getHistoryHandler,
    errorHandler
} from './handler.js';

const routes = [
    {
        method: 'GET',
        path: '/predict/histories',
        handler: getHistoryHandler
    },
    {
        method: 'POST',
        path: '/predict',
        handler: saveHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1 * 1024 * 1024
            },
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: errorHandler
    }
];

export default routes;