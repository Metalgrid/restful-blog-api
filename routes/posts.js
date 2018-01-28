const store = require('../store');

module.exports = {
    getPosts(req, res) {
        res.send(store.getPosts());
    },
    addPost(req, res) {
        res.status(201).send({postId: store.addPost(req.body)});
    },
    updatePost(req, res) {
       let updated = store.updatePost(req.params.postId, req.body);
       res.status(202).send(updated);
    },
    removePost(req, res) {
        store.removePost(req.params.postId);
        res.status(204).end();
    }
}