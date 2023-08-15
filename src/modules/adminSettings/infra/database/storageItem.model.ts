export const storageItemSchemaDefinition = {
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Format: { type: String },
  Resolution: { type: String },
  Id: { type: String, required: true },
  Active: { type: Boolean },
  Url: { type: String, required: true },
  Duration: { type: Number, required: true },
};
