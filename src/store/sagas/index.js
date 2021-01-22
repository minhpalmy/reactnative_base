import { fork, takeLatest, takeEvery, all } from 'redux-saga/effects'
import authSaga from './auth'
export default function* () {
    yield all(
        [
            fork(authSaga)
        ]
    );
}
