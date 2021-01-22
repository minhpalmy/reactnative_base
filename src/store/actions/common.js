// do nothing
export const noop = () => ({
    type: 'app/noop',
})

// do callback and get result as paload
export const invokeCallback = (callback, ...args) => ({
    type: 'app/invokeCallback',
    payload: callback && callback.call(null, ...args),
})
