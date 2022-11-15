import { Router } from "express";
import { readdirSync } from "fs";



const PATH_ROUTER = `src/routes`
const router = Router();




const cleanFilename = (fileName) => {
    const file = fileName.split('.').shift();
    return file;
}


readdirSync(PATH_ROUTER).filter((filename) => {
    const cleanName = cleanFilename(filename);

    if (cleanName !== "index") {
        import(`./${filename}`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router)
        });
    }
})

export { router }