import axios from "axios";

const API_BASE_URL = 'https://art-creation-api.netlify.app/api/v1';


const signup = async (UserInfo) => {
    try {
        const data = await axios.post(`${API_BASE_URL}/signup`, UserInfo)
        return data
    }
    catch (e) {
        throw e
    }
}

const signin = async (UserInfo) => {
    console.log(UserInfo)
    try {
        const data = await axios.post(`${API_BASE_URL}/login`, UserInfo)
        return data
    }
    catch (e) {
        throw e
    }
}

const getUsers = async () => {
    try {
        const data = await axios.get(`${API_BASE_URL}/getusers`)
        return data
    }
    catch (e) {
        throw e
    }
}

const UserService = { signup, signin, getUsers }

export default UserService