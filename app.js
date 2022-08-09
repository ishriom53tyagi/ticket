const express = require('express');
const app = express();

const mongoConnect = require('./utils/mongoDatabase').mongoConnect;
const cors = require('cors');
const config = require('./config/config.json');

const port = process.argv[2] || config.port;

const options = {
    allowedHeaders: ["Origin", "Content-Type", "Accept"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
};

require('./middleware').authMiddleWare(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(options));

app.get("/", (req, res) => {
    res.write("Server Started");
    res.end();
})

mongoConnect(() => {
    app.listen(port);
    console.log(port);
});