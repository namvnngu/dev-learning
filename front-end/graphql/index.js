import express from "express";
import resolvers from "./resolver";
import schema from "./schema";
import { graphqlHTTP } from "express-graphql";

const app = express();

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Up and running with");
});

app.listen(8080, () => console.log("Running at 8080"));

