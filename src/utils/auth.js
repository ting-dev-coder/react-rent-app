const TOKEN_NAME = 'hkzf_token'

// 獲取 token
const getToken = () => localStorage.getItem(TOKEN_NAME)

// 設置 token
const setToken = value => localStorage.setItem(TOKEN_NAME, value)

// 刪除 token
const removeToken = () => localStorage.removeItem(TOKEN_NAME)

// 是否登入(有權限)
const isAuth = () => !!getToken()

export { getToken, setToken, removeToken, isAuth }