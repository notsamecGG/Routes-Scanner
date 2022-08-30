import { RouteScanner, RouteGenerator } from "./routesGen.ts";
import generateRouter from "./routerGen.js";

export default async function generate(routesPath="../routes")
{
    const scanner = new RouteScanner(routesPath);
    const _ = new RouteGenerator(scanner.routes);

    generateRouter();

    // extract the router
    const module = await import("./router.gen.tsx");
    return module.default;
}

export { createPage } from "./routerGen.js";
