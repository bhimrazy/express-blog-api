<p align="center">
  <img height="400" width="auto" src="https://user-images.githubusercontent.com/46085301/196043714-8ac5ad0d-1286-4ab6-aa6b-c1e4cdccf3d0.png">
</p>
  
# A Blog REST API App using ExpressJs, MongoDB, NodeJs and Typescript.
This repo helps you to get started with ExpressJs, MongoDB, NodeJs and Typescript in docker Environment.

## Setup and Run Locally with or without using Docker

Commands

  ```bash
      # clone github repo
      $ git clone https://github.com/bhimrazy/express-blog-api
      $ cd express-blog-api
      $ cp .env.example .env
      
      # Run without using docker
      # SET DATABASE_URL
      $ npm install
      $ npm run dev
      
      # Run with docker      
      # start containers
      $ docker-compose up -d
      # start containers
      $ docker-compose up -d
      # stop containers
      $ docker-compose down
  ```
## Directory Structure
```
.
├── dist/                                # Build files
├── public/                              # Contains static files
├── src/                                 # All 
│   ├── configs/                         # Contains all the configurations
│   ├── models/                          # Contains all the database schema and models
│   ├── services/                        # Contains all the services
│   ├── controllers/                     # Contains all the controllers
│   ├── middlewares/                     # Contains all the middlewares
│   ├── validators/                      # Contains all the request validators
│   ├── serializers/                     # Contains all the serializers
│   └── routes/                          # Contains all the routes
├── tsconfig.json                        # Typescript Config
├── index.ts                             # Index file
├── package.json
├── package-lock.json
└── README.md
```

## API Reference

#### Get Home URL

```
  GET /api/v1/
```

#### Register User

```
  POST /api/v1/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `name`   | `string` | **Required**. Your Name    |
|  `email`  | `string` | **Required**. Your Email   |
|`password` | `string` | **Required**. Your Password|

#### Login User

```
  POST /api/v1/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `email`  | `string` | **Required**. Your Email   |
|`password` | `string` | **Required**. Your Password|

#### Blogs API

```
  GET     /api/v1/blogs/
  GET     /api/v1/blogs/:id
  POST    /api/v1/blogs/
  PUT     /api/v1/blogs/:id
  DELETE  /api/v1/blogs/:id
```
## References


## License

[MIT](https://github.com/bhimrazy/express-blog-api/blob/main/LICENSE)

<!-- docker exec -it <container-id> bash -->
<!--
mongosh
show dbs
show users
use db_name
mongo --port 27017 -u username -p password --authenticationDatabase mydbone
express-jsdoc-swagger

https://blog.appsignal.com/2022/08/17/build-a-crud-app-with-nodejs-and-mongodb.html
https://blog.appsignal.com/2022/09/14/secure-your-nodejs-app-with-json-web-tokens.html
https://jayeshchoudhary.hashnode.dev/how-to-easily-validate-request-data-using-express-validator-in-nodejs
 -->

