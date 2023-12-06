import {authActions, authSlice} from "features/auth/model/authSlice";

let startState = {isLoggedIn: false}
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('initialization should become true', () => {
    const param = {isLoggedIn: true}
    const action = authActions.initializedApp.fulfilled(param, 'requestId', undefined)

    const endState = authSlice(startState, action)

    expect(endState.isLoggedIn).toBe(true)

})

test('after logging out the state should change to false', () => {
    const param = {isLoggedIn: false}
    const action = authActions.logout.fulfilled(param, 'requestId', undefined)

    const endState = authSlice(startState, action)

    expect(endState.isLoggedIn).toBe(false)

})

test('after logging in the state should change to true', () => {
    const param = {isLoggedIn: true}
    const loginParams = {
        email: 'artyomkorshykau@gmail.com',
        password: 'string',
        rememberMe: true,
        captcha: 'string'
    }
    const action = authActions.login.fulfilled(param, 'requestId', loginParams)

    const endState = authSlice(startState, action)

    expect(endState.isLoggedIn).toBe(true)

})