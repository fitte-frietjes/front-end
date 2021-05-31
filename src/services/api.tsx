import axios from 'axios'

// Get call
const getCall = (url: string) => {
    return axios({
        'method': 'GET',
        'url': '/api' + url,
        'headers': {
            'Accept': 'application/json',
        }
    })
}

// Post call
const postCall = (url: string, body: string) => {
    return axios({
        'method': 'POST',
        'url': '/api' + url,
        'headers': {
            'Content-Type': 'application/json',
        },
        'data': body
    })
}

// Delete call
const deleteCall = (url: string, body: string) => {
    return axios({
        'method': 'DELETE',
        'url': '/api' + url,
        'headers': {
          //  'Accept': '*/*',
            'Content-Type': 'application/json',
          //  'Access-Control-Allow-Origin': '*'
        },
        'data': body
    })
}

const api = {
    get: getCall,
    post: postCall,
    delete: deleteCall
}

export default api;