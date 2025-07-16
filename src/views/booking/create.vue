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
const kelasGym = ref([]);

const member_id = ref("");
const class_id = ref("");
const booking_time = ref("");
const errors = ref([]);

//method fetchDataPelanggan
const fetchDataPelanggan = async () => {
  //fetch data
  await api.get("/api/pelanggan-active").then((response) => {
    //set response data to state "pelanggan"
    pelanggan.value = response.data.data;
  });
};

//method fetchDataPelanggan
const fetchDataKelasGym = async () => {
  //fetch data
  await api.get("/api/kelas-gym").then((response) => {
    //set response data to state "kelas-gym"
    kelasGym.value = response.data.data;
  });
};

//method "storeBooking"
const storeBooking = async () => {
  //init formData
  let formData = new FormData();

  //assign state value to formData
  formData.append("member_id", member_id.value);
  formData.append("class_id", class_id.value);
  formData.append("booking_time", booking_time.value);

  //store data with API
  await api
    .post("/api/booking-kelas", formData)
    .then(() => {
      //redirect
      router.push({ path: "/booking" });
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
  fetchDataKelasGym();
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form @submit.prevent="storeBooking()">
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
                <label class="form-label fw-bold">Kelas</label>
                <select class="form-control" v-model="class_id">
                  <option value="" disabled>Pilih Member</option>
                  <option
                    v-for="item in kelasGym"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div v-if="errors.class_id" class="alert alert-danger mt-2">
                  <span>{{ errors.class_id[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Waktu Booking</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="booking_time"
                  placeholder="Member"
                />
                <div v-if="errors.booking_time" class="alert alert-danger mt-2">
                  <span>{{ errors.booking_time[0] }}</span>
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
