<script setup>
// import ref and onMounted
import { ref, onMounted } from "vue";

// import api
import Api from "../../api";

// define state
const membership = ref([]);

// method
const fetchDataMembership = async () => {
  // fetch data
  await Api.get("/api/membership").then((response) => {
    membership.value = response.data.data;
  });
};

// run hook
onMounted(() => {
  fetchDataMembership();
});
</script>
<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <!-- <router-link
          :to="{ name: 'pelanggan.create' }"
          class="btn btn-md btn-success rounded shadow border-0 mb-3"
          >ADD NEW</router-link
        > -->
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Waktu Mulai</th>
                  <th scope="col">Waktu Selesai</th>
                  <th scope="col">Jumlah Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="membership.length == 0">
                  <td colspan="6" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(item, index) in membership" :key="index">
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.start_date }}</td>
                  <td>{{ item.end_date }}</td>
                  <td>{{ item.payment_amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
