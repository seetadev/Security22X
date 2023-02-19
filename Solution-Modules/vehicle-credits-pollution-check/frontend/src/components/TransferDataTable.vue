<template>
  <div class="datatable datatablelayout">
    <md-table v-model="this.elements" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">{{ title }}</h1>
      </md-table-toolbar>
      <md-table-row :id="item.id" slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Asset" class="text-row">
          {{ item.displayName }}
        </md-table-cell>
        <md-table-cell md-numeric md-label="Amount">
          {{ item.amount }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import transferbtn from "@/components/TransferBtn";
  export default {
    name: 'transferdatatable',
    props: ['title', 'elements', 'labels'],
    components: {
      transferbtn,
    },
    props: {
      title: String,
      elements: Array,
      labels: Array,
    },
  }
</script>

<style lang="scss" scoped>
  .datatablelayout {
    margin: auto;
    width: 500px;
  }
  .text-row {
    text-align: left;
  }
  .table-btn {
    width: 5px;
  }
</style>