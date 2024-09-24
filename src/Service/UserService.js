import axios from "axios";



const API_BASE_URL = 'https://art-creation-api.netlify.app/api/v1';

// const API_BASE_URL = 'http://localhost:3000/v1';


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

const approveUser = async (UserInfo) => {
    try {
        const data = await axios.post(`${API_BASE_URL}/approveUser`, UserInfo)
        return data
    }
    catch (e) {
        throw e
    }
}
const createArt = async (artInfo) => {
    try {
        const data = await axios.post(`${API_BASE_URL}/createArt`, artInfo)
        return data
    }
    catch (e) {
        throw e
    }
}

const getArts = async (userId) => {
    try {
        const data = await axios.get(`${API_BASE_URL}/arts/${userId}`)
        return data
    }
    catch (e) {
        throw e
    }
}

const completeArt = async (artId) => {
    try {
        const data = await axios.post(`${API_BASE_URL}/completeArt`, { artId })
        return data
    }
    catch (e) {
        throw e
    }
}

const getAllArts = async (startDate = null, endDate = null) => {
    try {
        let url = `${API_BASE_URL}/allarts`;

        if (startDate && endDate) {
            url += `?fromDate=${encodeURIComponent(startDate)}&toDate=${encodeURIComponent(endDate)}`;
        }

        const data = await axios.get(url);

        return data
    }
    catch (e) {
        throw e
    }
}


const getUserBasedArts = async (startDate = null, endDate = null) => {
    try {
        let url = `${API_BASE_URL}/alluserlevelarts`;

        if (startDate && endDate) {
            url += `?fromDate=${encodeURIComponent(startDate)}&toDate=${encodeURIComponent(endDate)}`;
        }

        const data = await axios.get(url);
        return data
    }
    catch (e) {
        throw e
    }
}

const UserService = { signup, signin, getUsers, approveUser, createArt, getArts, completeArt, getAllArts, getUserBasedArts }

export default UserService