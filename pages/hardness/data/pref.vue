<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="hard-pref">
      <div
        class="text-h4 text-md-h3 my-3 mt-5 ml-2 font-weight-bold primary--text"
      >
        {{ $route.query.prefName }} の硬度データ
      </div>
      <v-section>
        <v-row>
          <v-row class="mx-1 my-3">
            <v-col cols="12" md="4" class="px-3">
              <v-row class="mx-2 my-3" justify="center">
                <div class="text-h5 text-md-h4 font-weight-bold primary--text">
                  硬度区分マップ
                </div>
              </v-row>
              <div>
                Google My Map 上に硬度を10段階にカテゴライズし、表現。
                マップの見方については、以下参照。<br />
                (※アイコンの図は異なるため、色を参照してください。)
              </div>
              <v-row justify="center" class="my-3">
                <v-card elevation="1">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th class="text-h7" style="text-align: center">
                          アイコン
                        </th>
                        <th class="text-h7" style="text-align: center">
                          硬度範囲
                        </th>
                        <th class="text-h7" style="text-align: center">
                          アイコン
                        </th>
                        <th class="text-h7" style="text-align: center">
                          硬度範囲
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 5" :key="i">
                        <td style="text-align: center">
                          <v-icon :color="IconColors[i - 1]">
                            mdi-water-circle
                          </v-icon>
                        </td>
                        <td style="text-align: center">
                          硬度 {{ IconHardness[i - 1] }}
                        </td>
                        <td style="text-align: center">
                          <v-icon :color="IconColors[i + 4]">
                            mdi-water-circle
                          </v-icon>
                        </td>
                        <td style="text-align: center">
                          硬度 {{ IconHardness[i + 4] }}
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card>
              </v-row>
              <div>
                左上のボタンを押して、各アイテムのチェックボックを押すことで、マップ上に表現するデータを限定することができます。<br /><br />
                また、<v-icon> mdi-plus-box-outline </v-icon> や
                <v-icon> mdi-minus-box-outline </v-icon
                >を押すことで、地図の拡大・縮小を行うことができます。<br /><br />
                ドラッグで地図の移動もできるので、あなたの地域の水道水の硬度がどうなっているかチェックしてみてください！！
              </div>
            </v-col>
            <v-col cols="12" md="8" class="px-3">
              <v-card height="650">
                <iframe
                  :src="mapUrl"
                  width="100%"
                  height="100%"
                  allowfullscreen
                ></iframe>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-section>
      <v-divider></v-divider>
      <v-section>
        <v-row class="ml-4 my-5" justify="center">
          <div class="text-h5 text-md-h4 mt-8 font-weight-bold primary--text">
            {{ pref }}内の浄水場ごとの硬度表
          </div>
        </v-row>
        <v-row justify="center" class="mb-5">
          <v-col cols="12" md="10">
            <v-card width="100%">
              <v-card-title>
                浄水場ごとの硬度
                <v-spacer></v-spacer>
                <v-autocomplete
                  v-model="search"
                  :items="SearchItems"
                  prepend-inner-icon="mdi-magnify"
                  label="事業主体名や浄水場名で検索"
                  outlined
                  hide-details
                ></v-autocomplete>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="PrefData[0]"
                :search="search"
              >
              </v-data-table>
            </v-card>
            <div class="my-1">
              ※
              1日平均浄水量は参照したデータが欠損していた場合、「0」で埋めるように対応しています。
            </div>
          </v-col>
        </v-row>
      </v-section>
      <v-divider></v-divider>
      <v-row class="ml-4 my-5" justify="center">
        <div class="text-h5 text-md-h4 mt-8 font-weight-bold primary--text">
          {{ pref }}の硬度に関するグラフ
        </div>
      </v-row>
      <v-row justify="center">
        <div class="text-h6 text-md-h5 mt-8 font-weight-bold primary--text">
          各事業主体ごとの平均硬度
        </div>
      </v-row>
      <v-row class="my-3" justify="center">
        <v-col cols="12" md="10">
          <v-card :height="BarOptions1.height">
            <GChart :type="BarType" :data="BarData1" :options="BarOptions1" />
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <div class="text-h6 text-md-h5 mt-8 font-weight-bold primary--text">
          事業主体内の各浄水場ごとの硬度
        </div>
      </v-row>
      <v-row class="my-3" justify="center">
        <v-col cols="12" md="10">
          <v-card>
            <v-row class="my-3" justify="center">
              <v-col cols="4">
                <v-select
                  v-model="selectedDistrict"
                  :items="DistrictItems"
                  outlined
                  label="表示する事業主体名を選択"
                  @change="selected"
                ></v-select>
              </v-col>
            </v-row>
            <GChart
              :type="ColumnType"
              :data="BarData2"
              :options="BarOptions2"
            />
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-card>
      <GChart :type="HistoType" :data="HistData" :options="HistOptions" />
    </v-card> -->
    </v-container>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import NaganoData from '@/assets/mockup_data/HardnessData/NaganoHardness.json'
