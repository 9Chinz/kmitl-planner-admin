const express = require('express');

const {indexView, subjectView, genedView, curriculumView, subjectEditView, subjectRemove, subjectUpdate,
    subjectAddView, subjectCreate, genedAddView, genedCreate, genedEditView, genedUpdate, genedRemove,
    curriculumAddView, curriculumCreate, curriculumEditView, curriculumUpdate, curriculumRemove
} = require('../controllers/homeController');
const router = express.Router();

// home
router.get('/', subjectView);

// subject
router.get('/subject', subjectView)

router.get('/subject/add', subjectAddView)
router.post('/subject/create', subjectCreate)

router.get('/subject/edit/:subject_id', subjectEditView)
router.post('/subject/update', subjectUpdate)

router.get('/subject/delete/:subject_id', subjectRemove)

// gened
router.get('/gened', genedView)

router.get('/gened/add', genedAddView)
router.post('/gened/create', genedCreate)

router.get('/gened/edit/:gened_id', genedEditView)
router.post('/gened/update', genedUpdate)

router.get('/gened/delete/:gened_id', genedRemove)

// curriculum
router.get('/curriculum', curriculumView)

router.get('/curriculum/add', curriculumAddView)
router.post('/curriculum/create', curriculumCreate)

router.get('/curriculum/edit/:curriculum_id', curriculumEditView)
router.post('/curriculum/update', curriculumUpdate)

router.get('/curriculum/delete/:curriculum_id', curriculumRemove)

module.exports = {
    routes: router
}