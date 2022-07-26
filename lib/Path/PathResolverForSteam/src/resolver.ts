import reg from "./reg"
import path from "path"
import fs from "fs-extra"


const STEAM_REG_KEY: string = "\\Software\\Valve\\Steam";
const STEAM_REG_VAL: string = "SteamPath";
const STEAM_APPS: string = "steamapps";
const STEAM_APP_ID: string = "620980";

export default class PathResolver {
  public static async findPath() {

  const steamPath = await this.findSteamApp();
  const steamLibFolder = path.join(steamPath,STEAM_APPS,"libraryfolders.vdf");
  
  const steamLibraries = this.findSteamLibraries(steamLibFolder);
  if(steamLibraries.length === 0) return undefined;

  const mainfest = this.findMainfest(steamLibraries);
  const mainfestLines = fs.readFileSync(mainfest.mainfest);
  return this.parseManifest(mainfestLines,mainfest.library);    
  }

  private static parseManifest(manifestLines: string, library: string) {
    const regex = /\s"installdir"\s+"(.+)"/;
    const [installDir] = manifestLines
      .split("\n")
      .filter((line) => line.match(regex))
      .map((line) =>
        (regex.exec(line) as RegExpMatchArray)[1].replace(/\\\\/g, "\\")
      );

    return path.join(library, "common", installDir);
  }

  private static findSteamLibraries(libFolderPath:string) {
    const libFolder = fs.readFileSync(libFolderPath,"utf-8");

    const regex = /\s"\d"\s+"(.+)"/;
    const libraries = libFolder
      .split("\n")
      .filter((line: string) => line.match(regex))
      .map((line: string) =>
        (regex.exec(line) as RegExpExecArray)[1].replace(/\\\\/g, "\\")
      )
      .map((line: string) => path.join(line, "steamapps"));

    return libraries;
  }

  private static async findSteamApp():Promise<string> {
    const path = await reg(STEAM_REG_KEY,STEAM_REG_VAL,"HKCU");

    if(path){
      return path;
    }

    throw Error("can't find steam installtion location");
  }

  private static findMainfest(steamLibraries: Array<string>):{mainfest:string, library:string} {
    const appMainfest = `appmanifest_${STEAM_APP_ID}.acf`;

    let findLibrary = steamLibraries.find( (library) => {
      try{
        const dirs = fs.readdirSync(library);
        let findMainfest = dirs.find((eachFile) => {
          if(eachFile === appMainfest)
            return true;
          return false;
        });
        
        if(findMainfest)
          return true;
        return false;
        
      }catch(err){
        console.log(err);
        return false;
      }
    });

    if(findLibrary) {
      return {mainfest: path.join(findLibrary,STEAM_APPS,`appmanifest_${STEAM_APP_ID}.acf`),library:findLibrary};
    }

    return {mainfest: "",library:""};

  }
  
}

