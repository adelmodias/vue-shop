<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <h3>Basic CRUD (create/read/update/delete) in Firebase and Vue</h3>

      <!-- Add product -->
      <div class="product-test">
        <div class="form-group">
          <input
            type="text"
            placeholder="Product Name"
            v-model="product.name"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="Price"
            v-model="product.price"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <button @click="saveData" class="btn btn-primary">Save data</button>
        </div>
      </div>
      <!-- /Add product -->

      <h3>Products list</h3>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.name">
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { fb, db } from "@/firebaseConfig.js";

export default {
  name: "Overview",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      }
    };
  },
  methods: {
    readData() {
      this.products = [];
      // Get all documents in a collection
      db.collection("products").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.products.push(doc.data());
        });
      });
      console.log(JSON.stringify(this.products));
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    // reset() {
      // Object.assign(this.$data, this.$options.data.apply(this));
    // }
  },
  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
