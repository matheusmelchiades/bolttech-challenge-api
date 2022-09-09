# bolttech-challenge-api

Hapi.js

## Technologies

* [Hapi](https://hapi.dev/) - Framework server
* [Node](https://nodejs.org/en/) - Runtime builder

## Enviroments

* development
* homolog
* production

## Setup

After copying and renaming as per the script below, customize the configs as you need.

```
> cp .envs/<Enviroment>.env .env
```

## Install

```bash
> yarn
ou
> npm i
```

## Development

```bash
> yarn run dev
ou
> npm run dev
```

## Launch the Application

```
> yarn start
ou
npm start
```

***

## Architecture

* [app](./app) - It aims to group the services that make up the application.
  * [api](./app/api)
    * [components](#component) - It aims to organize according to each business rule. (ex: users, posts)
    * [services](./app/api/services) - It aims to centralize services such as socket, email and others.
* [config](./config.py) - Centralization of constants, for the application.
* [engine](./engine/) - Responsible for loading dependencies, plugins, middlewares and functions for server startup
* [server](./server.js) - Responsible for starting the application.

### Component

* [routes](./app/main/routes.py) - Its objective, in the determination of which action/method must be executed in the application, creating an external access.
* [controller]() Responsible for handling and controlling functionality between routing and application modeling.
* [model](./examples/model.py) - It is responsible for handling external input data, applying the proposed business rule and sending it or not to the database storage, through the DAO layer.
* [dao](./examples/dao.py) - It is responsible for creating an abstraction layer for data persistence, thus separating the business rule from those for accessing the bank.
