import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
import {  TIMEOUT_TIME, TIMEOUT, NETWORK_ERROR, NETWORD_ERROR_EXCEPTION } from '../../constants'
import { SECRET_KEY } from './constants'
import APIManager from './APIManager'
import { store } from '../configStore'
import { chainParse } from '../../utils'

import lodash from 'lodash'

const convertParamToPath = (data, encode = false) => data ? Object.keys(data).map((key) => key + '=' + (encode ? encodeURIComponent(data[key]) : data[key])).join('&') : ''
const hashSHA256 = (strData) => {
    return SHA256(strData).toString(CryptoJS.enc.Hex)
}

const resolveResponse = async (res) => {
    const httpStatus = lodash.pick(res, ['status', 'statusText'])
    const headerMap = (res && res.headers && res.headers.map) ? { ...res.headers.map, ...httpStatus } : httpStatus
    let responseText = await res.text()
    // console.log("Data raw : ", responseText)
    try {
        let jsonBody = JSON.parse(responseText)
        if (jsonBody && lodash.isPlainObject(jsonBody)) {
            return {
                ...jsonBody,
                httpHeaders: {
                    ...headerMap
                }
            }
        } else {
            return {
                result: jsonBody,
                httpHeaders: {
                    ...headerMap
                }
            }
        }
    } catch (e) {
        return {
            result: responseText,
            httpHeaders: {
                ...headerMap
            }
        }
    }
}

export const get = (url, params, { customHeader = {}, api = '', timeout = TIMEOUT_TIME } = {}) => {
    return new Promise(async (resolve, reject) => {
        const apiConfig = await APIManager.getInstance()
        const state = store.getState()
        const accessToken = chainParse(state, ['auth', 'access_token'])
        let sendHeader = {
            'Authorization': accessToken ? `Bearer ${accessToken}` : '',
            ...customHeader
        }
        const endpoint = api || apiConfig.API_URL
        let tailUrl = convertParamToPath(params) ? url + '?' + convertParamToPath(params, true) : url
        // let tailUrlDecode = convertParamToPath(params) ? url + '?' + convertParamToPath(params) : url
        const fullEndpoint = endpoint + tailUrl
        console.log('API GET', fullEndpoint)
        console.log('Header', sendHeader)
        // let timeStamp = Math.floor((new Date().getTime()) / 1000)
        // let xAuthStr = (tailUrlDecode) + sendHeader['X-UNIQUE-DEVICE'] + sendHeader['X-DATA-VERSION'] + sendHeader['X-VERSION']
        //     + timeStamp + SECRET_KEY
        // let xAuth = hashSHA256(xAuthStr)
        Promise.race([
            fetch(fullEndpoint, {
                method: 'GET',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'X-AUTH': xAuth,
                    // 'X-TIMESTAMP': timeStamp,
                    ...sendHeader
                },
            }).then(res => resolveResponse(res)),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(TIMEOUT)
                }, timeout)
            })
        ]).then(value => {
            console.log('value', value)
            if (value == TIMEOUT) {
                resolve({ code: TIMEOUT })
            } else {
                resolve(value)
            }
        }).catch(err => {
            if (err.toString().indexOf(NETWORD_ERROR_EXCEPTION) == 0) {
                resolve({ code: NETWORK_ERROR })
            }
        })
    })
}

export const post = (url, body, { customHeader = {}, api = '', timeout = TIMEOUT_TIME } = {}) => {
    return new Promise(async (resolve, reject) => {
        const apiConfig = await APIManager.getInstance()
        const state = store.getState()
        const accessToken = chainParse(state, ['auth', 'access_token'])
    
        let stringifyBody = JSON.stringify(body)
        let sendHeader = {
            'Authorization': accessToken ? `Bearer ${accessToken}` : '',
            ...customHeader
        }
        let timeStamp = Math.floor((new Date().getTime()) / 1000)
        let xAuthStr = (url) + sendHeader['X-UNIQUE-DEVICE'] + sendHeader['X-DATA-VERSION'] + sendHeader['X-VERSION']
            + timeStamp + SECRET_KEY + stringifyBody
        // let xAuth = hashSHA256(xAuthStr) //SHA256(xAuthStr).toString(CryptoJS.enc.Hex)
        const endpoint = api || apiConfig.API_URL
            console.log('API Post', endpoint + url)
            console.log('Header', sendHeader)
            console.log('Post body', body)
        Promise.race([
            fetch(endpoint + url, {
                method: 'POST',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // 'X-AUTH': xAuth,
                    // 'X-TIMESTAMP': timeStamp,
                    ...sendHeader
                },
                body: stringifyBody
            }).then(res => resolveResponse(res)),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(TIMEOUT)
                }, timeout)
            })
        ]).then(value => {
            console.log('value', value)
            if (value == TIMEOUT) {
                resolve({ code: TIMEOUT })
            } else {
                resolve(value)
            }
        }).catch(err => {
            if (err.toString().indexOf(NETWORD_ERROR_EXCEPTION) == 0) {
                resolve({ code: NETWORK_ERROR })
            }
        })
    })

}