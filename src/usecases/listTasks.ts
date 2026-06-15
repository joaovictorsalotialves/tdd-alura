import type { Task } from '../entities/task'

export interface ListTasks {
  list(): Promise<Task[]>
}
