const Post = require('../models/post');
const path = require('path')
const postSchema = require('../utils/postValidation');
const {
    generateChatRequestBody,
  } = require("../utils/helper");
const { fetchFromAPI } = require("../services/api");
const { OPEN_AI_KEY, OPEN_AI_CHAT_COMPLETION_URL } = require("../config/env")

class PostController {
    async createPost(req, res) {
        const { error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { title } = req.body;
        const userId = req.user._id;

        try {

            //const templatePath = "src/utils/BlogPostChatTemplate.json";
            const templatePath = path.join(__dirname, '..', 'utils', 'BlogPostChatTemplate.json');
            const replacements = {
            "{blogPostTopic}": title,
            };

            const chatRequestBody = generateChatRequestBody(templatePath, replacements);

            const response = await fetchFromAPI(
                chatRequestBody,
                OPEN_AI_KEY,
                OPEN_AI_CHAT_COMPLETION_URL
            );

            console.log("response", response);

            if (response.choices.length === 0) {
                return res
                  .status(400)
                  .send("Error While Generating response from OPEN-AI");
            }

            const content = response.choices[0].message["content"];

            const newPost = await Post.create({
                title,
                content,
                author: userId,
            });

            res.status(201).send(newPost);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Post.find().populate('author', 'firstName lastName');
            res.status(200).send(posts);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params.id).populate('author', 'firstName lastName');
            if (!post) {
                return res.status(404).send({ message: 'Post not found' });
            }
            res.status(200).send(post);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async updatePost(req, res) {
        const { error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send({ message: 'Post not found' });
            }

            if (post.author.toString() !== req.user._id) {
                return res.status(403).send({ message: 'Unauthorized' });
            }

            post.title = req.body.title;
            post.content = req.body.content;

            await post.save();

            res.status(200).send(post);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send({ message: 'Post not found' });
            }

            if (post.author.toString() !== req.user._id) {
                return res.status(403).send({ message: 'Unauthorized' });
            }

            await post.remove();

            res.status(204).send();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = new PostController();
