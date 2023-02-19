<template>
  <div>
    <headerbar/>
    <titlecard title="Producer"/>
    <div v-if="dataLoaded">
      <datatable title="Green energy" :elements="getGreenAssets" :labels="labels"/>
    </div>
    <div v-else>
      <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
  import * as apiService from "../services/apiService";
  import moment from "moment";
  import datatable from "@/components/AssetDataTable";
  import headerbar from "@/components/HeaderBar";
  import titlecard from "@/components/TitleCard";
  export default {
    name: "producer",
    components: {
      headerbar,
      datatable,
      titlecard,
    },
    data: () => ({
      productId: '',
      greenAssets: null,
      dataLoaded: false,
      labels: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "creationDate",
          label: "Creation Date",
        },
      ],      
    }),
    watch: {
      greenAssets(newData, oldData) {
        this.dataLoaded = true;
      }
    },
    computed: {
      getGreenAssets() {
        return this.greenAssets.map(e => {
          return {
            id: e.id,
            status: e.blockchainStatus,
            name: e.name,
            creationDate: e.blockchainStatus == "Confirmed" ? moment(e.creationDate).format('MMM Do YYYY, h:mm:ss a') : "N/A",
          };
        }); 
      }
    },
    methods: {
      fetchGreenAssets() {
        apiService.getGreenEnergies()
          .then(body => {
            (this.greenAssets = body.data)
          });
      },
    },
    mounted() {
      this.fetchGreenAssets();
    },
  };
</script>