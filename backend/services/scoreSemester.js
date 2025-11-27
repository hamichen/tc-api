// services/schoolApi.js
const axios = require("axios");
const config = require("../config");
const { getAccessToken } = require("./oauthClient");

async function score() {
    const token = await getAccessToken();
    const body = {
        year: 113,
        semester: 1,
        grade: 5,
        class_no: 1
    };

    const resp = await axios.post(`${config.school.api_url}/score-semester`,
        body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return resp.data; // 假設 API 回傳學生陣列
}

module.exports = { score };
