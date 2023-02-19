<template>
  <div>
    <div>
      <headerbar/>
    </div>
  </div>
</template>

<script>
import headerbar from "@/components/HeaderBar";
export default {
  name: "mainview",
  components: {
    headerbar,
  },
  data: () => {
    return {
      currentPage: 'producer',
    };
  },
  methods: {
    onClickPage (e) {
      this.currentPage = e;
    }
  }
};
</script>
