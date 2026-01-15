import bcryptjs from "bcryptjs";

export const hashTextGeneration = async (text: string) => {
  return await bcryptjs.hash(text, 7);
};
