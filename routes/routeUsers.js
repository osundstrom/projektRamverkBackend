const Router = require('@koa/router');
const router = new Router();


const userModel = require("./model/user.js");

//JWT
const jwt = require("jsonwebtoken");


//-----------Post förfågan för att skapa användare----------------------//
router.post("/register", async (ctx) => {
    try {
    const {email, password} = ctx.request.body;

    if (!email || !password) {
        ctx.status = 400;
        ctx.body = {error: "Epost eller lösen saknas"};
        return;
    }

    if (!/[@]/.test(email)) { 
        ctx.status = 400;
        ctx.body = { error: "Ogiltigt e-postformat" };
        return;
    }

    if (password.length < 8 ) { 
        ctx.status = 400;
        ctx.body = { error: "Minst 8 tecken i lösenordet" };
        return; 
    }

    if (!/[A-ZÅÄÖ]/.test(password)) {  
        ctx.status = 400;
        ctx.body = { error: "Lösenordet måste ha en stor bokstav" };
        return;
    }
    
    if (!/[0-9]/.test(password)) { 
        ctx.status = 400;
        ctx.body = { error: "Lösenordet måste ha minst en siffra" };
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
        token = jwt.sign({
            id: oneUser._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "1h"});

        ctx.status = 200;
        ctx.body = {
        message: `Inloggad som: ${email}`,
        recivedToken: {token},
        };

    } catch (error) {
        ctx.status = 401;
        //console.log("test")
        ctx.body = {error: "ogiltiga uppgifter"};
    }
});

module.exports = router;