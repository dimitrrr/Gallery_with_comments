import axios from "axios";

const instance = axios.create({
    baseURL: 'https://boiling-refuge-66454.herokuapp.com/images',
});

export const imageAPI = {
    getImages() {
        return instance.get()
            .then(response => response.data);
    }
}