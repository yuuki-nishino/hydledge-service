<template>
  <div>
    <BreadCrumb :breadcrumbs="breadcrumbs" />
    <v-container fluid class="hard-intro">
      <section>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-row class="my-2">
              <div
                class="text-h4 text-md-h2 mx-2 my-3 font-weight-bold primary--text"
              >
                硬度について
              </div>
            </v-row>
            <v-divider></v-divider>
            <v-row class="my-2">
              <v-col cols="12" md="5">
                <h1>はじめに</h1>
              </v-col>
            </v-row>
            <v-row class="my-2 mx-3">
              <div>
                水道水の硬度は場所によって異なることをご存知ですか？
                欧米と日本の水の硬度が異なることは、多くの方が知っているかも知れません。<br />
                実は、日本国内でも地域によって硬度が異なります。日本の水道水は平均的には軟水ですが、硬水の地域も存在します。<br />
                このサイトでは、全国の水道水の硬度を浄水場における水質検査ごとに表示し、
                都道府県の平均硬度や検査地点ごとの硬度をランキングやマッピング、グラフなどで表示しています。<br />
                なお、硬度ランキングの上位や下位が良い悪いを意味するわけではありません。<br /><br /><br /><br />
              </div>
              <div>
                ここからは硬度の基本的な説明となります。<br /><br />
                <strong
                  >硬度についてすでに詳しい方・今すぐにデータを見たい方</strong
                ><br />
                →
                <v-btn text color="primary" @click="moveData()">
                  <strong>日本全体の硬度データ</strong>
                </v-btn>
                ｜
                <v-btn text color="primary" @click="moveDataPref()">
                  <strong>都道府県ごとの硬度データ</strong> </v-btn
                ><br /><br />
                <strong>硬度とは何か知りたい方</strong><br />
                →&nbsp;&nbsp;<font color="primary"
                  ><strong
                    >そのままスクロールして読み進めてください。</strong
                  ></font
                >
                <br />
              </div>
            </v-row>
            <v-divider></v-divider>
            <v-row class="mt-2">
              <v-col cols="12" md="5">
                <h1>目次</h1>
              </v-col>
            </v-row>
            <v-row class="mb-5">
              <v-col cols="12" md="10" class="ml-10">
                <ul color="rgba(242 242 242)" class="normal-list">
                  <li>
                    <nuxt-link v-scroll-to="'#what'" to> 硬度とは？ </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link v-scroll-to="'#criterion'" to>
                      水道水における基準
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link v-scroll-to="'#feature'" to>
                      硬度の違いによる特徴
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link v-scroll-to="'#howto'" to>
                      硬度データの見方
                    </nuxt-link>
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row id="what" class="my-2">
              <v-col cols="12" md="5">
                <h1>硬度とは？</h1>
              </v-col>
            </v-row>
            <v-row class="my-2 mx-3">
              <div>
                硬度は水の中の<b>カルシウム</b>と<b>マグネシウム</b>の含有量の指標です。<br />
                カルシウムとマグネシウムの量を炭酸カルシウム量（CaCo3）に換算した値で、以下の計算式で算出します。
                <br />
                <br />
              </div>
              <center>
                <strong>
                  <font size="3">
                    硬度 (mg/L) ＝カルシウム濃度 (mg/L)×2.5 + マグネシウム濃度
                    (mg/L)×4.1
                  </font>
                </strong>
              </center>
              <div>
                <br />
                <br />
                硬度が低い水を<b>「軟水」</b>、硬度が高い水を<b>「硬水」</b>といい、
                <!-- <a
                  href="https://apps.who.int/iris/bitstream/handle/10665/70168/WHO_HSE_WSH_10.01_10_Rev1_eng.pdf"
                  target="_blank"
                >
                  WHOの基準
                </a> -->
                <a
                  href="https://ja.wikipedia.org/wiki/%E7%A1%AC%E5%BA%A6_(%E6%B0%B4)"
                  target="_blank"
                >
                  WHOの基準
                </a>
                では以下のように分類されています。 <br /><br />
              </div>
              <v-col cols="11" md="5" class="mr-10">
                <ul class="box-ul">
                  <li>0〜60mg/L未満：<strong>軟水</strong></li>
                  <li>60〜120mg/L未満：<strong>中程度の硬水</strong></li>
                  <li>120〜180mg/L未満：<strong>硬水</strong></li>
                  <li>180mg/L以上：<strong>非常な硬水</strong></li>
                </ul>
                <br />
              </v-col>
              <v-col cols="12" md="5">
                <v-img :src="hard_img_src"></v-img>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row id="criterion" class="my-2">
              <v-col cols="12" md="5">
                <h1>水道水における基準</h1>
              </v-col>
            </v-row>

            <v-row class="my-2 mx-3">
              <v-col cols="12">
                <div>
                  水道水は、<a
                    href="https://elaws.e-gov.go.jp/document?lawid=332AC0000000177#Mp-At_4"
                    target="_blank"
                    >水道法第４条</a
                  >の規定に基づき、「水質基準に関する省令」（<a
                    href="https://www.mhlw.go.jp/topics/bukyoku/kenkou/suido/kijun/seido.html"
                    target="_blank"
                    >平成15年5月30日厚生労働省令第101号</a
                  >）で定められた水質基準に適合することが必要です。
                  この水質基準は、51項目が定められており、硬度（カルシウム、マグネシウムなど）は次のように定められています。<br />
                  （参考：<a
                    href="https://www.mhlw.go.jp/topics/bukyoku/kenkou/suido/kijun/dl/k34.pdf"
                    target="_blank"
                    >硬度の水質基準値</a
                  >）
                </div>
                <v-col cols="12">
                  <ul class="box-ul">
                    <li>水質基準値(mg/L)：<strong>300以下</strong></li>
                    <li>快適水質項目目標値(mg/L)：<strong>10~100</strong></li>
                    <li>
                      おいしい水の水質要件(mg/L)：<strong>10~100</strong>（昭和60年厚生省（当時）おいしい水研究会検討結果）
                    </li>
                  </ul>
                  <br />
                </v-col>
                <div>
                  基準値である300mg/Lは、石鹸の泡立ちなどへの影響を防止する観点から設定されています。一方、「おいしい水」の観点からは、10~100mg/Lが快適水質項目の目標値として設定されています。<br />
                  ただし、おいしい水の調査結果が昭和60年ということなので、現在は時代の変化とともに多少変化しているかもしれませんね。<br />
                  また、おいしい水の観点では、東京都は国の基準とは別に独自の厳しい基準を設けて管理しているようです。<br /><br />
                  参考：<a
                    href="https://www.waterworks.metro.tokyo.lg.jp/suigen/s_mokuhyo.html"
                    target="_blank"
                    >おいしさに関する水質目標(東京都水道局)</a
                  >
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row id="feature" class="my-2">
              <v-col cols="12" md="5">
                <h1>硬度の違いによる特徴</h1>
              </v-col>
            </v-row>
            <v-row class="my-2 mx-3">
              <v-col cols="12">
                <div>
                  <font color="#0E2997"
                    ><strong
                      >硬度の違いはどうして起こるのでしょうか？</strong
                    ></font
                  ><br /><br />
                  一般的には、その水が通ってくる<b>地層</b>に影響を受けると言われています。<br />
                  硬水が採水される地域では、ミネラル成分を豊富に含んだ<b>水成岩</b>を通るため、
                  ミネラル成分を含んだ<b>硬水</b>となります。<br />
                  一方、日本のように<b>軟水</b>が多い地域では、マグマが冷え固まってできる<b>火成岩</b>が多い地質のため、
                  カルシウムやマグネシウムをほとんど含まない軟水となります。<br /><br />

                  また、地形的な要因でも硬度に違いが出ることがあります。
                  例えば、<b>なだらか</b>な地形では水がゆっくり流れ地層に滞在する時間が長くなるため、
                  ミネラル成分をより多く含んだ硬水となりやすい傾向にあります。
                  一方、日本のように<b>急峻な地形</b>が多い地域では、水が地層に滞在する時間が少なく、
                  ミネラル成分を吸収する機会が少ないため、<b>軟水</b>になりやすい傾向があります。<br /><br />

                  <b>地層や地形</b>とその地域の水の硬度の関係を調べると、
                  硬度の違いの要因に触れることができるかもしれませんね。<br /><br /><br />

                  <font color="#0E2997"
                    ><strong
                      >硬度の違いによる特徴は以下のようなことがあげられます。</strong
                    ></font
                  ><br /><br />
                  <v-row justify="center" class="my-1">
                    <v-col cols="12" md="5" class="mr-10">
                      <h3 class="primary--text">軟水の特徴</h3>
                      <ul class="box-ul">
                        <li>ミネラルが少ないため味にクセがなく飲みやすい</li>
                        <li>約100mg/L 以下では配水管の腐食性を高める</li>
                      </ul>
                    </v-col>
                    <v-col cols="12" md="5" class="mr-10">
                      <h3 class="primary--text">硬水の特徴</h3>
                      <ul class="box-ul">
                        <li>ミネラル補給に適している</li>
                        <li>石けんの泡立ちが悪い</li>
                        <li>
                          スケール（水中のミネラル分が白く固まったもの）が付着する可能性が高くなる
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                  <div>
                    軟水と硬水のどちらが優れているかは、その用途によって異なりますが、
                    水道水から出てくる水の硬度が違うと<b>「少なからず生活に影響しそうだ」</b>ということは言えそうですね。<br /><br />
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row id="howto" class="my-2">
              <v-col cols="12" md="5">
                <h1>硬度データの見方</h1>
              </v-col>
            </v-row>

            <v-row class="my-2 mx-3">
              <v-col cols="12">
                <div>
                  本サイトで調べられる硬度データには、次のようなものがあります。<br />
                </div>
                <v-list color="rgba(242 242 242)">
                  <li>浄水場毎の硬度（8225件）</li>
                  <li>各都道府県の平均硬度</li>
                  <li>都道府県の平均硬度ランキング</li>
                  <li>硬度が高い採水地点ランキング</li>
                  <li>都道府県の事業主体ごとの平均硬度</li>
                  <li>硬度区分マップ</li>
                </v-list>
                <div>
                  サイト内のデータの詳しい見方は以下の画像を参考にしてみてください。
                </div>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-icon color="#0E2997">mdi-circle</v-icon>
              <h2><font color="#0E2997">日本全体の硬度データ</font></h2>
              <v-col cols="12">
                <v-img
                  :src="outlook_japan_pc_src"
                  class="hidden-sm-and-down"
                ></v-img>
                <v-img
                  :src="outlook_japan_sp_src"
                  class="hidden-md-and-up"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="mx-3 mb-5" justify="center">
              <div>
                <v-btn
                  x-large
                  color="#0E2997"
                  dark
                  width="100%"
                  style="text-transform: none"
                  @click="moveData()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                  <strong>&nbsp;日本全体の硬度データを見てみよう！</strong>
                </v-btn>
              </div>
            </v-row>
            <v-row class="mt-10" justify="center">
              <v-icon color="#0E2997">mdi-circle</v-icon>
              <h2><font color="#0E2997">都道府県ごとの詳細データ</font></h2>
              <v-col cols="12">
                <v-img :src="outlook_pref"></v-img>
              </v-col>
            </v-row>
            <v-row class="mx-3 mb-5" justify="center">
              <div>
                <v-btn
                  x-large
                  color="#0E2997"
                  dark
                  width="100%"
                  style="text-transform: none"
                  @click="moveDataPref()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                  <strong>&nbsp;都道府県ごとの硬度データを見てみよう！</strong>
                </v-btn>
              </div>
            </v-row>
            <v-row class="my-3 mx-3">
              <div>
                <br />
                ※本サイトで使用する水質データは（公社）日本水道協会
                <a
                  href="http://www.jwwa.or.jp/mizu/ent_up.html"
                  target="_blank"
                >
                  「水道水質データベース 2018年給水栓水（平均値)」
                </a>
                を利用しています。<br /><br />

                また、都道府県の平均硬度は各検査地点の配水量を考慮して、
                （硬度）×（配水量）÷（都道府県総配水量） で算出しています。
              </div>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script scoped>
