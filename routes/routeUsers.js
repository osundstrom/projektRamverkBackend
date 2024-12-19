const Router = require('@koa/router');
const router = new Router();


const userModel = require("./model/user.js");


//-----------Post förfågan för att skapa användare----------------------//
router.post("/register", async (ctx) => {
    try {
    const {email, password} = ctx.request.body;

    if (!email || !password) {
        ctx.status = 400;
        ctx.body = {error};
        return;
    }

        const oneUser = await userModel.register(email, password);
        ctx.status = 201;
        ctx.body = {message: "Användare sparad"};

    } catch (error) {
        ctx.status = 500;
        ctx.body = {error};
    }
});

module.exports = router;