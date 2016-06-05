import "./footer.html";

Template.Footer.events({
  'submit form': function(event) {
    console.log("sub");
    event.preventDefault();
    $('#comments').val('');
    $('#comments').trigger('autoresize');
    $('#comments').focusout();
  }
})
