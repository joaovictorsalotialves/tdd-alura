import type { Task } from '../../entities/task'
import type { AddTaskModel } from '../addTask'

export interface AddTaskRepository {
  add(taskData: AddTaskModel): Promise<Task>
}
