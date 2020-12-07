const router = require("express").Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
router.post(
  "/addInfo",
  [
    body("name").isLength({ min: 5, max: 20 }),
    body("location").isLength({ min: 5, max: 40 }),
  ],
  userController.addInfo
);

router.get("/getInfo",userController.getInfo);
router.get("/search/:searchQuery",userController.search);

module.exports = router;