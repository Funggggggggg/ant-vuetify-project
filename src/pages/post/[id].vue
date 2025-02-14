<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ post.title }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6">
        <v-img :src="post.image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <p>{{ '分類：'+ post.category }}</p>
        <p>{{ '發布者：'+ post.user }}</p>
        <!-- <p>{{ post.like }}</p> -->
        <p>{{ post.content }}</p>
        <!-- 購物車數量 -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <!-- Vuetify 中的文本框元件，用來顯示和處理用戶的輸入。 -->
          <!-- v-model 是 Vue 的雙向數據綁定語法。.number 修飾符會強制將輸入框的值轉換為數字類型。 -->
          <!-- type="number" 指定輸入框的類型為數字輸入，這樣瀏覽器會針對數字提供適當的界面和驗證，例如只允許輸入數字。 -->
          <!-- FIXME <v-text-field v-model.number="quantity.value.value" type="number" :error-messages="quantity.errorMessage.value"></v-text-field> -->
          <v-btn type="submit" prepend-icon="mdi-heart" :loading="isSubmitting">{{ '收藏' }}</v-btn>
          <!-- 如果是送出中就有載入的動畫 -->
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <!--商品下架有提示 => overlays  -->
  <v-overlay :model-value="post.isPrivate" class="align-center justify-center" scrim="black" opacity="0.8" persistent>
    <h1 class="text-center">{{ 'api.私人卡片' }}</h1>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router' // 沒有 R取路由資訊 有 R做挑轉資訊
import { useForm } from 'vee-validate'
// import { useForm, useField } from 'vee-validate'
// import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()

const post = ref({
  _id: '',
  // user: '',
  title: '',
  content: '',
  image: '',
  category: '' ,// 分類
  isPrivate: false,
  like: 0,
})
// 取資料
const getPost = async () => {
  try {
    const { data } = await api.get('/post/' + route.params.id)
    post.value = data.result
    document.title = post.value.title + ' | 購物網站'
  } catch (error) {
    console.log(error)
    router.push('/') //有問題丟回首頁
  }
}
getPost()

// const schema = yup.object({
//   quantity: yup
//     .number()
//     .typeError(t('post.addCardQuantityInvalid'))
//     .required(t('post.addCardQuantityInvalid'))
//     .positive(t('post.addCardQuantityInvalid'))
//     .integer(t('post.addCardQuantityInvalid'))
// })
const { handleSubmit, isSubmitting } = useForm({
  // validationSchema: schema,
  initialValues: {
    quantity: 1
  }
})
// const quantity = useField('quantity')

const submit = handleSubmit(async () => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/user/card', {
      post: post.value._id,
      // quantity: values.quantity
    })
    user.card = data.result
    createSnackbar({
      text: '成功加入卡片',
      snackbarProps: {
        color: 'green'
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: 'api.' + (error?.response?.data?.message || '未知錯誤'),
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>

<!-- 修改路由 -->
<route lang="yaml">
  meta:
  title: '發布文章'
</route>
