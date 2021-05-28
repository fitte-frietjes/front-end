import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL;

// Get call
const getCall = (url: string) => {
    return axios({
        'method': 'GET',
        'url': baseURL + url,
        'headers': {
            'Accept': 'application/json',
        }
    })
}

// Post call
const postCall = (url: string, body: string) => {
    return axios({
        'method': 'POST',
        'url': baseURL + url,
        'headers': {
            'Accept': 'application/json',
        },
        'data': body
    })
}

const api = {
    get: getCall,
    post: postCall
}

export default api;