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

  // method that obtains a set of scripts to load dynamically
  // to load each script parallely by resolving all promises
  // commenting below since it allows for parallel promise resolving
  // load(...scriptsToLoad: string[]): Promise<any> {
  //   const promises: Promise<any>[] = [];
  //   scriptsToLoad.forEach(name => promises.push(this.loadScript(name)));
  //   return Promise.all(promises);
  // }
  load(...scriptsToLoadSequentially: string[]): void {
      this.loadScript(scriptsToLoadSequentially[0])
        .then((loadedFirstScript) => {
          this.loadScript(scriptsToLoadSequentially[1]);
        })
        .then(loadedSecondScript => console.log('All script loaded sequentially'))
        .catch(error => console.log(error));
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
          // console.log(scriptToLoad);
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
