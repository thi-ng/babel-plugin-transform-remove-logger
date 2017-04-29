# babel-plugin-transform-remove-logger

Intended for multi-level logging implementations, this transformer
removes logging calls for selected log levels. For example, if our
logger supports these levels: `fine`, `debug`, `info`, `warn`, we
might want to remove `fine` & `debug` messages for production
builds...

Which logging calls are to be elided can be configured via plugin
options provided in `.babelrc`. See example below. By default only
`fine` & `debug` calls are removed.

For each log level, the following call patterns are matched:

- `logger.<level>(...)`
- `LOGGER.<level>(...)`
- `*.logger.<level>(...)`
- `*.LOGGER.<level>(...)`
- `*.*.logger.<level>(...)`
- `*.*.LOGGER.<level>(...)`

## Installation

```sh
$ npm install babel-plugin-transform-remove-logger
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-remove-logger"]
}
```

...or with options:


```json
{
  "plugins": [["transform-remove-logger", { levels: "fine,debug" }]]
}
```

### Via CLI

```sh
$ babel --plugins transform-remove-logger script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-remove-logger"]
});
```

## License

© 2017 Karsten Schmidt, MIT licensed
