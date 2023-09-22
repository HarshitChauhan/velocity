const crypto = require('crypto');

const createHash = (...data) => {
    return crypto.createHash('sha256').update(data.sort().join('')).digest('hex');
}

module.exports = createHash;