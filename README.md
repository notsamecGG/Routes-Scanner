#Routes Scanner

This is a little deno feature which helps you with auto mapping your routes into an OAK router.
--
I recommend to move all of the files from this repo into separate file, which can be then put into the project. Because there's a bit of auto generated code, that could litter your directories. :)

1. Create new RouteScanner from routesGen.ts (you can specify relative path to your routes dir)
1. Create new RouteGenerator, initialized with your routes (your RouteScanner.routes)
1. Call generateRouter function from routerGen.ts

You should be all set up now!

(It's a small project, so there may be some bugs...

actually a lot of them, :)) )
