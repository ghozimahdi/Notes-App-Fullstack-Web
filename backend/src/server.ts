import 'reflect-metadata';
import {App} from "./app";

(async () => {
  await main();
})();

async function main() {
  const server = new App();
  await server.start();
}