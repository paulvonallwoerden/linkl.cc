# linkl.cc

The best URL shortening service on the web.

## How to deploy on Google Cloud

> Note that these steps may involve payments to Google.

### Prerequisites

0. Create a project & enable billing.
1. Setup Cloud Sql and create an instance.
2. [Enable the sql api](https://console.cloud.google.com/flows/enableapi?apiid=sqladmin).
3. Enable App Engine.

### Deploy

```bash
# Configure.
# You may use https://cloud.google.com/appengine/docs/standard/nodejs/config/appref as reference.
cp app.example.yaml app.yaml
vi app.yaml

# Deploy.
yarn deploy
```

## How to develop

```bash
# Install required dependencies.
yarn

# Set environment variables.
cp .env.example .env
vi .env

# Start the development server.
yarn start:dev

# Before pushing changes you may lint your code.
yarn lint
# or
yarn lint:fix
```

## Available environment variables

| Key              | Default   | Description                           |
| ---------------- | --------- | ------------------------------------- |
| APP_PORT         | 3000      | The port the server should listen on. |
| MYSQL_HOST       | 127.0.0.1 | Mysql host.                           |
| MYSQL_PORT       | 3306      | Mysql port.                           |
| MYSQL_SOCKETPATH | -         | Mysql socketpath.                     |
| MYSQL_USER       | -         | Mysql username.                       |
| MYSQL_PASSWORD   | -         | Mysql user password.                  |
| MYSQL_DATABASE   | -         | The name of the database to use       |

## License

MIT
