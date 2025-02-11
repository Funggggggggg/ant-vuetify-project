<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminPosts') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="posts" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <!-- 新增按鈕 -->
              <v-btn @click="openDialog(null)">{{ $t('adminPost.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>
          <!-- # => v-slot 插件 -->
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ $t('postCategory.' + value) }}
          </template>
          <!-- 虛擬欄位 -->
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <!-- 對話框 -->
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminPost.edit' : 'adminPost.new')}}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('post.name')"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="price.value.value"
            :label="$t('post.price')"
            :error-messages="price.errorMessage.value"
            type="number" min="0"
          ></v-text-field>
          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            :label="$t('post.category')"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-checkbox
            v-model="sell.value.value"
            :label="$t('post.onSell')"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>
          <v-textarea
            v-model="description.value.value"
            :label="$t('post.description')"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="$t('fileAgent.helpText')"
            :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
          ></VueFileAgent>
        </v-card-text>
        <v-card-actions>
          <!-- 取消送出按鈕 -->
          <v-btn @click="closeDialog">{{ $t('adminPost.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminPost.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const posts = reactive([])
const search = ref('')
// 商品資料欄位
const headers = computed(() => {
  return [
  { title: 'ID', key: '_id', sortable: true },
    { title: t('post.image'), key: 'image', sortable: false },
    { title: t('post.name'), key: 'name', sortable: true },
    { title: t('post.description'), key: 'description', sortable: true },
    { title: t('post.price'), key: 'price', sortable: true },
    { title: t('post.category'), key: 'category', sortable: true },
    { title: t('post.sell'), key: 'sell', sortable: true },
    { title: t('post.createdAt'), key: 'createdAt', sortable: true },
    { title: t('post.updatedAt'), key: 'updatedAt', sortable: true },
    // 可設定虛擬欄位 => 不在後端的欄位 => 顯示方式要自己寫
    { title: t('adminPost.edit'), key: 'edit', sortable: false },
  ]
})

const getPosts = async () => {
  try {
    const { data } = await apiAuth.get('/post/all')
    posts.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red'
      }
    })
  }

}
getPosts()

// 表單
const dialog = ref({
  open: false,
  id: ''
})

const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
  }
  dialog.value.open = true
}

const closeDialog = () => {
  // 關閉對話框時重設
    resetForm()
    dialog.value.id = ''
    dialog.value.open = false
    fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  name: yup
    .string()
    .required(t('api.postNameRequired')),
  price: yup
    .number()
    .required(t('api.postPriceRequired'))
    .min(0, t('api.postPriceTooSmall')),
  description: yup
    .string()
    .required(t('api.postDescriptionRequired')),
  category: yup
    .string()
    .required(t('api.postCategoryRequired'))
    .oneOf(['food', 'drink', 'music', 'phone'], t('api.postCategoryInvalid')),
  sell: yup
    .boolean()
    .required(t('api.postSellRequired')),
})
const { handleSubmit, isSubmitting, resetForm  } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false,
  }
})
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const categoryOptions = computed(() => [
  { text: t('postCategory.food'), value: 'food' },
  { text: t('postCategory.drink'), value: 'drink' },
  { text: t('postCategory.music'), value: 'music' },
  { text: t('postCategory.phone'), value: 'phone' },
])

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

// 修改
const submit = handleSubmit(async (values) => {
  // 剛好有一張圖 + 有錯誤 => return
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.postImageRequired'),
      snackbarProps: {
        color: 'red'
      }
    })
    return
  }

  try {
    const fd = new FormData()
    // fd.append(key, value)
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/post/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/post', fd)
    }

    posts.splice(0, posts.length)
    getPosts()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminPost.editSuccess' : 'adminPost.newSuccess'),
      snackbarProps: {
        color: 'green'
      }
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>

<route lang="yaml">
  meta:
    layout: admin
    login: true
    admin: true
    title: 'nav.adminPosts'
  </route>
