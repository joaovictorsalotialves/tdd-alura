import type { UpdateTask } from '../../../usecases/updateTask'
import type {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from '../../interfaces'
import {
  badRequest,
  created,
  noContent,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses'

export class UpdateTaskController implements Controller {
  constructor(
    private readonly updateTask: UpdateTask,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id, title, description, date } = httpRequest.body

      await this.updateTask.update({
        id,
        title,
        description,
        date,
      })
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
