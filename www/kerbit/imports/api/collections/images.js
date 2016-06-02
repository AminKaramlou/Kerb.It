export const Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {path: "~/uploads"})]
});

