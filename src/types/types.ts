export interface userInfo{
    userID: number,
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

export interface homeInfo{
    home: {
        id: number,
        name: string,
        category: string
    },
    sensors: {
        id: number,
        name: string,
        typeSensor: string,
        value: string
    }[]
}
export interface homesInfo{
    homes: homeInfo[]
}

export interface ISensor{
    id: number;
    name: string;
    typeSensor: string;
    value: string;
}

