<template>
  <v-container>
    <v-row class="text-abril text-snow mt-8">
      <v-col cols="12">
        <h1 class="text-center text-h4"> {{ '註冊' }} </h1>
        <!-- 第二種寫法 <h1 v-t="'nav.register'"></h1> -->
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <!-- 當我送出中時，把整個表單 disable 停用 ，submit 是自己寫的 fuction-->
        <!-- ⭐ 阻擋使用者重複點按 -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            :label="'帳號'"
            minlength="4" maxlength="20" counter
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="'信箱'"
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="'密碼'"
            minlength="4" maxlength="20" counter
          />
          <v-text-field
            v-model="passwordConfirm.value.value"
            type="password"
            :error-messages="passwordConfirm.errorMessage.value"
            :label="'確認密碼'"
            minlength="4" maxlength="20" counter
          />
          <div class="text-center">
            <!-- 送出中就顯示 loading (轉圈圈的東西)-->
            <v-btn :loading="isSubmitting" type="submit" color="#3B6C73">{{ '建立帳號'}}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate' //類似表單功能，與 yup 搭配使用
import * as yup from 'yup'// 語法參照檔案
import validator from 'validator' //後端 email 驗證

import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// 寫法與後端 model 相像，直接參照改寫
// yup 套件 Yup 是一個常用的 JavaScript 驗證函式庫，用來進行物件結構的驗證，通常和表單處理搭配使用。
const schema = yup.object({
  account: yup
    //資料型態是文字
    .string()
    // 必填
    .required('使用者帳號必填')
    // 最短長度
    .min(4, '使用者帳號太短')
    // 最長長度
    .max(20, '使用者帳號太長')
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test(
      'isAlphanumeric' ,'使用者帳號格式不符',
      value => validator.isAlphanumeric(value)
  ),
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式不符',
      value => validator.isEmail(value)
  ),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼太短')
    .max(20, '使用者密碼太長'),
  passwordConfirm: yup
    .string()
    // .oneOf(陣列, 訊息)  必須要是陣列內其中一個值
    // .ref(欄位名稱)      取得欄位的值
    // .ref('password')   password 欄位的值
    .oneOf([yup.ref('password')], '密碼不符')
})

// 建立表單( 一定要先 useForm 才能 useField)
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
// 建立欄位
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

// values => 表單內的每個資料 => 會幫你再看一次表單內的所有欄位是否 ok
const submit = handleSubmit(async (values) => {
  // ⭐ composible 組合式 => 自己寫 use 的方式
  // 放在 composable/ axios
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password
      // 後端不用做密碼確認也無妨
    })
    createSnackbar({
      text: '註冊成功',
      snackbarProps: {
        color: '#3B6C73'
      }
    })
    router.push('/login')
  } catch (error) {
    console.log(error)
    createSnackbar({
      // 所有錯誤一起處理
      text: error?.response?.data?.message || '未知錯誤',
      snackbarProps: {
        color: '#C04759'
      }
    })
  }
})
</script>

<route lang="yaml">
  meta:
    title: '註冊'
  </route>
