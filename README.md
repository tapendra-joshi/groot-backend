# GrootBackend
This is Node.js and express project serving APIs to search and create users. This backend server implements https://github.com/tapendra-joshi/groot-orm as shared orm and uses functionality exposed by groot-orm.

## Prerequisites:

### Install Node JS

Please refer https://nodejs.org/en/ to install nodejs.

## Installation:
Run below command to install

`npm install https://github.com/tapendra-joshi/groot-backend.git#master`

## Usage

- Clone the project from https://github.com/tapendra-joshi/groot-backend.git.
- Install all npm packages
`npm install`
- Setup `.env` file as below sample file.
```
SERVER_PORT=8001
DBPORT=5432
DBNAME=test_db
USERNAME=tappu
PASSWORD=tappu
HOST=localhost
DBTYPE=postgres
```

**Note: Attributes defined in .env will define the database to connect and port to run the server.

- Run Application using following command

`node .\index.js`

The application will run on the the defined port in `.env` i.e 8001.

