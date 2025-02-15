import axios from "axios";

export const api = () => {
    const instance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return instance;
}
