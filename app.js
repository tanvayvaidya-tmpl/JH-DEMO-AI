// const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const configs = require("./config/routes");
// const nodeMailer=require('nodemailer');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const blogs = require("./routes/blogs");
// app.use("/api", blogs);

// const category = require("./routes/category");
// app.use(category);

// const contact = require("./routes/contact");
// app.use(contact);

// const subscribe = require("./routes/subscribe");
// app.use(subscribe);

// const db = require("./database/models");
PORT = process.env.PORT || 6060;
app.use(express.json());

// CORS SETUP
// app.use(
//   cors({
//     origin: "*", // Replace with your frontend's actual URL

//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: false,
//   })
// );
// app.use((res, req, next)=> {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods",
//     "GET, HEAD, OPTIONS, POST, PUT, DELETE"
//     );
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     next()
// })
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });
const cors = require("cors")
app.use(cors())
app.use((res, req, next)=> {
res.header("Acess-Control-Allow-Origin", "*");
res.header("Acess-Control-Allow-Methods",
"GET, HEAD, OPTIONS, POST, PUT, DELETE"
);
res.header("Acess-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
next()
})
configs(app);
app.listen(PORT, async () => {
  try {
    // await db.sequelize.authenticate();
    // await db.sequelize.sync();
    console.log("Connection has been established successfully.");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});