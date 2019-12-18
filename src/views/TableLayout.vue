<template>
  <div>
    <h2>Таблица дефектов</h2>
    <div class="tableFilters-wrapper">
      <div class="tableFilters">
        <div class="tableFilters__heading">
          <h3>Фильтры:</h3>
        </div>
        <div class="tableFilters__item">
          <span>Система</span>
          <multiselect multiple placeholder="Выбирете систему" v-model="systemFilter"
                       :options="(dictionaries && Array.from(dictionaries.System)) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item">
          <span>Состояние</span>
          <multiselect multiple placeholder="Выбирете состояние" v-model="conditionFilter"
                       :options="(dictionaries && Array.from(dictionaries['Состояние'])) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item">
          <span>Найдено при</span>
          <multiselect multiple placeholder="Выбирете тип теста" v-model="testFilter"
                       :options="(dictionaries && Array.from(dictionaries['Найдено при'])) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item">
          <span>Критичность</span>
          <multiselect multiple placeholder="Выбирете критичность" v-model="criticalFilter"
                       :options="(dictionaries && Array.from(dictionaries['Критичность'])) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item">
          <span>Тип дефекта</span>
          <multiselect multiple placeholder="Выбирете тип дефекта" v-model="defectTypeFilter"
                       :options="(dictionaries && Array.from(dictionaries['Тип Дефекта'])) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item">
          <span>Метод обнаружения</span>
          <multiselect multiple placeholder="Выбирете метод обнаружения" v-model="methodFilter"
                       :options="(dictionaries && Array.from(dictionaries['Метод обнаружения'])) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="tableFilters__item tableFilters__reopen">
          <span>Повторных открытий</span>
          <div class="reopens-amount__item">
            <el-input type="number"
                      class="short-input"
                      v-model="reopensFromFilter"
                      placeholder="Количество: от">
            </el-input>
            <el-input type="number"
                      class="short-input"
                      v-model="reopensToFilter"
                      placeholder="Количество: до">
            </el-input>
          </div>
        </div>
        <div class="tableFilters__item">
          <span>Дата создания</span>
          <el-date-picker
            v-model="creationDateFilter"
            @sort-change="sort"
            type="daterange"
            format="dd.MM.yyyy"
            value-format="yyyy-MM-dd"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
          </el-date-picker>
        </div>
        <div class="tableFilters__item">
          <span>Дата изменения</span>
          <el-date-picker
            v-model="changeDateFilter"
            type="daterange"
            format="dd.MM.yyyy"
            value-format="yyyy-MM-dd"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
          </el-date-picker>
        </div>
        <div class="tableFilters__item">
          <span>Дата закрытия</span>
          <el-date-picker
            v-model="closeDateFilter"
            type="daterange"
            format="dd.MM.yyyy"
            value-format="yyyy-MM-dd"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
          </el-date-picker>
        </div>
      </div>
    </div>
    <defects-table :defects="defects.value"
                   :pageSize="pageSize"
                   :currentPage.sync="currentPage"
                   @changePage="val => currentPage = val"
                   :total="defects.size"
                   :loading="loading"/>
  </div>
</template>

<script>
import defectsTable from '@/components/defectsTable.vue'
import { mapGetters, mapMutations } from 'vuex'

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
        await this.$store.dispatch('getDefects', { page: val, pageSize: this.pageSize, filters: this.filters })
      }
    },
    filters: {
      handler: async function (val) {
        this.loading = true
        await this.$store.dispatch('getDefects', { pageSize: this.pageSize, filters: val })
        this.currentPage = 1
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['defects', 'dictionaries', 'filters']),
    systemFilter: {
      get () {
        return this.filters.System
      },
      set (val) {
        this.setSystemFilter(val)
      }
    },
    conditionFilter: {
      get () {
        return this.filters['Состояние']
      },
      set (val) {
        this.setConditionFilter(val)
      }
    },
    testFilter: {
      get () {
        return this.filters['Найдено при']
      },
      set (val) {
        this.setTestFilter(val)
      }
    },
    criticalFilter: {
      get () {
        return this.filters['Критичность']
      },
      set (val) {
        this.setCriticalFilter(val)
      }
    },
    defectTypeFilter: {
      get () {
        return this.filters['Тип Дефекта']
      },
      set (val) {
        this.setDefectTypeFilter(val)
      }
    },
    methodFilter: {
      get () {
        return this.filters['Метод обнаружения']
      },
      set (val) {
        this.setMethodFilter(val)
      }
    },
    reopensFromFilter: {
      get () {
        return this.filters['reopens_amount'][0]
      },
      set (val) {
        this.setReopensFilter({ from: val, to: this.reopensToFilter })
      }
    },
    reopensToFilter: {
      get () {
        return this.filters['reopens_amount'][1]
      },
      set (val) {
        this.setReopensFilter({ from: this.reopensFromFilter, to: val })
      }
    },
    creationDateFilter: {
      get () {
        return this.filters['Дата создания']
      },
      set (val) {
        this.setCreationDateFilter(val)
      }
    },
    changeDateFilter: {
      get () {
        return this.filters['Дата изменения']
      },
      set (val) {
        this.setChangeDateFilterFilter(val)
      }
    },
    closeDateFilter: {
      get () {
        return this.filters['Дата закрытия']
      },
      set (val) {
        this.setCloseDateFilter(val)
      }
    }
  },
  async created () {
    this.loading = true
    if (!this.dictionaries) {
      await this.$store.dispatch('getDictionaries')
    }
    await this.$store.dispatch('getDefects', { page: this.currentPage, pageSize: this.pageSize })
    this.loading = false
  },
  methods: {
    ...mapMutations(['setSystemFilter', 'setConditionFilter', 'setTestFilter',
      'setCriticalFilter', 'setDefectTypeFilter', 'setMethodFilter', 'setReopensFilter',
      'setCreationDateFilter', 'setChangeDateFilterFilter', 'setCloseDateFilter'])
  }
}
</script>
<style lang="scss">
  .tableFilters-wrapper {
    margin: 0 auto;
    max-width: 1600px;
    .tableFilters {
      margin-bottom: 1rem;
      display: grid;
      grid-template-columns: 10rem repeat(3, 1fr);
      grid-template-rows: 1fr 1fr 1fr;
      .tableFilters__heading {
        grid-row-start: 1;
        grid-row-end: 5;
      }
      .tableFilters__item.tableFilters__reopen {
        grid-column-start: 2;
        grid-column-end: 5;
      }
      .tableFilters__item {
        margin: 0 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .reopens-amount__item {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          .el-input {
            &.short-input {
              display: inline-block;
              margin: 0.5rem;
              width: 150px;
            }
            &:first-child {
              margin-left: 0;
            }
          }
        }
        .el-date-editor {
          margin: 0.5rem 0;
        }
      }
    }
  }

</style>
