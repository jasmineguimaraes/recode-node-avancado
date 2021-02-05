let express = require("express");
let router = express.Router();

const bodyParser = require("body-parser");
const { check } = require("express-validator");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const index = require("../controller/index.js");
const contato = require("../controller/contato.js");

router.get("", index.renderIndex);
router.get("/register", contato.renderContato);
router.post(
	"/register",
	urlencodedParser,
	[
		check("username", "This username must me 3+ characters long")
			.exists()
			.isLength({ min: 3 }),
		check("email", "Email is not valid").isEmail().normalizeEmail(),
		check("password", "Invalid password")
			.isLength({ min: 4 })
			.custom((value, { req, loc, path }) => {
				if (value !== req.body.password1) {
					// trow error if passwords do not match
					throw new Error("Passwords don't match");
				} else {
					return value;
				}
			}),
	],
	contato.postForm
);

module.exports = router;
