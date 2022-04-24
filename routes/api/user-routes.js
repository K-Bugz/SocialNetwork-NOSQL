const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/user-controllers.js');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//   /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(newFriend)
    .delete(deleteFriend)



module.exports = router;
