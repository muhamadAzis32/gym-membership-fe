<script setup>
//import ref
import { ref, onMounted } from "vue";

//import router
import { useRouter } from "vue-router";

//import api
import api from "../../api";

//init router
const router = useRouter();

//define state
const pelanggan = ref([]);

const member_id = ref("");
const start_date = ref("");
const end_date = ref("");
const payment_amount = ref("");

const errors = ref([]);

//method fetchDataPelanggan
const fetchDataPelanggan = async () => {
  //fetch data
  await api.get("/api/pelanggan-active").then((response) => {
    //set response data to state "pelanggan"
    pelanggan.value = response.data.data;
  });
};

//method ""
const storeMembership = async () => {
  //init formData
  let formData = new FormData();

  //assign state value to formData
  formData.append("member_id", member_id.value);
  formData.append("start_date", start_date.value);
  formData.append("end_date", end_date.value);
  formData.append("payment_amount", payment_amount.value);

  //store data with API
  await api
    .post("/api/membership", formData)
    .then(() => {
      //redirect
      router.push({ path: "/membership" });
    })
    .catch((error) => {
      //assign response error data to state "errors"
      if (error.response?.data?.errors) {
        errors.value = error.response.data.errors;
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Terjadi kesalahan tak terduga!");
      }
    });
};

//run hook "onMounted"
onMounted(() => {
  //call method
  fetchDataPelanggan();
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form @submit.prevent="storeMembership()">
              <div class="mb-3">
                <label class="form-label fw-bold">Member</label>
                <select class="form-control" v-model="member_id">
                  <option value="" disabled>Pilih Member</option>
                  <option
                    v-for="item in pelanggan"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div v-if="errors.member_id" class="alert alert-danger mt-2">
                  <span>{{ errors.member_id[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Waktu Mulai</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="start_date"
                  placeholder="Masukan waktu mulai"
                />
                <div v-if="errors.start_date" class="alert alert-danger mt-2">
                  <span>{{ errors.start_date[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Waktu Selesai</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="end_date"
                  placeholder="Masukan waktu selesai"
                />
                <div v-if="errors.end_date" class="alert alert-danger mt-2">
                  <span>{{ errors.end_date[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Jumlah Pembayaran</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="payment_amount"
                  placeholder="Masukan jumlah pembayaran"
                />
                <div
                  v-if="errors.payment_amount"
                  class="alert alert-danger mt-2"
                >
                  <span>{{ errors.payment_amount[0] }}</span>
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
