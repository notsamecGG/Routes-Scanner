# Routes Scanner

This is a little deno feature which helps you with auto mapping your routes into an OAK router.
--
I recommend to move all of the files from this repo into separate file, which can be then put into the project. Because there's a bit of auto generated code, that could litter your directories. :)

Your routes should export default react/preact component and can export {config}, where you can specify route's method and title

1. import generate from "routerGenerator/main.ts";
1. const router = await generate("./routes");
1. done :)

You should be all set up now!

(It's a small project, so there may be some bugs...

actually a lot of them, :)) )
