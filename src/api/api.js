import axios from 'axios';

let base = '/ssm';

// export const checkLogin = params => { return axios.get(`127.0.0.1:8089/user/login`)};

// export const requestLogin = params => { return axios.get(`http://172.16.146.9:8089/ssm/user/login`, params).then(res => res.data); };

//登录
// export const requestLogin = params => { console.log(params); return axios.post(`/apis${base}/user/login`, params).then(res => res.data); };
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
// //分页查询患者
// export const getPatientListPage = params => { console.log(params); return axios.post(`/apis${base}/patient/list`, params).then(res => res.data); };
// //根据id获取病人信息
// export const getPatient = params => { console.log(params); return axios.get(`/apis${base}/patient/edit?patientId=` + params).then(res => res.data); };
// //保存更新的患者信息
// export const savePatient = params => { console.log(params); return axios.post(`/apis${base}/patient/save`, params).then(res => res.data); };
// //添加患者
// export const addPatient = params => { console.log(params); return axios.post(`/apis${base}/patient/add`, params).then(res => res.data); };
// //删除单个患者
// export const removePatient = params => { return axios.get(`/apis${base}/patient/remove?patientId=` + params).then(res => res.data); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

const userApi = {
    requestLogin: (params) => { console.log(params); return axios.post(`/apis${base}/user/login`, params).then(res => res.data); },
};
const patientApi = {
    //分页查询患者
    getPatientListPage: (params) => { console.log(params); return axios.post(`/apis${base}/patient/list`, params).then(res => res.data); },
    //根据id获取病人信息
    getPatient: (params) => { console.log(params); return axios.get(`/apis${base}/patient/edit?patientId=` + params).then(res => res.data); },
    //保存更新的患者信息
    savePatient: (params) => { console.log(params); return axios.post(`/apis${base}/patient/save`, params).then(res => res.data); },
    //添加患者
    addPatient: (params) => { console.log(params); return axios.post(`/apis${base}/patient/add`, params).then(res => res.data); },
    //删除单个患者
    removePatient: (params) => { return axios.get(`/apis${base}/patient/remove?patientId=` + params).then(res => res.data); },
    //批量删除患者
    batchRemovePatient: (params) => { console.log(params); return axios.post(`/apis${base}/patient/batchRemove`, params).then(res => res.data); },
}
const recordApi = {
    //获取患者病历列表
    getRecordsListPage: (params) => { return axios.post(`/apis${base}/medicalHistory/records`, params).then(res => res.data); },
    //新增病历
    addMedicalHistory: (params) => { return axios.post(`/apis${base}/medicalHistory/add`, params).then(res => res.data); },
    //更新病历
    getMedicalHistory: (params) => { console.log(params); return axios.get(`/apis${base}/medicalHistory/detail?medicalHistoryId=` + params).then(res => res.data); },
    //获取辅助检查
    getExam: (params) => { console.log(params); return axios.get(`/apis${base}/medicalHistory/exam?medicalHistoryId=` + params).then(res => res.data); },
    //更新辅助检查
    updateExam: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/update`, params).then(res => res.data); },
    //更新辅助检查
    addExam: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/addone`, params).then(res => res.data); },    
}
export {
    userApi,
    patientApi,
    recordApi
}