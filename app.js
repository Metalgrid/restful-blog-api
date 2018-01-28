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
app.use('/posts/:postId/comments', routes.comments.getComments);
app.use('/posts/:postId/comments', routes.comments.addComment);
app.use('/posts/:postId/comments/:commentId', routes.comments.updateComment);
app.use('/posts/:postId/comments/:commentId', routes.comments.removeComment);

/* Run server */
app.listen(3000);
