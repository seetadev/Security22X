<template>
  <div class="create-btn-container">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Sell energy ressources</md-dialog-title>
      <form novalidate class="md-layout">
      <md-card class="md-layout-item">
        <md-card-area md-inset>
          <md-card-content>
            <h3 class="md-subheading">
              <md-icon>call_made</md-icon>
              Energy to send
            </h3>
            
            <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="energyType">EnergyType</label>
                  <md-input type="text" id="energyType" name="energyType" readonly :value="`${selectedAsset.displayName}`"/>
                </md-field>
                <md-field>
                  <label for="availableQty">Available</label>
                  <md-input type="text" id="availableQty" name="availableQty" readonly :value="`${selectedAsset.remainingAmount} kWh`"/>
                </md-field>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('quantity')">
                        <label for="quantity">Quantity</label>
                        <md-input type="number" id="quantity" name="quantity" autocomplete="quantity" v-model="form.quantity" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.quantity.required">The quantity is required</span>
                        <span class="md-error" v-else>Invalid quantity</span>                    
                    </md-field>                
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <span>kWh</span>
                  </md-field>     
                </div>
            </div>
          </md-card-content>
        </md-card-area>
        <md-card-area>
          <md-card-content>
            <h3 class="md-subheading">
              <md-icon>call_received</md-icon>
              Money to receive
            </h3>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('amount')">
                        <label for="amount">Amount</label>
                        <md-input type="number" id="amount" name="amount" autocomplete="amount" v-model="form.amount" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.quantity.required">The amount is required</span>
                        <span class="md-error" v-else>Invalid amount</span>                    
                    </md-field>                
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <span>CAD</span>
                  </md-field>     
                </div>
            </div>
          </md-card-content>
        </md-card-area>
        <md-card-content>
          <h3 class="md-subheading">
            <md-icon>contact_mail</md-icon>
            Trader
          </h3>
          <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </md-card-content>        
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Sell energy</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
      </form>
    </md-dialog>
    <md-button class="md-raised md-primary" @click="showDialog=true">
      <md-icon>call_made</md-icon>
      <span>sell</span>
    </md-button>
  </div>
</template>

<script>
  import * as apiService from "../services/apiService";
  import { validationMixin } from 'vuelidate';
  import {
    required,
    email,
    minLength,
    maxLength,
    maxValue,
    minValue,
  } from 'vuelidate/lib/validators';
  export default {
    name: "sellbtn",
    mixins: [validationMixin],
    props: ['selectedAsset'],
    props: {
      selectedAsset: Object,
    },
    data: () => ({
      showDialog: false,
      dialogValue: null,
      form: {
        toSend: {
          factoryId: null,
          email: null,
          quantity: null,
          amount: null,
        },
        toReceive: {

        },
      },
      assetCreated: false,
      sending: false,
      snackBarMsg: null,
      showSnackbar: false,
    }),
    validations: {
      form: {
        quantity: {
          required,
          maxLength: maxLength(5),
          minValue: minValue(1),
        },
        amount: {
          required,
          maxLength: maxLength(5),
          minValue: minValue(1),
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.quantity = null
        this.form.amount = null
        this.form.email = null
      },
    },
  };
</script>

<style lang="scss" scoped>
.create-btn-container {
    float: right;
}
.create-btn {
    height: 50px;
}
</style>