<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-2xl font-bold text-gray-900">Product Team Board</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 px-4">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="text-gray-500">Loading...</div>
      </div>

      <div v-else-if="error" class="flex justify-center items-center h-64">
        <div class="text-red-500">{{ error }}</div>
      </div>

      <div v-else class="flex gap-6 overflow-x-auto pb-4">
        <div
          v-for="section in sections"
          :key="section.gid"
          class="flex-shrink-0 w-80 bg-gray-50 rounded-lg shadow"
        >
          <div class="p-4 border-b border-gray-200">
            <h2 class="font-semibold text-gray-700">{{ section.name }}</h2>
            <p class="text-sm text-gray-500">{{ getTaskCount(section) }} tasks</p>
          </div>

          <div class="p-4">
            <button
              @click="openIssues(section)"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left"
            >
              <div class="flex items-center justify-between">
                <span>issues</span>
                <span class="bg-blue-700 text-xs px-2 py-1 rounded">
                  {{ getSubtaskCount(section) }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-900">{{ selectedSection?.name }}</h2>
                <p class="text-sm text-gray-500">issues</p>
              </div>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div v-if="subtasks.length === 0" class="text-gray-500 text-center py-8">
              No subtasks found
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="task in subtasks"
                :key="task.gid"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                :class="{ 'opacity-50': task.completed }"
              >
                <div class="flex items-start gap-3">
                  <input
                    type="checkbox"
                    :checked="task.completed"
                    disabled
                    class="mt-1 h-4 w-4 text-blue-600 rounded"
                  />
                  <div class="flex-1">
                    <h3
                      class="font-medium text-gray-900"
                      :class="{ 'line-through': task.completed }"
                    >
                      {{ task.name }}
                    </h3>
                    <p v-if="task.notes" class="text-sm text-gray-600 mt-1 line-clamp-2">
                      {{ task.notes }}
                    </p>
                    <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span v-if="task.assignee">
                        👤 {{ task.assignee.name }}
                      </span>
                      <span v-if="task.due_on">
                        📅 {{ task.due_on }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      sections: [] as any[],
      tasksMap: {} as Record<string, any[]>,
      loading: true,
      error: '',
      showModal: false,
      selectedSection: null as any,
      subtasks: [] as any[],
      PRODUCT_TEAM_BOARD_ID: '1204409512349603'
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.loading = true
        this.error = ''

        const sectionsRes = await fetch(`/api/sections/project/${this.PRODUCT_TEAM_BOARD_ID}`)
        const sectionsData = await sectionsRes.json()
        
        this.sections = sectionsData.data || sectionsData || []

        for (const section of this.sections) {
          const tasksRes = await fetch(`/api/sections/${section.gid}/tasks`)
          const tasksData = await tasksRes.json()
          this.tasksMap[section.gid] = tasksData.data || tasksData || []
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to load data'
      } finally {
        this.loading = false
      }
    },
    getTaskCount(section: any): number {
      return (this.tasksMap[section.gid] || []).length
    },
    getSubtaskCount(section: any): number {
      const tasks = this.tasksMap[section.gid] || []
      return Math.max(0, tasks.length - 1)
    },
    async openIssues(section: any) {
      this.selectedSection = section
      const tasks = this.tasksMap[section.gid] || []
      
      if (tasks.length > 0) {
        const issuesTask = tasks[0]
        try {
          const res = await fetch(`/api/tasks/${issuesTask.gid}/subtasks`)
          const data = await res.json()
          this.subtasks = data.data || data || []
        } catch (err) {
          this.subtasks = []
        }
      } else {
        this.subtasks = []
      }
      
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedSection = null
      this.subtasks = []
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>