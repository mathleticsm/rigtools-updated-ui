<p align=center><img src="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/rigtools-bounce.gif" height="170vh"/> <img alt="rigtools" src="https://github.com/user-attachments/assets/f491a85e-9fd7-4fe4-979f-1fa70a1b630e"  PRAHITS RIGTOOOLS height="170vh"></p>

# <p align=center><code>Extension/Devtools code execution</code></p> 
## How to use
```sh
$ git clone https://github.com/mathleticsm/rigtools-updated-ui
$ cd rigtools
$ npm i
# Create a file named `server_config.json`
# Then paste in `{"updater_url":"localhost:7000"}` (Or whatever your websocket URL is)
$ npm start
```
[![Edit mathleticsm/rigtools-updated-ui/draft/gifted-ives](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/mathleticsm/rigtools-updated-ui/draft/gifted-ives?embed=1&file=%2F.codesandbox%2Ftasks.json)

- Then visit `devtools://devtools/bundled/devtools_app.html` in your browser
- Open a new tab and visit `devtools://devtools/bundled/devtools_app.html?experiments=true&ws=*websocket url*`
- Click on `Network`
- Then click on the gray box twice

## Terminology
- Entry
  - Entrypoint (or main script) when running devtools xss.
  - Payload
  - Script passed to extension to run code, such as disabling extensions.
- Chrome URLs
  - Elevated URLs that have extra access to features such as WebUI.
  - Only modify the entrypoint when necessary. If not modified properly, thigns such as the updater will break, do not remove any buttons and reuse ids.

## Release information
- Release 0.0.1
  - This release contains the following things:
    - Updater
    - Extension debugging
    - Devtools debugging
    - Chrome url debugging.
