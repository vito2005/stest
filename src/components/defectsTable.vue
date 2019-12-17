<template>
  <div class="table-wrapper">
    <el-table
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="defects"
      style="width: 100%"
      border
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'Дата создания', order: 'descending'}">
      <el-table-column
        prop="System"
        label="Система"
        header-align="center"
        align="right"
        width="110">
      </el-table-column>
      <el-table-column
        prop="Summary"
        label="Сводка"
        header-align="center"
        align="right"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Состояние"
        label="Состояние"
        header-align="center"
        align="right"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Найдено при"
        label="Найдено при"
        header-align="center"
        align="right"
        width="140">
      </el-table-column>
      <el-table-column
        prop="Критичность"
        label="Критичность"
        header-align="center"
        align="right">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        header-align="center"
        align="right"
        prop="Тип Дефекта"
        label="Тип дефекта"
        width="135">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        prop="Дата создания"
        align="right"
        label="Дата создания"
        :formatter="dateFormatter"
        header-align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        prop="Дата изменения"
        align="right"
        label="Дата и время изменения"
        :formatter="dateTimeFormatter"
        header-align="center"
        width="130">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        prop="Дата закрытия"
        align="right"
        label="Дата закрытия"
        header-align="center"
        :formatter="dateFormatter"
        width="115">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        header-align="center"
        align="right"
        prop="Метод обнаружения"
        label="Метод обнаружения"
        width="150">
      </el-table-column>
      <el-table-column
        label-class-name="custom-cell"
        header-align="center"
        align="right"
        prop="reopens_amount"
        :formatter="reopensAmountFormatter"
        label="Повторных открытий"
        width="115">
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      :pager-count="11"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'defects-Table',
  props: {
    defects: Array,
    loading: Boolean,
    currentPage: Number,
    pageSize: Number,
    total: Number
  },
  data () {
    return {
      page: null
    }
  },
  created () {
    this.page = this.currentPage
  },
  methods: {
    dateFormatter (row, { property }) {
      if (!row[property]) return '-'
      let d = new Date(row[property])
      d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear()
      ].map(component => component.slice(-2))
      return d.slice(0, 3).join('.')
    },
    dateTimeFormatter (row, { property }) {
      if (!row[property]) return '-'
      let d = new Date(row[property])
      d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
      ].map(component => component.slice(-2))
      return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':')
    },
    reopensAmountFormatter (row) {
      return row.reopens_amount || '-'
    },
    tableRowClassName ({ row }) {
      if (row['Критичность'] === 'Критический') {
        return 'warning-row'
      }
      return ''
    },
    handleCurrentChange (val) {
      this.$emit('changePage', val)
    }
  }
}
</script>

<style lang="scss">
  .cell {
    word-break: break-word !important;
  }
  .el-table .warning-row {
    background: rgba(255, 69, 81, 0.38);
  }
  .table-wrapper {
    margin: 0 auto;
    padding: 0 4px;
    max-width: 1600px;
  }

</style>
