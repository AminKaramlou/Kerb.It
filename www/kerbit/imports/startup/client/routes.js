import '../../ui/pages/';
import '../../ui/layouts/';

Router.route('/', {
  template: 'home'
});

Router.route('/register');

Router.configure({
    layoutTemplate: 'app-layout'
});
