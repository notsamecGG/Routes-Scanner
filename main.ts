import { RouteScanner, RouteGenerator } from "./routesGen.ts";
import generateRouter from "./routerGen.js";

export default async function generate(routesPath="../routes")
{
    const cwd = Deno.cwd();
    Deno.chdir(import.meta.url.replace("main.ts", "").replace("file://", ""));
    routesPath = routesPath.replace(".", "..");

    const scanner = new RouteScanner(routesPath);
    const _ = new RouteGenerator(scanner.routes);

    generateRouter();

    // extract the router
    const router = (await import("./router.gen.tsx")).default;
    
    Deno.chdir(cwd);

    return router;
}

export { createPage } from "./routerGen.js";
