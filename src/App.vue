<template>
  <div id="app">
    <div v-if="this.settings.title">
      <h2 class="mb-4">{{this.settings.title}}</h2>
    </div>
    <div v-if="products.length">
      <div class="flex-container">
        <Card 
          v-for="(prod, index) in products"
          :key="index"
          :product="prod"
          :settings="settings"
        />
      </div>
    </div>      
  </div>
</template>

<script>
import Card from "./components/Card.vue";

export default {
  name: "app",
  components: {
    Card
  },
  data() {
    return {
      settings: {},
      prod: {},
      products: [],
      index: 0
    };
  },

  mounted: function() {
    fetch("http://localhost:3001/settings", {
      method: "get"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.settings = jsonData;
      });

    fetch("http://localhost:3001/products", {
      method: "get"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.products = jsonData;
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
.flex-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
