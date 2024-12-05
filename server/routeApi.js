const user = require("./user");
const express = require("express");
const router = express.Router();

router.post("/api/saveUser", user.saveUser);
router.get("/api/getEmail", user.getEmail);

module.exports = router;
