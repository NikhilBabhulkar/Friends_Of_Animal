export function checkRole(roles) {
    return function(req, res, next) {
        if (!roles.includes(req.role)) {
            return res.status(403).json("Unauthorized");
        } else {
            //console.log("here2");
            next();
        }
    }
}


