import '../../ui/pages/';
import '../../ui/layouts/';

Router.route('/', {
  template: 'home'
});

process.env.MAIL_URL ='';


//Router.route('/register');
//Router.route('/login');
Router.configure({
    layoutTemplate: 'app-layout'
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

