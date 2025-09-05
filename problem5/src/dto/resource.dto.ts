export class ResourceResponce {
    id: string

    name: string

    description: string

    quantity: number

    createdAt: Date

    updatedAt: Date
}

export class ResourceRequest {
    name: string

    description: string

    quantity: number
}

export class QueryFilter {
    name: string
}
