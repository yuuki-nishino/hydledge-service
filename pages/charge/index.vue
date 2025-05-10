<template>
  <div class="p-3 md:p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow">
    <h1 class="text-2xl font-bold text-center mb-6 text-main">
      水道料金分析ページ
    </h1>

    <!-- タブメニュー -->
    <div class="mb-6">
      <!-- PC用タブメニュー -->
      <div
        v-if="!isMobile"
        class="radio-tabs bg-white p-2 rounded-lg shadow-sm grid grid-cols-3 gap-2"
      >
        <label
          v-for="tab in ['compare', 'graph', 'ranking', 'averageRanking']"
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
                ? '都道府県内比較グラフ'
                : tab === 'ranking'
                ? '全国自治体水道料金ランキング'
                : '都道府県平均水道料金ランキング'
            }}
          </span>
        </label>
      </div>

      <!-- モバイル用プルダウンメニュー -->
      <div v-if="isMobile" class="px-2">
        <select
          v-model="activeTab"
          class="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        >
          <option value="compare">水道料金比較シミュレーター</option>
          <option value="graph">都道府県内比較グラフ</option>
          <option value="ranking">全国自治体水道料金ランキング</option>
          <option value="averageRanking">都道府県平均水道料金ランキング</option>
        </select>
      </div>
    </div>

    <!-- 水道料金比較シミュレーター -->
    <div
      v-if="activeTab === 'compare'"
      class="bg-white p-4 md:p-6 rounded-lg shadow-sm"
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

    <!-- 都道府県内比較グラフ -->
    <div
      v-if="activeTab === 'graph'"
      class="bg-white p-4 md:p-6 rounded-lg shadow-sm"
      style="height: auto"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">都道府県内比較グラフ</h2>
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
      <div class="mb-4">
        <label class="block mb-2 font-medium">自治体名で検索</label>
        <input
          v-model="graphSearchCity"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="自治体名を入力してください"
        />
        <div class="flex mt-2 space-x-4">
          <button
            class="px-6 py-2 bg-main text-white rounded hover:bg-main-dark"
            @click="searchGraphCity"
          >
            検索
          </button>
          <button
            v-if="graphHighlightedCity"
            class="px-6 py-2 text-white rounded hover:bg-gray-600"
            style="background-color: #6b7280"
            @click="clearGraphSearch"
          >
            クリア
          </button>
        </div>
      </div>

      <!-- 検索結果の表示 -->
      <div
        v-if="graphHighlightedCity && graphHighlightedCityFee"
        class="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
      >
        <p class="text-center font-medium">
          「{{ graphHighlightedCity }}」の水道料金:
          <span class="text-xl font-bold text-main"
            >{{ graphHighlightedCityFee.toLocaleString() }}円</span
          >
          ({{ selectedUsageFee }}使用時)
        </p>
      </div>

      <!-- モバイル表示の場合は横棒グラフ、PC表示の場合は縦棒グラフ -->
      <div v-if="!isMobile" style="min-height: 500px">
        <GChart
          type="ColumnChart"
          :data="chartData"
          :options="{
            title: '都道府県別水道料金',
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
      <div v-if="isMobile" style="min-height: 500px">
        <GChart
          type="BarChart"
          :data="chartData"
          :options="{
            title: '都道府県別水道料金',
            chartArea: { width: '65%', height: '80%' },
            height: 500,
            hAxis: {
              title: '料金 (円)',
              minValue: 0,
            },
            vAxis: {
              title: '自治体',
              textStyle: {
                fontSize: 10,
              },
            },
            bar: { groupWidth: '70%' },
            legend: { position: 'none' },
          }"
        />
      </div>
    </div>

    <!-- 水道料金ランキング -->
    <div
      v-if="activeTab === 'ranking'"
      class="bg-white p-4 md:p-6 rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">
        全国自治体水道料金ランキング
      </h2>
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
      <div class="mb-4">
        <label class="block mb-2 font-medium">自治体名で検索</label>
        <input
          v-model="searchCity"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="自治体名を入力してください"
        />
        <div class="flex mt-2 space-x-4">
          <button
            class="px-4 py-2 bg-main text-white rounded"
            @click="searchRankingCity"
          >
            検索
          </button>
          <button
            v-if="searchedCityResult"
            class="px-4 py-2 text-white rounded hover:bg-gray-600"
            style="background-color: #6b7280"
            @click="clearSearch"
          >
            クリア
          </button>
        </div>
      </div>
      <div v-if="searchedCityResult">
        <h3 class="text-lg font-semibold mb-2 text-main">検索結果</h3>
        <div v-if="searchedCityResult.length > 0">
          <div
            v-if="searchTargetRank"
            class="mb-4 p-3 bg-blue-50 rounded border border-blue-200"
          >
            <p class="text-center font-medium">
              「{{ searchCity }}」は全{{ sortedRankingData.length }}自治体中
              <span class="text-xl font-bold text-main"
                >{{ searchTargetRank }}位</span
              >
              です
            </p>
          </div>
          <div class="overflow-x-auto flex justify-center">
            <table class="min-w-full bg-white border border-gray-200 mb-4">
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
                  v-for="(item, idx) in searchedCityResult"
                  :key="item.city + item.prefecture"
                  :class="
                    item.isTarget
                      ? 'font-bold'
                      : idx % 2 === 0
                      ? 'bg-gray-50'
                      : 'bg-white'
                  "
                  :style="item.isTarget ? 'background-color: #FFEDD5;' : ''"
                >
                  <td class="px-4 py-2 border-b border-gray-200">
                    {{ item.rank }}位
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
        <div v-else class="text-red-600">
          該当する自治体が見つかりませんでした。
        </div>
      </div>

      <!-- 区切り線 -->
      <hr
        v-if="searchedCityResult && searchedCityResult.length > 0"
        class="my-6 border-t border-gray-300"
      />

      <div class="overflow-x-auto flex justify-center">
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

    <!-- 都道府県平均水道料金ランキング -->
    <div
      v-if="activeTab === 'averageRanking'"
      class="bg-white p-4 md:p-6 rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4 text-main">
        都道府県平均水道料金ランキング
      </h2>
      <div class="mb-4">
        <label class="block mb-2 font-medium">使用量を選択</label>
        <select
          v-model="averageUsage"
          class="w-full p-2 border rounded"
          @change="updateAverageRankingData"
        >
          <option value="10m3">10m³</option>
          <option value="15m3">15m³</option>
          <option value="20m3">20m³</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium">並び順を選択</label>
        <select
          v-model="averageSortOrder"
          class="w-full p-2 border rounded"
          @change="updateAverageRankingData"
        >
          <option value="asc">安い順</option>
          <option value="desc">高い順</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium">都道府県名で検索</label>
        <input
          v-model="averageGraphSearchPrefecture"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="都道府県名を入力してください"
        />
        <div class="flex mt-2 space-x-4">
          <button
            class="px-6 py-2 bg-main text-white rounded hover:bg-main-dark"
            @click="searchAverageGraphPrefecture"
          >
            検索
          </button>
          <button
            v-if="averageGraphHighlightedPrefecture"
            class="px-6 py-2 text-white rounded hover:bg-gray-600"
            style="background-color: #6b7280"
            @click="clearAverageGraphSearch"
          >
            クリア
          </button>
        </div>
      </div>
      <div
        v-if="averageGraphHighlightedPrefecture"
        class="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
      >
        <p class="text-center font-medium">
          「{{ averageGraphHighlightedPrefecture }}」の平均水道料金:
          <span class="text-xl font-bold text-main">
            {{ averageGraphHighlightedFee.toLocaleString() }}円
          </span>
          ({{ averageGraphHighlightedRank }}/47位)
        </p>
      </div>
      <div
        v-if="averageRankingData.length"
        style="min-height: 500px; margin-bottom: 2rem"
      >
        <GChart
          type="ColumnChart"
          :data="averageChartData"
          :options="{
            title: '都道府県平均水道料金',
            chartArea: { width: '70%', height: '70%' },
            height: 600,
            hAxis: {
              title: '都道府県',
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
      <hr class="my-4 border-t border-gray-300" />
      <div class="overflow-x-auto flex justify-center">
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
                class="px-4 py-2 border-b border-gray-200 bg-main text-white text-right"
              >
                平均水道料金
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in sortedAverageRankingData"
              :key="index"
              :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
            >
              <td class="px-4 py-2 border-b border-gray-200">
                {{ index + 1 }}位
              </td>
              <td class="px-4 py-2 border-b border-gray-200">
                {{ item.prefecture }}
              </td>
              <td class="px-4 py-2 border-b border-gray-200 text-right">
                {{ Number(item.averageFee).toFixed(1).toLocaleString() }}円
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-right mb-4">
        <button
          class="px-4 py-2 bg-main text-white rounded hover:bg-main-dark"
          @click="downloadCSV"
        >
          CSVダウンロード
        </button>
      </div>
    </div>
    <hr class="my-8 border-t border-gray-300" />
    <!-- 水道料金説明ページへのリンク -->
    <div class="mt-12 mb-8 py-4 text-center">
      <a
        href="/charge"
        class="px-8 py-3 bg-main text-white rounded-lg shadow-md hover:bg-main-dark transition-colors font-medium"
        style="text-decoration: none"
      >
        水道料金の計算方法について詳しく知る →
      </a>
      <p class="mt-6 mb-8 text-sm text-gray-600">
        水道料金の仕組みについて解説しています。<br />
        水道料金がどのように計算されているのか知りたい方は上のボタンを押してみてください。
      </p>
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
      searchCity: '',
      searchedCityResult: null,
      searchTargetRank: null,
      isMobile: false,
      graphSearchCity: '',
      graphHighlightedCity: null,
      chartData: [],
      graphHighlightedCityFee: null,
      averageUsage: '20m3',
      averageRankingData: [],
      averageChartData: [],
      averageSortOrder: 'asc',
      averageGraphSearchPrefecture: '',
      averageGraphHighlightedPrefecture: null,
      averageGraphHighlightedFee: null,
      averageGraphHighlightedRank: null,
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

    sortedAverageRankingData() {
      if (this.averageSortOrder === 'asc') {
        return [...this.averageRankingData].sort(
          (a, b) => a.averageFee - b.averageFee
        )
      } else {
        return [...this.averageRankingData].sort(
          (a, b) => b.averageFee - a.averageFee
        )
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
    selectedGraphPrefecture() {
      // 都道府県が変わったら検索結果をリセット
      this.graphHighlightedCity = null
      this.graphHighlightedCityFee = null
      this.graphSearchCity = ''
      this.updateGraph()
    },
    selectedUsageFee() {
      // 使用量が変わったら、ハイライト自治体の料金も更新
      if (this.graphHighlightedCity) {
        const foundCity = this.waterRatesData.find(
          (data) =>
            data.prefecture === this.selectedGraphPrefecture &&
            data.municipality === this.graphHighlightedCity
        )
        if (foundCity) {
          this.graphHighlightedCityFee =
            foundCity.usage_fee[this.selectedUsageFee]
        }
      }
      this.updateGraph()
    },
    rankingUsage: 'updateRankingData',
    sortOrder() {
      // ソート順が変更されたときは計算プロパティが自動的に再計算される
    },
    activeTab(newTab) {
      if (newTab === 'ranking') {
        this.updateRankingData()
      } else if (newTab === 'graph') {
        this.updateGraph()
      } else if (newTab === 'averageRanking') {
        this.updateAverageRankingData()
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
      this.updateAverageRankingData()
      this.checkMobile()
    } catch (error) {
      this.$emit('error', 'データの読み込みに失敗しました')
    }
  },

  mounted() {
    window.addEventListener('resize', this.checkMobile)
    this.checkMobile()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
  },

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768
    },

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

      // データの並び替え（料金の降順）
      selectedData.sort((a, b) => {
        return (
          b.usage_fee[this.selectedUsageFee] -
          a.usage_fee[this.selectedUsageFee]
        )
      })

      // Google Chartsのためのデータ形式に変換
      const dataTable = [['自治体', '料金', { role: 'style' }]]

      // データを追加（ハイライト対象はオレンジ色に）
      selectedData.forEach((data) => {
        const color =
          data.municipality === this.graphHighlightedCity
            ? '#FF9800' // オレンジ
            : '#0E2997' // 青

        dataTable.push([
          data.municipality,
          data.usage_fee[this.selectedUsageFee],
          color,
        ])
      })

      this.chartData = dataTable
    },

    searchRankingCity() {
      const keyword = this.searchCity.trim()
      if (!keyword) {
        this.searchedCityResult = []
        this.searchTargetRank = null
        return
      }
      // ランキングデータを取得
      const data = this.sortedRankingData
      // 検索
      const idx = data.findIndex((item) => item.city.includes(keyword))
      if (idx === -1) {
        this.searchedCityResult = []
        this.searchTargetRank = null
        return
      }

      // 検索対象の順位を保存
      this.searchTargetRank = idx + 1

      // 前後2件を取得（計最大5件）
      const start = Math.max(0, idx - 2)
      const end = Math.min(data.length, idx + 3)
      this.searchedCityResult = data.slice(start, end).map((item, i) => ({
        ...item,
        rank: start + i + 1,
        isTarget: start + i === idx,
      }))
    },

    clearSearch() {
      this.searchCity = ''
      this.searchedCityResult = null
      this.searchTargetRank = null
    },

    searchGraphCity() {
      const keyword = this.graphSearchCity.trim()
      if (!keyword) {
        this.graphHighlightedCity = null
        this.updateGraph()
        return
      }

      // 現在選択中の都道府県の自治体を検索
      const selectedData = this.waterRatesData.filter(
        (data) => data.prefecture === this.selectedGraphPrefecture
      )

      // 検索
      const foundCity = selectedData.find((data) =>
        data.municipality.includes(keyword)
      )

      if (!foundCity) {
        alert('該当する自治体が見つかりませんでした')
        this.graphHighlightedCity = null
      } else {
        // 検索対象の自治体を保存
        this.graphHighlightedCity = foundCity.municipality
        this.graphHighlightedCityFee =
          foundCity.usage_fee[this.selectedUsageFee]
      }

      // グラフを更新
      this.updateGraph()
    },

    clearGraphSearch() {
      this.graphSearchCity = ''
      this.graphHighlightedCity = null
      this.graphHighlightedCityFee = null
      this.updateGraph()
    },

    updateAverageRankingData() {
      const averageData = this.waterRatesData.reduce((acc, data) => {
        if (!acc[data.prefecture]) {
          acc[data.prefecture] = { total: 0, count: 0 }
        }
        acc[data.prefecture].total += data.usage_fee[this.averageUsage]
        acc[data.prefecture].count += 1
        return acc
      }, {})

      this.averageRankingData = Object.entries(averageData).map(
        ([prefecture, { total, count }]) => ({
          prefecture,
          averageFee: total / count,
        })
      )

      if (this.averageSortOrder === 'asc') {
        this.averageRankingData.sort((a, b) => a.averageFee - b.averageFee)
      } else {
        this.averageRankingData.sort((a, b) => b.averageFee - a.averageFee)
      }

      this.averageChartData = [['都道府県', '平均料金', { role: 'style' }]]
      this.averageRankingData.forEach((data) => {
        this.averageChartData.push([
          data.prefecture,
          parseFloat(Number(data.averageFee).toFixed(1)),
          '#0E2997',
        ])
      })
    },

    searchAverageGraphPrefecture() {
      const keyword = this.averageGraphSearchPrefecture.trim()
      if (!keyword) {
        this.averageGraphHighlightedPrefecture = null
        this.averageGraphHighlightedFee = null
        this.averageGraphHighlightedRank = null
        this.updateAverageGraph()
        return
      }

      const foundIndex = this.sortedAverageRankingData.findIndex((data) =>
        data.prefecture.includes(keyword)
      )

      if (foundIndex === -1) {
        alert('該当する都道府県が見つかりませんでした')
        this.averageGraphHighlightedPrefecture = null
        this.averageGraphHighlightedFee = null
        this.averageGraphHighlightedRank = null
      } else {
        const foundPrefecture = this.sortedAverageRankingData[foundIndex]
        this.averageGraphHighlightedPrefecture = foundPrefecture.prefecture
        this.averageGraphHighlightedFee = foundPrefecture.averageFee
        this.averageGraphHighlightedRank = foundIndex + 1
      }

      this.updateAverageGraph()
    },

    clearAverageGraphSearch() {
      this.averageGraphSearchPrefecture = ''
      this.averageGraphHighlightedPrefecture = null
      this.averageGraphHighlightedFee = null
      this.averageGraphHighlightedRank = null
      this.updateAverageGraph()
    },

    updateAverageGraph() {
      this.averageChartData = [['都道府県', '平均料金', { role: 'style' }]]
      this.averageRankingData.forEach((data) => {
        const color =
          data.prefecture === this.averageGraphHighlightedPrefecture
            ? '#FF9800' // オレンジ
            : '#0E2997' // 青

        this.averageChartData.push([
          data.prefecture,
          parseFloat(Number(data.averageFee).toFixed(1)),
          color,
        ])
      })
    },

    downloadCSV() {
      const headers = ['順位', '都道府県', '平均水道料金']
      const rows = this.sortedAverageRankingData.map((item, index) => [
        `${index + 1}位`,
        item.prefecture,
        `${item.averageFee.toFixed(1)}円`,
      ])

      const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'average_water_fees.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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