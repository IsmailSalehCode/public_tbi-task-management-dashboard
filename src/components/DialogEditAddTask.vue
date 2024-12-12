<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card :loading="isLoading">
      <v-toolbar density="compact">
        <v-spacer></v-spacer>
        <v-btn icon @click="close">╳</v-btn>
      </v-toolbar>
      <v-card-title>{{ labelFormTitle }}</v-card-title>
      <v-expand-transition>
        <div v-show="error">
          <v-alert rounded="0" type="error">
            {{ error }}
          </v-alert>
        </div>
      </v-expand-transition>
      <v-form
        ref="form"
        @submit.prevent="addOrEditEntity"
        :disabled="isLoading"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Title"
                v-model.trim="task.title"
                :rules="[rules.required, rules.max(maxLength.title)]"
                :counter="maxLength.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                clearable
                label="Description"
                v-model.trim="task.description"
                :rules="[rules.max(maxLength.description)]"
                :counter="maxLength.description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Status"
                :items="statusOptions"
                item-title="title"
                item-value="id"
                v-model="task.status"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <DatetimePicker v-model="task.dueDate" label="Due Date" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn size="large" :loading="isLoading" type="submit">Go!</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { statuses, getStatusLabel } from "../utils/getTaskStatusLabel";
import { useTaskStore } from "../stores/useTaskStore";
import { useTimestamp } from "../utils/formatDateToLocale";
import { rules } from "../utils/inputRules";
import DatetimePicker from "./DatetimePicker.vue";

export default {
  emits: ["done"],
  components: {
    DatetimePicker,
  },
  computed: {
    taskStore() {
      return useTaskStore();
    },
    taskStatusLabel() {
      return getStatusLabel(this.task.status);
    },
    taskDueDate() {
      return useTimestamp(this.task.dueDate);
    },
    isLoading() {
      const taskStore = useTaskStore();
      return taskStore.isLoading;
    },
    error() {
      const taskStore = useTaskStore();
      return taskStore.error;
    },
    labelFormTitle() {
      return this.componentModeIsAdd
        ? "Add a New Task"
        : `Edit Task № ${this.task.id}`;
    },
  },
  methods: {
    async addOrEditEntity() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      if (this.componentModeIsAdd) {
        await this.taskStore.addTask(this.task);
      } else {
        await this.taskStore.updateTask(this.task);
      }
      if (!this.error) {
        this.$emit("done");
        this.close();
      }
    },
    close() {
      Object.assign(this.$data, this.initialState());
    },
    open(entity) {
      if (!entity) {
        this.componentModeIsAdd = true;
      } else {
        this.componentModeIsAdd = false;
        this.task = Object.assign({}, entity);
      }
      this.dialog = true;
    },
    initialState() {
      return {
        maxLength: {
          title: 150,
          description: 5000,
        },
        task: {
          title: "",
          description: "",
          status: 1,
          dueDate: Date.now(),
        },
        componentModeIsAdd: true,
        rules: rules,
        dialog: false,
        statusOptions: statuses,
      };
    },
  },
  data() {
    return this.initialState();
  },
};
</script>
<style lang=""></style>
