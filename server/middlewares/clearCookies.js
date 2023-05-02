const clearCookies = async (req,res,next)=>{
    const cookie = req.cookies.user;
    if(cookie) {
        res.clearCookie("user")
    }else{
        next();
    }
}

module.exports = clearCookies;