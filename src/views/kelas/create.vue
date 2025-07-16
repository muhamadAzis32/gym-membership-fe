
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
const schedule = ref("");
const quota = ref("");

const errors = ref([]);

// store data
const storeKelas = async () => {
  // init formData
  let formData = new FormData();

  // assign state value
  formData.append("name", name.value);
  formData.append("schedule", schedule.value);
  formData.append("quota", quota.value);

  //store data with API
  await api
    .post("/api/kelas-gym", formData)
    .then(() => {
      //redirect
      router.push({ path: "/kelas-gym" });
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
            <form @submit.prevent="storeKelas()">
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
                <label class="form-label fw-bold">Schedule</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  v-model="schedule"
                  placeholder="Masukan Tanggal Join"
                />
                <div v-if="errors.schedule" class="alert alert-danger mt-2">
                  <span>{{ errors.schedule[0] }}</span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Quota</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="quota"
                  placeholder="Masukan Tanggal Join"
                />
                <div v-if="errors.quota" class="alert alert-danger mt-2">
                  <span>{{ errors.quota[0] }}</span>
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
