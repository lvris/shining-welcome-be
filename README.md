## Shining Welcome (be)

基于 Express+prisma(sqlite)+[morgan](https://www.npmjs.com/package/morgan)+[jest](https://www.npmjs.com/package/mocha), 后端好麻烦我不想写啦.

## Project Releted

#### Setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run dev
```

#### Compiles and minifies for production

1. Configue Environment
   - Node & Npm (dev_local 18.14.2 & 9.6.5)
   - Production process manager for Node, like `pm2`
2. Set .env file varibles
3. Edit prisma/schema's generator to Linux
4. Run with certain Node runner

```bash
npm install
vim .env                    // Set Environments, including PORT, DB and Keys
tsc                         // npm run build
pm2 dist/src/index.js
```

##### HTTPS

To enable TLS, just add following code to index.ts.

```javascript
// Certificate
const privateKey = fs.readFileSync('/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
```

##### Prisma

I haven't tried wheather prisma(ORM - sqlite) can work in production environment, so if you encounted any problems, the [official doc](https://prisma.yoga/guides/deployment/deployment-guides) may be helpful.

At least, the generator should be modified to make DB operating commands pertain to Linux.

```prisma
datasource db {
  provider      = "sqlite"
  binaryTargets = "debian-openssl-1.1.x"
  url           = env("DATABASE_URL")
}
```
