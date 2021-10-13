//const session = require("express-session");
exports.postCreateCookie = (req, res, next) => {
  console.log("Cookie creation!");
};

exports.postStyle = (req, res, next) => {
  console.log(req.body.color);
  req.session.style = req.body.color;
  res.redirect("/ta05");
};

exports.postCounter = (req, res, next) => {
  req.session.counter += Number(req.body.constant);
  res.redirect("/ta05");
};

exports.resetSession = (req, res, next) => {
  if (req.body.reset === "true") {
    req.session.destroy(() => {
      res.redirect("/ta05"); // Redirect must be passed through the callback
    });
  } else {
    /// We don't destroy the session otherwise...
    res.redirect("/ta05");
  }
};

exports.getPage = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.style);
  console.log(req.session.counter);
  if (req.session.counter === undefined) {
    req.session.counter = 0;
  }
  if (!req.session.style === undefined) {
    req.session.style = "pink";
  }
  res.render("pages/ta05", {
    title: "Team Activity 05",
    path: "/ta05",
    color: req.session.style,
    counter: req.session.counter,
  });
};
