const userService = require('../service/UsersService');
const logger = require('../utils/logger');

module.exports = basicAuth;

async function basicAuth(req, res, next) {
    // make authenticate path public
    if (req.url.includes('/health',0)  || req.url.includes('/docs',0) || req.url.includes('/api-docs',0)) {
        return next();
    }
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        logger.warn('Access without credentials  from %s',req.connection.remoteAddress);
        res.writeHead(400, "Invalid credentials");
        return next();
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        logger.warn('Incorrect login to API from  %s',req.connection.remoteAddress);
        res.writeHead(400, "Invalid credentials");
        return next();
    }

    // attach user to request object
    req.user = user

    next();
}