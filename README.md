<p align="center">
  <img width="250" height="120" src="https://hasura.io/blog/content/images/downloaded_images/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4/1-4KhmpXFJ_Etczs6awRnAbg.png">
</p>
  
# Express Docker App 
This repo helps you to get started with ExpressJs in docker Environment.


## Docker
  
- Build Command
  ```bash
      docker build . -t your-name/express-docker-app

  ```
- Run Command
  ```bash
      docker run -p 8000:8080 -d your-name/express-docker-app

  ``` 
- List Containers
  ```bash
      docker ps

  ```
- Stop Command
  ```bash
      docker stop <container_id>

  ``` 

## Run Locally

Clone the project

```bash
  git clone https://github.com/bhimrazy/express-app-with-docker-setup
```

Go to the project directory

```bash
  cd express-app-with-docker-setup
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

[![App Screenshot](https://i3.ytimg.com/vi/SgztwJYj1Es/maxresdefault.jpg)](https://www.youtube.com/watch?v=SgztwJYj1Es)

## References

[Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

  
## License

[MIT](https://github.com/bhimrazy/express-app-with-docker-setup/blob/master/LICENSE)

  