import BreadCrumb from '~/components/atoms/BreadCrumb.vue'

export default {
  name: 'HardnessHome',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      // JapanData: JapanData,
      hard_img_src: require('@/assets/img/hard_img.jpg'),
      outlook_japan_pc_src: require('@/assets/img/outlook/japan_pc.png'),
      outlook_japan_sp_src: require('@/assets/img/outlook/japan_sp.png'),
      outlook_pref: require('@/assets/img/outlook/pref.png'),
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
        },
      ]
    },
  },
  methods: {
    moveData() {
      this.$router.push('/hardness/data/')
    },
    moveDataPref() {
      this.$router.push('/hardness/data/select_pref')
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

h1 {
  position: relative;
  background: #f1f8ff;
  padding: 0.25em 0.5em;
  border-left: solid 2em #5c9ee7;
  width: 100%;
}

h1::before {
  content: url('@/assets/img/icon/water-check.png');
  position: absolute;
  color: white;
  left: -1.8em;
  top: 60%;
  transform: translateY(-50%);
}

.box-ul {
  color: #0e2997;
  border: dashed 2px #668ad8;
  background: #f1f8ff;
  padding: 0.5em 0.5em 0.5em 2em;
  width: 110%;
}

.box-ul li {
  line-height: 1.5;
  padding: 0.5em 0;
}
</style>