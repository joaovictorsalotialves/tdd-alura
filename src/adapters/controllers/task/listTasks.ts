import type { ListTasks } from '../../../usecases/listTasks'
import type { Controller, HttpRequest, HttpResponse } from '../../interfaces'
import {
  noContent,
  ok,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses'

export class ListTasksController implements Controller {
  constructor(private readonly listTask: ListTasks) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tasks = await this.listTask.list()
      return tasks.length > 0 ? ok(tasks) : noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
