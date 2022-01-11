const express = require('express');
const app = express()
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require("path")

require('dotenv')
  .config();
const loaclLink = process.env.MONGO;

// mongodb

mongoose
  .connect(loaclLink, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MONGODB_CONNECTED"))
  .catch(err => console.log(err));
// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, instancekey, email, Access-Control-Request-Headers, x-http-method-override");
  res.header("Access-Control-Max-Age", '1800');
  if (req.method === 'OPTIONS') {
      res.end();
  } else {
      res.msg = {}
      next();
  }
})
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use("/api/v1/questions", require("./routes/questions"))
app.use("/api/v1/answer", require("./routes/answers"))
app.use("/api/v1/auth", require("./routes/auth"))


mongoose.set("useFindAndModify", false);

app.use(express.static(path.join(__dirname, "client", "build")))

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.listen(port, ()=>{
    console.log("server running..")
})