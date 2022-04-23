const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller.js');

// /api/thoughts/>
router.route('/').post(addThought);

// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
