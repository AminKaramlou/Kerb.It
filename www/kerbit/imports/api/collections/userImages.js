

export const UserImages = new FS.Collection("userImages", {
  stores: [new FS.Store.GridFS("userImages", {path: "~/uploads/"})],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('userImages', function imagesPublication() {
    return UserImages.find({});
  });

  //TODO: Secure images database by adding relevant allow and deny

  UserImages.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    download: function(){
      return true;
    }
  });
}
