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

## API Reference

#### Get Home URL

```http
  GET /api/v1/
```

#### Register User

```http
  POST /api/v1/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `name`   | `string` | **Required**. Your Name    |
|  `email`  | `string` | **Required**. Your Email   |
|`password` | `string` | **Required**. Your Password|

#### Login User

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `email`  | `string` | **Required**. Your Email   |
|`password` | `string` | **Required**. Your Password|

#### Get All Blogs

```http
  GET /api/v1/blogs/
```
## References


## License

[MIT](https://github.com/bhimrazy/express-app-with-docker-setup/blob/master/LICENSE)

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

