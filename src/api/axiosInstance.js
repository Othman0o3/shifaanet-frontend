import axios from "axios";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const BASE_URL =
    window.location.hostname.includes("trycloudflare.com")
    ? "https://vampire-cycling-rules-sound.trycloudflare.com/hosp/api/"
    : "http://127.0.0.1:9000/hosp/api/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT + CSRF before each request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const csrftoken = getCookie("csrftoken");
    if (csrftoken) {
        config.headers["X-CSRFToken"] = csrftoken;
    }

    // Ensure secure backend URL for trycloudflare.com to prevent Mixed Content errors
    if (window.location.hostname.includes("trycloudflare.com")) {
        if (config.baseURL !== "https://vampire-cycling-rules-sound.trycloudflare.com/hosp/api/") {
            config.baseURL = "https://vampire-cycling-rules-sound.trycloudflare.com/hosp/api/";
        }
    }

    return config;
});

// Auth and booking API calls with CSRF + JWT automatically attached
export function login(credentials) {
    return axiosInstance.post("/login/", credentials);
}

export function signup(userData) {
    return axiosInstance.post("/signup/", userData);
}

export function bookAppointment(appointmentData) {
    return axiosInstance.post("/booking/", appointmentData);
}

// Function to initialize CSRF cookie
export function initCSRF() {
    return axiosInstance.get("/csrf/").then(() => {
        console.log("CSRF cookie initialized");
    });
}

export default axiosInstance;