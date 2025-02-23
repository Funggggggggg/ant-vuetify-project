<template>
  <v-container>
    <v-row class="text-abril text-snow mt-8">
      <v-col cols="12">
        <h1 class="text-center text-h4">{{ '登入' }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            :label="'帳號'"
            minlength="4"
            maxlength="20"
            counter
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="'密碼'"
            minlength="4"
            maxlength="20"
            counter
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="#3B6C73">{{ $t('login.submit') }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    // 資料型態是文字
    .string()
    // 必填
    .required('使用者帳號必填')
    // 最短長度
    .min(4, '使用者帳號太短')
    // 最長長度
    .max(20, '使用者帳號太長')
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isAlphanumeric','使用者帳號格式不符', (value) =>
      validator.isAlphanumeric(value),
    ),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4,'使用者密碼太短')
    .max(20, '使用者密碼太長'),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    // 登入流程：1.登入時將帳密傳入後端 (controller/user)
    const {data} = await api.post('/user/login', {
      account: values.account,
      password: values.password
    })
    // 3. 將後端收到資料丟到這 (再到 store/user)
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: '#3B6C73'
      }
    })
    router.push('/')
  } catch (error) {
    console.log(error)
    createSnackbar({
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
    login: false
    admin: false
    title: '登入'
  </route>
