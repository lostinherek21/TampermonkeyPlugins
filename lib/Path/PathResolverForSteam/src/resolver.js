import reg from "./reg";
import path from "path";
import fs from "fs-extra";
const STEAM_REG_KEY = "\\Software\\Valve\\Steam";
const STEAM_REG_VAL = "SteamPath";
const STEAM_APPS = "steamapps";
export default class PathResolver {
    static async findPath() {
        const steamPath = await this.findSteamApp();
        const steamLibFolder = path.join(steamPath, STEAM_APPS, "libraryfolders.vdf");
        const steamLibraries = this.findSteamLibraries(steamLibFolder);
        console.log(steamLibraries);
    }
    static findSteamLibraries(libFolderPath) {
        const libFolder = fs.readFileSync(libFolderPath, "utf-8");
        const regex = /\s"\d"\s+"(.+)"/;
        const libraries = libFolder
            .split("\n")
            .filter((line) => line.match(regex))
            .map((line) => regex.exec(line)[1].replace(/\\\\/g, "\\"))
            .map((line) => path.join(line, "steamapps"));
        return libraries;
    }
    static async findSteamApp() {
        const path = await reg(STEAM_REG_KEY, STEAM_REG_VAL, "HKCU");
        if (path) {
            return path;
        }
        throw Error("can't find steam installtion location");
    }
}
PathResolver.findPath();
//# sourceMappingURL=resolver.js.map