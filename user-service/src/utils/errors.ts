export class WebRequestError extends Error {
    webStatusCode: number

    constructor(message: string, webStatusCode: number) {
        super(message)
        this.name = 'WebRequestError'
        this.webStatusCode = webStatusCode
    }

}