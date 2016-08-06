# Experimental browser build of [Discordie](https://github.com/qeled/discordie/)

- Requires webpack to build.
- This configuration is **not supported: things may or may not work**.
- Obviously audio streaming doesn't work since browsers don't support UDP.

## Tested up to receiving `GATEWAY_READY` on

- Chrome 51
- Firefox 49

## Building

```
git clone https://github.com/qeled/discordie-browser.git
cd discordie-browser
npm install
npm install qeled/discordie
npm install -g webpack
webpack
```

Built files will be in the `public` folder.