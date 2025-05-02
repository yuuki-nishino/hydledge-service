<template>
  <div class="p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow">
    <h1 class="text-2xl font-bold text-center mb-6 text-main">
      水道料金シミュレーター
    </h1>

    <!-- タブメニュー -->
    <div class="mb-6">
      <div
        class="radio-tabs bg-white p-2 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <label
          v-for="tab in ['compare', 'graph', 'ranking']"
          :key="tab"
          class="radio-tab cursor-pointer p-3 rounded-md text-center font-medium flex items-center justify-center transition-all"
          :class="
            activeTab === tab
              ? 'bg-main text-white shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200'
          "
        >
          <input v-model="activeTab" type="radio" :value="tab" class="hidden" />
          <span>
            {{
              tab === 'compare'
                ? '水道料金比較シミュレーター'
                : tab === 'graph'
                ? '都道府県比較グラフ'
                : '水道料金ランキング'
            }}
          </span>
        </label>
      </div>
    </div>

    <!-- 水道料金比較シミュレーター -->
    <div
      v-if="activeTab === 'compare'"
      class="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">
        水道料金比較シミュレーター
      </h2>

      <!-- 自治体選択部分を横並びに -->
      <div class="comparison-container mb-6">
        <!-- 左側の自治体 -->
        <div class="w-full bg-light-blue p-4 rounded-lg">
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-medium">都道府県を選択（1）</label>
              <select
                v-model="selectedPrefecture"
                class="w-full p-2 border rounded"
              >
                <option
                  v-for="pref in availablePrefectures"
                  :key="pref"
                  :value="pref"
                >
                  {{ pref }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-2 font-medium">自治体を選択（1）</label>
              <select v-model="selectedCity" class="w-full p-2 border rounded">
                <option
                  v-for="city in availableCitiesInPrefecture"
                  :key="city"
                  :value="city"
                >
                  {{ city }}
                </option>
              </select>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h3 class="text-lg font-medium mb-2 text-main">計算結果（1）</h3>
              <p class="text-3xl font-bold text-main-dark">
                {{ bill.toLocaleString() }} 円
              </p>
            </div>
          </div>
        </div>

        <!-- 右側の自治体 -->
        <div class="w-full bg-light-orange p-4 rounded-lg">
          <div class="space-y-4">
            <div>
              <label class="block mb-2 font-medium">都道府県を選択（2）</label>
              <select
                v-model="comparePrefecture"
                class="w-full p-2 border rounded"
              >
                <option
                  v-for="pref in availablePrefectures"
                  :key="pref"
                  :value="pref"
                >
                  {{ pref }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-2 font-medium">自治体を選択（2）</label>
              <select v-model="compareCity" class="w-full p-2 border rounded">
                <option
                  v-for="city in availableCitiesInComparePrefecture"
                  :key="city"
                  :value="city"
                >
                  {{ city }}
                </option>
              </select>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h3 class="text-lg font-medium mb-2 text-orange-700">
                計算結果（2）
              </h3>
              <p class="text-3xl font-bold text-orange-800">
                {{ compareBill.toLocaleString() }} 円
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用量設定 -->
      <div class="bg-gray-50 p-4 rounded-lg mb-6">
        <label class="block mb-2 font-medium">使用量 (m³)</label>
        <input
          v-model="waterUsage"
          type="range"
          min="1"
          max="50"
          class="w-full mb-2"
        />
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium">{{ waterUsage }} m³</span>
          <div class="w-32"></div>
          <button
            class="px-3 py-2 bg-main text-white rounded text-sm ml-auto"
            @click="waterUsage = 20"
          >
            標準使用量に設定
          </button>
        </div>
      </div>

      <!-- 比較結果 -->
      <div class="bg-gray-50 p-6 rounded-lg border-2 border-main-light">
        <h3 class="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
          料金差の比較結果
        </h3>

        <div class="text-center">
          <p class="text-lg text-gray-700 bg-white p-4 rounded-lg shadow-sm">
            <span class="font-bold text-main">
              {{ bill > compareBill ? selectedCity : compareCity }}
            </span>
            の方が
            <span class="font-bold text-red-600">
              {{ Math.abs(bill - compareBill).toLocaleString() }}円
            </span>
            高くなっています
          </p>
        </div>

        <div class="mt-4 text-center text-gray-600">
          <p class="text-sm">
            差額は
            <span class="font-bold">
              {{
                Math.round(
                  (Math.abs(bill - compareBill) / Math.min(bill, compareBill)) *
                    100
                )
              }}%
            </span>
            の違いがあります
          </p>
        </div>
      </div>
    </div>

    <!-- 都道府県比較グラフ -->
    <div
      v-if="activeTab === 'graph'"
      class="bg-white p-6 rounded-lg shadow-sm"
      style="height: 1000px"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">都道府県比較グラフ</h2>
      <div class="mb-4">
        <label class="block mb-2 font-medium">都道府県を選択</label>
        <select
          v-model="selectedGraphPrefecture"
          class="w-full p-2 border rounded"
        >
          <option
            v-for="pref in availablePrefectures"
            :key="pref"
            :value="pref"
          >
            {{ pref }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium">使用量を選択</label>
        <select v-model="selectedUsageFee" class="w-full p-2 border rounded">
          <option value="10m3">10m³</option>
          <option value="15m3">15m³</option>
          <option value="20m3">20m³</option>
        </select>
      </div>
      <div class="h-full" style="min-height: 800px">
        <GChart
          type="ColumnChart"
          :data="chartData"
          :options="{
            title: '都道府県別水道料金',
            colors: ['#0E2997'],
            chartArea: { width: '70%', height: '70%' },
            height: 600,
            hAxis: {
              title: '自治体',
              slantedText: true,
              slantedTextAngle: 45,
              textStyle: {
                fontSize: 12,
              },
              showTextEvery: 1,
            },
            vAxis: {
              title: '料金 (円)',
              minValue: 0,
            },
            bar: { groupWidth: '60%' },
            legend: { position: 'none' },
          }"
        />
      </div>
    </div>

    <!-- 水道料金ランキング -->
    <div
      v-if="activeTab === 'ranking'"
      class="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">水道料金ランキング</h2>
      <div class="mb-4">
        <label class="block mb-2 font-medium">使用量を選択</label>
        <select
          v-model="rankingUsage"
          class="w-full p-2 border rounded"
          @change="updateRankingData"
        >
          <option value="10m3">10m³</option>
          <option value="15m3">15m³</option>
          <option value="20m3">20m³</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium">並び順を選択</label>
        <select v-model="sortOrder" class="w-full p-2 border rounded">
          <option value="asc">安い順</option>
          <option value="desc">高い順</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                class="px-4 py-2 border-b border-gray-200 bg-main text-white text-left"
              >
                順位
              </th>
              <th
                class="px-4 py-2 border-b border-gray-200 bg-main text-white text-left"
              >
                都道府県
              </th>
              <th
                class="px-4 py-2 border-b border-gray-200 bg-main text-white text-left"
              >
                自治体名
              </th>
              <th
                class="px-4 py-2 border-b border-gray-200 bg-main text-white text-right"
              >
                水道料金
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in sortedRankingData"
              :key="index"
              :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
            >
              <td class="px-4 py-2 border-b border-gray-200">
                {{ index + 1 }}位
              </td>
              <td class="px-4 py-2 border-b border-gray-200">
                {{ item.prefecture }}
              </td>
              <td class="px-4 py-2 border-b border-gray-200">
                {{ item.city }}
              </td>
              <td class="px-4 py-2 border-b border-gray-200 text-right">
                {{ item.fee.toLocaleString() }}円
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)

export default {
  name: 'ChargeFix',

  data() {
    return {
      waterRatesData: [],
      selectedPrefecture: '東京都',
      comparePrefecture: '神奈川県',
      selectedCity: '東京都',
      compareCity: '横浜市',
      waterUsage: 20,
      rankingUsage: '20m3',
      sortOrder: 'asc',
      activeTab: 'compare',
      rankingData: [],
      prefectureOrder: [
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
      selectedGraphPrefecture: '東京都',
      selectedUsageFee: '20m3',
    }
  },

  computed: {
    availablePrefectures() {
      const availablePrefSet = new Set(
        this.waterRatesData.map((data) => data.prefecture)
      )
      return this.prefectureOrder.filter((pref) => availablePrefSet.has(pref))
    },

    availableCitiesInPrefecture() {
      return this.waterRatesData
        .filter((data) => data.prefecture === this.selectedPrefecture)
        .map((data) => data.municipality)
        .sort()
    },

    availableCitiesInComparePrefecture() {
      return this.waterRatesData
        .filter((data) => data.prefecture === this.comparePrefecture)
        .map((data) => data.municipality)
        .sort()
    },

    calculateNationalAverage() {
      if (!this.waterRatesData.length) return 0
      const total = this.waterRatesData.reduce(
        (sum, data) => sum + this.calculateWaterBill(data),
        0
      )
      return Math.round(total / this.waterRatesData.length)
    },

    bill() {
      return this.calculateWaterBill(this.selectedCityData)
    },

    compareBill() {
      return this.calculateWaterBill(this.compareCityData)
    },

    selectedCityData() {
      return this.waterRatesData.find(
        (data) => data.municipality === this.selectedCity
      )
    },

    compareCityData() {
      return this.waterRatesData.find(
        (data) => data.municipality === this.compareCity
      )
    },

    sortedRankingData() {
      if (this.sortOrder === 'asc') {
        return [...this.rankingData].sort((a, b) => a.fee - b.fee)
      } else {
        return [...this.rankingData].sort((a, b) => b.fee - a.fee)
      }
    },
  },

  watch: {
    selectedPrefecture(newPref) {
      if (!this.availablePrefectures.includes(newPref)) {
        this.selectedCity = ''
        return
      }
      if (!this.availableCitiesInPrefecture.includes(this.selectedCity)) {
        this.selectedCity = this.availableCitiesInPrefecture[0] || ''
      }
    },
    comparePrefecture(newPref) {
      if (!this.availablePrefectures.includes(newPref)) {
        this.compareCity = ''
        return
      }
      if (!this.availableCitiesInComparePrefecture.includes(this.compareCity)) {
        this.compareCity = this.availableCitiesInComparePrefecture[0] || ''
      }
    },
    selectedGraphPrefecture: 'updateGraph',
    selectedUsageFee: 'updateGraph',
    rankingUsage: 'updateRankingData',
    sortOrder() {
      // ソート順が変更されたときは計算プロパティが自動的に再計算される
    },
    activeTab(newTab) {
      if (newTab === 'ranking') {
        this.updateRankingData()
      }
    },
  },

  async created() {
    try {
      const module = await import(
        '@/assets/mockup_data/ChargeData/water_rates.json'
      )
      this.waterRatesData = module.default

      if (
        !this.waterRatesData.some(
          (data) =>
            data.prefecture === '東京都' && data.municipality === '東京都'
        )
      ) {
        this.selectedCity = this.availableCitiesInPrefecture[0] || ''
      }
      if (
        !this.waterRatesData.some(
          (data) =>
            data.prefecture === '神奈川県' && data.municipality === '横浜市'
        )
      ) {
        this.compareCity = this.availableCitiesInComparePrefecture[0] || ''
      }

      this.updateRankingData()
      this.updateGraph()
    } catch (error) {
      this.$emit('error', 'データの読み込みに失敗しました')
    }
  },

  methods: {
    calculateWaterBill(cityData) {
      if (!cityData) return 0

      const {
        basic_rate: basicRate,
        excess_rate: excessRate,
        basic_volume: basicVolume,
        meter_usage: meterUsage,
      } = cityData
      const usage = this.waterUsage

      if (usage <= basicVolume) {
        return basicRate + meterUsage
      }

      return basicRate + (usage - basicVolume) * excessRate + meterUsage
    },

    updateRankingData() {
      this.rankingData = this.waterRatesData.map((data) => {
        return {
          prefecture: data.prefecture,
          city: data.municipality,
          fee: data.usage_fee[this.rankingUsage] || 0,
        }
      })
    },

    updateGraph() {
      const selectedData = this.waterRatesData.filter(
        (data) => data.prefecture === this.selectedGraphPrefecture
      )
      const chartData = [
        ['自治体', '料金'],
        ...selectedData.map((data) => [
          data.municipality,
          data.usage_fee[this.selectedUsageFee],
        ]),
      ]

      this.chartData = chartData
    },
  },
}
</script>

<style scoped>
.p-4 {
  padding: 1rem;
}

.max-w-6xl {
  max-width: 72rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 6%);
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.text-main {
  color: #0e2997;
}

.text-main-dark {
  color: #081d6e;
}

.bg-main {
  background-color: #0e2997;
}

.bg-main-light {
  background-color: #4e67c9;
}

.bg-light-blue {
  background-color: #e1f5fe;
}

.bg-light-orange {
  background-color: #fff3e0;
}

.border-main-light {
  border-color: #4e67c9;
}

/* タブメニューのスタイル */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.bg-white {
  background-color: #fff;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
}

button {
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

button.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

button.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.font-medium {
  font-weight: 500;
}

.text-white {
  color: #fff;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

/* グリッドレイアウト */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

/* メディアクエリの修正 */
@media (min-width: 768px) {
  .md-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gap-6 {
  gap: 1.5rem;
}

/* フォームコントロール */
.block {
  display: block;
}

.w-full {
  width: 100%;
}

input[type='range'] {
  width: 100%;
  margin: 0.5rem 0;
}

select,
input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
}

/* 計算結果エリア */
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-gray-600 {
  color: #4b5563;
}

.mt-2 {
  margin-top: 0.5rem;
}

/* ボタングループ */
.space-x-4 > * + * {
  margin-left: 1rem;
}

.hover-bg-main:hover {
  background-color: #081d6e;
}

.hover-bg-green-700:hover {
  background-color: #15803d;
}

.bg-green-600 {
  background-color: #16a34a;
}

/* レスポンシブデザインの調整 */
@media (max-width: 640px) {
  .p-4 {
    padding: 0.75rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .radio-tab {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }
}

/* アニメーション */
.transition {
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* タブの選択状態をより明確に */
.radio-tab[class*='bg-main']::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0e2997;
}

/* 計算結果の強調表示 */
.text-3xl.font-bold {
  text-shadow: 1px 1px 2px rgb(0 0 0 / 10%);
}

.comparison-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* グラフの外側のスペースをさらに大きくする */
.bg-white.p-6.rounded-lg.shadow-sm {
  padding: 3rem;
  margin: 1rem 0 3rem;
}

/* 見出しとプルダウンの余白を小さくする */
.mb-4 {
  margin-bottom: 1rem;
}

.block.mb-2 {
  margin-bottom: 0.5rem;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230E2997'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 30px;
}
</style>