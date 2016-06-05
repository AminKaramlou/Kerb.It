import "./footer.html";

Template.Footer.events({
  'submit .materialize-textarea'(event) {
    event.preventDefault();
    event.target.reset();
  }
})
