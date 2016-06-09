import "./footer.html";

Template.Footer.events({
  'submit form': function(event) {
    console.log("sub");
    event.preventDefault();
    $('#comments').val('');
    $('#comments').trigger('autoresize');
    $('#comments').focusout();
    const $message = $('<span>Your feedback has been received. Thank you for your help                       !</span>');
    Materialize.toast($message, 2000)
  }
})
