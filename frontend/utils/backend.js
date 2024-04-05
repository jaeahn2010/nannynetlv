import axios from 'axios'

//babysitters CRUD
export async function getBabysitters() {
    const { data } = await axios.get(`/api/babysitters`)
    return data
}

export async function postBabysitter(babysitter) {
    const { data } = await axios.post('/api/babysitters', babysitter)
    return data
}
export async function updateBabysitter(babysitter, id) {
    const { data } = await axios.put(`/api/babysitters/${id}`, babysitter)
    return data
}

export async function deleteBabysitter(id) {
    const { data } = await axios.delete(`/api/babysitters/${id}`)
    return data
}

//parents CRUD
export async function getParents() {
    const { data } = await axios.get(`/api/parents`)
    return data
}

export async function postParent(parent) {
    const { data } = await axios.post('/api/parents', parent)
    return data
}
export async function updateParent(parent, id) {
    const { data } = await axios.put(`/api/parents/${id}`, parent)
    return data
}

export async function deleteParent(id) {
    const { data } = await axios.delete(`/api/parents/${id}`)
    return data
}

//reviews CRUD
export async function getReviews(babysitterId) {
    const { data } = await axios.get(`/api/reviews/${babysitterId}`)
    return data
}

export async function postReview(review) {
    const { data } = await axios.post('/api/reviews', review)
    return data
}
export async function updateReview(review, id) {
    const { data } = await axios.put(`/api/reviews/${id}`, review)
    return data
}

export async function deleteReview(id) {
    const { data } = await axios.delete(`/api/reviews/${id}`)
    return data
}