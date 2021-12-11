"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controller/postController");
const router = (0, express_1.Router)();
router.route('/').get(postController_1.getAllPost).post(postController_1.createPost);
router.route('/:id').get(postController_1.getPost).patch(postController_1.updatePost).delete(postController_1.deletePost);
exports.default = router;
