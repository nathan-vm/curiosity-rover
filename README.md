# Curiosity Rover

## How to run this project ?

First of all, you need install the dependencies, for this prefere use [Yarn](https://classic.yarnpkg.com/en/docs/install), because this repository use [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/), but if prefere use NPM, [use this guide](#using-npm-to-install-and-run)

### Install dependencies

On root folder, run: 

```bash
yarn install
```

after that, you will see something like this on your folder schema
```
├── front
│   ├── node_modules
│   ├── public
│   └── src
│       ├── assets
│       ├── context
│       ├── service
│       └── styles
├── node_modules
└── server
    ├── build
    ├── node_modules
    └── src
        └── __test__

```

### Run the app

After install dependencies, just run on root folder:

```bash
yarn dev
```

Something similar to this is spot on your terminal, just open the link market as `Local:` in your browser. The `listening to:` is the server, you can test it on Insomnia, postman or other prefere software in route `/move`, known more in [this section](#testing-server)

```
  VITE v3.1.4  ready in 460 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
listening to: http://localhost:3333
```

### Testing server

You can test the server using some software to make request, like curl, Postman or even Insomnia. Like this example:

```
curl --request POST \
  --url http://localhost:3333/move \
  --header 'Content-Type: application/json' \
  --data '{
	"position":{"x":0, "y":0, "direction":"N"},
	"movement":"LMLMLMLMM"
}'
```

### Using NPM to install and run

If you don't have yarn, or don't want to use it, it's OK, you still be able to run this project, just open each folder (`/front` and `/server`) on a terminal and run `npm install`, after that you will have now a package-lock.json on each one, dont worrie about then, just ignore it.

Now, with this two terminals opened, just run `npm run dev` on every one.