export const files = {
  "lwr.config.json": {
    file: {
      contents: `
        {
          "lwc": { "modules": [{ "dir": "$rootDir/src/modules" },{ "npm": "lightning-base-components" }] },
          "assets": [
            {
              "alias": "assetsDir",
              "dir": "$rootDir/node_modules/@salesforce-ux/design-system/assets",
              "urlPath": "/assets"
            }
          ],
          "routes": [
            {
              "id": "example",
              "path": "/",
              "rootComponent": "example/app",
              "layoutTemplate": "$layoutsDir/main.html",
              "bootstrap": {
                "syntheticShadow": true
              }
            }
          ]
        }
      `
    }
  },
  "package.json": {
    file: {
      contents: `
        {
          "name": "lwr-project",
          "version": "0.0.1",
          "license": "MIT",
          "private": true,
          "type": "module",
          "scripts": {
            "clean": "rm -rf __lwr_cache__",
            "build": "lwr build",
            "dev": "lwr dev",
            "start": "lwr start"
          },
          "dependencies": {
            "@salesforce-ux/design-system": "latest",
            "fs": "^0.0.1-security",
            "lightning-base-components": "latest",
            "lwc": "latest",
            "lwr": "latest",
            "path": "^0.12.7"
          },
          "engines": {
            "node": ">=14.15.4 <19"
          }
        }
      `
    }
  },
  src: {
    directory: {
      layouts: {
        directory: {
          "main.html": {
            file: {
              contents: `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                    <title>LWR + SLDS Example</title>
                    <link rel="stylesheet" href="$assetsDir/styles/salesforce-lightning-design-system.css" />
                  </head>
                  <body>
                    {{{body}}} {{{lwr_resources}}}
                  </body>
                </html>
              `
            }
          }
        }
      },
      modules: {
        directory: {
          example: {
            directory: {
              app: {
                directory: {
                  "app.css": {
                    file: {
                      contents: `
                        main {
                          margin: 30px;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                        }
                        
                        h1 {
                          color: #1798c1;
                        }
                      `
                    }
                  },
                  "app.html": {
                    file: {
                      contents: `
                       <template>
                          <div class="container">
                            <lightning-layout horizontal-align="center">
                              <lightning-layout-item padding="around-medium">
                                <div class="slds-text-heading_large">Sample LWC App</div>
                              </lightning-layout-item>
                            </lightning-layout>
                            <lightning-layout horizontal-align="center">
                              <lightning-layout-item padding="around-medium">
                                <lightning-input onchange={handleOnChange} value={inputVal} label="Enter Name"></lightning-input>
                              </lightning-layout-item>
                              <lightning-layout-item padding="around-medium">
                                <lightning-button label="Click Me!" onclick={handleClick}></lightning-button>
                              </lightning-layout-item>
                            </lightning-layout>
                            <lightning-layout horizontal-align="center">
                              <lightning-layout-item padding="around-medium"><div>Entered Value: {inputVal}</div></lightning-layout-item>
                            </lightning-layout>
                          </div>
                        </template>
                      `
                    }
                  },
                  "app.js": {
                    file: {
                      contents: `
                        import {track,LightningElement} from 'lwc';

                        export default class HelloWorldApp extends LightningElement {
                          @track inputVal = 'Default text';
                        
                          handleOnChnage(event){
                            this.inputVal = event.target.value;
                          }
                        
                          handleClick(event){
                            this.inputVal = 'Changed By Click';
                          }
                        
                        
                          connectedCallback(){
                            //console.log('In connected callback');
                          }
                        
                          renderedCallback(){
                            //console.log('In rendered callback');
                          }
                        }
                      `
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}