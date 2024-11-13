import express from "express"

type CurrentUserType = {
    id: number
}
declare global{
    namespace Express{
        interface Request {
           currentUser: CurrentUserType
        }
    }
}