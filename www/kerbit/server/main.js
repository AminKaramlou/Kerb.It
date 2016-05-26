import '../imports/api/methods.js';
import '../imports/startup/server/index.js';

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: "6LfyASETAAAAAFYOtePoNAYCKx8WlmyFHFrWkQiI"
    }
});

Meteor.startup(() => {
  // code to run on server at startup
});
