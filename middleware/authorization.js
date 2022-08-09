const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const config = require("../config/config.json");

const  verifyToken = async (req, res, next) => {

	let host = req.headers.host;
	host = host.split(':')[0];

	if (host == 'localhost') {

		req.headers.userID = req.headers.userid;
		return next();
	}

	const token = res?.locals?.authorization ? res?.locals?.authorization : req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(403).send({
			success: false,
			error: "A token is required for authentication"
		});
	}

	try {

		const decoded = jwt.verify( token, config.API_JWT_ACCESS_TOKEN );
		req.headers.userID = decoded.userID;

	}
	catch (err) {

		if(err instanceof TokenExpiredError) {

			return res.status(401).send({
				success: false,
				error: "Unauthorized! Access Token was expired!"
			});
		}

		return res.status(401).send({
			success: false,
			error: "Invalid Token"
		});
	}

	return next();
};



module.exports = { verifyToken };