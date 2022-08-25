import express from "express"

const app = express();
app.use(express.json());
app.get("/", (request, response) => {
  return response.json({message: 'ok'})
} );

app.listen(3004, '0.0.0.0');

export { app }