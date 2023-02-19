<template>
  <div class="create-btn-container">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add energy ressources</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-content>
            <div class="md-layout-item md-small-size-100">
                <md-field>
                  <span>{{ energyDisplayName }}</span>
                </md-field>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('quantity')">
                        <label for="quantity">Quantity</label>
                        <md-input type="number" id="quantity" name="quantity" autocomplete="quantity" v-model="form.quantity" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.quantity.required">The quantity is required</span>
                        <span class="md-error" v-else>Invalid quantity</span> 
                        <span class="md-suffix">kWh</span>                   
                    </md-field>                
                </div>
            </div>
          </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Issue energy</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
      </form>
    </md-dialog>
    <md-button class="md-icon-button md-raised md-primary" @click="showDialog=true">
      <md-icon>library_add</md-icon>
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
    minValue,
  } from 'vuelidate/lib/validators';
  export default {
    name: "issuebtn",
    mixins: [validationMixin],
    props: ['energyDisplayName', 'assetId'],
    props: {
      energyDisplayName: String,
      assetId: String,
    },
    data: () => ({
      showDialog: false,
      dialogValue: null,
      form: {
        energyId: null,
        email: null,
        quantity: null,
      },
      assetCreated: false,
      sending: false,
      snackBarMsg: null,
      showSnackbar: false,
      //TODO: Implement logic to fetch the user's email
      userEmail: 'user-email',
    }),
    validations: {
      form: {
        quantity: {
          required,
          minValue: minValue(1),
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
        this.form.energyType = null
      },
      issueAmount () {
        this.form.energyId = this.assetId;
        this.form.email = this.userEmail;
        this.sending = true;
        apiService.issueGreenCredits(this.form)
          .then(() => {            
            this.assetCreated = true;
            this.snackBarMsg = "Energy issued.";
            this.showSnackbar = true;
            this.sending = false;
            this.clearForm();
          }).catch((error) => {
            if (error.response) {
                this.snackBarMsg = error.response.data;
            } else if (error.request) {
                this.snackBarMsg = error.request;
            } else {
                this.snackBarMsg = error.message;
            }
            this.showSnackbar = true;
            this.sending = false;
            this.clearForm();
          });
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.issueAmount()
        }
      }
    }
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