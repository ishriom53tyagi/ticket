const authMiddleWare = (app) => {
    app.use(require('./authorization').verifyToken);
}
module.exports = {
    authMiddleWare
}