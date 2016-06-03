import "./home.html";

Template.Home.events({
  'submit form'(event) {
    event.preventDefault();
    event.target.reset();
  }
})
