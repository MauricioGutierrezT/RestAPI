const dataSource = require('../Datasource/MySQLMngr');
const { QueryResult } = dataSource;

/**
 * 
 * @param {Array} images - Array 
 * @returns {Promise<QueryResult>} 
 */
async function uploadedImagesLog(images) {
    // Valida input
    if (!Array.isArray(images)) {
        return new QueryResult(false, [], 0, 0, 'Images must be provided as an array');
    }

    if (images.length === 0) {
        return new QueryResult(true, [], 0, 0, 'No images to insert');
    }

    try {
        
        const values = images.map(image => {
            if (!image.name || !image.usuario_carga) {
                throw new Error('Missing required fields (name or usuario_carga)');
            }
            return [
                image.name,
                image.usuario_carga
            ];
        });

        // MySQL bulk insert 
        const query = 'INSERT INTO imagenes (nombreImagen, usuario_carga) VALUES ?';

        console.log(`Attempting to insert ${values.length} images`);
        const result = await dataSource.bulkInsertData(query, [values]);

        if (!result.getStatus()) {
            throw new Error(result.getErr());
        }

        console.log(`Successfully inserted ${result.getChanges()} images`);
        return result;
    } catch (err) {
        console.error('Bulk image insert failed:', {
            error: err.message,
            stack: err.stack,
            failedCount: images.length
        });
        return new QueryResult(false, [], 0, 0, err.message);
    }
}

/**
 * 
 * @param {Object} image }
 * @returns {Promise<QueryResult>} -
 */
async function uploadedImageLog(image) {
    if (!image || typeof image !== 'object') {
        return new QueryResult(false, [], 0, 0, 'Invalid image object');
    }

    return await uploadedImagesLog([image]);
}

module.exports = {
    uploadedImageLog,
    uploadedImagesLog
};