<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="charge-data">
      <v-divider></v-divider>
      <v-row class="my-5">
        <v-col cols="12" md="6">
          <div
            class="text-h5 text-md-h4 my-3 font-weight-bold primary--text text-center"
          >
            水道料金が安い
            <br class="hidden-md-and-up" />
            都道府県ランキング
          </div>
          <div class="mx-3 my-2 text-center">
            使用水量と口径を以下の中から選ぶと表示されるデータが変わります。<br />
          </div>
          <div class="text-center">
            <input
              v-model="picked_ranking"
              type="radio"
              value="使用水量：10㎥，口径13mm"
            />
            <label for="使用水量：10㎥，口径13mm" class="mx-2 my-1">
              使用水量：10㎥，口径13mm
            </label>
            <br />
            <input
              v-model="picked_ranking"
              type="radio"
              value="使用水量：20㎥，口径13mm"
            />
            <label for="使用水量：20㎥，口径13m" class="mx-2 my-1">
              使用水量：20㎥，口径13mm </label
            ><br />
            <input
              v-model="picked_ranking"
              type="radio"
              value="使用水量：10㎥，口径20mm"
            />
            <label for="使用水量：10㎥，口径20mm" class="mx-2 my-1">
              使用水量：10㎥，口径20mm
            </label>
            <br />
            <input
              v-model="picked_ranking"
              type="radio"
              value="使用水量：20㎥，口径20mm"
            />
            <label for="使用水量：20㎥，口径20mm" class="mx-2 my-1">
              使用水量：20㎥，口径20mm
            </label>
          </div>
          <v-row class="my-2" justify="center">
            <div class="text-h7 text-md-h6 my-2 font-weight-bold text-center">
              選択中
            </div>
            <v-icon>mdi-arrow-right-bold</v-icon>
            <p
              class="select-frame text-h7 text-md-h6 my-1 mx-2 font-weight-bold text-center"
            >
              {{ picked_ranking }}
            </p>
          </v-row>
          <v-row justify="center" class="my-3">
            <v-card width="90%">
              <v-card-title>
                都道府県ごとの平均水道料金
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
                :items="ranked_data"
                :search="pref_search"
              >
                <template #[`item.detail`]="{ item }">
                  <nuxt-link
                    :to="{
                      path: `/charge/data/pref`,
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
            class="text-h5 text-md-h4 my-3 font-weight-bold primary--text text-center"
          >
            平均水道料金マップ
          </div>
          <div class="mx-3 my-2 text-center">
            使用水量と口径を以下の中から選ぶと表示されるデータが変わります。<br />
          </div>
          <div class="text-center">
            <input
              v-model="picked_map"
              type="radio"
              value="使用水量：10㎥，口径13mm"
            />
            <label for="使用水量：10㎥，口径13mm" class="mx-2 my-1">
              使用水量：10㎥，口径13mm
            </label>
            <br />
            <input
              v-model="picked_map"
              type="radio"
              value="使用水量：20㎥，口径13mm"
            />
            <label for="使用水量：20㎥，口径13mm" class="mx-2 my-1">
              使用水量：20㎥，口径13mm </label
            ><br />
            <input
              v-model="picked_map"
              type="radio"
              value="使用水量：10㎥，口径20mm"
            />
            <label for="使用水量：10㎥，口径20mm" class="mx-2 my-1">
              使用水量：10㎥，口径20mm
            </label>
            <br />
            <input
              v-model="picked_map"
              type="radio"
              value="使用水量：20㎥，口径20mm"
            />
            <label for="使用水量：20㎥，口径20mm" class="mx-2 my-1">
              使用水量：20㎥，口径20mm
            </label>
          </div>
          <v-row class="my-2" justify="center">
            <div class="text-h7 text-md-h6 my-2 font-weight-bold text-center">
              選択中
            </div>
            <v-icon>mdi-arrow-right-bold</v-icon>
            <p
              class="select-frame text-h7 text-md-h6 my-1 mx-2 font-weight-bold text-center"
            >
              {{ picked_map }}
            </p>
          </v-row>
          <v-card class="ml-5 mb-10" elevation="1">
            <GChart
              :settings="chartSettings"
              :type="chartType"
              :data="map_data"
              :options="chartOptions"
              :events="chartEvents"
            />
          </v-card>
          <div
            class="text-h5 text-md-h4 my-3 font-weight-bold primary--text text-center"
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

      <v-row justify="center">
        <v-row class="ml-5 mt-5">
          <v-col cols="12">
            <div
              class="text-h5 text-md-h4 my-3 font-weight-bold primary--text text-center"
            >
              都道府県の平均水道料金グラフ
            </div>
            <div class="mx-3 my-2 text-center">
              使用水量と口径を以下の中から選ぶと表示されるデータが変わります。<br />
            </div>
            <div class="text-center">
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：10㎥，口径13mm"
              />
              <label for="option1" class="mx-2 my-1">
                使用水量：10㎥，口径13mm
              </label>
              <br />
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：20㎥，口径13mm"
              />
              <label for="option2" class="mx-2 my-1">
                使用水量：20㎥，口径13mm </label
              ><br />
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：10㎥，口径20mm"
              />
              <label for="option3" class="mx-2 my-1">
                使用水量：10㎥，口径20mm
              </label>
              <br />
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：20㎥，口径20mm"
              />
              <label for="option4" class="mx-2 my-1">
                使用水量：20㎥，口径20mm
              </label>
            </div>
            <v-row class="my-2" justify="center">
              <div class="text-h7 text-md-h6 my-2 font-weight-bold text-center">
                選択中
              </div>
              <v-icon>mdi-arrow-right-bold</v-icon>
              <p
                class="select-frame text-h7 text-md-h6 my-1 mx-2 font-weight-bold text-center"
              >
                {{ picked_graph }}
              </p>
            </v-row>
          </v-col>
        </v-row>

        <v-col cols="12" md="10">
          <v-card class="mx-5 mb-3" height="400" width="100%">
            <GChart
              :type="chartType2"
              :data="graph_data"
              :options="chartOptions2"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row justify="center">
        <v-row class="ml-5 mt-5">
          <v-col cols="12">
            <div
              class="text-h5 text-md-h4 my-3 font-weight-bold primary--text text-center"
            >
              事業体ごとの水道料金
              <br class="hidden-md-and-up" />
              安いランキング
            </div>
            <div class="mx-3 my-2 text-center">
              使用水量と口径を以下の中から選ぶと表示されるデータが変わります。<br />
            </div>
            <div class="text-center">
              <input
                v-model="picked_organize"
                type="radio"
                value="使用水量：10㎥，口径13mm"
              />
              <label for="option1" class="mx-2 my-1">
                使用水量：10㎥，口径13mm
              </label>
              <br />
              <input
                v-model="picked_organize"
                type="radio"
                value="使用水量：20㎥，口径13mm"
              />
              <label for="option2" class="mx-2 my-1">
                使用水量：20㎥，口径13mm </label
              ><br />
              <input
                v-model="picked_organize"
                type="radio"
                value="使用水量：10㎥，口径20mm"
              />
              <label for="option3" class="mx-2 my-1">
                使用水量：10㎥，口径20mm
              </label>
              <br />
              <input
                v-model="picked_organize"
                type="radio"
                value="使用水量：20㎥，口径20mm"
              />
              <label for="option4" class="mx-2 my-1">
                使用水量：20㎥，口径20mm
              </label>
            </div>
            <v-row class="my-2" justify="center">
              <div class="text-h7 text-md-h6 my-2 font-weight-bold text-center">
                選択中
              </div>
              <v-icon>mdi-arrow-right-bold</v-icon>
              <p
                class="select-frame text-h7 text-md-h6 my-1 mx-2 font-weight-bold text-center"
              >
                {{ picked_organize }}
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-row>

      <v-row justify="center" class="mb-5">
        <v-col cols="12" md="10">
          <v-card width="100%">
            <v-card-title>
              事業体ごとの水道料金ランキング
              <v-spacer></v-spacer>
              <v-text-field
                v-model="organize_search"
                prepend-inner-icon="mdi-magnify"
                label="各列の値で検索"
                outlined
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="organize_headers"
              :items="organize_data"
              :search="organize_search"
            >
              <template #[`item.detail`]="{ item }">
                <nuxt-link
                  :to="{
                    path: `/charge/data/pref`,
                    query: { prefName: item.pref },
                  }"
                  tag="div"
                  class="c-p"
                >
                  <v-btn elevation="1" color="primary">都道府県ページ</v-btn>
                </nuxt-link>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-section>
        <v-row class="ml-4 my-1" justify="center">
          <div
            class="text-h5 text-md-h4 mt-8 font-weight-bold text-center primary--text"
          >
            全国の事業体ごとの
            <br class="hidden-md-and-up" />
            基本料金と超過料金表<br />
          </div>
        </v-row>
        <v-row justify="center" class="my-1">
          <div class="text-center">※口径が13mmであるときの料金</div>
        </v-row>
        <v-row justify="center" class="my-1 mb-5">
          <v-col cols="11" md="7">
            <v-card>
              <v-card-title>
                各市町村の基本料金と超過料金
                <v-spacer></v-spacer>
                <v-autocomplete
                  v-model="search_base"
                  :items="searchItemPref"
                  prepend-inner-icon="mdi-magnify"
                  label="団体名か都道府県名で検索"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-card-title>
              <v-data-table
                :headers="base_headers"
                :items="AllBaseData"
                :search="search_base"
              >
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-section>
      <v-divider></v-divider>
      <v-section>
        <v-row class="ml-4 my-1" justify="center">
          <div
            class="text-h5 text-md-h4 mt-8 font-weight-bold text-center primary--text"
          >
            水道料金比較シミュレーター<br />
          </div>
        </v-row>
        <v-row justify="center" class="my-1">
          <div class="text-center">※口径が13mmであるときの料金</div>
        </v-row>
        <v-row class="my-2" justify="center">
          ① 比較したい使用水量を入力してください。（㎥）
        </v-row>
        <v-row class="my-1" justify="center">
          <input
            v-model="use_amount"
            type="number"
            min="0"
            class="input-number"
          />
        </v-row>
        <v-row class="my-2" justify="center">
          <v-col cols="10" md="4" class="mx-2">
            <div class="compare-frame1">
              <v-row class="mb-1" justify="center">
                <div
                  class="text-h6 text-md-h5 font-weight-bold text-center"
                  style="color: #0e2997"
                >
                  比較対象1
                </div>
              </v-row>
              <v-row class="my-2" justify="center"> ② 都道府県を選択 </v-row>
              <v-row class="my-1" justify="center">
                <v-autocomplete
                  v-model="select_pref"
                  :items="PrefArray"
                  prepend-inner-icon="mdi-magnify"
                  label="都道府県を選択"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-row>
              <v-row class="my-2" justify="center"> ③ 市町村を選択 </v-row>
              <v-row class="my-1" justify="center">
                <v-autocomplete
                  v-model="select_town"
                  :items="search_town"
                  prepend-inner-icon="mdi-magnify"
                  label="市町村を選択"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-row>
              <v-row class="my-2" justify="center">
                <div
                  class="text-h5 text-md-h4 my-2 font-weight-bold text-center"
                >
                  水道料金：{{ simulate }} 円
                </div>
              </v-row>
            </div>
          </v-col>
          <v-col cols="10" md="4" class="mx-2">
            <div class="compare-frame2">
              <v-row class="mb-1" justify="center">
                <div
                  class="text-h6 text-md-h5 font-weight-bold text-center"
                  style="color: rgba(237 118 47)"
                >
                  比較対象2
                </div>
              </v-row>
              <v-row class="my-2" justify="center"> ② 都道府県を選択 </v-row>
              <v-row class="my-1" justify="center">
                <v-autocomplete
                  v-model="select_pref2"
                  :items="PrefArray"
                  prepend-inner-icon="mdi-magnify"
                  label="都道府県を選択"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-row>
              <v-row class="my-2" justify="center"> ③ 市町村を選択 </v-row>
              <v-row class="my-1" justify="center">
                <v-autocomplete
                  v-model="select_town2"
                  :items="search_town2"
                  prepend-inner-icon="mdi-magnify"
                  label="市町村を選択"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-row>
              <v-row class="my-2" justify="center">
                <div
                  class="text-h5 text-md-h4 my-2 font-weight-bold text-center"
                >
                  水道料金：{{ simulate2 }} 円
                </div>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-section>
    </v-container>
  </div>
