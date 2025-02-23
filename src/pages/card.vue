<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.card') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-list lines="two">
          <template v-for="(item, i) in card" :key="item._id">
            <v-list-item
              :title="item.product.name"
              :subtitle="item.product.price"
              active-class="bg-red"
              :active="!item.product.sell"
            >
              <template #prepend>
                <v-avatar rounded="0">
                  <v-img :src="item.product.image"></v-img>
                </v-avatar>
              </template>
              <template #append>
                <v-btn color="red" icon="mdi-minus" size="small" class="ml-2" @click="editCard(item.product._id, -1)"></v-btn>
                {{ item.quantity }}
                <v-btn color="#3B6C73" icon="mdi-plus" size="small" class="mr-2" @click="editCard(item.product._id, 1)"></v-btn>
              </template>
            </v-list-item>
            <v-divider v-if="i < card.length - 1"></v-divider>
          </template>
        </v-list>
      </v-col>
      <!-- 結帳按鈕 -->
      <v-col cols="12" class="text-center">
        <p>{{ total }}</p>
        <!-- 不能結帳的判斷 -->
        <v-btn color="primary" :disabled="!canCheckout" @click="checkout">{{ $t('card.checkout') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'


const { apiAuth } = useAxios()
const user = useUserStore()
const router = useRouter()
const createSnackbar = useSnackbar()
const { t } = useI18n()


const card = ref([])

const getCard = async () => {
  try {
    const { data } = await apiAuth.get('/user/card')
    card.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getCard()

const total = computed(() => {
  return card.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
})

// 不能結帳的判斷
const canCheckout = computed(() => {
  return card.value.length > 0 && card.value.every(item => item.product.sell)
})

const editCard = async (product, quantity) => {
  try {
    const { data } = await apiAuth.patch('/user/card', { product, quantity })
    user.card = data.result
    getCard()
  } catch (error) {
    console.log(error)
  }
}
const checkout = async () => {
  try {
    await apiAuth.post('/order')
    user.card = 0
    router.push('/order')
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
</script>

<route lang="yaml">
  meta:
    login: true
    title: 'nav.card'
  </route>
