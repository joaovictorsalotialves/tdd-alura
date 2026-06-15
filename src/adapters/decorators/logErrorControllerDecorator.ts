import type { LogErrorRepository } from '../../usecases/repository/logErrorRepository'
import type { Controller } from '../interfaces/controller'
import type { HttpRequest, HttpResponse } from '../interfaces/http'

export class LogErrorControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
