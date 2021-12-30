'use strict';


import http from "http";
import fs from "fs";
import { fileURLToPath } from 'url';
import {join, dirname } from "path";

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));// без этого __dirname не работает в ESM
const indexPath = join(__dirname, 'index.html');


/**
 * возвращает массив с именем файла/папки и путем до файла/папки
 * @param {string} path
 * @param {string} filename
 * @returns {Array}
 */
const getPathway = (path, filename) => {
  return [
    join(path, filename),
    filename
  ]
};


/**
 * формирует массив ссылок из списка файлов/папок и вставляет в index.html
 * @param {string} filepath
 * @param {string} url
 * @returns {string}
 */
const getLinks = (filepath, url) => {
  const listFiles = fs.readdirSync(filepath);
  const listFilesWithPath = listFiles.map(filename => getPathway(url, filename))
  const links = listFilesWithPath.map(([filepath, filename]) => `<li><a href="${filepath}">${filename}</a></li>`)
  return fs.readFileSync(indexPath, 'utf8').replace(/#links/gi, links.join(''));
};


http.createServer((request, response) => {

  const url = request.url;
  const fullPath = join(process.cwd(), url);

  if (!fs.existsSync(fullPath)) return response.end("Not found");

  if (fs.lstatSync(fullPath).isFile()) return fs.createReadStream(fullPath, 'utf8').pipe(response);

  response.writeHead(200, 'OK', {
    'Content-Type': 'text/html'
  });
  response.end(getLinks(fullPath, url));
}).listen(port, () => console.log(`Listen on port ${port}...`));

