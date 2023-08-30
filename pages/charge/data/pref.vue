<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="charge-pref">
      <div
        class="text-h4 text-md-h3 my-3 mt-5 ml-2 font-weight-bold primary--text"
      >
        {{ pref }} の
        <br class="hidden-md-and-up" />
        水道料金データ
      </div>
      <v-divider></v-divider>
      <v-section>
        <v-row class="ml-4 my-5" justify="center">
          <v-col cols="12" md="6">
            <div
              class="text-h5 text-md-h4 mt-8 font-weight-bold text-center primary--text"
            >
              {{ pref }}内の水道料金表
            </div>
            <div class="mx-3 my-2 text-center">
              使用水量と口径を以下の中から選ぶと表示されるデータが変わります。<br />
            </div>
            <div class="text-center">
              <input
                v-model="picked_rank"
                type="radio"
                value="使用水量：10㎥，口径13mm"
              />
              <label for="使用水量：10㎥，口径13mm" class="mx-2 my-1">
                使用水量：10㎥，口径13mm
              </label>
              <br />
              <input
                v-model="picked_rank"
                type="radio"
                value="使用水量：20㎥，口径13mm"
              />
              <label for="使用水量：20㎥，口径13mm" class="mx-2 my-1">
                使用水量：20㎥，口径13mm </label
              ><br />
              <input
                v-model="picked_rank"
                type="radio"
                value="使用水量：10㎥，口径20mm"
              />
              <label for="使用水量：10㎥，口径20mm" class="mx-2 my-1">
                使用水量：10㎥，口径20mm
              </label>
              <br />
              <input
                v-model="picked_rank"
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
                {{ picked_rank }}
              </p>
            </v-row>
            <v-row justify="center" class="my-3">
              <v-card>
                <v-card-title>
                  市町村ごとの水道料金
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    v-model="search"
                    :items="searchItems"
                    prepend-inner-icon="mdi-magnify"
                    label="検索"
                    outlined
                    hide-details
                  ></v-autocomplete>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="ranked_data"
                  :search="search"
                >
                </v-data-table>
              </v-card>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <div
              class="text-h5 text-md-h4 mt-8 font-weight-bold text-center primary--text"
            >
              {{ pref }}内の水道料金グラフ
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
              <label for="使用水量：10㎥，口径13mm" class="mx-2 my-1">
                使用水量：10㎥，口径13mm
              </label>
              <br />
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：20㎥，口径13mm"
              />
              <label for="使用水量：20㎥，口径13mm" class="mx-2 my-1">
                使用水量：20㎥，口径13mm </label
              ><br />
              <input
                v-model="picked_graph"
                type="radio"
                value="使用水量：10㎥，口径20mm"
              />
              <label for="使用水量：10㎥，口径20mm" class="mx-2 my-1">
                使用水量：10㎥，口径20mm
              </label>
              <br />
              <input
                v-model="picked_graph"
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
                {{ picked_graph }}
              </p>
            </v-row>
            <v-card class="mx-1" height="680" width="100%">
              <GChart
                :type="GraphType"
                :data="graph_data"
                :options="GraphOptions"
              />
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
            {{ pref }}内の基本料金と超過料金<br />
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
                  :items="searchItems"
                  prepend-inner-icon="mdi-magnify"
                  label="検索"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-card-title>
              <v-data-table
                :headers="base_headers"
                :items="PrefBaseData[0]"
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
            水道料金計算シミューレーター<br />
          </div>
        </v-row>
        <v-row justify="center" class="my-1">
          <div class="text-center">※口径が13mmであるときの料金</div>
        </v-row>
        <v-row class="my-2" justify="center">
          <v-col cols="5" md="3" class="mx-2">
            <v-row class="my-2" justify="center">
              市町村を選択してください
            </v-row>
            <v-row class="my-1" justify="center">
              <v-autocomplete
                v-model="select_town"
                :items="searchItems"
                prepend-inner-icon="mdi-magnify"
                label="市町村を選択"
                outlined
                hide-details
              ></v-autocomplete>
            </v-row>
          </v-col>
          <v-col cols="5" md="3" class="mx-2">
            <v-row class="my-2" justify="center">
              使用水量を入力してください。（㎥）
            </v-row>
            <v-row class="my-1" justify="center">
              <input
                v-model="use_amount"
                type="number"
                min="0"
                class="input-number"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row class="my-2" justify="center">
          <div class="text-h5 text-md-h4 my-2 font-weight-bold text-center">
            水道料金：{{ simulate }} 円
          </div>
        </v-row>
      </v-section>
    </v-container>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

import PrefChargeRank1013 from '@/assets/mockup_data/ChargeData/PrefCharge_1013.json'
import PrefChargeRank2013 from '@/assets/mockup_data/ChargeData/PrefCharge_2013.json'
import PrefChargeRank1020 from '@/assets/mockup_data/ChargeData/PrefCharge_1020.json'
import PrefChargeRank2020 from '@/assets/mockup_data/ChargeData/PrefCharge_2020.json'

import PrefBaseCharge from '@/assets/mockup_data/ChargeData/PrefBaseCharge.json'

