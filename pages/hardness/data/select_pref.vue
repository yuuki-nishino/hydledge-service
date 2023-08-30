<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="hard-select-pref">
      <v-row
        justify="center"
        class="my-10"
        style="height: 40vh"
        align-content="center"
      >
        <v-col cols="10" md="4">
          <v-card width="100%">
            <v-row justify="center" class="my-3">
              <v-col cols="8" align-self="center">
                <v-row class="mt-2">
                  <v-select
                    v-model="selectedPref"
                    :items="PrefArray"
                    outlined
                    label="都道府県を選択"
                  ></v-select>
                </v-row>
                <v-row justify="center" class="mb-2">
                  <nuxt-link
                    :to="{
                      path: `/hardness/data/pref`,
                      query: { prefName: selectedPref },
                    }"
                    tag="div"
                    class="c-p"
                  >
                    <v-btn x-large elevation="1" color="primary"
                      >詳細ページに移動</v-btn
                    >
                  </nuxt-link>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

export default {
  name: 'SelectPref',
  components: {
    BreadCrumb,
  },

  data() {
    return {
      PrefArray: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県',
      ],
      selectedPref: '',
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          name: 'ホーム',
          path: '/',
        },
        {
          name: '硬度',
          path: '/hardness',
        },
        {
          name: '日本全体の硬度データ',
          path: '/hardness/data',
        },
        {
          name: '都道府県の選択',
        },
      ]
    },
  },
}
</script>
