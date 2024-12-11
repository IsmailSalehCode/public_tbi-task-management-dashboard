<template>
  <v-container style="max-width: 650px" :class="hasNoPaddingForMobile">
    <h1>Task № {{ $route.params.id }} Details</h1>
    <br />
    <v-expand-transition>
      <div v-show="error">
        <v-alert rounded="0" type="error">
          {{ error }}
        </v-alert>
      </div>
    </v-expand-transition>
    <v-card elevation="10" v-if="task" :loading="isLoading">
      <v-card-title>{{ task.title }}</v-card-title>
      <v-card-text>
        {{ task.description }}
        <br />
        <br />
        <b>Due Date:</b> {{ taskDueDate }} <br />
        <b>Status:</b> {{ taskStatusLabel }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openDialogEditTask">Edit Task</v-btn>
      </v-card-actions>
    </v-card>
    <DialogEditAddTask ref="dialog_edit_add_task" />
  </v-container>
</template>
<script>
import stylingForMobile from "@/utils/stylingForMobile";
import { getStatusLabel } from "../utils/getTaskStatusLabel";
import { useTaskStore } from "../stores/useTaskStore";
import { useTimestamp } from "../utils/formatDateToLocale";
import DialogEditAddTask from "@/components/DialogEditAddTask.vue";

export default {
  components: { DialogEditAddTask },
  mixins: [stylingForMobile],
  methods: {
    openDialogEditTask() {
      this.$refs.dialog_edit_add_task.open(this.task);
    },
  },
  computed: {
    task() {
      const taskStore = useTaskStore();
      return taskStore.findOne(this.$route.params.id);
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
  },
};
</script>
<style lang=""></style>
