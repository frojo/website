import * as http from "http";
import * as express from "express";

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 6969;

/* matches all paths (we handle 404 virtually) */
app.use("/*", express.static("../docs"));

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const handleError = (err: any, res: any) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};
