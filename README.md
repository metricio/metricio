[![Build Status](https://semaphoreci.com/api/v1/dannycroft/metricio/branches/master/badge.svg)](https://semaphoreci.com/dannycroft/metricio) [![Maintainability](https://api.codeclimate.com/v1/badges/4118cd99d826d332002c/maintainability)](https://codeclimate.com/github/dannycroft/metricio/maintainability)

![Metricio](./src/assets/logo.png)

Metricio [(🔊)](https://res.cloudinary.com/metricio/video/upload/v1508691679/metricio_b4nmgk.mp3 "pronunciation") is a dashboard framework that helps you display metrics and monitor
systems and APIs.

Simple to get started and quick to create build screens for all your teams.

Metricio has a similar design and achitecture to [Dashing](http://dashing.io/), which was my "goto" framework for dashboards for years. Unfortunately, Dashing is [no longer maintained](https://github.com/Shopify/dashing/issues/711). But if you still prefer to write CoffeeScript and Ruby then that framework is still awesome!

Metricio allows you to:

- Build **widgets** with React components
- Create **jobs** with Node.js and **async/await**
- Support for multiple **dashboards**
- CRON like scheduling with [node-scheduler](https://github.com/node-schedule/node-schedule)
- Caching handled with [Redis](https://redis.io/)
- Event-based communication with [socket.io](https://socket.io/)
- Number formatting with [Numeral](http://numeraljs.com/)

The UI aims to use little resource as possible. Enabling your dashboards to run without crashing for prolonged lengths of time on even the most neglected Raspberry Pi.

####  See the [Docs](https://metricio.github.io/metricio-docs/) for more information

![Example](./src/assets/metricio.gif)


### Test

```
npm run test
```

### Coverage

```
npm run coverage
```

### Contributing

Any help is welcomed and appreciated.

## License
Distributed under the [MIT license](LICENSE)
