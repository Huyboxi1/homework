import { Repository } from 'typeorm'
import { Resource } from '../entities/resource.entity'
import {
    QueryFilter,
    ResourceRequest,
    ResourceResponce,
} from '../dto/resource.dto'

export interface IResourceService {
    getAllResources(queryFilter: QueryFilter): Promise<ResourceResponce[]>
    createResource(resource: ResourceRequest): Promise<ResourceResponce>
    updateResource(
        id: string,
        resource: ResourceRequest
    ): Promise<ResourceResponce>
    deleteResource(id: string): Promise<void>
    getResourceById(id: string): Promise<ResourceResponce>
}

export class ResourceService implements IResourceService {
    private resourceRepository: Repository<Resource>

    constructor(repository: Repository<Resource>) {
        this.resourceRepository = repository
    }

    async getAllResources(
        queryFilter: QueryFilter
    ): Promise<ResourceResponce[]> {
        let data: Resource[]
        if (queryFilter.name) {
            data = await this.resourceRepository.find({
                where: { name: queryFilter.name },
            })
        } else {
            data = await this.resourceRepository.find()
        }
        

        return data.reduce((acc: ResourceResponce[], resource: Resource) => {
            acc.push({
                id: resource.id,
                name: resource.name,
                description: resource.description,
                quantity: resource.quantity,
                createdAt: resource.createdAt,
                updatedAt: resource.updatedAt,
            })
            return acc
        }, [])
    }

    async createResource(resource: ResourceRequest): Promise<ResourceResponce> {
        const data = await this.resourceRepository.save({
            name: resource.name,
            description: resource.description,
            quantity: resource.quantity,
        })
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
    }

    async updateResource(
        id: string,
        resource: ResourceRequest
    ): Promise<ResourceResponce> {
        const data = await this.resourceRepository.findOne({ where: { id } })
        data.name = resource.name
        data.description = resource.description
        data.quantity = resource.quantity
        const updatedData = await this.resourceRepository.save(data)
        return {
            id: updatedData.id,
            name: updatedData.name,
            description: updatedData.description,
            quantity: updatedData.quantity,
            createdAt: updatedData.createdAt,
            updatedAt: updatedData.updatedAt,
        }
    }
    async deleteResource(id: string): Promise<void> {
        await this.resourceRepository.delete(id)
    }

    async getResourceById(id: string): Promise<ResourceResponce> {
        const data = await this.resourceRepository.findOne({ where: { id } })
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
    }
}
