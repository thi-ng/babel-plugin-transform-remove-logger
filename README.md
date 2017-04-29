# babel-plugin-transform-remove-logger

Intended for multi-level logger abstractions, this transformer
removes logging calls for selected log levels. For example,
if our logger supports these levels: `fine`, `debug`, `info`, `warn`,
we might want to remove `fine` & `debug` messages for production builds...

Which logging calls are to be elided can be configured via the `LOG_LEVELS` env var.
See example below. By default only `fine` calls are removed.

For each level, the following call patterns are matched:

- `logger.<level>(...)`
- `LOGGER.<level>(...)`
- `*.logger.<level>(...)`
- `*.LOGGER.<level>(...)`

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

### Via CLI

```sh
$ LOG_LEVELS=fine,debug babel --plugins transform-remove-logger script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-remove-logger"]
});
```

## License

© 2017 Karsten Schmidt, MIT licensed