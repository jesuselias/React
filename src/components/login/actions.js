// Action Creator
export function addLogin(loginUsername,loginPasword) {
    return {
        type: 'ADD_LOGIN',
        username: loginUsername,
        password: loginPasword
    }
}