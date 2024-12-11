<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <h1>Tasks' Overview</h1>
    <br />
    <v-expand-transition>
      <div v-show="error">
        <v-alert rounded="0" type="error">
          {{ error }}
        </v-alert>
      </div>
    </v-expand-transition>
    <div v-if="isLoading" class="text-center">
      <br />
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <!-- v-data-table has props for initiating and customizing the loading state, but the specs want a spinner. Otherwise I would have used the props loading and loading-text -->
      <v-row style="max-width: 1000px">
        <v-col cols="12" md="8">
          <v-text-field
            label="🔍 Search titles & descriptions"
            v-model="tdSearchQuery"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Filter by Status"
            multiple
            :items="statusOptions"
            item-title="title"
            item-value="id"
            v-model="statusFilterQuery"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="success"
            rounded="0"
            block
            @click="openDialogAddTask"
            elevation="0"
            >Add a New Task</v-btn
          >
        </v-col>
      </v-row>
      <!-- v-data-table also has a search prop, but we're not gonna use that -->
      <v-data-table
        :headers="taskHeaders"
        :items="tasks"
        items-per-page="-1"
        disable-sort
        hide-default-footer
        @click:row="onRowClick"
      >
        <template v-slot:item.description="{ item }">
          <div v-if="!canDescriptionBeExpanded(item.description)">
            {{ item.description }}
          </div>
          <div v-else>
            <span v-if="isExpanded(item.id)">
              {{ item.description }}
              <v-btn
                variant="text"
                size="small"
                @click.stop="toggleDescription(item.id)"
                >See Less</v-btn
              >
            </span>
            <span v-else>
              {{ truncateStr(item.description) }}
              <v-btn
                variant="text"
                size="small"
                @click.stop="toggleDescription(item.id)"
                >Read More</v-btn
              >
            </span>
          </div>
          <!-- <div>
            
          </div> -->
        </template>
      </v-data-table>
    </div>
    <DialogEditAddTask ref="dialog_edit_add_task" @done="findAllTasks" />
  </v-container>
</template>
<script>
import { useTaskStore } from "../stores/useTaskStore";
import { statuses, getStatusLabel } from "../utils/getTaskStatusLabel";
import { useTimestamp } from "../utils/formatDateToLocale";
import DialogEditAddTask from "@/components/DialogEditAddTask.vue";

export default {
  components: {
    DialogEditAddTask,
  },
  mounted() {
    this.findAllTasks();
  },
  computed: {
    tasks() {
      const taskStore = useTaskStore();
      let result = taskStore.tasks;
      if (this.tdSearchQuery) {
        const query = this.tdSearchQuery.toLowerCase();
        result = result.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
      }
      if (this.statusFilterQuery.length > 0) {
        result = result.filter((currTask) =>
          this.statusFilterQuery.includes(currTask.status)
        );
      }
      return result;
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
  methods: {
    openDialogAddTask() {
      this.$refs.dialog_edit_add_task.open();
    },
    onRowClick(event, item) {
      //   console.log(event);
      //   console.log(item);
      this.$router.push(`/task/${item.internalItem.raw.id}`);
    },
    canDescriptionBeExpanded(txt) {
      return txt.length > this.maxDescrChars;
    },
    truncateStr(str) {
      return str.substring(0, this.maxDescrChars) + "...";
    },
    async findAllTasks() {
      const taskStore = useTaskStore();
      await taskStore.findAll();
    },
    toggleDescription(id) {
      if (this.expandedRows.has(id)) {
        this.expandedRows.delete(id); // Collapse row
      } else {
        this.expandedRows.add(id); // Expand row
      }
    },
    isExpanded(id) {
      return this.expandedRows.has(id);
    },
  },
  data() {
    return {
      statusOptions: statuses,
      statusFilterQuery: [],
      tdSearchQuery: null,
      expandedRows: new Set(),
      maxDescrChars: 50,
      taskHeaders: [
        {
          title: "Id",
          key: "id",
        },
        {
          title: "Title",
          key: "title",
        },
        {
          title: "Description",
          key: "description",
        },
        {
          title: "Status",
          key: "status",
          value: (task) => `${getStatusLabel(task.status)}`,
        },
        {
          title: "Due Date",
          key: "dueDate",
          value: (task) => `${useTimestamp(task.dueDate)}`,
        },
      ],
    };
  },
};
</script>
