import type { Router } from 'express'
import { expressRouteAdapter } from '../../../expressRouteAdapter'
import {
  addTaskControllerFactory,
  deleteTaskControllerFactory,
  listTaskControllerFactory,
  updateTaskControllerFactory,
} from '../../../factories'

export default (router: Router): void => {
  router.post('/tasks', expressRouteAdapter(addTaskControllerFactory()))
  router.delete('/tasks', expressRouteAdapter(deleteTaskControllerFactory()))
  router.get('/tasks', expressRouteAdapter(listTaskControllerFactory()))
  router.put('/tasks', expressRouteAdapter(updateTaskControllerFactory()))
}
