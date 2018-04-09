/**
 *
 *
 */

import Todo from './src/Todo';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function executed successfully!'
    })
  };

  callback(null, response);
};

module.exports.addTodo = (event, context, callback) => {
  let { content } = event.body ? JSON.parse(event.body) : {};

  var todo = new Todo(content);
  todo.add()
  .then((response) => {
    return callback(null, response);
  })
  .catch((err) => {
    return callback(null, err);
  });

};
