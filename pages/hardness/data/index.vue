<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="hard-data">
      <v-divider></v-divider>
      <v-row class="my-5">
        <v-col cols="12" md="6">
          <div
            class="
              text-h5 text-md-h4
              my-3
              font-weight-bold
              primary--text
              text-center
            "
          >
            平均硬度ランキング
          </div>
          <v-row justify="center" class="my-3">
            <v-card width="90%">
              <v-card-title>
                都道府県の平均硬度表
                <v-spacer></v-spacer>
                <v-autocomplete
                  v-model="pref_search"
                  :items="PrefArray"
                  prepend-inner-icon="mdi-magnify"
                  label="都道府県名で検索"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-card-title>
              <v-data-table
                :headers="pref_headers"
                :items="SortedData"
                :search="pref_search"
              >
                <template #[`item.detail`]="{ item }">
                  <nuxt-link
                    :to="{
                      path: `/hardness/data/pref`,
                      query: { prefName: item.pref },
                    }"
                    tag="div"
                    class="c-p"
                  >
                    <v-btn elevation="1" color="primary">詳細ページ</v-btn>
                  </nuxt-link>
                </template>
              </v-data-table>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div
            class="
              text-h5 text-md-h4
              my-3
              font-weight-bold
              primary--text
              text-center
            "
          >
            硬度平均マップ
          </div>
          <v-card class="ml-5 mb-10" elevation="1">
            <GChart
              :settings="chartSettings"
              :type="chartType"
              :data="chartData"
              :options="chartOptions"
              :events="chartEvents"
            />
          </v-card>
          <div
            class="
              text-h5 text-md-h4
              my-3
              font-weight-bold
              primary--text
              text-center
            "
          >
            各都道府県の詳細ページ
          </div>
          <v-row justify="center" class="my-3 mb-10">
            <v-card width="80%">
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
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <section>
        <v-row class="my-5">
          <v-col cols="12">
            <div
              class="
                text-h5 text-md-h4
                my-3
                font-weight-bold
                primary--text
                text-center
              "
            >
              硬度が高い浄水場ランキング
            </div>
          </v-col>
        </v-row>
        <!-- <v-row justify="center" class="my-5">
        <div class="text-h5 font-weight-bold primary--text text-center">
          硬度が高い地点 (硬水ランキング)
        </div>
      </v-row> -->
        <v-row justify="center" class="mb-5">
          <v-col cols="12" md="10">
            <v-card width="100%">
              <v-card-title>
                浄水場ごとの硬度
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="各列の値で検索"
                  outlined
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="Ranking"
                :search="search"
              >
                <template #[`item.detail`]="{ item }">
                  <nuxt-link
                    :to="{
                      path: `/hardness/data/pref`,
                      query: { prefName: item.pref },
                    }"
                    tag="div"
                    class="c-p"
                  >
                    <v-btn elevation="1" color="primary">詳細ページ</v-btn>
                  </nuxt-link>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row justify="center" class="my-5">
        <div class="text-h5 mt-5 font-weight-bold primary--text text-center">
          硬度が低い地点 (軟水ランキング)
        </div>
      </v-row>
      <v-row justify="center" class="mb-5">
        <v-card width="80%">
          <v-simple-table fixed-header height="530">
            <thead>
              <tr>
                <th style="text-align: center">順位</th>
                <th style="text-align: center">事業主体名</th>
                <th style="text-align: center">浄水場名</th>
                <th style="text-align: center">水源名</th>
                <th style="text-align: center">平均硬度</th>
                <th style="text-align: center">詳細ページ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(soft_item, index) in soft_top10_lists"
                :key="soft_item.facility"
              >
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center">
                  {{ soft_item.pref }} {{ soft_item.district }}
                </td>
                <td style="text-align: center">{{ soft_item.facility }}</td>
                <td style="text-align: center">
                  {{ soft_item.origin }}
                </td>
                <td style="text-align: center">
                  <b>{{ soft_item.hardness }}</b>
                </td>
                <td style="text-align: center">
                  <nuxt-link
                    :to="{
                      path: `/hardness/pref`,
                      query: { prefName: soft_item.pref },
                    }"
                    tag="div"
                    class="c-p"
                  >
                    <v-btn elevation="1" color="primary">詳細ページ</v-btn>
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-row> -->
      </section>
      <v-divider></v-divider>

      <v-row justify="center">
        <v-row class="ml-5 my-5">
          <v-col cols="12">
            <div
              class="
                text-h5 text-md-h4
                my-3
                font-weight-bold
                primary--text
                text-center
              "
            >
              都道府県の硬度平均グラフ
            </div>
          </v-col>
        </v-row>
        <v-col cols="12" md="10">
          <v-card class="mx-5 mb-3" height="1000" width="100%">
            <GChart
              :type="chartType2"
              :data="chartData"
              :options="chartOptions2"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script scoped>
import { GChart } from 'vue-google-charts'
// import JapanData from '@/assets/mockup_data/HardnessData/JapanHardness.json'
import ChartHardness from '@/assets/mockup_data/HardnessData/ChartHardness.json'
import RankedData from '@/assets/mockup_data/HardnessData/RankedJapanHardness.json'
import HardRanking from '@/assets/mockup_data/HardnessData/hardness_point_ranking.json'
// import SoftRanking from '@/assets/mockup_data/HardnessData/hardness_point_ranking2.json'

import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

export default {
  name: 'HardnessData',
  components: {
    BreadCrumb,
    GChart,
  },
  data() {
    return {
      // JapanData: JapanData,
      hard_img_src: require('@/assets/img/hard_img.jpg'),
      chartSettings: {
        packages: ['geochart'],
      },
      chartType: 'GeoChart',
      chartType2: 'BarChart',
      chartData: ChartHardness,
      chartOptions: {
        region: 'JP',
        resolution: 'provinces',
        displayMode: 'regions',
        colors: ['white', '#0E2997'],
        width: '100%',
        height: '100%',
      },
      chartEvents: {
        // select: () => {
        //   alert('クリックしました')
        // },
      },
      chartOptions2: {
        width: '100%',
        height: '1000',
        chartArea: {
          width: '75%',
          height: '90%',
        },
      },

      SortedData: RankedData,

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
      Ranking: HardRanking,
      pref_search: '',
      search: '',
    }
  },
  computed: {
    pref_headers() {
      return [
        { text: '順位', value: 'rank', align: 'center' },
        {
          text: '都道府県名',
          value: 'pref',
          sortable: false,
          align: 'start',
        },
        { text: '硬度(mg/L)', value: 'hardness', align: 'center' },
        {
          text: '詳細ページ',
          value: 'detail',
          align: 'center',
          sortable: false,
        },
      ]
    },
    headers() {
      return [
        { text: '順位', value: 'rank', align: 'center' },
        {
          text: '都道府県名',
          value: 'pref',
          sortable: false,
          align: 'start',
        },
        {
          text: '事業主体名',
          value: 'district',
          sortable: false,
          align: 'start',
        },
        {
          text: '浄水場名',
          value: 'facility',
          sortable: false,
          align: 'start',
        },
        { text: '硬度(mg/L)', value: 'hardness', align: 'center' },
        { text: '1日平均浄水量(㎥)', value: 'amount', align: 'center' },
        {
          text: '詳細ページ',
          value: 'detail',
          align: 'center',
          sortable: false,
        },
      ]
    },
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
        },
      ]
    },
  },
}
</script>

<style scoped>
.c-p {
  cursor: pointer;
}

.hard-intro {
  background: rgba(242 242 242);
  width: 100%;
}
</style>