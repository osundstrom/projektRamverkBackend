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
        ctx.body = {error: error.message};
    }
});

//-----------Post förfågan för att logga in ----------------------//

router.post("/login", async (ctx) => {
    const { email, password } = ctx.request.body;
    try {
        const oneUser = await userModel.login(email, password);
        ctx.status = 200;
        ctx.body = {message: "Inloggad som: ", email};
    } catch (error) {
        ctx.status = 401;
        //console.log("test")
        ctx.body = {error: "ogiltiga uppgifter"};
    }
});

module.exports = router;