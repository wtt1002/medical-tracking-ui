import axios from 'axios';

let base = '/ssm';

// export const checkLogin = params => { return axios.get(`127.0.0.1:8089/user/login`)};

// export const requestLogin = params => { return axios.get(`http://172.16.146.9:8089/ssm/user/login`, params).then(res => res.data); };

export const requestLogin = params => { console.log(params); return axios.post(`/apis${base}/user/login`,params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getPatientListPage = params => {console.log(params); return axios.post(`/apis${base}/patient/list`,  params).then(res => res.data); };

export const addPatient = params => {console.log(params); return axios.post(`/apis${base}/patient/add`,  params).then(res => res.data); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };