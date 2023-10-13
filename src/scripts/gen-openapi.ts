import { exit } from "process";
import handler from "routes";

const document = handler.getOpenAPIDocument({
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Access Control Backend API",
  },
});

console.log(JSON.stringify(document, null, 2));
exit(0);
