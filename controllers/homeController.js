'use strict';
const {LocalStorage}  = require('node-localstorage');
const localstorage = new LocalStorage('../scracth');
const axios = require('axios');

const indexView = (req, res, next) => {
    // console.log(localstorage)
    // const data = localstorage.getItem('user') !== null ? JSON.parse(localstorage.getItem('user')) : null;
    res.render('home'); 
    // if (data !== null) {
    //     res.render('home');        
    // }else {
    //     res.redirect('/login');
    // }
}

const subjectView = async (req, res, next) => {
    const subject = await axios.get('http://localhost:8080/backend/api/subject');
    const curriculum = await axios.get('http://localhost:8080/backend/api/curriculum');
    const subjects = subject.data.match_subject
    const curriculums = curriculum.data.match_result
    res.render('subject', {subjects: subjects, curriculums, curriculums});
}

const subjectAddView = async (req, res, next) => {
    const curriculum = await axios.get('http://localhost:8080/backend/api/curriculum');
    const types = await axios.get('http://localhost:8080/backend/api/type');    
    let uniq_curri_id = [... new Set(curriculum.data.match_result.map(item => item.curriculum_id))]
    let uniq_curri_name = [... new Set(curriculum.data.match_result.map(item => item.curriculum_name))]
    // merge uniq_curri_id and uniq_curri_name to json
    let uniq_curriculum = uniq_curri_id.map((item, index) => {
        return {
            curriculum_id: item,
            curriculum_name: uniq_curri_name[index]
        }
    })
    res.render('newSubjectForm', {types: types.data.match_type, curriculums: uniq_curriculum});
}

const subjectCreate = async (req, res, next) => {
    const payload = req.body
    const create_status = await axios.post('http://localhost:8080/backend/api/subject', payload)
    res.redirect('/subject')
}

const subjectEditView = async (req, res, next) => {
    const subject_id = req.params
    const subject = await axios.post('http://localhost:8080/backend/api/subject/specific', {subject_id: `${subject_id.subject_id}`})
    const curriculum = await axios.get('http://localhost:8080/backend/api/curriculum');
    const types = await axios.get('http://localhost:8080/backend/api/type');    
    let uniq_curri_id = [... new Set(curriculum.data.match_result.map(item => item.curriculum_id))]
    let uniq_curri_name = [... new Set(curriculum.data.match_result.map(item => item.curriculum_name))]
    // merge uniq_curri_id and uniq_curri_name to json
    let uniq_curriculum = uniq_curri_id.map((item, index) => {
        return {
            curriculum_id: item,
            curriculum_name: uniq_curri_name[index]
        }
    })
    res.render('editSubjectLayout', {subject_data: subject.data.match_subject[0], types: types.data.match_type, curriculums: uniq_curriculum})
}

const subjectRemove = async (req, res, next) => {
    const subject_id = req.params
    const delete_status = await axios.delete('http://localhost:8080/backend/api/subject', {data: {subject_id: subject_id.subject_id}})
    res.redirect('/subject')
}

const subjectUpdate = async (req, res, next) => {
    const payload = req.body
    const update_status = await axios.put('http://localhost:8080/backend/api/subject', payload)
    res.redirect('/subject')
}

const genedView = async (req, res, next) => {
    const gened = await axios.get('http://localhost:8080/backend/api/subjectGened');
    const subjects = gened.data.match_subject
    res.render('gened', {subjects: subjects});
}

const genedAddView = async (req, res, next) => {
    const types = await axios.get('http://localhost:8080/backend/api/type'); 
    res.render('newGenedForm', {types: types.data.match_type});
}

const genedCreate = async (req, res, next) => {
    const payload = req.body
    const create_status = await axios.post('http://localhost:8080/backend/api/subjectGened', payload)
    res.redirect('/gened')
}

const genedEditView = async (req, res, next) => {
    const subject_id = req.params
    const subject = await axios.post('http://localhost:8080/backend/api/subjectGened/specific', {subject_id: `${subject_id.gened_id}`})
    const types = await axios.get('http://localhost:8080/backend/api/type');
    res.render('editGenedLayout', {subject_data: subject.data.match_subject[0], types: types.data.match_type})
}

const genedRemove = async (req, res, next) => {
    const subject_id = req.params
    const delete_status = await axios.delete('http://localhost:8080/backend/api/subjectGened', {data: {subject_id: subject_id.gened_id}})
    res.redirect('/gened')
}

const genedUpdate = async (req, res, next) => {
    const payload = req.body
    const end_payload = {
        curriculum: "GENED"
    }
    Object.assign(payload, end_payload)
    axios.put('http://localhost:8080/backend/api/subjectGened', payload)
    res.redirect('/gened')
}

