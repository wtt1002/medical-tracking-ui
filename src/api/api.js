import axios from 'axios';

let base = '/ssm_mt';

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
    getDoctorListPage: (params) => { console.log(params); return axios.post(`/apis${base}/doctor/list`, params).then(res => res.data); },
    getHospital: (params) => { console.log(params); return axios.get(`/apis${base}/doctor/getHospital`).then(res => res.data); },
    getDepartment: (params) => { console.log(params); return axios.get(`/apis${base}/doctor/getDepartment?hospitalId=`+params).then(res => res.data); },
    addDoctor: (params) => { console.log(params); return axios.post(`/apis${base}/doctor/add`, params).then(res => res.data); },
    updateDoctor: (params) => { console.log(params); return axios.post(`/apis${base}/doctor/update`, params).then(res => res.data); },
    deleteDoctor: (params) => { console.log(params); return axios.post(`/apis${base}/doctor/delete`, params).then(res => res.data); },
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
    //获取病历
    getMedicalHistory: (params) => { console.log(params); return axios.get(`/apis${base}/medicalHistory/detail?medicalHistoryId=` + params).then(res => res.data); },
    //更新病历
    updateMedicalHistory:(params) => { return axios.post(`/apis${base}/medicalHistory/update`, params).then(res => res.data); },
    //获取辅助检查
    getExam: (params) => { console.log(params); return axios.get(`/apis${base}/medicalHistory/exam/get?medicalHistoryId=` + params.medicalHistoryId + "&examIndex=" + params.examIndex).then(res => res.data); },
    //更新辅助检查
    updateExam: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/update`, params).then(res => res.data); },
    //更新辅助检查
    addExam: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/addone`, params).then(res => res.data); },
    //获取医学图像检查
    getInspectionConclusion: (params) => { console.log(params); return axios.get(`/apis${base}/inspection/get?medicalHistoryId=` + params.medicalHistoryId + "&examIndex=" + params.examIndex).then(res => res.data); },
    //更新医学图像检查
    updateInspectionConclusion: (params) => { return axios.post(`/apis${base}/inspection/update`, params).then(res => res.data); },
    //更新医学图像检查
    addInspectionConclusion: (params) => { return axios.post(`/apis${base}/inspection/add`, params).then(res => res.data); },
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
    //新增带有结论的入院康复检查项目
    addAdmissionCheck: (params) => { return axios.post(`/apis${base}/medicalHistory/admissionCheck/addChecks`, params).then(res => res.data); },
    //更新带有结论的入院康复检查项目
    updateAdmissionCheck: (params) => { return axios.post(`/apis${base}/medicalHistory/admissionCheck/updateChecks`, params).then(res => res.data); },
    //获取冠脉介入
    getPci: (params) => { console.log(params); return axios.get(`/apis${base}/pci/getPci?medicalHistoryId=` + params).then(res => res.data); },
    //新增冠脉介入
    addPci: (params) => { return axios.post(`/apis${base}/pci/addPci`, params).then(res => res.data); },
    //更新pci术后检查
    updatePci: (params) => { return axios.post(`/apis${base}/pci/updatePci`, params).then(res => res.data); },
    //新增pci术后检查
    addPciAfter: (params) => { return axios.post(`/apis${base}/medicalHistory/exam/addone`, params).then(res => res.data); },
    //更新pci术后检查
    updatePciAfter: (params) => { return axios.post(`/apis${base}/pci/updatePci`, params).then(res => res.data); },
    //查询药物方案
    getDrugUsage: (params) => { console.log(params); return axios.get(`/apis${base}/drug/usage/get?medicalHistoryId=` + params.medicalHistoryId + "&followUpIndexId=" + params.followUpIndexId).then(res => res.data); },
    //添加药物
    addDrugUsage: (params) => { return axios.post(`/apis${base}/drug/usage/add`, params).then(res => res.data); },
    //编辑药物
    updateDrugUsage: (params) => { return axios.post(`/apis${base}/drug/usage/update`, params).then(res => res.data); },
    //删除药物
    deleteDrugUsage: (params) => { return axios.post(`/apis${base}/drug/usage/delete`, params).then(res => res.data); },
    //查询出院小结
    getDischargeSummary: (params) => { console.log(params); return axios.get(`/apis${base}/dischargeSummary/get?medicalHistoryId=` + params).then(res => res.data); },
    //新增pci术后检查

    //更新pci术后检查

    //新增血管入路并发症
    addVasProblem: (params) => { return axios.post(`/apis${base}/dischargeSummary/addVas`, params).then(res => res.data); },
    //更新血管入路并发症
    updateVasProblem: (params) => { return axios.post(`/apis${base}/dischargeSummary/updateVas`, params).then(res => res.data); },
    //新增评分
    addScore: (params) => { return axios.post(`/apis${base}/dischargeSummary/addScore`, params).then(res => res.data); },
    //更新评分
    updateScore: (params) => { return axios.post(`/apis${base}/dischargeSummary/updateScore`, params).then(res => res.data); },
    //获取随访记录列表
    getFollowUp: (params) => { console.log(params); return axios.get(`/apis${base}/followUp/getFollowUp?medicalHistoryId=` + params.medicalHistoryId + "&page=" + params.page + "&count=" + params.count).then(res => res.data); },
    //新增随访记录
    addFollowUp: (params) => { return axios.post(`/apis${base}/followUp/addFollowUp`, params).then(res => res.data); },
    //获取随访记录详情
    getFollowUpDetail: (params) => { console.log(params); return axios.get(`/apis${base}/followUpDetail/query?followUpId=` + params).then(res => res.data); },
    //更新随访记录详情
    updateFollowUpDetail: (params) => { return axios.post(`/apis${base}/followUpDetail/update`, params).then(res => res.data); },
}
const followApi = {
    //获取出院病史
    getFollowSickHistory: (params) => { console.log(params); return axios.get(`/apis${base}/followSickHistory/query?followUpId=` + params).then(res => res.data); },
    //新增出院病史
    addFollowSickHistory: (params) => { return axios.post(`/apis${base}/followSickHistory/add`, params).then(res => res.data); },
    //更新出院病史
    updateFollowSickHistory: (params) => { return axios.post(`/apis${base}/followSickHistory/update`, params).then(res => res.data); },
    //获取随访查体
    getFollowPhysicalExam: (params) => { console.log(params); return axios.get(`/apis${base}/followPhysicalExam/getFollowPhysicalExam?followUpId=` + params).then(res => res.data); },
    //新增随访查体
    addFollowPhysicalExam: (params) => { return axios.post(`/apis${base}/followPhysicalExam/addFollowPhysicalExam`, params).then(res => res.data); },
    //更新随访查体
    updateFollowPhysicalExam: (params) => { return axios.post(`/apis${base}/followPhysicalExam/updateFollowPhysicalExam`, params).then(res => res.data); },
    //获取随访不良反应
    getFollowSideEffects: (params) => { console.log(params); return axios.get(`/apis${base}/followSideEffects/query?followUpId=` + params).then(res => res.data); },
    //新增随访不良反应
    addFollowSideEffects: (params) => { return axios.post(`/apis${base}/followSideEffects/add`, params).then(res => res.data); },
    //更新随访不良反应
    updateFollowSideEffects: (params) => { return axios.post(`/apis${base}/followSideEffects/update`, params).then(res => res.data); },
    //获取随访个体化危险因素控制情况
    getRiskFactors: (params) => { console.log(params); return axios.get(`/apis${base}/riskFactors/query?followUpId=` + params).then(res => res.data); },
    //新增随访个体化微信因素控制情况
    addRiskFactors: (params) => { return axios.post(`/apis${base}/riskFactors/add`, params).then(res => res.data); },
    //更新随访个体危险因素控制情况
    updateRiskFactors: (params) => { return axios.post(`/apis${base}/riskFactors/update`, params).then(res => res.data); },
}

export {
    userApi,
    patientApi,
    recordApi,
    followApi
}