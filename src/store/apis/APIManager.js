import AsyncStorage from '@react-native-community/async-storage'
import { API_ENDPOINT, APP_MODE, APP_MODE_DEF } from './constants'

export default class APIManager {
    static apiInstance = null
    static getInstance = () => {
        if (APP_MODE == APP_MODE_DEF.RELEASE) {
            APIManager.apiInstance = API_ENDPOINT['AUTH']
            return Promise.resolve(APIManager.apiInstance)
        }
        if (APIManager.apiInstance == null) {
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem('api_endpoint', (err, result) => {
                    if (err) reject(err)
                    const key = result || 'AUTH'
                    // console.log('Key', key)
                    // console.log('API_ENDPOINT', API_ENDPOINT)
                    APIManager.apiInstance = API_ENDPOINT[key]
                    resolve(APIManager.apiInstance)
                })
            })
        }
        return Promise.resolve(APIManager.apiInstance)
    }

    static save = (endpoint) => {
        if (APP_MODE == APP_MODE_DEF.RELEASE) return
        APIManager.apiInstance = API_ENDPOINT[endpoint] || API_ENDPOINT['AUTH']
        AsyncStorage.setItem('api_endpoint', endpoint)
    }
}