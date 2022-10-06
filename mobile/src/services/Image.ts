import API from "../api";

export default class Image {
    static async upload(data:any) {
        const response = await API.post('/upload_files',data)
        console.log(response?.data)
        return response?.data
    }
}