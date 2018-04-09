# aws-lambda node rest api with babel webpack

This is small JavaScript open-source example, which provides a example for [AWS Lambda](https://aws.amazon.com/lambda/), [Node.js](http://www.nodejs.org/), [Dynamodb](https://aws.amazon.com/dynamodb/). The example also do deployment process with [Serverless Framework](https://serverless.com/), compile (not exactly word) your ES6 JS code with [Babel JS](https://babeljs.io/) and pack everything with [Webpack](https://webpack.js.org/).

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js v6 or later - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* [Setting AWS credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)
* Install some global node packages
```bash
$ npm install -g serverless webpack mocha
```

## Quick Install
Once you've downloaded the example and installed all the prerequisites, you're just a few steps away from starting to enjoy your first aws lambda function.

```bash
$ npm install
```

## Deploy to AWS
**Note:** We **DO NOT** implement dynamodb local, so we have to deploy the example to AWS first and then run it later. This step should create your dynamodb table in aws.

```bash
$ npm run deploy
```
Or in production

```bash
$ npm run deploy:prod
```

## Running Your Application

Run your application using npm:

```bash
$ npm start
```

Your application should run on port 3000 with the *development* environment configuration.

There are 2 rest apis in the project
* hello: GET http://localhost:3000/hello
* add a todo: POST http://localhost:3000/todo
```bash
curl -H "Content-Type: application/json" -X POST -d '{"content":"xyz"}' http://localhost:3000/todo
```

### Running in Production mode
To run your application with *production* environment configuration:

```bash
$ npm run start:prod
```

## Testing Your Application
You can run the full test suite included with the example with the test task:

```bash
$ npm test
```

## Contributing
We welcome pull requests from the community!

## License
[The MIT License](LICENSE.md)
