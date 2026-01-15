import { app } from "./app";
import 'dotenv/config'

const port: number = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
