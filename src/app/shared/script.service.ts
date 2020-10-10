import { Injectable } from '@angular/core';

interface Script {
  name: string;
  src: string;
  loaded?: boolean;
  status?: string;
}

export const scriptStore: Script[] = [
  {
    name: 'pdfMake',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.59/pdfmake.min.js',
  },
  {
    name: 'vfsFonts',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.59/vfs_fonts.js',
  },
];
@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private scripts: Script[] = [...scriptStore];

  constructor() {  }

  // method to load each script recursively by resolving all promises
  load(...scriptsToLoad: string[]): Promise<any> {
    const promises: Promise<any>[] = [];
    scriptsToLoad.forEach(name => promises.push(this.loadScript(name)));
    return Promise.all(promises);
  }

  // script loading logic
  loadScript(name: string): Promise<any> {
    const scriptToLoad: Script = this.scripts.find(script => script.name === name);
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (scriptToLoad.loaded) {
        resolve(scriptToLoad);
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptToLoad.src;
        script.onload = () => {
          scriptToLoad.loaded = true;
          scriptToLoad.status = 'Loaded';
          console.log(scriptToLoad);
          resolve(scriptToLoad);
        };
        script.onerror = (error: any) => {
          scriptToLoad.loaded = false;
          scriptToLoad.status = 'Not Loaded';
          resolve(scriptToLoad);
        };
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
