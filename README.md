# Duplicate path segments in Webpack

This repository demonstrates a problem where webpack repeats part of the path when dynamically importing a chunk within a web worker.

This was discovered while using [Create React App](https://github.com/facebook/create-react-app#readme), but might be an issue with [webpack](https://webpack.js.org/) itself.

## Prerequisites

* [node.js](https://nodejs.org/en/) (I'm using v16.15.0)
* [yarn](https://yarnpkg.com/) (I'm using v1.22.19)

## Steps to reproduce

1. `yarn install`
2. `yarn build`
3. `yarn start-prod`

A browser window will open, showing the default page from create react app.

Open the browser's console and you will see these messages:
```
[Worker] Received: abc 64.3c37598a.chunk.js:2:7979
NetworkError: A network error occurred. 64.3c37598a.chunk.js:2
```

Reload the page with the _Network_ tab open and you will see a `404` entry for a URL like this:
```
http://127.0.0.1:8080/static/js/static/js/975.6b1d0bce.chunk.js
```
Note the duplicate `static/js` segment. The file name is correct. Without the repeated `static/js`, the request would have succeeded.
## Additional notes - debug build works as expected

If you run the site via `yarn start`, the console will show successful output:
```
[webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled. index.js:551
Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools react-dom.development.js:29840
[Worker] Received: abc src_TestWorker_worker_ts.chunk.js:22:11
[Worker] Received: abc src_TestWorker_worker_ts.chunk.js:22:11
[App] Received: Message from another module. 2 App.tsx:9
```

The issue relates to the _production_ configuration of webpack.
