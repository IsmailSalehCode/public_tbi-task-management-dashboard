import { defineStore } from "pinia";
import TaskService from "@/services/TaskService";
import { createErrMsg } from "@/utils/createHttpErrorMsg";

// status: 1 for "To Do", 2 for "In Progress", and 3 for "Done"
// dueDates are Unix timestamps in millis
/** Example task:
 * {
    "id": 1,
    "title": "Create Project Proposal",
    "description": "Draft the initial project proposal and review feedback.",
    "status": 1,
    "dueDate": 1733846400000
  },
 */
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
  }),
  persist: true, //Why persist? Answer: Function, named findOne, needs it.
  actions: {
    async findAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await TaskService.getAll();
        this.tasks = response.data;
      } catch (error) {
        this.error = createErrMsg(error);
      } finally {
        this.isLoading = false;
      }
    },
    findOne(desiredTaskId) {
      this.isLoading = true;
      this.error = null;
      // Why client-side fetching?
      //Answer: mockAPI's GET/tasks/:id endpoint is bugged. It returns 404 on any id.
      if (this.tasks.length === 0) {
        this.error = new Error("There are no tasks!");
      }
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (Number(task.id) === Number(desiredTaskId)) {
          this.isLoading = false;
          return task;
        }
      }
      this.error = new Error("There is no task with the specified ID!");
      this.isLoading = false;
    },
    //The endpoint simply stopped working!
    // async findOne(id) {
    //   this.error = null;
    //   this.isLoading = true;
    //   try {
    //     const response = await TaskService.getOne(id);
    //     return response.data;
    //   } catch (error) {
    //     this.error = createErrMsg(error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async addTask(newTask) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await TaskService.add(newTask);
        // return the newly created task
        return response.data;
      } catch (error) {
        this.error = createErrMsg(error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateTask(updTask) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await TaskService.edit(updTask);
        const updatedEntity = response.data;
        // updating the state client-side
        for (let i = 0; i < this.tasks.length; i++) {
          const currTask = this.tasks[i];
          if (currTask.id == updatedEntity.id) {
            this.tasks[i] = updatedEntity;
            break;
          }
        }
        return updatedEntity;
      } catch (error) {
        this.error = createErrMsg(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
