export interface userInfo{
    userID: string,
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
    home_id: string,
    name: string,
    category: string,
    sensors: ISensor[],
    devices: IDevice[]
}
export interface homesInfo{
    homes: homeInfo[]
}

export interface ISensor{
    id: string;
    name: string;
    event_type: string;
    monitoring: {
        id: string,
        received_at: string,
        value: number
    }
}
export interface ISensorValue{
    id: string,
    received_at: string,
    value: number
}
export interface ISensorFullInfo{
    id: string,
    received_at: string,
    value: number,
    homeId: string,
    sensorId: string | undefined,
    index: number | undefined
}

export interface IDevice{
    id: string,
    name: string,
    event_type: string
}

