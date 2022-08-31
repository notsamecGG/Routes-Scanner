// AUTOMATICALLY GENERATED CODE, regenerates everytime any RouterGenerator is run 
import { Router, Context } from "oak";
import { createPage } from "./routerGen.js";
import { default as $0Default} from "../routes/index.tsx";

const router = new Router(); 

router.get("/", (context: Context) => {
    context.response.type = "text/html; charset=utf-8";
    context.response.body = createPage(<$0Default/>);
}).get("/auth/login", (context: Context) => {
    context.response.type = "text/html; charset=utf-8";
    context.response.body = "<h1> Empty page <h1/>";
}).get("/auth/:user", (context: Context) => {
    context.response.type = "text/html; charset=utf-8";
    context.response.body = "<h1> Empty page <h1/>";
})

export default router;
