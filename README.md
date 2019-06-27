# bbCMS Storage Service
This is a single microservice as a part of bbCMS application. It is responsible for managing files storage.

### Requirements
It is necessary to create the `.env` file in root directory with below environment variables (the `.env` file is used by
`dotenv` module to load the variables):
- `DB_HOST`
- `DB_PASSWORD`
- `DB_USER`
- `DB_DIALECT`
- `DB_NAME`
- `REGISTRY_HOST` - host of the Service Registry for the application
- `REGISTRY_PORT` - port on which the Registry is running
- `PORT` - Storage Service port

All of those above environment variables can be loaded in any known way, however they must be set in order for the 
service to work properly.

### Dependencies
Install the node modules via `npm install`

###
In order to start the service run `npm start` which performs set of operations:
- compiles the `src` directory with use of `Gulp`,
- runs `Sequelize` migrations on specified database,
- runs the service via `node dist/index.js` command.

### TODO
List of things that need to be done:
- call the Registry on Service startup in order to register the service with it's current version 