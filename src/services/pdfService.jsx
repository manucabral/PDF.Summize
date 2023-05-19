import axios from 'axios'

/**
 * @description: Convert pdf content to text using the backend api
 * @returns {Promise} - A promise that resolves to the text content of the pdf file.
 */
export function pdfToText(file) {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post('api/ppdf', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
