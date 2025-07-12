<script setup>
//import ref and onMounted
import { ref, onMounted } from 'vue'

//import api
import api from '../../api'

//define state
const booking = ref([])

//method fetchDataBooking
const fetchDataBooking = async () => {
  //fetch data
  await api.get('/api/booking-kelas').then(response => {
    //set response data to state "Booking"
    booking.value = response.data.data
  })
}

//run hook "onMounted"
onMounted(() => {
  //call method "fetchDataBooking"
  fetchDataBooking()
})
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <router-link
          :to="{ name: 'booking.create' }"
          class="btn btn-md btn-success rounded shadow border-0 mb-3"
          >ADD NEW</router-link
        >
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tanggal Join</th>
                  <th scope="col">Tanggal Expired</th>
                  <th scope="col">Kelas Diambil</th>
                  <th scope="col">Waktu Booking</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="booking.length == 0">
                  <td colspan="6" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(item, index) in booking" :key="index">
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.tanggal_join }}</td>
                  <td>{{ item.tanggal_expired }}</td>
                  <td>{{ item.kelas_diambil }}</td>
                  <td>{{ item.waktu_booking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
