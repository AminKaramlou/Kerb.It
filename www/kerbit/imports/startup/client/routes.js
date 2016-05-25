// Import to load these templates
import '../../ui/components/header.js';
import '../../ui/pages/footer.js';
import '../../ui/pages/register.js';


Router.route('/', {
    template: 'home'
});

Router.route('/register');

Router.configure({
    layoutTemplate: 'main'
});
