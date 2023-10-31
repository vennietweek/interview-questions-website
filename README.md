## Setup guide

Hello! These are the steps I use to set up my project, which is a hybrid of a Create React App project and our professor's template. As such, there are some specific commands that need to be run.

### Docker

The server will be set up on port 3000, so the container should be run on another port:
`docker run -p 127.0.0.1:8000:3000/tcp --platform linux/amd64 --name it5007assignment3 -dit it5007_tutorial:t4 bash`

### Pull code

The usual steps:
1. `git init`
2. `git remote add origin https://github.com/IT5007-2310/assignment-3-latest-vennietweek.git`
3. `git pull origin main`

### Downloading packages

The container node version needs to be updated, otherwise errors will occur:

1. `node -v`: The container version is 10. It needs to be updated to a more recent version for this project.
2. `nvm install node`: Installs latest version of node
3. `nvm use node`: Uses latest version of node

### Initialising the DB

1. `systemctl start mongod`: Start MongoDB service
2. `mongo`: Enter mongo shell
3. `use assignment3db`: Creates database
4. Navigate to `scripts` path in project folder
5. `mongo assignment3db initmongo.js`: Populates database
6. `show dbs`: In Mongo shell, verify that database has been created

### Build and start the server

1. `npm run build`: Create build directory
2. `npm run server`: Runs the server on Port 3000
3. `npm run start`: Runs the React app. When prompted to open in another port, select yes. This should open up localhost:3001, which is where testing should take place (Port 3000 also will display the app, but some components will not be rendered properly).
