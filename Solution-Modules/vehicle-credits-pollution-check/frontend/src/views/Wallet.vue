<template>
  <div>
    <headerbar/>
    <titlecard title="Wallet"/>
    <div v-if="balanceLoaded">
      <div>
        <walletdatatable title="Wallet" :elements="balances"/>
      </div>
    </div>
    <div v-else>
      <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import * as apiService from "../services/apiService";
import walletdatatable from "@/components/TransferDataTable";
import headerbar from "@/components/HeaderBar";
import titlecard from "@/components/TitleCard";
export default {
  name: "Wallet",
  components: {
    walletdatatable,
    headerbar,
    titlecard,
  },
  data: () => ({
      balances: null,
      transactions: null,
      balanceLoaded: false,
  }),
  watch: {
    balances(newData, oldData) {
      this.balanceLoaded = true;
    },
  },
  methods: {
    getBalances() {
      apiService.getBalances()
        .then(body => (this.balances = body.data));
    },
  },
  mounted(){
    this.getBalances();
  },
};
</script>