const req = require("express/lib/request");
const connect = require("./configs/db");
const app = require("./index");

app.listen(2222, async() => {
    await connect();
    console.log("listening to port 2222");
});