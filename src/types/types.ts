export interface userInfo{
    username: string | null,
    token: string | null
}
export interface userRegisterInfo{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}
export interface userLoginInfo{
    username: string,
    password: string
}
