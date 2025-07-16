
<script setup>
//import ref
import { ref } from "vue";

//import router
import { useRouter } from "vue-router";

//import api
import api from "../../api";

//init router
const router = useRouter();

// define state
const name = ref("");
const email = ref("");
const join_date = ref("");
const status = ref("active");

const statuses = ref([]);
const errors = ref([]);

statuses.value = ["active", "inactive"];

// store data
const storePelanggan = async () => {
  // init formData
  let formData = new FormData();

  // assign state value
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("join_date", join_date.value);
  formData.append("status", status.value);

  //store data with API
  await api
    .post("/api/pelanggan", formData)
    .then(() => {
      //redirect
      router.push({ path: "/pelanggan" });
    })
    .catch((error) => {
      //assign response error data to state "errors"
      if (error.response?.data.errors) {
        errors.value = error.response.data.errors;
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan tak terduga!");
      }
    });
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form @submit.prevent="storePelanggan()">
              <div class="mb-3">
                <label class="form-label fw-bold">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Masukan nama"
                />
                <div v-if="errors.name" class="alert alert-danger mt-2">
                  <span>{{ errors.name[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="email"
                  placeholder="Masukan Email"
                />
                <div v-if="errors.email" class="alert alert-danger mt-2">
                  <span>{{ errors.email[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Tanggal Join</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="join_date"
                  placeholder="Masukan Tanggal Join"
                />
                <div v-if="errors.join_date" class="alert alert-danger mt-2">
                  <span>{{ errors.join_date[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Status</label>
                <select class="form-control" v-model="status">
                  <option value="" disabled>Klik Untuk Memilih Status</option>
                  <option v-for="item in statuses" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
                <div v-if="errors.status" class="alert alert-danger mt-2">
                  <span>{{ errors.status[0] }}</span>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-md btn-primary rounded-sm shadow border-0"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
