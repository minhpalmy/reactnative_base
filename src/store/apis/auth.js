import { get, post } from './common'
export default {
    getToken: (username, password) => {
        return post('oauth/token',{
            'grant_type':'password',
            'client_id':'12',
            'client_secret':'M77jixec90jjfmDjysk4vJwV8Yw5iUGBJu9UELvt',
            'username':username,
            'password':password
        })
    },
}