import AllPref from '@/assets/mockup_data/HardnessData/pref_hardness.json'
import DistrictMean from '@/assets/mockup_data/HardnessData/district_mean_hardness.json'
import FacilityItem from '@/assets/mockup_data/HardnessData/facility_hardness.json'

import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

export default {
  name: 'PrefPage',
  components: {
    GChart,
    BreadCrumb,
  },
  data() {
    return {
      pref: '',
      chartData: NaganoData,
      AllPrefData: AllPref,
      DistrictData: DistrictMean,
      FacilityData: FacilityItem,
      PrefData: [],
      DistrictMeanData: [],
      selectedDistrict: '',
      search: '',
      HistoType: 'Histogram',
      ScatterType: 'ScatterChart',
      BarType: 'BarChart',
      ColumnType: 'ColumnChart',

      HistOptions: {
        title: '内の浄水場ごとの硬度分布',
        width: '100%',
        height: '100%',
      },
      ScatterOptions: {
        title: '内の各浄水場の硬度',
        width: '100%',
        height: '100%',
      },
      BarOptions1: {
        // title: '内の事業主体ごとの平均硬度',
        width: '100%',
        height: '100%',
        chartArea: {
          width: '50%',
          height: '90%',
        },
      },
      BarOptions2: {
        // title: '内の事業主体ごとの平均硬度',
        width: '100%',
        height: '500',
        bars: 'horizontal',
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1 },
        },
        vAxes: {
          // Adds titles to each axis.
          0: { title: '硬度' },
          1: { title: '1日平均上水量' },
        },
      },
      mapParameters: {
        北海道: '&ll=43.22226412825048%2C142.0964061625412&z=7',
        青森県: '&ll=40.856080914543774%2C140.6839471870313&z=9',
        岩手県: '&ll=39.75341509163775%2C141.33267993195938&z=9',
        秋田県: '&ll=39.68194717327475%2C140.2405497567518&z=9',
        宮城県: '&ll=38.424786433957536%2C141.0387209253835&z=9',
        山形県: '&ll=38.53656891544524%2C139.7968653558852&z=9',
        福島県: '&ll=37.44656660027973%2C140.05053603238187&z=9',
        茨城県: '&ll=36.481112535273844%2C140.46493245444836&z=9',
        栃木県: '&ll=36.67458162168353%2C139.75453224932406&z=9',
        群馬県: '&ll=36.4798389424552%2C138.91261890174107&z=9',
        埼玉県: '&ll=36.027784926163235%2C139.45677602944107&z=9',
        千葉県: '&ll=35.48204114609703%2C140.26119067908482&z=9',
        東京都: '&ll=35.699575076366294%2C139.48424184975357&z=10',
        神奈川県: '&ll=35.4185873213207%2C139.31475723045173&z=10',
        新潟県: '&ll=37.707198871678116%2C138.37689711232048&z=8',
        富山県: '&ll=36.65451012783585%2C137.2622339465079&z=10',
        石川県: '&ll=36.87079350247707%2C136.5947247000037&z=9',
        福井県: '&ll=35.8676153655379%2C136.13859923638245&z=9',
        山梨県: '&ll=35.57528142446532%2C138.73194758933553&z=9',
        長野県: '&ll=36.091222344366145%2C138.1945726612066&z=9',
        岐阜県: '&ll=35.8812544065596%2C137.00066222991362&z=9',
        静岡県: '&ll=34.99117470124482%2C138.2913470460126&z=9',
        愛知県: '&ll=35.035068000519104%2C137.3271630875609&z=9',
        三重県: '&ll=34.55244313236173%2C136.6624902359984&z=9',
        滋賀県: '&ll=35.18744216943484%2C136.18509531488803&z=9',
        京都府: '&ll=35.240634835623794%2C135.57610601471902&z=9',
        大阪府: '&ll=34.678191248052215%2C135.49980598789213&z=10',
        兵庫県: '&ll=35.149957343610154%2C134.84739917329614&z=9',
        奈良県: '&ll=34.507963591834134%2C135.92010191877162&z=10',
        和歌山県: '&ll=33.9881082007369%2C135.59830203102715&z=9',
        鳥取県: '&ll=35.542246461491565%2C133.90046634875353&z=9',
        島根県: '&ll=34.956960093468936%2C132.426701174687&z=9',
        岡山県: '&ll=34.972713887858575%2C133.85343511918236&z=9',
        広島県: '&ll=34.60614765767934%2C132.7871405015996&z=9',
        山口県: '&ll=34.37300587939468%2C131.61434997425584&z=9',
        徳島県: '&ll=33.96822261422178%2C134.13745420984927&z=9',
        香川県: '&ll=34.347024727620564%2C133.91914975683167&z=10',
        愛媛県: '&ll=33.663066902788444%2C132.7833665676069&z=9',
        高知県: '&ll=33.355118071700474%2C133.4480394191694&z=9',
        福岡県: '&ll=33.57095750576271%2C130.6542565535224&z=9',
        佐賀県: '&ll=33.2550398251483%2C130.10040661246006&z=10',
        長崎県: '&ll=33.075213387233745%2C129.57231405325118&z=9',
        熊本県: '&ll=32.66909950097745%2C130.79430879090702&z=9',
        大分県: '&ll=33.18816740293815%2C131.3637244482576&z=9',
        宮崎県: '&ll=32.17222083753565%2C131.40392333389025&z=9',
        鹿児島県: '&ll=31.79779316629086%2C130.3603167995357&z=9',
        沖縄県: '&ll=26.754546940519795%2C127.42099010818342&z=7',
      },
      mapUrl:
        'https://www.google.com/maps/d/embed?mid=102raZYf3j_ylyldshZ5zBOq80K4o9Yc&ehbc=2E312F',

      IconColors: [
        '#7cb342',
        '#0288d1',
        '#394983',
        '#673ab7',
        '#9c27b0',
        '#880e4f',
        '#c0185b',
        '#ff5252',
        '#f9a825',
        '#ffea00',
      ],
      IconHardness: [
        '~10',
        '10~20',
        '20~30',
        '30~40',
        '40~50',
        '50~70',
        '70~100',
        '100~150',
        '150~200',
        '200~',
      ],
      SearchItems: [],
      HistData: [['浄水場名', '平均硬度']],
      ScatterData: [['平均硬度', '1日平均浄水量']],
      BarData1: [['事業主体名', '平均硬度']],
      DistrictItems: [],
      BarData2: '',
    }
  },
  computed: {
    headers() {
      return [
        // {
        //   text: '県名',
        //   value: 'pref',
        //   sortable: false,
        //   align: 'start',
        // },
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
          path: '/hardness/data',
        },
        {
          name: '都道府県を選択',
          path: '/hardness/data/select_pref',
        },
        {
          name: this.pref + 'の硬度データ',
        },
      ]
    },
  },
  created() {
    this.setQuery()
    this.setTitle()
    this.setMap()
    this.setData()
    this.makeChartData()
    this.setGraphHeight()
    this.makeSelectItems()
    this.selected()
  },
  methods: {
    setQuery() {
      this.pref = this.$route.query.prefName || ''
    },
    setTitle() {
      this.HistOptions.title = this.pref + this.HistOptions.title
      this.ScatterOptions.title = this.pref + this.ScatterOptions.title
      // this.BarOptions1.title = this.pref + this.BarOptions1.title
    },
    setMap() {
      this.mapUrl = this.mapUrl + this.mapParameters[this.pref]
    },
    setData() {
      this.PrefData[0] = this.AllPrefData[this.pref]
      this.DistrictMeanData[0] = this.DistrictData[this.pref]
      for (let i = 0; i < this.PrefData[0].length; i++) {
        this.SearchItems.push(this.PrefData[0][i].district)
        this.SearchItems.push(this.PrefData[0][i].facility)
      }
    },
    makeChartData() {
      for (let i = 0; i < this.PrefData[0].length; i++) {
        this.HistData.push([
          this.PrefData[0][i].facility,
          this.PrefData[0][i].hardness,
        ])
        this.ScatterData.push([
          this.PrefData[0][i].hardness,
          this.PrefData[0][i].amount,
        ])
      }
      for (let i = 0; i < this.DistrictMeanData[0].length; i++) {
        this.BarData1.push([
          this.DistrictMeanData[0][i].district,
          this.DistrictMeanData[0][i].mean_hard,
        ])
      }
    },
    setGraphHeight() {
      this.BarOptions1.height = 30 + this.DistrictMeanData[0].length * 25
    },
    makeSelectItems() {
      for (let i = 0; i < this.DistrictMeanData[0].length; i++) {
        this.DistrictItems.push([this.DistrictMeanData[0][i].district])
      }
      this.selectedDistrict = this.DistrictItems[0]
    },
    selected() {
      this.BarData2 = this.FacilityData[this.selectedDistrict]
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
</style>

