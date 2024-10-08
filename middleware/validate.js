
module.exports = (validator) => {
    return (req, res, next) => {
        const { error } = ValidateReturn(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        next();
    }
}