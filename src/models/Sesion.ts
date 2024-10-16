export interface Sesion {
    tokenPayload: string,
    creationDate: Date,
    expirationDate: Date,
    refreshDate: Date
}