export default {
  name: 'PrefCharge',
  components: {
    BreadCrumb,
    GChart,
  },
  data() {
    return {
      pref: '',
      picked_rank: '使用水量：20㎥，口径13mm',
      picked_graph: '使用水量：20㎥，口径13mm',
      searchItems: [],
      search: '',
      search_base: '',
      PrefChargeRankData1013: PrefChargeRank1013,
      PrefChargeRankData2013: PrefChargeRank2013,
      PrefChargeRankData1020: PrefChargeRank1020,
      PrefChargeRankData2020: PrefChargeRank2020,
      GraphData1013: [['団体名', '水道料金(円)']],
      GraphData2013: [['団体名', '水道料金(円)']],
      GraphData1020: [['団体名', '水道料金(円)']],
      GraphData2020: [['団体名', '水道料金(円)']],
      GraphType: 'BarChart',
      GraphOptions: {
        width: '100%',
        height: '680',
        chartArea: {
          width: '60%',
          height: '80%',
        },
      },
      PrefBaseData: [],
      AllPrefBaseData: PrefBaseCharge,
      select_town: '',
      use_amount: 0,
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
          path: '/charge/data',
        },
        {
          name: '都道府県を選択',
          path: '/charge/data/select_pref',
        },
        {
          name: this.pref + 'の水道料金データ',
        },
      ]
    },
    headers() {
      return [
        {
          text: '団体名',
          value: 'organization',
          sortable: false,
          align: 'start',
        },
        { text: '水道料金(円)', value: 'Charge', align: 'center' },
      ]
    },
    ranked_data() {
      if (this.picked_rank === '使用水量：10㎥，口径13mm') {
        return this.PrefChargeRankData1013[this.pref]
      } else if (this.picked_rank === '使用水量：20㎥，口径13mm') {
        return this.PrefChargeRankData2013[this.pref]
      } else if (this.picked_rank === '使用水量：10㎥，口径20mm') {
        return this.PrefChargeRankData1020[this.pref]
      } else if (this.picked_rank === '使用水量：20㎥，口径20mm') {
        return this.PrefChargeRankData2020[this.pref]
      } else {
        return ''
      }
    },
    graph_data() {
      if (this.picked_graph === '使用水量：10㎥，口径13mm') {
        return this.GraphData1013
      } else if (this.picked_graph === '使用水量：20㎥，口径13mm') {
        return this.GraphData2013
      } else if (this.picked_graph === '使用水量：10㎥，口径20mm') {
        return this.GraphData1020
      } else if (this.picked_graph === '使用水量：20㎥，口径20mm') {
        return this.GraphData2020
      } else {
        return ''
      }
    },
    base_headers() {
      return [
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
      for (let i = 0; i < this.PrefBaseData[0].length; i++) {
        if (this.PrefBaseData[0][i].Organization === this.select_town) {
          if (this.use_amount <= this.PrefBaseData[0][i].BaseAmount) {
            CalculatedCharge = this.PrefBaseData[0][i].BaseCharge
          } else {
            CalculatedCharge =
              this.PrefBaseData[0][i].BaseCharge +
              (this.use_amount - this.PrefBaseData[0][i].BaseAmount) *
                this.PrefBaseData[0][i].ExtraCharge
          }
        }
      }
      return CalculatedCharge
    },
  },
  created() {
    this.setQuery()
    this.setSearch()
    this.GraphData()
    this.BaseData()
  },
  methods: {
    setQuery() {
      this.pref = this.$route.query.prefName || ''
    },
    setSearch() {
      for (let i = 0; i < this.PrefChargeRankData1013[this.pref].length; i++) {
        this.searchItems.push(
          this.PrefChargeRankData1013[this.pref][i].organization
        )
      }
    },
    GraphData() {
      for (let i = 0; i < this.PrefChargeRankData1013[this.pref].length; i++) {
        this.GraphData1013.push([
          this.PrefChargeRankData1013[this.pref][i].organization,
          this.PrefChargeRankData1013[this.pref][i].Charge,
        ])
      }
      for (let i = 0; i < this.PrefChargeRankData2013[this.pref].length; i++) {
        this.GraphData2013.push([
          this.PrefChargeRankData2013[this.pref][i].organization,
          this.PrefChargeRankData2013[this.pref][i].Charge,
        ])
      }
      for (let i = 0; i < this.PrefChargeRankData1020[this.pref].length; i++) {
        this.GraphData1020.push([
          this.PrefChargeRankData1020[this.pref][i].organization,
          this.PrefChargeRankData1020[this.pref][i].Charge,
        ])
      }
      for (let i = 0; i < this.PrefChargeRankData2020[this.pref].length; i++) {
        this.GraphData2020.push([
          this.PrefChargeRankData2020[this.pref][i].organization,
          this.PrefChargeRankData2020[this.pref][i].Charge,
        ])
      }
    },
    BaseData() {
      this.PrefBaseData[0] = this.AllPrefBaseData[this.pref]
    },
  },
}
</script>

<style scoped>
.c-p {
  cursor: pointer;
}

.hard-pref {
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
</style>

