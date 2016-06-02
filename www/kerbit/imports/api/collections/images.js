export const Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {path: "~/uploads"})]
});

if (Meteor.isServer) {
  Meteor.publish('images', function imagesPublication() {
    return Images.find({});
  });
}