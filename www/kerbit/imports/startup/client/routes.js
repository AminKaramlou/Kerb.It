import '../../ui/pages/';
import '../../ui/layouts/main.js';

Router.route('/', {
  template: 'home'
});

Router.route('/register');

Router.configure({
    layoutTemplate: 'main'
});
