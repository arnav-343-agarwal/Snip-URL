import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid(10), // 10 character short code
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);
