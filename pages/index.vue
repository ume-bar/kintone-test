<template>
  <div
    class="container mx-auto content-end h-screen w-full flex flex-col items-center bg-teal-lightest font-sans"
  >
    <div
      v-if="deleteBuildingId != '-1'"
      class="top-0 bottom-0 bg-gray-800/50 fixed z-50 flex items-center justify-center bg-modal w-full"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 w-auto max-w-6xl max-h-full overflow-y-scroll text-right"
      >
        <div class="my-2 pb-4 font-bold text-lg text-left">
          指定した物件を削除致しますか？
        </div>
        <div slot="footer" class="dialog-footer text-right">
          <div class="w-auto flex space-x-6">
            <div
              class="w-auto inline-block mt-5 bg-blue-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded"
              @click.stop="deleteBuilding()"
            >
              追加する
            </div>
            <div
              class="border w-auto inline-block mt-5 bg-white hover:bg-gray-200 shadow-xl text-black uppercase text-sm font-semibold px-14 py-3 rounded"
              @click="deleteBuildingId = '-1'"
            >
              キャンセル
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 p-4 m-2 border border-gray-400 rounded shadow"
      @click="visibleCreateModal = true"
    >
      物件を追加する
    </button>

    <table class="table-fixed m-2 p-4 w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 border">名前</th>
          <th class="px-4 py-2 border">郵便番号</th>
          <th class="px-4 py-2 border">住所</th>
          <th class="px-4 py-2 border">備考</th>
          <th class="border w-14"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in list"
          :key="row.id"
          class="cursor-pointer border"
          @click="selected(row.id)"
        >
          <td class="border px-4 py-2">
            {{ row.name }}
          </td>
          <td class="border px-4 py-2">{{ row.postCode }}</td>
          <td class="border px-4 py-2">{{ row.address }}</td>
          <td class="border px-4 py-2">{{ row.description }}</td>

          <td class="border px-4 py-2 text-center">

            <button class="child" @click.stop="deleteBuildingId = row.id">
              <v-icon> mdi-delete </v-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="visibleCreateModal"
      class="top-0 bottom-0 bg-gray-800/50 h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 max-w-6xl max-h-full overflow-y-scroll"
      >
        <div class="pb-4 font-bold text-lg">物件を追加</div>
        <form action="">
          <label for="" class="block">名前</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full h-10 px-3 mb-5 border border-solid border-gray-250 rounded-md"
            placeholder=""
          />
          <label for="" class="block">郵便番号</label>
          <input
            v-model="form.postCode"
            type="text"
            class="w-full h-10 px-3 mb-5 border border-solid border-gray-250 rounded-md"
            placeholder=""
          />
          <label for="" class="block">住所</label>
          <input
            v-model="form.address"
            type="text"
            class="w-full h-10 px-3 mb-5 border border-solid border-gray-250 rounded-md"
            placeholder=""
          />
          <label for="" class="block">備考</label>
          <input
            v-model="form.description"
            type="text"
            class="w-full h-10 px-3 mb-5 border border-solid border-gray-250 rounded-md"
            placeholder=""
          />
          <button
            class="mt-5 w-full bg-blue-500 hover:bg-blue-700 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded"
            @click="submit"
          >
            追加する
          </button>
        </form>
        <div>
          <button
            class="border w-full inline-block mt-5 bg-white hover:bg-gray-200 shadow-xl text-black uppercase text-sm font-semibold px-14 py-3 rounded"
            @click="visibleCreateModal = false"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { $axios } from '@/lib/axios'
import { Building } from '~/models'

interface Form {
  name: string
  postCode: string
  address: string
  description: string
}

@Component
export default class building extends Vue {
  visibleCreateModal = false
  visibleDeleteModal = false
  list: Building[] = []
  form: Partial<Form> = {}
  deleteBuildingId = '-1'

  async mounted() {
    this.list = await $axios.$get('/api/buildings/')
  }

  async submit() {
    await $axios.post('/api/buildings/', this.form)
    this.form = {}
    this.visibleCreateModal = false
    this.list = await $axios.$get('/api/buildings/')
  }

  // async deleteBuilding() {
  //   await this.$axios.delete(`/api/buildings/${this.deleteBuildingId}`)
  //   await this.update()
  //   this.deleteBuildingId = '-1'
  // }

  // async update() {
  //   this.list = await $axios.$get('/api/buildings/')
  // }

  // selected(id: string) {
  //   this.$router.push('/buildings/' + id)
  // }
}
</script>