</template>

<script scoped>
import { GChart } from 'vue-google-charts'
import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

import JapanRanked1013 from '@/assets/mockup_data/ChargeData/RankedJapanCharge_1013.json'
import JapanRanked2013 from '@/assets/mockup_data/ChargeData/RankedJapanCharge_2013.json'
import JapanRanked1020 from '@/assets/mockup_data/ChargeData/RankedJapanCharge_1020.json'
import JapanRanked2020 from '@/assets/mockup_data/ChargeData/RankedJapanCharge_2020.json'

import JapanMap1013 from '@/assets/mockup_data/ChargeData/ChartJapanCharge_1013.json'
import JapanMap2013 from '@/assets/mockup_data/ChargeData/ChartJapanCharge_2013.json'
import JapanMap1020 from '@/assets/mockup_data/ChargeData/ChartJapanCharge_1020.json'
import JapanMap2020 from '@/assets/mockup_data/ChargeData/ChartJapanCharge_2020.json'

import OrganizeRanked1013 from '@/assets/mockup_data/ChargeData/RankedOrganizationCharge_1013.json'
import OrganizeRanked2013 from '@/assets/mockup_data/ChargeData/RankedOrganizationCharge_2013.json'
import OrganizeRanked1020 from '@/assets/mockup_data/ChargeData/RankedOrganizationCharge_1020.json'
import OrganizeRanked2020 from '@/assets/mockup_data/ChargeData/RankedOrganizationCharge_2020.json'

