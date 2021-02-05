const { validationResult } = require("express-validator");
const crypto = require('crypto');
const { format } = require("path");

exports.renderContato = (req, res) => {
	res.render("../view/contato.ejs");
};

exports.postForm = (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.status(422).jsonp(errors.array())
		const alert = errors.array();
		res.render("../view/contato.ejs", {
			alert,
		});
    }

    form = req.body;
    //console.log(form)
    var senhaCripto = crypto.createHash("md5").update(form.password).digest('hex');
    var senha1Cripto = crypto.createHash("md5").update(form.password1).digest('hex');
    form.password = senhaCripto
    form.password1 = senha1Cripto
    //console.log(form)
    res.render("../view/contato.ejs", {
        form,
    });
};
