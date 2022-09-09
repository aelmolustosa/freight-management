import { app } from "./app";

app.listen(Number(process.env.SERVER_PORT), "0.0.0.0", () =>
  console.log(`Server running ${process.env.SERVER_PORT}!`)
);
