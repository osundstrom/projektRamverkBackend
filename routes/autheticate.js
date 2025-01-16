const jwt = require("jsonwebtoken");

const authenticate = (ctx, next) => {
    const token = ctx.headers.authorization?.split(" ")[1];  

    if (!token) {
        ctx.status = 400;
        ctx.body = { error: "Ingen token hittad" };
        return;
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        ctx.state.user = decoded;  
        
        return next(); 
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: "ogiltig" };
    }
};

module.exports = authenticate;