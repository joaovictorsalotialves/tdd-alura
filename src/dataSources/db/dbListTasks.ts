import type { Task } from '../../entities/task'
import type { ListTasksRepository } from '../../usecases/repository/listTaskRepository'

export class DbListTasks implements ListTasksRepository {
  constructor(private readonly listRepository: ListTasksRepository) {}
  async list(): Promise<Task[]> {
    const tasks = await this.listRepository.list()
    return tasks
  }
}
