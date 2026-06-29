import type { UpdateTaskRepository } from '../../usecases/repository/updateTaskRepository'
import type { UpdateTask, UpdateTaskModel } from '../../usecases/updateTask'

export class DbUpdateTask implements UpdateTask {
  constructor(private readonly updateTaskRepository: UpdateTaskRepository) {}

  async update(taskData: UpdateTaskModel): Promise<void | Error> {
    await this.updateTaskRepository.update(taskData)
  }
}
