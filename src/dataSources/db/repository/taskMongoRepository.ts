import { ObjectId } from 'mongodb'
import {
  InvalidParamError,
  NotFoundError,
} from '../../../adapters/presentations/api/errors'
import type { Task } from '../../../entities/task'
import type {
  AddTaskModel,
  AddTaskRepository,
  DeleteTaskModel,
  DeleteTaskRepository,
} from '../../../usecases'
import type { ListTasksRepository } from '../../../usecases/repository/listTaskRepository'
import type { UpdateTaskRepository } from '../../../usecases/repository/updateTaskRepository'
import type { UpdateTaskModel } from '../../../usecases/updateTask'
import { MongoManager } from '../../config/mongoManager'

export class TaskMongoRepository
  implements
    AddTaskRepository,
    DeleteTaskRepository,
    ListTasksRepository,
    UpdateTaskRepository
{
  async add(taskData: AddTaskModel): Promise<Task> {
    const taskCollection = MongoManager.getInstance().getCollection('tasks')
    const { insertedId } = await taskCollection.insertOne(taskData)
    const taskById = await taskCollection.findOne({ _id: insertedId })
    if (!taskById) throw new Error('Task not found')

    const task: Task = {
      id: taskById._id.toHexString(),
      title: taskById.title,
      description: taskById.description,
      date: taskById.date,
    }
    return task
  }

  async delete(taskData: DeleteTaskModel): Promise<void | Error> {
    const taskCollection = MongoManager.getInstance().getCollection('tasks')

    if (!ObjectId.isValid(taskData.id)) {
      return new InvalidParamError(taskData.id)
    }
    const { deletedCount } = await taskCollection.deleteOne({
      _id: new ObjectId(taskData.id),
    })
    if (!deletedCount) return new NotFoundError('task')
  }

  async list(): Promise<Task[]> {
    const taskCollection = MongoManager.getInstance().getCollection('tasks')
    const tasks = await taskCollection.find().toArray()

    const tasksFormatted = tasks.map(task => {
      return {
        id: task._id.toHexString(),
        title: task.title,
        description: task.description,
        date: task.date,
      }
    })

    return tasksFormatted
  }

  async update(taskData: UpdateTaskModel): Promise<void | Error> {
    const taskCollection = MongoManager.getInstance().getCollection('tasks')

    if (!ObjectId.isValid(taskData.id)) {
      return new InvalidParamError(taskData.id)
    }

    const taskById = await taskCollection.findOne({
      _id: new ObjectId(taskData.id),
    })

    if (!taskById) return new NotFoundError('task')

    const task: Task = {
      id: taskById._id.toHexString(),
      title: taskById.title,
      description: taskById.description,
      date: taskById.date,
    }

    await taskCollection.updateOne(
      { _id: new ObjectId(taskData.id) },
      {
        $set: {
          title: taskData.title ?? task.title,
          description: taskData.description ?? task.description,
          date: taskData.date ?? task.date,
        },
      }
    )
  }
}
