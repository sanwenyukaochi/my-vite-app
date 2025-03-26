import httpRequest from "@/axios/axiosConfig.js";

export default {

    async getTypeList(params) {
        return await httpRequest.get('/admin-type-list', { params });
    },

}