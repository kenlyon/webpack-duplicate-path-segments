/* eslint no-restricted-globals: 0 */
const worker: Worker = self as any;

worker.addEventListener("message", async (event) => {
    const data = event.data;
    console.log("[Worker] Received:", data);
    // This dynamic import is put into a separate chunk by webpack.
    // In a production build, the loading of this module fails with a duplicate "static/js" in the path.
    const { message } = await import("./OtherModule");
    worker.postMessage(message);
});

export {};
