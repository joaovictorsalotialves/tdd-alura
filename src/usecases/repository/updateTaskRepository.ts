import type { Task } from '../../entities/task'
import type { UpdateTaskModel } from '../updateTask'

export interface UpdateTaskRepository {
  update(taskData: UpdateTaskModel): Promise<Task>
}
