import "./footer.html";

Template.Footer.events({
  'submit form': function(event) {
    event.preventDefault();
    $('#comments').val('');
    $('#comments').trigger('autoresize');
    $('#comments').focusout();
    const $message = $('<span>Your feedback has been received. Thank you for your help                       !</span>');
    Materialize.toast($message, 2000)
  }
})

Template.Footer.helpers({
  isHome() {
    var routeName = new ReactiveVar('');
    Tracker.autorun(function() {
      routeName.set(FlowRouter.getRouteName());
    });
    return routeName.get() === 'Home';
  }
});