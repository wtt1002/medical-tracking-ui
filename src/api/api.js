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
    //获取入院评估
    getAssessment: (params) => { console.log(params); return axios.get(`/apis${base}/medicalHistory/assessment?medicalHistoryId=` + params).then(res => res.data); },
    //新增入院评估
    addAssessment: (params) => { return axios.post(`/apis${base}/medicalHistory/assessment/addone`, params).then(res => res.data); },
    //更新入院评估
    updateAssessment: (params) => { return axios.post(`/apis${base}/medicalHistory/assessment/update`, params).then(res => res.data); },
    //获取入院康复检查项目
    getAdmissionCheck: (params) => { console.log(params); return axios.post(`/apis${base}/medicalHistory/admissionCheck/getChecks`, params).then(res => res.data); },
    //新增人体成分分析
    addBodyComposition: (params) => { return axios.post(`/apis${base}/medicalHistory/bodyComposition/addone`, params).then(res => res.data); },
    //更新人体成分分析
    updateBodyComposition: (params) => { return axios.post(`/apis${base}/medicalHistory/bodyComposition/update`, params).then(res => res.data); },
    //获取冠脉介入
    getPci: (params) => { console.log(params); return axios.get(`/apis${base}/pci/getPci?medicalHistoryId=` + params).then(res => res.data); },   
    //新增冠脉介入
    addPci: (params) => { return axios.post(`/apis${base}/pci/addPci`, params).then(res => res.data); },
    //更新人体成分分析
    updatePci: (params) => { return axios.post(`/apis${base}/pci/updatePci`, params).then(res => res.data); },
    //新增pci术后检查
    addPciAfter: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/addone`, params).then(res => res.data); }, 
    //更新pci术后检查
    updatePciAfter: (params) => { return axios.post(`/apis${base}/pci/updatePci`, params).then(res => res.data); },

}
export {
    userApi,
    patientApi,
    recordApi
}