import { call, put } from 'redux-saga/effects'

import {
    invokeCallback,
} from '../actions/common'
import { updateAccessToken } from '../actions/auth'


export const handleCommonError = function* (response) {
    if (!response) return false
    // handle error
    return false
}

export const createRequestSaga = ({ request, success }) => {
    return function* (action) {
        let args = action && action.args ? action.args : []
        let callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : null
        if (callback) args = args.slice(0, -1)
        let ret = null
        let err = null
        try {
            if (!request) throw new Error("Api method not found!!!")
            let apiResponse = yield call(request, ...args)
            console.log('Data Common', apiResponse)
            const hasError = yield call(handleCommonError, apiResponse)
            if (hasError) return
            if (apiResponse.httpHeaders && apiResponse['httpHeaders']['access-token']) {
                yield put(updateAccessToken(apiResponse['httpHeaders']['access-token']))
            }
            apiResponse.args = args
            if (success) for (let actionCreator of success) {
                yield put(actionCreator(apiResponse, action))
            }
            ret = apiResponse
            return apiResponse
        } catch (reason) {
            err = reason
        } finally {
            if (callback) {
                yield put(invokeCallback(callback, err, ret))
            }
        }
        return
    }
}