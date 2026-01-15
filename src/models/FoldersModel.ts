import mongoose from "mongoose";

const FoldersSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  folderName: { type: String },
});


export default mongoose.model("folder", FoldersSchema);
 