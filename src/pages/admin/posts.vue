<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ '卡片管理' }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="posts" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <!-- 新增按鈕 -->
              <v-btn @click="openDialog(null)">{{ '新增' }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
            </v-toolbar>
          </template>
          <!-- # => v-slot 插件 -->
          <!-- 插槽名稱有 . ，不能直接用 #，要用 #[``] -->
          <template #[`item.account`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" width="80"></v-img>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.category`]="{ value }">
            {{ value }}
          </template>
          <template #[`item.content`]="{ value }">
            {{ truncate(value, 30) }}
          </template>
          <template #[`item.isPrivate`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <!-- 虛擬欄位 -->
          <!--喜歡 虛擬欄位計算 -->
          <template #[`item.like`]="{ value }">
            <v-icon v-if="value === '0'" icon="mdi-heart"></v-icon>
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <!-- 對話框 -->
  <!-- persistent => 點擊外框時不會關閉 -->
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <!-- 有 id 即編輯，否則新增 -->
        <v-card-title style="margin: 10px;">{{ dialog.id ? '編輯卡片' : '新增卡片'}}</v-card-title>
        <v-card-text>
          <!-- FIXME 要取到使用者資料 -->
          <v-text-field
            v-model="user.value.value"
            :label="userStore.account || '未提供使用者名稱'"
            :error-messages="user.errorMessage.value"
            disabled
            ></v-text-field>
          <v-text-field
            v-model="title.value.value"
            :label="'標題'"
            :error-messages="title.errorMessage.value"
          ></v-text-field>
          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            :label="'分類'"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-textarea
            v-model="content.value.value"
            :label="'卡片說明'"
            :error-messages="content.errorMessage.value"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent" v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            :help-text="'點擊或拖曳檔案至此'"
            :error-text="{ type:'檔案類型錯誤', size:'檔案大小超過限制' }"
          ></VueFileAgent>
          <v-checkbox
            v-model="isPrivate.value.value"
            :label="'私人'"
            :error-messages="isPrivate.errorMessage.value"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <!-- 取消送出按鈕 -->
          <v-btn @click="closeDialog">{{ '取消' }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ '送出' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios';
import { useSnackbar } from 'vuetify-use-dialog'
import { reactive, computed, ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user';
import * as yup from 'yup' //登入註冊

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const userStore = useUserStore()

const posts = reactive([])
const search = ref('')
// 卡片資料欄位
const headers = computed(() => {
  return [
    // { title: 'ID', key: '_id', sortable: true },
    { title: '標題', key: 'title', sortable: true },
    { title: '發布者', key: 'account', sortable: true },
    { title: '圖片', key: 'image', sortable: false },
    { title: '分類', key: 'category', sortable: true },
    { title: '說明', key: 'content', sortable: true },
    { title: '創建日期', key: 'createdAt', sortable: true },
    { title: '修改日期', key: 'updatedAt', sortable: true },
    { title: '私人', key: 'isPrivate', sortable: true },
    { title: '喜歡', key: 'like', sortable: true },
    // 可設定虛擬欄位 => 不在後端的欄位 => 顯示方式要自己寫
    { title: '編輯', key: 'edit', sortable: false },
  ]
})

const getPosts = async () => {
  try {
    const { data } = await apiAuth.get('/post/all')
    posts.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: 'api.' + (error?.response?.data?.message || '未知錯誤'),
      snackbarProps: {
        color: '#C04759'
      }
    })
  }

}
getPosts()

// 表單
// open: false => 平常處於關閉狀態，藉由 v-model 將它開啟
// 編輯時將 id 放進來編輯，空值表示要新增東西
const dialog = ref({
  open: false,
  id: ''
})

const openDialog = (item) => {
  // 修改時將資料填入表單
  if (item) {
    dialog.value.id = item._id
    user.value.value = userStore.account
    title.value.value = item.title
    content.value.value = item.content
    category.value.value = item.category
    isPrivate.value.value = item.isPrivate
  } else {
    // 新增時使用目前登入的用戶資料
    user.value.value = userStore.account
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

const schema = yup.object({ // 資料驗證
  title: yup
    .string()
    .required('卡片標題必填')
    .min(1, '標題過少')
    .max(8,'標題過長'),
  content: yup
    .string()
    .required('卡片內容必填')
    .min(10, '文字內容過少')
    .max(300,'文字內容過長'),
  category: yup
    .string()
    .required('卡片分類必填')
    .oneOf(['紀念繪畫', '回憶拼貼', '故事攝影', '物品改造', '其他'], 'api.卡片分類不符'),
  isPrivate: yup
    .boolean()
    .default(false)
    .required('私人與否必填'),
  like: yup
    .boolean()
    .default(false)
    .notRequired(),  // like 可存在，但不驗證用戶輸入
})
const { handleSubmit, isSubmitting, resetForm  } = useForm({ // 使用 useForm
  validationSchema: schema,
  initialValues: {
    user: '',
    account: '',
    title: '',
    content: '',
    category: '紀念繪畫',
    isPrivate: false,
    like: false,
  }
})
const title = useField('title')
const user = useField('user')
// const account = useField('account')
const content = useField('content')
const category = useField('category')
const isPrivate = useField('isPrivate')
// const like = useField('like')
const categoryOptions = computed(() => [
  { text: '紀念繪畫', value: '紀念繪畫' },
  { text: '回憶拼貼', value: '回憶拼貼' },
  { text: '故事攝影', value: '故事攝影' },
  { text: '物品改造', value: '物品改造' },
  { text: '其他', value: '其他' },
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
      text: '卡片圖片必填',
      snackbarProps: {
        color: '#C04759'
      }
    })
    return
  }

  try {
    const fd = new FormData() // 建立 FormData 物件來傳送檔案
    // fd.append(key, value)
    // console.log(values.account)
    fd.append('user', 'aaaa')
    fd.append('account', userStore.account)
    fd.append('title', values.title)
    fd.append('content', values.content)
    fd.append('category', values.category)
    fd.append('isPrivate', values.isPrivate)
    // fd.append('like', values.like)
    if (fileRecords.value.length > 0) { // 有圖片才加入
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/post/' + dialog.value.id, fd) // 編輯
    } else {
      // console.log(fd)
      await apiAuth.post('/post', fd) // 新增
    }

    posts.splice(0, posts.length) // 清空 posts 陣列
    getPosts() // 重新取得資料
    createSnackbar({ // 顯示成功訊息
      text: dialog.value.id.length > 0 ? '編輯成功' : '新增成功',
      snackbarProps: {
        color: '#3B6C73'
      }
    })
    closeDialog() // 關閉對話框
  } catch (error) {
    console.log(error)
    createSnackbar({
      // FIXME 無法編輯 =>  400 (Bad Request) 錯誤通常是因為後端預期的資料結構或格式不符合
      text: 'api.' + (error?.response?.data?.message || '未知錯誤'),
      snackbarProps: {
        color: '#C04759'
      }
    })
  }
})

// 限制說明文字顯示字數
function truncate(text, length) {
  if (text.length > length) {
    return text.slice(0, length) + '...'
  }
  return text
}

// 如果 posts 取到的使用者 id 跟 user.id 一樣，則顯示使用者名稱

</script>

<route lang="yaml">
  meta:
    layout: admin
    login: true
    admin: true
    title: '卡片管理'
  </route>
