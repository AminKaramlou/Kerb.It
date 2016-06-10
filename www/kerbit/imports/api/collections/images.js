

export const Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {path: "~/uploads"})],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('images', function imagesPublication() {
    return Images.find({});
  });

  //TODO: Secure images database by adding relevant allow and deny

  Images.allow({
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
