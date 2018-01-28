const JSON_METHODS = ['POST', 'PUT', 'PATCH'];

let checkHeaders = (req, res, next) => {
    if (JSON_METHODS.indexOf(req.method) > -1
        && req.headers['content-type'] != 'application/json'
    ) {
        res.status(400).send({
            error: "Bad request",
            message: `Method ${req.method} accepts only 'application/json' data`
        });
    } else
        next();
}

module.exports = checkHeaders;