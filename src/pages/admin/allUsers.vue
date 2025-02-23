<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminAllUsers') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="allUsers" :headers="headers">
          <template #[`item.cart`]="data">
            <ul>
              <li v-for="item in data.item.cart" :key="item._id">
                {{ item.product.name }} x {{ item.quantity }}
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useAxios } from '@/composables/axios';
import { useI18n } from 'vue-i18n';
import { ref,computed } from 'vue';
import { useSnackbar } from 'vuetify-use-dialog';


const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const allUsers = ref([])

const headers = computed(() => {
  return [
    { title: 'ID', key: '_id' },
    { title: t('allUsers.account'), key: 'user.account' },
    { title: t('allUsers.createdAt'), key: 'createdAt', value: item => new Date(item.createdAt).toLocaleString() },
    { title: t('allUsers.cart'), key: 'cart', sortable: false },
    {
      title: t('allUsers.price'),
      key: 'price',
      value: item => {
        return item.cart.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
      }
    }
]})
// 向後端 API 發送請求獲取訂單資料。
// 如果請求成功，將訂單資料賦值給 allUsers.value，並更新應用的狀態。
// 如果請求失敗，顯示錯誤訊息並用 createSnackbar 顯示一個錯誤通知。
const getAllUsers = async () => {
  try {
    const { data } = await apiAuth.get('/allUsers/all')
    allUsers.value = data.result
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: '#C04759'
      }
    })
  }
}
getAllUsers()
</script>
<route lang="yaml">
meta:
  layout: admin
  login: true
  title: 'nav.adminAllUsers'
</route>
