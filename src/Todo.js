/**
 *
 */

'use strict';
var _ = require('lodash'),
  uuid = require('uuid'),
  AWS = require('aws-sdk'), // eslint-disable-line import/no-extraneous-dependencies
  moment = require('moment'),
  Ajv = require('ajv'),
  ajv = new Ajv({ allErrors: true });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});
const dynamoDb = new AWS.DynamoDB.DocumentClient();


var todoModelSchema = {
  'properties': {
    'id': {
      'type': 'string'
    },
    'content': {
      'type': 'string'
    }
  }
};

var validate = ajv.compile(todoModelSchema);

var createErrorResponse = (statusCode, message) =>({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'application/json' },
  body: { 'message': message }
});

class Todo {
  constructor(content) {
    this.content = content;
  }

  add() {
    return new Promise((resolve, reject) => {
      let promises = _.map(this.recipients, (recipient)=> {
        const params = {
          TableName: process.env.DYNAMODB_TABLE,
          Item: {
            id: uuid.v1(),
            content: this.content,
            createdAt: moment.utc().toISOString(),
            updatedAt: moment.utc().toISOString()
          }
        };
        let valid = this._validate(params.Item);
        if (!valid) {
          return reject(createErrorResponse(422, ajv.errorsText(validate.errors)));
        }
        return dynamoDb.put(params).promise();
      });
      let response;
      Promise.all(promises)
        .then((messages) => {
          response = {
            statusCode: 200,
            body: JSON.stringify(messages)
          };
          return resolve(response);
        })
        .catch((err) => {
          return reject(createErrorResponse(500, err));
        });
    });
  }

  _validate(data) {
    return validate(data);
  }
}
module.exports = Todo;
