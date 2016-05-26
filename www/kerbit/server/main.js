import '../imports/api/methods.js';

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: "6LfyASETAAAAAFYOtePoNAYCKx8WlmyFHFrWkQiI"
    }
});

Markers = new Mongo.Collection('markers');

Meteor.startup(() => {
  // code to run on server at startup
});
