const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const routes = require('./routes');
const validators = require('./middleware/validators');

let app = express();

/* Register middleware */
app.use(errorHandler());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(validators);

app.get('/', (req, res) => {
    res.send("<p>Hi, this is the blog API</p>");
});

/* Blog Posts */
app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPost);
app.put('/posts/:postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.removePost);

/* Blog Post Comments */
app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts/:postId/comments', routes.comments.addComment);
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment);

/* Run server */
app.listen(3000);
