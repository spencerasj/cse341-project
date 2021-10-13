const express = require("express");
const ta05Controller = require("../controllers/ta05");
const router = express.Router();
router.post("/create-cookie", ta05Controller.postCreateCookie);
router.post("/change-style", ta05Controller.postStyle);
router.post("/counter", ta05Controller.postCounter);
router.post("/reset", ta05Controller.resetSession);
router.get("/", ta05Controller.getPage);
module.exports = router;
