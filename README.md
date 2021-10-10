# SQL REPL

Just a SQL REPL for web.

## ✨ Features

* 🔍 SQL query editor with syntax highlighting
* ↕️ SQL query editor with Split Panes，so you could resize it as you wish
* 🌛 Darkmode

SQL REPL now support connecting to the following databases:

* SQLite
* MySQL (WIP)

## 💻 Tech Stack

### Server

* better-sqlite3
* dayjs
* koa
* log4js

### Client

* codemirror@next
* Vue 3
* Vite
* naive-ui
* splitpanes
* windicss
* vueuse

## 📖 Usage

### Start the server

The server that provide RESTFul API for sql repl client.

```bash
npm run dev:server
# or
yarn dev:server
```

### Start the client

```bash
npm run dev:client
# or
yarn dev:client
```

### Serve the APP

```bash
npm start
# or
yarn start
```

It will be running at: [http://localhost:3000/](http://localhost:3000/)

## 📄 License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
