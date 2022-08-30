/// <reference path="https://deno.land/std@0.37.0/types/react.d.ts" />
import manifest from "./routes.gen.ts";
import { html } from "./basicHTML.ts";
import { render } from "preact-render-to-string";

export function createPage(components: Element, title="Document"): string
{
    const pageHtml = html;
    pageHtml.title = title;
    pageHtml.getElementById("app").innerHTML = render(components);

    return pageHtml.toString();
}


export default function generateRouter(outFilePath="./router.gen.tsx")
{
    let str = `// AUTOMATICALLY GENERATED CODE, regenerates everytime any RouterGenerator is run 
import { Router, Context } from "oak";
import { createPage } from "./routerGen.ts";\n`;

    for (const [index, route] of manifest.routes.entries())
    {
        const defaultFunc = Object(route.module)["default"];
        if (!defaultFunc)
            continue;

        str += `import { default as $${index}Default} from "${route.relativePath}";\n`;
    }

    str += `\nconst router = new Router(); \n\nrouter`;

    for (const [index, route] of manifest.routes.entries())
    {
        const moduleKeys = Object.keys(route.module);
        let routeConfig = {
            method: "get",
            title: "Hello :)",
        };
        
        // unpack config
        if(moduleKeys.includes("config"))
        {
            const { config } = route.module;
            routeConfig = {...routeConfig, ...config};
        }

        const defaultFunc = Object(route.module)["default"];
        const bodyContent = defaultFunc ? `createPage(<$${index}Default/>)` : `"<h1> Empty page <h1/>"`;

        // generate router file :)
        str += `.${routeConfig.method}("${route.urlPath}", (context: Context) => {
    context.response.type = "text/html; charset=utf-8";
    context.response.body = ${bodyContent};
})`;
    }

    str += `\n\nexport default router;\n`;
    Deno.writeTextFile(outFilePath, str);
}
