import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  folderName: { type: String, default: "root" },
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  fileURL: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  Title: { type: String, default: "" },
});

export default mongoose.model("File", fileSchema);



