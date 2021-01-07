# `fe test task widget`

> External widget component for [`EasySize/fe_test_task`](https://github.com/EasySize/fe_test_task).

### Setup

```bash
# clone repo
$ git clone https://github.com/frenchbread/fe_test_task_widget.git && cd fe_test_task_widget

# install dependencies
$ yarn
# - or -
$ npm install

# start the server
$ yarn run start
# - or -
$ npm run start
```

### [`EasySize/fe_test_task`](https://github.com/EasySize) configuration

1. Clone repo, install dependencies and start the server

```bash
# clone repo
$ git clone https://github.com/EasySize/fe_test_task.git && cd fe_test_task

# install dependencies
$ yarn
# - or -
$ npm install

# start the server
$ yarn run serve
# - or -
$ npm run serve
```

2. Add the following widget configuration to `script.js` file (or modify if it already exists)

```js
let configuration = {
  attributes: ['red', 'blue', 'black'],
  placeholder: '.product-color',
  placeholder_text: 'Surprise me with the color'
}

let widget = new Widget(configuration)
setTimeout(widget.start, 2000)
```

### Testing

While [`EasySize/fe_test_task`](https://github.com/EasySize) server is up and running open `http://127.0.0.1:3333` in your browser.

After loading, a button below "color selection" section should appear. Click it and follow steps in opened modal window.

### Tested in follwing dev environment

```
node v15.0.0
npm v7.0.2
yarn 1.22.10
macOS Catalina v10.15.7
FireFox Developer Edition v85.0b5 (64-bit)
```

### License

[MIT](https://github.com/frenchbread/fe_test_task_widget/blob/main/LICENSE)
