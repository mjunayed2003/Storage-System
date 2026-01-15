import "dotenv/config";

const corsOption: string[] = [process.env.ORIGIN1].filter(Boolean) as string[];

export const corsSetup = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) {
      return callback(null, false);
    }

    if (corsOption.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(Error("block for origin not support"), false);
    }
  },
  credentials: true,
};
