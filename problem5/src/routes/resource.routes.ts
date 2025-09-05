import * as express from 'express'
import { ResourceController } from '../controllers/resource.controller'
import { AppDataSource } from '../data-source'
import { Resource } from '../entities/resource.entity'
import { ResourceService } from '../services/resource.service'

const resourceService = new ResourceService(
    AppDataSource.getRepository(Resource)
)
const resourceController = new ResourceController(resourceService)

const Router = express.Router()

Router.get('/resources', resourceController.getAllResources)
Router.get('/resources/:id', resourceController.getResourceById)
Router.post('/resources', resourceController.createResource)

Router.put('/resources/:id', resourceController.updateResource)
Router.delete('/resources/:id', resourceController.deleteResouce)
export { Router as resourceRouter }
