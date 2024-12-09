export class PhishingAttemptPage<T> {
    data: T[]
    hasNext: boolean

    constructor(data: T[], hasNext: boolean) {
        this.data = data
        this.hasNext = hasNext
    }
}