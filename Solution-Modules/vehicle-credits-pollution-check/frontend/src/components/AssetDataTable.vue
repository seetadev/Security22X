<template>
  <div class="datatable">
    <md-table class="datatablelayout" v-model="this.elements" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">{{ title }}</h1>
        <createbtn/>
      </md-table-toolbar>
      <md-table-row
        :id="item.id"
        slot="md-table-row"
        slot-scope="{ item }"
        v-bind:class="[item.status != 'Confirmed' ? 'disableclick' : '']"
      >
        <md-tooltip v-if="item.status!='Confirmed'" md-direction="right">
          Applying operations in blockchain
        </md-tooltip>
        <md-table-cell md-label="Asset" class="text-row long-text">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Creation Date" class="text-row">{{ item.creationDate }}</md-table-cell>
        <md-table-cell>
          <issuebtn :energyDisplayName="item.name" :assetId="item.id"/>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import createbtn from "@/components/CreateBtn";
  import issuebtn from "@/components/IssueBtn";
  export default {
    name: 'assetdatatable',
    props: ['title', 'elements', 'labels'],
    components: {
      createbtn,
      issuebtn,
    },
    props: {
      title: String,
      elements: Array,
      labels: Array,
    },
  }
</script>

<style lang="scss" scoped>
.datatable {
  margin-left: 50px;
  margin-right: 50px;
}
.datatablelayout {
  margin: auto;
}
.text-row {
  text-align: left;
}
.disableclick {
  cursor: wait;
}
</style>