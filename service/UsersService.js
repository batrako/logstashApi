const utils = require('../utils/utils');

const users = [{ 
    id: 1, 
    username: utils.getEnvironmentVar('ELASTIC_USERNAME', 'elastic'), 
    password: utils.getEnvironmentVar('ELASTIC_PASSWORD', 'changeme'), 
    firstName: 'User', 
    lastName: 'API' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
