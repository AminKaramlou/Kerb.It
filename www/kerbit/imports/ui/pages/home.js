import "./home.html";

Template.home.events({
  'submit form'(event) {
    event.preventDefault();
    event.target.reset();
  }
})