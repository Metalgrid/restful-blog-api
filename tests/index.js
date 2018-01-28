const request = require('sync-request');
const mocha = require('mocha');
const expect = require('expect');

let customHeaders = {
    'content-type': 'application/json'
}

let initialPost = {
    title: "My frist blog post!",
    content: "Welcome to my tech blog! I'll be discussing some good tehnologi in here"
}

let fixedPost = {
    title: "My first blog post!",
    content: "Welcome to my tech blog! This is where I'll be reviewing technology solutions for the better web"
}

let initalComment = {
    text: "Hi, looking forward to see what you're on to."
}

let fixedComment = {
    text: "Hello there, I can't wait to see your techology findings!"
}

describe('Test the blog API', () => {
    let postId, commentId;

    it('Retrieve blog posts', testFinished => {
        let res = request('GET', 'http://localhost:3000/posts/');
        let data = JSON.parse(res.getBody('utf-8'));
        expect(res.statusCode).toEqual(200);

        testFinished();
    });

    it('Create the initial blog post', testFinished => {
        let res = request('POST', 'http://localhost:3000/posts/',
            {
                headers: customHeaders,
                json: initialPost
            });

        let data = JSON.parse(res.getBody('utf-8'));
        expect(data).toHaveProperty('postId');
        expect(res.statusCode).toEqual(201);
        postId = data.postId;

        testFinished();
    });

    it('Update the initial blog post', testFinished => {
        let res = request('PUT', `http://localhost:3000/posts/${postId}`,
            {
                headers: customHeaders,
                json: fixedPost
            }
        );
        let data = JSON.parse(res.getBody('utf-8'));
        expect(data).toHaveProperty('id');
        expect(res.statusCode).toEqual(202);

        testFinished();
    });

    it('Retreive all comments for a blog post', testFinished => {
        let res = request('GET', `http://localhost:3000/posts/${postId}/comments/`);
        expect(res.statusCode).toEqual(200);
    
        testFinished();
    });

    it('Add a comment to the new blog post', testFinished => {
        let res = request('POST', `http://localhost:3000/posts/${postId}/comments/`,
            {
                headers: customHeaders,
                json: initalComment
            }
        );
        let data = JSON.parse(res.getBody('utf-8'));
        expect(res.statusCode).toEqual(201);
        expect(data).toHaveProperty('id');
        commentId = data.id;

        testFinished();
    });

    it('Update the blog post comment', testFinished => {
        let res = request('PUT', `http://localhost:3000/posts/${postId}/comments/${commentId}/`,
            {
                headers: customHeaders,
                json: fixedComment
            }
        );
        let data = JSON.parse(res.getBody('utf-8'));
        expect(res.statusCode).toEqual(202);
        expect(data.text).toEqual(fixedComment.text);

        testFinished();
    });

    it('Delete the blog post comment', testFinished => {
        let res = request('DELETE', `http://localhost:3000/posts/${postId}/comments/${commentId}`);
        expect(res.statusCode).toEqual(204);

        testFinished();
    });

    it('Delete the blog post', testFinished => {
        let res = request('DELETE', `http://localhost:3000/posts/${postId}`);
        expect(res.statusCode).toEqual(204);

        testFinished();
    });

});
