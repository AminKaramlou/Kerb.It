// Import to load these templates
import '../../ui/components/header.js';
import '../../ui/pages/footer.js';
import '../../ui/pages/register.js';
import '../../ui/pages/login.js';

process.env.MAIL_URL ='';


//Router.route('/register');
//Router.route('/login');
Router.configure({
    layoutTemplate: 'main'
});


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');


Router.route('/', {
    template: 'home'
});
// // Content Protection
// Router.plugin('ensureSignedIn', {
//     except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword','main']
// });

