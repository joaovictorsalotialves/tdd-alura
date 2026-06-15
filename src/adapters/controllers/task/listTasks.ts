import type { ListTasks } from '../../../usecases/listTasks'
import type { Controller, HttpRequest, HttpResponse } from '../../interfaces'
import {
  noContent,
  ok,
} from '../../presentations/api/httpResponses/httpResponses'

export class ListTasksController implements Controller {
  constructor(private readonly listTask: ListTasks) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tasks = await this.listTask.list()
    return tasks.length > 0 ? ok(tasks) : noContent()
  }
}
