import httpRequest from "@/axios/axiosConfig.js";

export default {

    async getRsaPublicKey(){
        return await httpRequest.get('/rsaPublicKey');
    },
    async getUserToken(params) {
        return await httpRequest.post('/admin-login', params);
    },
    async getUserList(params) {
        return await httpRequest.get('/admin-user-list', { params });
    },
    async getUserDetail(id) {
        return await httpRequest.get(`/admin-user/${id}`);
    },
    async updateUser(id, params) {
        return await httpRequest.put(`/admin-user/${id}`, params, {
            headers: { "Content-Type": "application/json" }
        });
    },
    async uploadUserAvatar(id, formData) {
        return await httpRequest.post(`/admin-user/${id}/upload-avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

}