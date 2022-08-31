import { ensureFileSync } from "fs";

interface iRoute
{
    name: string;
    realPath: string;
    relativePath: string;
    urlPath: string;
}

/**
 * Map your Routes into a table
 * @param routesPath (not required): relative path from this file to your routes [default ./routes/]
 */
export class RouteScanner
{
    routes: Array<iRoute>;
    basePath: string;
    basePathRelative: string;

    constructor(routesPath="../routes")
    {
        this.routes = [];
        this.basePath = Deno.realPathSync(routesPath);
        this.basePathRelative = routesPath;

        this.parseDir(routesPath);
    }

    /**
     * Loop through directories and parse routes to files
     * @param path: path to parse
     */
    parseDir(path: string)
    {
        const files = Deno.readDirSync(path);

        for (const file of files)
        {
            const filePath = Deno.realPathSync(`${path}/${file.name}`);

            if (file.isFile)
                this.parseRoute(file.name, filePath);
            else if (file.isDirectory)
                this.parseDir(filePath);
            else
                console.warn(file.name, "isn't file or directory");
        }
    }

    /**
     * Mainly formats the urlPath
     * @param fileName: file name + .type (/home/path/to/file.txt => file.txt)
     * @param path: (/path/to/file.txt)
     */
    parseRoute(fileName: string, path: string): void
    {
        if (fileName[0] == "_")
            return

        // difference is that the second one has ./routes iside it (aka is relative to exec scr)
        const relativePathClear = path.replace(this.basePath, "");
        const relativePath = this.basePathRelative + relativePathClear;
        const name = relativePathClear.split("/")[-1];
        let urlPath = relativePathClear.split(".")[0];
        urlPath = urlPath.replace("index", "");

        const route = {
            name,
            realPath: path,
            relativePath,
            urlPath,
        }

        this.routes.push(route);

        // get the config file if any
        // get the default export
        // create page from default export
        // add {route: page} to the router
    }
}

/**
 * Load Routes from route array into separate file, which can be used further
 */
export class RouteGenerator
{
    routes: Array<iRoute>;
    outFilePath: string;

    constructor(routes: Array<iRoute>, outFilePath="./routes.gen.ts")
    {
        ensureFileSync(outFilePath);

        this.routes = routes;
        this.outFilePath = Deno.realPathSync(outFilePath);

        const path = Deno.realPathSync(outFilePath);
        console.log(path);

        this.generateManifest();
    }

    generateManifest()
    {
        let str = `//AUTOMATICALLY GENERATED CODE, regenerates everytime any RoutesGenerator is run \n`;
        for (const [index, route] of this.routes.entries())
        {
            str += `import * as $${index} from "${route.relativePath}";\n`;
        }
        str += "\nconst manifest = { \n\troutes: [\n";

        for (const [index, route] of this.routes.entries())
        {
            str += `\t\t{ urlPath: "${route.urlPath}", module: $${index}, relativePath: "${route.relativePath}"}, \n`;
        }
        str += "\t], \n";
        str += "\tbaseUrl: import.meta.url,\n";
        str += "} \n\nexport default manifest;\n\n";

        Deno.writeTextFile(this.outFilePath, str);
    }
}

export default function generateRoutesFile(routesPath="../routes")
{
    const scanner = new RouteScanner(routesPath);
    const _ = new RouteGenerator(scanner.routes);
}
