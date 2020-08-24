const jwt = require('jsonwebtoken');

exports.required = (req, res, next) =>{

	try{
		const token = req.headers['x-access-token'];
		const decode = jwt.verify(token, "Z35I-K8K5-M7LW-1Y96-VHP9");
		req.user = decode;
		next();
	}catch(error){
		res.status(401).send({ message: 'Authentication Failed'});
	}
}
