# MAT2 Quasar Frontend (PWA)
![](mat-frontend.gif)


This is a frontend for [MAT2-web](https://0xacab.org/jvoisin/mat2-web).

# How To Deploy

## Environment Variables (Config)
These are the config environment values that **MUST** be set to create a build.

| Env Variable             | Example Value            | Explanation                                |
|--------------------------|--------------------------|--------------------------------------------|
| MAT_API_HOST_PLACEHOLDER | https://api.mat2web.dev/ | The url of the API (with slash at the end) |
| FRONTEND_URL_PLACEHOLDER | https://mat2web.dev/     | The url where the frontend is hosted       |

The following variables are **optional** and must match the API configuration.

| Env Variable     | Default Value | Explanation                                              |
|------------------|---------------|----------------------------------------------------------|
| MAX_UPLOAD_SIZE  | 16777216      | Max file size for an uploaded file (16MB default)        |
| MAX_UPLOAD_FILES | 10            | The number of files that can be uploaded simultaneously. |

## Manual Deployment with custom build

1) Install dependencies: `yarn install` and add the quasar cli `yarn global add @quasar/cli`
2) Export all needed env variables. Alternatively you can define the config values in the `quasar.conf.js` file
 on `build.env`. E.g. the following line: `API_URL: JSON.stringify(process.env.MAT2_API_URL_PROD)` and change it to:
 `API_URL: 'https://mybackend.gnu/'`
3) `quasar build -m pwa`
4) Copy the files from `./dist/pwa` to your hosting.
5) Enjoy :)

## Deployment with Docker
**Registry Frontend:** https://0xacab.org/jfriedli/mat2-quasar-frontend/container_registry

**Registry Backend:** https://0xacab.org/jvoisin/mat2-web/container_registry
You can find the config env variables above.
A minimal example taken from a [docker-compose.yml](https://0xacab.org/jfriedli/mat2-web-demo/-/blob/main/docker-compose.yml)

```yaml
version: '3'

services:
  frontend:
    image: registry.0xacab.org/jfriedli/mat2-quasar-frontend:develop
    environment:
      -  MAT_API_HOST_PLACEHOLDER=https://api.matweb.info/
      -  FRONTEND_URL_PLACEHOLDER=https://matweb.info/
    ports:
      - 127.0.0.1:4000:8080
```

# Contribute

## Up and Running for development
To start developing clone this repository and run `docker compose up`. If
this was successful you can access the app on:
`localhost:8080`. This will start the backend as well
 using it's latest docker image. Codechanges will trigger an instant update in your browser.
 If you update/add/remove dependencies you'll have to rebuild the container: `docker-compose up --build`.


 If you don't want to use `docker compose`.
 1) `yarn install`
 2) `yarn dev`

Make sure you have a running backend instance that you can reference in the `quasar.js` file.

## Branching Workflow
For solving an issue you'll start by creating a branch and merge request for it.
When it's done you'll make a merge request for from your branch into the `develop` branch.

| Branch   |  Description  |
| ---------|:-------------:|
| Develop  | The develop branch MIGHT contain non *operational code |
| Main   | The main branch MUST contain *operational code |

*operational: This means the code itself contains only working features and finished
 tasks that have been tested and are known to be working.

 ### Tags
 We do use tags to mark releases. A tag SHOULD reference the main branch.
 On tag creation you have to submit a changelog.

 ### Configuration
 To set the base url of the backend you have to define
 `MAT2_API_URL_DEV` for dev builds and `MAT2_API_URL_PROD`
 for production builds. If you use the docker environment
 this is customizable in the `docker-compose.yml` file.
 If none of these are set it will default to `http://localhost:5000/` (slash at the end).
 To make sure the open graph tags are working you need to set the
 env variable `FRONTEND_URL_PLACEHOLDER=https://matweb.info/` to the domain name you're
 hosting the frontend.

## Translations
We'd love to receive any translation merge requests :).

## Dependency Management
We do use renovate which checks every night for updates and creates automated merge request.

## E2E Tests
Run the E2E tests: `quasar test --e2e cypress`.
We use the cypress.io framework for testing.
The E2E tests are run during the ci phase.

## Docker
To build the prodcution image: `docker build -t mat-web-frontend .`
The nginx runs as non privileged user.

To start the container: `docker run -ti -p8080:8080 --security-opt no-new-privileges --security-opt seccomp=seccomp.json --read-only --tmpfs /var/www/html  --tmpfs /tmp  mat-web-frontend:latest`
This starts it on your host machine on port 8080.

## Podman
Build: `podman build -t matweb-frontend .`

Run: `podman run -ti --security-opt=no-new-privileges --read-only -p8080:8080  --tmpfs /var/www/html  --tmpfs /tmp --security-opt no-new-privileges --security-opt seccomp=seccomp.json  matweb-frontend`

## Design
You can find the design documents here: https://0xacab.org/jfriedli/mat2-quasar-frontend/-/wikis/Design-Documents
