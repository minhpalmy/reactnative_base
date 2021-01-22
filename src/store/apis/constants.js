export const API_ENDPOINT ={
    'AUTH': {
        name: 'AUTH',
        API_URL: 'https://stg-digi-auth.notifun.com/',
    },
}
export const APP_MODE_DEF = {
    DEBUG: 'DEBUG',
    RELEASE: 'RELEASE'
}
export const APP_MODE = APP_MODE_DEF.DEBUG // DEBUG | RELEASE
export const COMMON_ERROR_CODE = {
    SESSION_EXPIRE: 4903,
    RESET_PASSWORD: 1010,
    NO_PERMISSION: 9001,
    FORCE_UPDATE: 103,
    INVALID_CHECKSUM: 104,
}