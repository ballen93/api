#!/usr/bin/env node
"use strict";
var Path = require("path");

require("shelljs/global");
set("-e");

mkdir("-p", "web_deploy");

cp("-R", "web/*", "web_deploy/");

exec("npm run swagger bundle --        -o web_deploy/swagger.json");
exec("npm run swagger bundle -- --yaml -o web_deploy/swagger.yaml");

var SWAGGER_UI_DIST = Path.dirname(require.resolve("swagger-ui"));
console.log("================Just swaggering through");
console.log(SWAGGER_UI_DIST);
rm("-rf", "web_deploy/swagger-ui/");
cp("-R", SWAGGER_UI_DIST, "web_deploy/swagger-ui/");
console.log("=================aaarrrgghhh");
sed(
  "-i",
  "http://petstore.swagger.io/v2/swagger.json",
  "../swagger.json",
  "web_deploy/swagger-ui/index.html"
);
console.log("========================finished petstore");