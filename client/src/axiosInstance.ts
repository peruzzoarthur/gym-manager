import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

interface FailedRequests {
    resolve: (value: AxiosResponse) => void
    reject: (value: AxiosError) => void
    config: AxiosRequestConfig
    error: AxiosError
}

axiosInstance.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request
})

let failedRequests: FailedRequests[] = []
let isTokenRefreshing = false

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status
        const originalRequestConfig = error.config!

        if (status !== 401) {
            return Promise.reject(error)
        }

        if (isTokenRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({
                    resolve,
                    reject,
                    config: originalRequestConfig,
                    error: error,
                })
            })
        }

        isTokenRefreshing = true

        try {
            const user = JSON.parse(localStorage.getItem('user') ?? '')
            const response = await axiosInstance.post(
                '/auth/refresh',
                {
                    refresh: localStorage.getItem('refreshToken'),
                    email: user.email,
                    id: user.id,
                }
                // ?? ''
            )
            // console.log(response.data.accessToken)
            localStorage.setItem('accessToken', '')

            const accessToken = response.data.accessToken

            if (!accessToken) {
                throw new Error(
                    'Something went wrong while refreshing your access token'
                )
            }

            localStorage.setItem('accessToken', accessToken)

            failedRequests.forEach(({ resolve, reject, config }) => {
                axiosInstance(config)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
            })
        } catch (_error: unknown) {
            console.error(_error)
            failedRequests.forEach(({ reject, error }) => reject(error))
            localStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')
            return Promise.reject(error)
        } finally {
            failedRequests = []
            isTokenRefreshing = false
        }

        return axiosInstance(originalRequestConfig)
    }
)

export { axiosInstance }
