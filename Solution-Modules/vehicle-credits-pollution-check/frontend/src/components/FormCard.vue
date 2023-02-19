<template>
  <div class="card-container">
    <md-card class="md-layout-item">
    <md-card-area md-inset>
      <md-card-header>
        <div class="md-title">{{ `${title} ${energyType.shortName}` }}</div>
      </md-card-header>
      <md-card-content class="form-card">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field>
                    <label for="amount">Amount</label>
                    <md-input type="number" id="amount" name="amount" v-model="formData.amount" :disabled="sending" />              
                    <span class="md-suffix">{{ energyType.shortName }}</span>
                </md-field>                
            </div>
        </div>
        <div>
            <div class="md-layout-item md-small-size-100">
                <md-field>
                    <label for="price">Price</label>
                    <md-input type="number" id="price" name="price" v-model="formData.price" :disabled="sending" />              
                    <span class="md-suffix">CAD</span>
                </md-field>
            </div>
        </div>        
      </md-card-content>
      <md-card-actions>
        <md-button class="in-form-btn" @click="clickMarketValue()">Market</md-button>
      </md-card-actions>
    </md-card-area>
      <md-card-content>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field>
                    <label for="total">Total</label>
                    <md-input type="number" id="total" name="total" v-model="total" :disabled="true" />              
                    <span class="md-suffix">CAD</span>
                </md-field>                
            </div>
        </div>
      </md-card-content>      
      <md-card-actions>
        <md-button @click="onSubmit" v-bind:class="[title.toUpperCase() == 'SELL' ? 'md-accent' : 'md-primary']" :disabled="sending">{{ `${title} ${energyType.shortName}` }}</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "formcard",
  props: ['title', 'energyType','marketValue', 'formData', 'onSubmit' , 'sending'],
  props: {
    title: String,
    energyType: Object,
    marketValue: Number,
    formData: Object,
    onSubmit: Function,
    sending: Boolean,
  },
  computed: {
    total: {
      get() {
        if(this.formData.price && this.formData.amount) {
          return (this.formData.price * this.formData.amount).toFixed(3);
        } else {
          return null;
        }
      },
      set(newValue) {
        
      }
    },
  },
  methods: {
    clickMarketValue() {
      this.formData.price = this.marketValue.toFixed(3);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  padding-top: 10px;
  margin: auto;
  width: 300px;
  display: inline-block;
}
.in-form-btn {
  font-size: 10pt;
}
.form-card {
  height: 125px;
}
</style>
