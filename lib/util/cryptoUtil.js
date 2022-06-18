const crypto = require('crypto');

class CryptoUtil {
    static hash(any) {
        let anyString = typeof (any) == 'object' ? JSON.stringify(any) : any.toString();
        let anyHash = crypto.createHash('sha256').update(anyString).digest('hex');
        return anyHash;
    }

    static randomId(size = 1024) {
        const salt = crypto.randomBytes(Math.floor(size / 2)).toString('hex');
        const id = crypto.randomBytes(Math.floor(size / 2)).toString('hex');
        const sha256Hasher = crypto.createHmac("sha256", salt);
        const hash = sha256Hasher.update(id).digest("hex");
        return hash;
    }
}

module.exports = CryptoUtil;