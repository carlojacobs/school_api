const adminAuth = (req, res, next) => {
	const adminPass = req.body.admin_password;
	console.log(adminPass, process.env.ADMIN_PASS);
	if (adminPass && (adminPass == process.env.ADMIN_PASS)) {
		delete req.body.admin_password;
		next();
	} else {
		res.status(400).send("Unauthorized");
	}
}

module.exports = adminAuth;