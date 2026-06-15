import type { Task } from '../../../entities/task'
import type { ListTasks } from '../../../usecases/listTasks'
import {
  noContent,
  ok,
} from '../../presentations/api/httpResponses/httpResponses'
import { ListTasksController } from './listTasks'

const makeListTasks = (): ListTasks => {
  class ListTasksStub implements ListTasks {
    async list(): Promise<Task[]> {
      return Promise.resolve(makeFakeTasks())
    }
  }
  return new ListTasksStub()
}

interface SutTypes {
  sut: ListTasksController
}
const makeSut = (): SutTypes => {
  const listTaskStub = makeListTasks()
  const sut = new ListTasksController(listTaskStub)
  return { sut }
}

const makeFakeTasks = (): Task[] => {
  return [
    {
      id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      date: 'any_date',
    },
    {
      id: 'outher_id',
      title: 'outher_title',
      description: 'outher_description',
      date: 'outher_date',
    },
  ]
}

describe('ListTasks Controller', () => {
  test('Retornar 204 se a lista estiver vazia', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(noContent())
  })

  test('Retornar 200 com uma lista de tarefas', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeTasks()))
  })
})
