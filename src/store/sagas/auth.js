import { takeLatest, takeEvery, all, call, put } from 'redux-saga/effects'

import api from '../apis'
import { createRequestSaga } from './common'
import {  USER_EVENTS } from '../types'
import { saveUserData } from '../actions/auth'
export const requestGetToken = createRequestSaga({
    request: api.auth.getToken,
    success: [
        (data) => {
            if (data && data.access_token) {
                const { args, ...rest } = data
                return saveUserData(rest)
            }
            return noop('')
        }
    ]
    // key: '',
})
export default function* fetchWatcher() {
    yield all([
        takeEvery(USER_EVENTS.GET_TOKEN, requestGetToken),
    ])
}