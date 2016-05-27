import '../../ui/pages/';
import '../../ui/layouts/';

Router.route('/', {
  template: 'home'
});
Router.route('/home', {
  template: 'driverHome'
});
Router.route('/request');
Router.route('/my-requests');

process.env.MAIL_URL ='';

Router.configure({
    layoutTemplate: 'app-layout'
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'app-layout',
    redirect: '/request'
});
AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/register',
    template: 'register',
    layoutTemplate: 'app-layout',
    redirect: '/'
});
AccountsTemplates.configureRoute('verifyEmail');

// // Content Protection
// Router.plugin('ensureSignedIn', {
//     except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword','main']
// });