import AllBaseCharge from '@/assets/mockup_data/ChargeData/AllBaseCharge.json'
import PrefBaseCharge from '@/assets/mockup_data/ChargeData/PrefBaseCharge.json'

export default {
  name: 'ChargeData',
  components: {
    BreadCrumb,
    GChart,
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
      // SortedData: JapanRanked1013,
      JapanRankedData1013: JapanRanked1013,
      JapanRankedData2013: JapanRanked2013,
      JapanRankedData1020: JapanRanked1020,
      JapanRankedData2020: JapanRanked2020,
      JapanMapData1013: JapanMap1013,
      JapanMapData2013: JapanMap2013,
      JapanMapData1020: JapanMap1020,
      JapanMapData2020: JapanMap2020,
      OrganizeRankedData1013: OrganizeRanked1013,
      OrganizeRankedData2013: OrganizeRanked2013,
      OrganizeRankedData1020: OrganizeRanked1020,
      OrganizeRankedData2020: OrganizeRanked2020,
      pref_search: '',
      selectedPref: '',
      organize_search: '',
      picked_ranking: '使用水量：20㎥，口径13mm',
      picked_map: '使用水量：20㎥，口径13mm',
      picked_graph: '使用水量：20㎥，口径13mm',
      picked_organize: '使用水量：20㎥，口径13mm',

      chartSettings: {
        packages: ['geochart'],
      },
      chartType: 'GeoChart',
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
      chartType2: 'ColumnChart',
      chartOptions2: {
        width: '100%',
        height: '400',
        chartArea: {
          width: '80%',
          height: '70%',
        },
      },
      AllBaseData: AllBaseCharge,
      search_base: '',
      searchItems: [],
      searchItemPref: [],
      select_town: '',
      use_amount: 0,
      PrefBaseData: PrefBaseCharge,
      select_pref: '北海道',
      select_pref2: '北海道',
      select_town2: '',
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
          name: '水道料金',
          path: '/charge',
        },
        {
          name: '日本全体の水道料金データ',
        },
      ]
    },
    pref_headers() {
      return [
        { text: '順位', value: 'rank', align: 'center' },
        {
          text: '都道府県名',
          value: 'pref',
          sortable: false,
          align: 'start',
        },
        { text: '平均水道料金(円)', value: 'charge', align: 'center' },
        {
          text: '詳細ページ',
          value: 'detail',
          align: 'center',
          sortable: false,
        },
      ]
    },
    organize_headers() {
      return [
        { text: '順位', value: 'rank', align: 'center' },
        {
          text: '都道府県名',
          value: 'pref',
          sortable: false,
          align: 'start',
        },
        {
          text: '団体名',
          value: 'organization',
          sortable: false,
          align: 'start',
        },
        { text: '平均水道料金(円)', value: 'charge', align: 'center' },
        {
          text: '都道府県ページ',
          value: 'detail',
          align: 'center',
          sortable: false,
        },
      ]
    },
    ranked_data() {
      if (this.picked_ranking === '使用水量：10㎥，口径13mm') {
        return this.JapanRankedData1013
      } else if (this.picked_ranking === '使用水量：20㎥，口径13mm') {
        return this.JapanRankedData2013
      } else if (this.picked_ranking === '使用水量：10㎥，口径20mm') {
        return this.JapanRankedData1020
      } else if (this.picked_ranking === '使用水量：20㎥，口径20mm') {
        return this.JapanRankedData2020
      } else {
        return ''
      }
    },
    map_data() {
      if (this.picked_map === '使用水量：10㎥，口径13mm') {
        return this.JapanMapData1013
      } else if (this.picked_map === '使用水量：20㎥，口径13mm') {
        return this.JapanMapData2013
      } else if (this.picked_map === '使用水量：10㎥，口径20mm') {
        return this.JapanMapData1020
      } else if (this.picked_map === '使用水量：20㎥，口径20mm') {
        return this.JapanMapData2020
      } else {
        return ''
      }
    },
    graph_data() {
      if (this.picked_graph === '使用水量：10㎥，口径13mm') {
        return this.JapanMapData1013
      } else if (this.picked_graph === '使用水量：20㎥，口径13mm') {
        return this.JapanMapData2013
      } else if (this.picked_graph === '使用水量：10㎥，口径20mm') {
        return this.JapanMapData1020
      } else if (this.picked_graph === '使用水量：20㎥，口径20mm') {
        return this.JapanMapData2020
      } else {
        return ''
      }
    },
    organize_data() {
      if (this.picked_organize === '使用水量：10㎥，口径13mm') {
        return this.OrganizeRankedData1013
      } else if (this.picked_organize === '使用水量：20㎥，口径13mm') {
        return this.OrganizeRankedData2013
      } else if (this.picked_organize === '使用水量：10㎥，口径20mm') {
        return this.OrganizeRankedData1020
      } else if (this.picked_organize === '使用水量：20㎥，口径20mm') {
        return this.OrganizeRankedData2020
      } else {
        return ''
      }
    },
    base_headers() {
      return [
        {
          text: '都道府県名',
          value: 'Pref',
          sortable: false,
          align: 'start',
        },
        {
          text: '団体名',
          value: 'Organization',
          sortable: false,
          align: 'start',
        },
        { text: '基本水量(m3)', value: 'BaseAmount', align: 'center' },
        { text: '基本料金(円)', value: 'BaseCharge', align: 'center' },
        { text: '超過料金(円/m3)', value: 'ExtraCharge', align: 'center' },
      ]
    },
    simulate() {
      let CalculatedCharge = 0
      for (let i = 0; i < this.AllBaseData.length; i++) {
        if (this.AllBaseData[i].Organization === this.select_town) {
          if (this.use_amount <= this.AllBaseData[i].BaseAmount) {
            CalculatedCharge = this.AllBaseData[i].BaseCharge
          } else {
            CalculatedCharge =
              this.AllBaseData[i].BaseCharge +
              (this.use_amount - this.AllBaseData[i].BaseAmount) *
                this.AllBaseData[i].ExtraCharge
          }
        }
      }
      return CalculatedCharge
    },
    search_town() {
      const SearchTown = []
      const PrefBase = this.PrefBaseData[this.select_pref]
      for (let i = 0; i < PrefBase.length; i++) {
        SearchTown.push(PrefBase[i].Organization)
      }
      return SearchTown
    },
    simulate2() {
      let CalculatedCharge = 0
      for (let i = 0; i < this.AllBaseData.length; i++) {
        if (this.AllBaseData[i].Organization === this.select_town2) {
          if (this.use_amount <= this.AllBaseData[i].BaseAmount) {
            CalculatedCharge = this.AllBaseData[i].BaseCharge
          } else {
            CalculatedCharge =
              this.AllBaseData[i].BaseCharge +
              (this.use_amount - this.AllBaseData[i].BaseAmount) *
                this.AllBaseData[i].ExtraCharge
          }
        }
      }
      return CalculatedCharge
    },
    search_town2() {
      const SearchTown = []
      const PrefBase = this.PrefBaseData[this.select_pref2]
      for (let i = 0; i < PrefBase.length; i++) {
        SearchTown.push(PrefBase[i].Organization)
      }
      return SearchTown
    },
  },
  created() {
    this.setSearch()
  },
  methods: {
    setSearch() {
      for (let i = 0; i < this.AllBaseData.length; i++) {
        this.searchItems.push(this.AllBaseData[i].Organization)
      }
      this.searchItemPref = this.searchItems.concat(this.PrefArray)
    },
  },
}
</script>

<style scoped>
.c-p {
  cursor: pointer;
}

.charge-data {
  background: rgba(242 242 242);
  width: 100%;
}

.select-frame {
  border-style: solid;
  width: 300px;
  height: 120%;
  border-width: 5px;
  border-color: rgba(237 118 47);
  display: block;
  text-align: center;
}

.input-number {
  width: 200px;
  padding: 12px;
  font-size: 20px;
  border: solid 2px #ccc;
  border-radius: 5px;
}

.compare-frame1 {
  border-style: solid;
  width: 100%;
  height: 100%;
  border-width: 5px;
  border-color: #0e2997;
  display: block;
  text-align: center;
  padding: 30px;
}

.compare-frame2 {
  border-style: solid;
  width: 100%;
  height: 100%;
  border-width: 5px;
  border-color: rgba(237 118 47);
  display: block;
  text-align: center;
  padding: 30px;
}
</style>