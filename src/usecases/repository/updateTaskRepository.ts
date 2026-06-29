import type { UpdateTaskModel } from '../updateTask'

export interface UpdateTaskRepository {
  update(taskData: UpdateTaskModel): Promise<void | Error>
}