const curriculumView = async (req, res, next) => {
    const curriculum = await axios.get('http://localhost:8080/backend/api/curriculum');
    let uniq_curri_id = [... new Set(curriculum.data.match_result.map(item => item.curriculum_id))]
    let uniq_curri_name = [... new Set(curriculum.data.match_result.map(item => item.curriculum_name))]
    // merge uniq_curri_id and uniq_curri_name to json
    let uniq_curriculum = uniq_curri_id.map((item, index) => {
        return {
            curriculum_id: item,
            curriculum_name: uniq_curri_name[index]
        }
    })
    res.render('curriculum', {curriculums: uniq_curriculum});
}

const curriculumAddView = async (req, res, next) => {
    const types = await axios.get('http://localhost:8080/backend/api/type'); 
    res.render('newCurriculumForm', {types: types.data.match_type});
}

const curriculumCreate = async (req, res, next) => {
    const payload = req.body

    const curriculum = await axios.get('http://localhost:8080/backend/api/curriculum');
    let uniq_curri_id = [... new Set(curriculum.data.match_result.map(item => item.curriculum_id))]
    let uniq_curri_name = [... new Set(curriculum.data.match_result.map(item => item.curriculum_name))]
    // merge uniq_curri_id and uniq_curri_name to json
    let uniq_curriculum = uniq_curri_id.map((item, index) => {
        return {
            curriculum_id: item,
            curriculum_name: uniq_curri_name[index]
        }
    })

    const new_id = (uniq_curriculum[uniq_curriculum.length - 1].curriculum_id) + 1

    const types = await axios.get('http://localhost:8080/backend/api/type');
    const payload_array = []
    
    for(var k in payload){
        payload_array.push(payload[k])
    }

    const curriculum_name = payload_array[0];

    for(var i = 0; i < 8; i++){
        if(i > 5 ){
            const temp_json = {
                curriculum_id: new_id,
                curriculum_name: curriculum_name,
                type_id: (types.data.match_type[i].type_id)+1,
                total_credit: parseInt(payload_array[i+1])
            }
            await axios.post('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }else if(i == 5){
            const temp_json = {
                curriculum_id: new_id,
                curriculum_name: curriculum_name,
                type_id: "6 or 7",
                total_credit: parseInt(payload_array[i+1])
            }
            await axios.post('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }else{
            const temp_json = {
                curriculum_id: new_id,
                curriculum_name: curriculum_name,
                type_id: (types.data.match_type[i].type_id) ,
                total_credit: parseInt(payload_array[i+1])
            }
            await axios.post('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }
    }
}

const curriculumEditView = async (req, res, next) => {
    
    const curriculum_id = req.params
    const curriculum = await axios.post('http://localhost:8080/backend/api/curriculum/specific', {curriculum_id: parseInt(curriculum_id.curriculum_id)})
    const curriculum_json = curriculum.data.match_curriculum
    res.render('editCurriculumLayout', {curriculum_id: curriculum_json[0].curriculum_id, curriculum_name: curriculum_json[0].curriculum_name, curriculum: curriculum_json})
}

const curriculumRemove = async (req, res, next) => {
    const curriculum_id = req.params
    const delete_status = await axios.delete('http://localhost:8080/backend/api/curriculum', {data: {curriculum_id: curriculum_id.curriculum_id}})
    res.redirect('/curriculum')
}

const curriculumUpdate = async (req, res, next) => {
    const payload = req.body
    const types = await axios.get('http://localhost:8080/backend/api/type');
    const payload_array = []
    
    for(var k in payload){
        payload_array.push(payload[k])
    }

    const curriculum_id = parseInt(payload_array[0])
    const curriculum_name = payload_array[1]
    console.log(payload_array)

    for(var i = 2; i < 10; i++){
        console.log(payload_array[i])
        if(i > 7 ){
            const temp_json = {
                curriculum_id: curriculum_id,
                curriculum_name: curriculum_name,
                type_id: (types.data.match_type[i-1].type_id),
                total_credit: parseInt(payload_array[i])
            }
            await axios.put('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }else if(i == 7){
            const temp_json = {
                curriculum_id: curriculum_id,
                curriculum_name: curriculum_name,
                type_id: "6 or 7",
                total_credit: parseInt(payload_array[i])
            }
            await axios.put('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }else{
            const temp_json = {
                curriculum_id: curriculum_id,
                curriculum_name: curriculum_name,
                type_id: (types.data.match_type[i-2].type_id),
                total_credit: parseInt(payload_array[i])
            }
            await axios.put('http://localhost:8080/backend/api/curriculum', {data: temp_json})
        }
    }
    res.redirect('/curriculum')
}

module.exports = {
    indexView,
    subjectView,
    subjectEditView,
    subjectRemove,
    genedView,
    curriculumView,
    subjectUpdate,
    subjectAddView,
    subjectCreate,
    genedAddView,
    genedCreate,
    genedEditView,
    genedRemove,
    genedUpdate,
    curriculumAddView,
    curriculumCreate,
    curriculumEditView,
    curriculumRemove,
    curriculumUpdate
}