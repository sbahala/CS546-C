/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/


const logAndRedirect=(req,res,next) =>{
    console.log(`[${new Date().toUTCString()}]:${req.method} ${req.originalUrl}(${req.session.user ? 'Authenticated User': 'Non - Authenticated User'})`);
    if(req.originalUrl === '/'){
        if(req.session.user && req.session.user.role === 'admin') {
            return res.redirect('/admin');
        }else if (req.session.user && req.session.user.role === 'user'){
            return res.redirect('/protected');
        }else{
            return res.redirect('/login');
        }
    }else{
        next();
    }
};

const redirectToHomeIfLoggedIn = (req,res,next)=>{
    if(req.session.user){
        return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }else{
        next();
    }
};

const redirectToHomeIfLoggedInForRegister = (req,res,next)=>{
    if(req.session.user){
        return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }else{
        next();
    }
};

const ensureAuthenticatedForProtected = (req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/login');
    }else{
        next();
    }
};

const ensureAdmin = (req,res,next)=>{
    if(!req.session.user){
        console.log("In user middleware");
        return res.redirect('/login');
    }else if (req.session.user.role !== 'admin'){
        console.log("In admin middleware");
        //return res.status(403).render('error',{title:"Error",message:"You do not have permission to viw this page"});
        return res.redirect(`/error?code=403&error=You do not have permission to view this page`);
    }else{
        next();
    }
};

const ensureLoggedInForLogOut = (req,res,next)=>{
    if(!req.session.user){
        console.log("In middleware");
        return res.redirect('/login');
    }else{
        next();
    }
};

export {logAndRedirect,redirectToHomeIfLoggedIn,redirectToHomeIfLoggedInForRegister,ensureAuthenticatedForProtected,ensureAdmin,ensureLoggedInForLogOut};

//work for middlewares