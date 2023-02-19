<template>
  <div class="container">
    <md-table v-model="this.orderBookData" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">{{ title }}</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Price (CAD)" md-numeric>{{ item.price.toFixed(3) }}</md-table-cell>
        <md-table-cell :md-label="`Amount(${energyType.shortName})`" md-numeric>{{ item.amount.toFixed(3) }}</md-table-cell>
        <md-table-cell md-label="Sum(CAD)" md-numeric>{{ item.total.toFixed(3) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "formcard",
  props: ['title', 'energyType', 'orderBookData'],
  props: {
    title: String,
    energyType: Object,
    orderBookData: Array,
  },
  data: () => ({
    factoryId: null,
    email: null,
    price: null,
    amount: null,
    total: null,
    sending: false,
    selected: {},
    currentSum: 0,
  }),
  mounted() {
    this.currentSum = 0;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 10px;
  margin: auto;
  width: 500px;
  display: inline-block;
  padding-bottom: 10px;
}
.list-enter-active {
  transition: all 5s;
}
.list-enter {
  background: yellow;
}
</style>
