const store = require('../store');
const uuid4 = require('uuid/v4');

module.exports = {
    getComments(req, res) {
        let post = store.getPost(req.params.postId);
        res.status(200).send(post.comments);
    },
    addComment(req, res) {
        let post = store.getPost(req.params.postId);
        let data = req.body;
        data.id = uuid4();
        post.comments.push(data);
        res.status(201).send({id: data.id});
    },
    updateComment(req, res) {
        let post = store.getPost(req.params.postId);
        let oldComment = post.comments.find(iter => { return iter.id == req.params.commentId; });
        let index = post.comments.indexOf(oldComment);
        let newComment = Object.assign(oldComment, req.body);
        post.comments.splice(index, 1, newComment);
        res.status(202).send(newComment);
    },
    removeComment(req, res) {
        let post = store.getPost(req.params.postId);
        let comment = post.comments.find(iter => { return iter.id == req.params.commentId; });
        let index = post.comments.indexOf(comment);
        post.comments.splice(index, 1);
        res.status(204).end();
    }
}