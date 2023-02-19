<template>
  <div class="create-btn-container">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Buy energy ressources</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-area md-inset>
          <md-card-content>
            <h3 class="md-subheading">
              <md-icon>call_made</md-icon>
              Money to send
            </h3>
            <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="energyType">Currency</label>
                  <md-input type="text" id="currency" name="currency" readonly :value="`${selectedAsset.displayName}`"/>
                </md-field>
                <md-field>
                  <label for="availableQty">Available</label>
                  <md-input type="text" id="availableQty" name="availableQty" readonly :value="`${selectedAsset.remainingAmount}`"/>
                </md-field>
            </div>            
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('amount')">
                        <label for="amount">Amount</label>
                        <md-input type="number" id="amount" name="amount" autocomplete="amount" v-model="form.amount" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.quantity.required">The amount is required</span>
                        <span class="md-error" v-else>Invalid amount</span>                    
                    </md-field>                
                </div>
            </div>
          </md-card-content>
        </md-card-area>
        <md-card-area>
          <md-card-content>
            <h3 class="md-subheading">
              <md-icon>call_received</md-icon>
              Energy to receive
            </h3>                 
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('energyType')">
                    <label for="energyType">Asset</label>
                    <md-select name="energyType" id="energyType" v-model="form.energyType" md-dense :disabled="sending">
                    <md-option value="Wind Power">Wind Power</md-option>
                    <md-option value="Hydropower">Hydropower</md-option>
                    <md-option value="Solar Energy">Solar Energy</md-option>
                    <md-option value="Geothermal Energy">Geothermal Energy</md-option>
                    <md-option value="Bio Energy">Bio Energy</md-option>
                    </md-select>
                    <span class="md-error">The asset is required</span>
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
          <md-button type="submit" class="md-primary" :disabled="sending">Buy energy</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
      </form>
    </md-dialog>
    <md-button class="md-raised md-primary" @click="showDialog=true">
      <md-icon>call_received</md-icon>
      <span>buy</span>
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
    name: "buybtn",
    mixins: [validationMixin],
    props: ['selectedAsset'],
    props: {
      selectedAsset: Object,
    },
    data: () => ({
      showDialog: false,
      dialogValue: null,
      form: {
        currencyId: null,
        email: null,
        quantity: null,
        amount: null,
        energyType: null,
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
        },
        energyType: {
          required
        },
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
      validateUser () {
        this.$v.$touch()
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