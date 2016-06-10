import '../imports/api/methods.js';
import '../imports/startup/server/index.js';

AccountsTemplates.configure({
    reCaptcha: {
        secretKey: "6LfyASETAAAAAFYOtePoNAYCKx8WlmyFHFrWkQiI"
    }
});

Accounts.onCreateUser(function(options, user) {
    user.rating = null;
    user.lastLoc = null;
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user
});

Meteor.publish(null, function() {
    return Meteor.users.find(this.userId, {fields: {rating: 1,  lastLoc: 1}});
});

Meteor.startup(() => {
  // code to run on server at startup
});
