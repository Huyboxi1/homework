import { Request, Response } from 'express'
import { Helper } from '../helpers/helpers'
import { IResourceService } from '../services/resource.service'
import { QueryFilter } from '../dto/resource.dto'

export class ResourceController {
    
    resourceService: IResourceService
    
    constructor(service: IResourceService) {
        this.resourceService = service
    }

    getAllResources = async (req: Request, res: Response) => {
        const { name } = req.query
        const queryFilter = { name } as QueryFilter
        try {
            const resources =
            await this.resourceService.getAllResources(queryFilter)
            return Helper.buildSuccessResponse(
                resources,
                'Resources fetched successfully',
                200,
                res
            )
        }catch(error) {
            return Helper.buildErrorResponse(error, 500, res)
        }
    }

    createResource = async (req: Request, res: Response) => {
        const { name, description, quantity } = req.body
        try {
            const resource = await this.resourceService.createResource({
                name,
                description,
                quantity,
            })
            return Helper.buildSuccessResponse(
                resource,
                'Resource created successfully',
                201,
                res
            )
        }catch (error) {
            return Helper.buildErrorResponse(error, 500, res)
        }
    }

    updateResource = async (req: Request, res: Response) =>{
        const { id } = req.params
        const { name, description, quantity } = req.body
        try {
            const resource = await this.resourceService.updateResource(id, {
                name,
                description,
                quantity,
            })
            return Helper.buildSuccessResponse(
                resource,
                'Resource updated successfully',
                200,
                res
            )
        }catch (error) {
            return Helper.buildErrorResponse(error, 500, res)
        }
    }

    getResourceById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const resource = await this.resourceService.getResourceById(id)
            return Helper.buildSuccessResponse(
                resource,
                'Resource fetched successfully',
                200,
                res
            )
        }catch (error) {
            return Helper.buildErrorResponse(error, 500, res)
        }
    }

    deleteResouce = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            await this.resourceService.deleteResource(id)
            return Helper.buildSuccessResponse(
                {},
                'Resource deleted successfully',
                200,
                res
            )
        }catch (error) {
            return Helper.buildErrorResponse(error, 500, res)
        }
    }
}
