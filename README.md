# Auto Restarter

This is a tiny tool to restart automatically a Node.js program when the program ends.

## Install

```bash
npm install -g auto-restarter
```

## Usage

```
Syntax: auto-restarter <file> [msBeforeRestart]
```

## Examples

- This will keep started a file named `test.js`:
  ```bash
  auto-restarter test.js
  ```
- This will keep started a file named `test.js`, waiting 2 seconds between each restart:
  ```bash
  auto-restarter test.js 2000
  ```

## License

MIT License

Copyright (c) 2021 Gauthier THOMAS