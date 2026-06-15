import type { Task } from '../../../entities/task'
import type { AddTask, AddTaskModel } from '../../../usecases'
import { addTaskValidationCompositeFactory } from '../../factories'
import type { Validation } from '../../interfaces'
import { AddTaskController } from './addTask'

class AddTaskStub implements AddTask {
  async add(task: AddTaskModel): Promise<Task> {
    return Promise.resolve({
      id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      date: '30/06/2024',
    })
  }
}

class ValidationStub implements Validation {
  validate(data: any): Error | void {
    return
  }
}

describe('AddTask Controller', () => {
  test('Deve chamar AddTask com valores corretos', async () => {
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        date: '30/06/2024',
      },
    }

    const addTaskStub = new AddTaskStub()

    const addTaskController = new AddTaskController(
      addTaskStub,
      new ValidationStub()
    )

    const addSpy = jest.spyOn(addTaskStub, 'add')

    await addTaskController.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      title: 'any_title',
      description: 'any_description',
      date: '30/06/2024',
    })
  })
})
