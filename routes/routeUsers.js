const Router = require('@koa/router');
const router = new Router();


const userModel = require("./model/user.js");

//JWT
const jwt = require("jsonwebtoken");


//-----------Post förfågan för att skapa användare----------------------//
router.post("/register", async (ctx) => {
    try {
        //hämtar mail och lösenord
    const {email, password} = ctx.request.body;

    //kontrollerar att båda finns
    if (!email || !password) {
        ctx.status = 400;
        ctx.body = {error: "Epost eller lösen saknas"};
        return;
    }

    //kollar så epost har @
    if (!/[@]/.test(email)) { 
        ctx.status = 400;
        ctx.body = { error: "Ogiltigt e-postformat" };
        return;
    }

    //kollar så lösenords längden är minst 8 tecken.
    if (password.length < 8 ) { 
        ctx.status = 400;
        ctx.body = { error: "Minst 8 tecken i lösenordet" };
        return; 
    }

    //kollar så deet finns 1 stor bokstav.
    if (!/[A-ZÅÄÖ]/.test(password)) {  
        ctx.status = 400;
        ctx.body = { error: "Lösenordet måste ha en stor bokstav" };
        return;
    }
    
    //kollar så de finns en siffra i lösenordet
    if (!/[0-9]/.test(password)) { 
        ctx.status = 400;
        ctx.body = { error: "Lösenordet måste ha minst en siffra" };
        return;
    }

            //skapa användare med email och lösenord som angivits
        const oneUser = await userModel.register(email, password);
        ctx.status = 201; //created
        ctx.body = {message: "Användare sparad"}; //medelande

    } catch (error) { //vid error
        ctx.status = 500; // server error
        ctx.body = {error: error.message};
    }
});

//-----------Post förfågan för att logga in ----------------------//


router.post("/login", async (ctx) => {
    //hämtar emial och lösenord
    const { email, password } = ctx.request.body;
    try {
        //kör userModel.login för att verifera inlogg
        const oneUser = await userModel.login(email, password);
        //skapar token
        const token = jwt.sign({
            _id: oneUser._id}, //användaren unika id för token
            process.env.JWT_SECRET_KEY, //använder från .env
            {expiresIn: "1h"}); //token giltig 1h

        ctx.status = 200; //ok
        ctx.body = {
        message: `Inloggad som: ${email}`, //meddelande
        recivedToken: {token}, //skickar token
        };

    } catch (error) {
        ctx.status = 401; // unothorized
        //console.log("test")
        ctx.body = {error: "ogiltiga uppgifter"}; //skriver ut
    }
});

module.exports = router;