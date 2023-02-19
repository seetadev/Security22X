<template>
  <div class="create-btn-container">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create new green energy</md-dialog-title>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-content>
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('energyType')">
                    <label for="energyType">Asset</label>
                    <md-select name="energyType" id="energyType" v-model="form.energyType" md-dense :disabled="sending">
                    <md-option 
                      v-for="(item) in Object.values(this.energyTypes)"
                      :key="item.value"
                      :value="item.shortName">{{ item.longName }}</md-option>
                    </md-select>
                    <span class="md-error">The asset is required</span>
                </md-field>
            </div>
          </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create green energy</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ snackBarMsg }}</span>
      </md-snackbar>
      </form>
    </md-dialog>
    <md-button class="md-icon-button md-raised md-primary" @click="showDialog=true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import * as apiService from "../services/apiService";
  import * as energyEnum from "@/enum/EnergyType";
  import { validationMixin } from 'vuelidate';
  import {
    required,
    email,
    minLength,
    maxLength,
    minValue,
  } from 'vuelidate/lib/validators';
  export default {
    name: "createbtn",
    mixins: [validationMixin],
    data: () => ({
      showDialog: false,
      dialogValue: null,
      form: {
        energyType: null,
      },
      sending: false,
      snackBarMsg: null,
      showSnackbar: false,
      energyTypes: energyEnum.EnergyType,
    }),
    validations: {
      form: {
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
        this.form.energyType = null
      },
      createAsset () {
        this.sending = true;
        apiService.createGreenEnergy(this.form)
          .then(() => {            
            this.snackBarMsg = "New type of green energy has been created.";
            this.showSnackbar = true;
            this.sending = false;
            this.clearForm();
            vm.$forceUpdate();
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
          this.createAsset()
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