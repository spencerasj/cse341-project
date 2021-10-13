/*
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();
const session = require("express-session");
// Route setup. You can implement more in the future!
const ta01Routes = require("./routes/ta01");
const ta02Routes = require("./routes/ta02");
const ta03Routes = require("./routes/ta03");
const ta04Routes = require("./routes/ta04");
const ta05Routes = require("./routes/ta05");
// const sessions = require("./routes/sessions");

// Routes for prove 02 assignments
// const shopRoutes = require("./prove02/routes/shop");
// const adminData = require("./prove02/routes/admin");
// const sessions = require("./routes/sessions");
//const prove03 = require("./prove03");

app
  .use(express.static(path.join(__dirname, "public")))
  //.use(express.static(path.join(__dirname, "prove02/public")))
  .set("view engine", "ejs")

  .set("views", "views")

  .use(
    bodyParser({
      extended: false,
    })
  ) // For parsing the body of a POST
  .use(
    session({ secret: "my secret", resave: false, saveUninitialized: false })
  )
  .use("/ta01", ta01Routes)
  .use("/ta02", ta02Routes)
  .use("/ta03", ta03Routes)
  .use("/ta04", ta04Routes)
  .use("/ta05", ta05Routes)
  // .use("/admin", adminData.routes)
  // .use(shopRoutes)
  // .use("/prove03", prove03)
  // .use("/sessions", sessions)

  .get("/", (req, res, next) => {
    // This is the primary index, always handled last.
    res.render("pages/index", {
      title: "Welcome to my CSE341 repo",
      path: "/",
    });
  })

  .use((req, res, next) => {
    // 404 page
    res.render("pages/404", {
      title: "404 - Page Not Found",
      path: req.url,
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
