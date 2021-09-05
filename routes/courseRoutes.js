const router = require('express').Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.course_index_all);
router.get('/:id', courseController.course_index_one);
router.put('/:id', courseController.course_update);
router.post('/', courseController.course_create);
router.delete('/:id', courseController.course_delete);

module.exports = router;
