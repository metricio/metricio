First, create personal API tokens for [CircleCI](https://circleci.com/account/api) and [GitHub](https://github.com/settings/tokens).

## Run on your VM

Using this docker-compose.yml:
```yml
metricio:
  container_name: circle-ci-wall-metricio
  image: epages/circle-ci-wall:latest
  links:
    - "redis:redis"
  ports:
    - "8009:3000"
  restart: "always"
  environment:
    REDIS_SERVER_HOST: "redis"
    CIRCLE_CI_TOKEN: $CIRCLE_CI_TOKEN
    GITHUB_USER: $GITHUB_USER
    GITHUB_TOKEN: $GITHUB_TOKEN

redis:
  container_name: circle-ci-wall-redis
  image: redis:latest
  restart: "always"
```

Just run the following commands:

```sh
export CIRCLE_CI_TOKEN=<your-token>
export GITHUB_USER=<your-user-name>
export GITHUB_TOKEN=<your-token>
docker-compose up -d
```


## Local development
1. `git clone https://github.com/depoulo/Circle-CI-Wall.git && cd Circle-CI-Wall`
1. `npm install`
1. `export CIRCLE_CI_TOKEN=<your-token>` (see above)
1. `export GITHUB_USER=<your-user-name>` (see above)
1. `export GITHUB_TOKEN=<your-token>` (see above)
1. `npm start`
1. navigate to http://localhost:3000

## Contributing
1. fork project
1. hack around
1. `npm run lint`
1. `npm test`
1. push your changes
1. open a pull request

####  See the [Docs](https://metricio.co) for requirements, setup and customisation.

## License
Distributed under the [MIT license](LICENSE)
