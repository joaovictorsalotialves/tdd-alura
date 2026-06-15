import type { DeleteTaskModel } from '../deleteTask'

export interface DeleteTaskRepository {
  delete(taskData: DeleteTaskModel): Promise<Error | void>
}
