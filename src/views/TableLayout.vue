<template>
  <div>
    <h2>Таблица дефектов</h2>
    <defects-table :defects="defects.value"
                   :pageSize="pageSize"
                   :currentPage="currentPage"
                   @changePage="val => currentPage = val"
                   :total="defects.size"
                   :loading="loading"/>
  </div>
</template>

<script>
import defectsTable from '@/components/defectsTable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'tableLayout',
  components: {
    defectsTable
  },
  data () {
    return {
      loading: null,
      currentPage: 1,
      pageSize: 20
    }
  },
  watch: {
    currentPage: async function (val, prev) {
      if (val !== prev) {
        await this.$store.dispatch('getDefects', { page: val, pageSize: this.pageSize })
      }
    }
  },
  computed: {
    ...mapGetters(['defects'])
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('getDefects', { page: this.currentPage, pageSize: this.pageSize })
    this.loading = false
  }
}
</script>
