const uuid4 = require('uuid/v4');

let store = {
    posts: []
};

let getPosts = () => {
    return store.posts;
}

let getPost = (postId) => {
    if (!postId)
        throw 'Invalid data';

    return store.posts.find(
        (post) => {
            return post.id == postId;
        }
    );
}

let addPost = (data) => {
    let post = Object.assign({}, data);
    post.id = uuid4();
    if (!post.comments) post.comments = [];
    store.posts.push(post);
    return post.id;
}

let updatePost = (postId, data) => {
    let oldPost = getPost(postId);
    let index = store.posts.indexOf(oldPost);
    let newPost = Object.assign(oldPost, data);
    store.posts.splice(index, 1, newPost);
    return newPost;
}

let removePost = (postId) => {
    let index = store.posts.indexOf(getPost(postId));
    let post = store.posts.splice(index, 1);
    return post;
}

module.exports = {
    getPost,
    getPosts,
    addPost,
    updatePost,
    removePost
}