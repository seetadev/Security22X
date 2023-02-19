<template>
  <div>
    <headerbar/>
    <titlecard title="Market"/>
    <div v-if="dataLoaded">
      <div>
        <md-radio
          v-for="(item) in Object.values(this.energyTypes)"
          :key="item.shortName"
          v-model="energyRadio"
          :value="item.value">
          {{ item.longName }}
        </md-radio>
      </div>
      <div>
        <formcard title="BUY" :energyType="energyTypes[energyRadio]" :marketValue="marketBuyPrice" :formData="form.buy" :onSubmit="buyEnergy" :sending="sendingBuy" />
        <formcard title="SELL" :energyType="energyTypes[energyRadio]" :marketValue="marketSellPrice" :formData="form.sell" :onSubmit="sellEnergy" :sending="sendingSell"/>
      </div>
      <div>
        <datatable title="BUY ORDERS" :energyType="energyTypes[energyRadio]" :orderBookData="buyOrderBook" />
        <datatable title="SELL ORDERS" :energyType="energyTypes[energyRadio]" :orderBookData="sellOrderBook" />
      </div>
      <md-snackbar md-position="left" :md-duration="3000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
    </div>
    <div v-else>
      <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import * as apiService from "../services/apiService";
import * as utils from "@/utils/utils";
import * as energyEnum from "@/enum/EnergyType";
import datatable from "@/components/OrderDataTable";
import headerbar from "@/components/HeaderBar";
import titlecard from "@/components/TitleCard";
import formcard from "@/components/FormCard";
export default {
  name: "market",
  components: {
    datatable,
    headerbar,
    titlecard,
    formcard,
  },
  data: () => ({
    balances: null,
    dataLoaded: false,
    snackBarMsg: null,
    showSnackbar: false,
    energyRadio: energyEnum.EnergyType.WindPower.value,
    energyTypes: energyEnum.EnergyType,
    energyAssets: null,
    currencyAssets: null,
    recipientEmail: null,
    senderEmail: null,
    sendingBuy: false,
    sendingSell: false,
    form: {
      buy: {
        price: null,
        amount: null,
      },
      sell: {
        price: null,
        amount: null,
      },
    },
    orderBookData: {
      buy: [
        {
          price: 1000,
          amount: 20,
        }
      ],
      sell: [
        {
          price: 500,
          amount: 50,
        }
      ],
    },
  }),
  watch: {
    balances(newData, oldData) {
      this.dataLoaded = true;
    },
    energyRadio(newData, oldData) {
      this.loadInitData();
      this.resetForm();
    }
  },
  computed: {
    marketBuyPrice() {
      return this.orderBookData.sell[0].price;
    },
    marketSellPrice() {
      return this.orderBookData.buy[0].price;
    },
    buyOrderBook() {
      let currentSum = 0;
      let results = [];
      this.orderBookData.buy.forEach(e => {
        currentSum += e.price * e.amount;
        results.push(
          {
            price: e.price,
            amount: e.amount,
            total: currentSum,
          }
        )
      });
      return results;
    },
    sellOrderBook() {
      let currentSum = 0;
      let results = [];
      this.orderBookData.sell.forEach(e => {
        currentSum += e.price * e.amount;
        results.push(
          {
            price: e.price,
            amount: e.amount,
            total: currentSum,
          }
        )
      });
      return results;
    },    
  },
  methods: {
    getBalances() {
      apiService.getBalances()
        .then(body => {
          this.balances = body.data;
        });
    },
    resetBuyForm() {
      this.form = {
        buy: {
          price: null,
          amount: null,
        },
      };
    },
    resetSellForm() {
      this.form = {
        sell: {
          price: null,
          amount: null,
        },
      };
    },
    resetForm() {
      this.form = {
        buy: {
          price: null,
          amount: null,
        },
        sell: {
          price: null,
          amount: null,
        },
      };
    },
    buyEnergy() {
      //TODO: Implement buying green credits.
    },
    sellEnergy() {
      //TODO: Implement selling green credits.
    },
    //TODO: For the purpose of an example, we mocked the values in the order books. You will have to reimplement it.
    mockNewOrder() {
      this.$nextTick(function () {
        window.setInterval(() => {
          this.orderBookData = utils.generateData(200, 60);
        }, 500);
      });
    },
    loadInitData() {
      this.orderBookData.buy = [];
      this.orderBookData.sell = [];
      this.orderBookData = utils.generateData(3000, 60);
      this.dataLoaded = true;
    },

  },
  mounted(){
    this.loadInitData();
    this.mockNewOrder();    
  },
};
</script>

<style lang="scss" scoped>
</style>