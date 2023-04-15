module.exports.setFlash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('succcess'),
        'error': req.flash('error')
    }
    next();
}