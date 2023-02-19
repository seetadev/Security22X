<template>
  <div class="create-btn-container">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Transfer asset</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-area md-inset>
          <md-card-content>
            <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="asset">Asset</label>
                  <md-input type="text" id="asset" name="asset" readonly :value="`${selectedAsset.displayName}`"/>
                  <span class="md-suffix">{{ `Available: ${selectedAsset.remainingAmount}` }}</span>
                </md-field>
            </div>            
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('amount')">
                        <label for="amount">Amount</label>
                        <md-input type="number" id="amount" name="amount" autocomplete="amount" v-model="form.amount" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.amount.required">The amount is required</span>
                        <span class="md-error" v-else>Invalid amount</span>                    
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
          <md-field :class="getValidationClass('recipientEmail')">
            <label for="recipientEmail">Email</label>
            <md-input type="email" name="recipientEmail" id="recipientEmail" autocomplete="email" v-model="form.recipientEmail" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.recipientEmail.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.recipientEmail.email">Invalid email</span>
          </md-field>   
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Transfer asset</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
      </form>
    </md-dialog>
    <md-button class="md-icon-button md-raised md-primary" @click="showDialog=true">
      <md-icon>call_made</md-icon>
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
        assetId: null,
        recipientEmail: null,
        amount: null,
      },
      sending: false,
      snackBarMsg: null,
      showSnackbar: false,
    }),
    validations: {
      form: {
        amount: {
          required,
          maxLength: maxLength(5),
          minValue: minValue(1),
        },
        recipientEmail: {
          required,
          email
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
        this.form.amount = null
        this.form.recipientEmail = null
      },
      transferAmount () {

      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.transferAmount()
        }
      },
    },
    mounted() {
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