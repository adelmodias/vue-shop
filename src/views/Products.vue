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

      <h3 class="d-inline-block">Products list</h3>
      <button @click="addNew" class="btn btn-primary float-right">Add product</button>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>
              <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
              <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Product Description"
                    v-model="product.description"
                  ></textarea>
                </div>
              </div>

              <div class="col-sm-4">
                <h3>Product details</h3>
                <hr />
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product tags"
                    v-model="product.tag"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" @change="uploadImage()" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              v-if="modal == 'new'"
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
            >Add product</button>
            <button
              v-if="modal == 'edit'"
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
            >Save changes</button>
          </div>
        </div>
      </div>
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
        description: null,
        price: null,
        tag: null,
        image: null
      },
      modal: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    uploadImage() {},
    addNew() {
      this.modal = "new";
      $("#product").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Your file has been updated."
      });
      $("#product").modal("hide");
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    readData() {},
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#product").modal("hide");
      Toast.fire({
        type: "success",
        title: "Your file has been created."
      });
    },
    deleteProduct(product) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(product.id).delete();
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          Toast.fire({
            type: "success",
            title: "Your file has been deleted."
          });
        }
      });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
