import "../components/header.js";
import "../components/footer.js";
import "./home-layout.html";

Template.HomeLayout.helpers({
  /* This is a hack: we are redirecting to the approriate page depending on 
   * whether someone is logged in  or not. We return the current userId as to
   * prevent the optimistic ui to render the home page if someone is logged in
   * */
  redirect() {
    if( Meteor.user() && Meteor.user().profile.isDriver) {
      window.location.replace(FlowRouter.path('DriverHistory'));
    }
    if (Meteor.user() && (! Meteor.user().profile.isDriver)) {
      window.location.replace(FlowRouter.path('ClientHistory'));
    }
    return !Meteor.userId();
  }
});
