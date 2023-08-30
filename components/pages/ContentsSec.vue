<template>
  <section class="contents-rgb">
    <v-container>
      <v-row class="d-flex justify-center align-center text-center">
        <v-col cols="12">
          <div class="text-h4 text-md-h3 font-weight-black my-2">Contents</div>
        </v-col>
      </v-row>
      <v-row
        class="d-flex justify-left flex-nowrap overflow-auto ml-0 mr-0"
        style="height: 100%"
      >
        <v-col v-for="item in items" :key="item.title" cols="12" sm="6" lg="3">
          <v-card class="mx-auto my-3" max-width="300">
            <v-img :src="item.img" height="280px"></v-img>

            <v-card-title> {{ item.title }} </v-card-title>

            <v-card-subtitle> {{ item.subtitle }} </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="primary lighten-2"
                text
                @click="getCreateUrl(item.link)"
              >
                ページへ移動
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="item.show = !item.show">
                <v-icon>{{
                  item.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.text }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<script scoped>
export default {
  name: 'ContentsSec',
  data() {
    return {
      items: [
        {
          title: '硬度',
          text: '日本の水は軟水と言われていますが、場所によって硬度に大きな差があります。Hydledgeのサイトでは、8000を超える地点での水道水の硬度データを用いて硬度の「可視化」を行っています。',
          subtitle: '日本の水道水の硬度データ',
          img: require('@/assets/img/contents/hardness.png'),
          link: '/hardness',
          description: 'ボタンの中身',
          show: false,
        },
        {
          title: '水道料金',
          text: '水道料金は地域によってどれだけ変わるのかご存じですか？どのように水道料金は決定しているのでしょうか。あなたのお住まいの地域は他の地域と比較してどれだけ料金が異なるのか確認してみてください。',
          subtitle: '日本内の水道料金を比較',
          img: require('@/assets/img/contents/charge.png'),
          link: '/charge',
          description: 'ボタンの中身',
          show: false,
        },
        {
          title: '今後公開予定',
          text: '硬度や水道料金以外のデータに関しても発信予定です。公開までお待ちください。',
          subtitle: 'Coming soon!',
          img: require('@/assets/img/contents/comingsoon.png'),
          link: '/',
          description: 'ボタンの中身',
          show: false,
        },
        // {
        //   title: 'CO2の排出量',
        //   text: 'テキス3トテキスト3テキスト3テキスト3テキスト3。',
        //   subtitle: 'TBA',
        //   img: '/images/image3',
        //   link: 'https://?????????',
        //   description: 'ボタンの中身',
        //   show: false,
        // },
        // {
        //   title: 'TBA',
        //   text: 'テキス3トテキスト3テキスト3テキスト3テキスト3。',
        //   subtitle: 'TBA',
        //   img: '/images/image3',
        //   link: 'https://?????????',
        //   description: 'ボタンの中身',
        //   show: false,
        // },
        // {
        //   title: 'TBA',
        //   text: 'テキス3トテキスト3テキスト3テキスト3テキスト3。',
        //   subtitle: 'TBA',
        //   img: '/images/image3',
        //   link: 'https://?????????',
        //   description: 'ボタンの中身',
        //   show: false,
        // },
      ],
    }
  },
  methods: {
    getCreateUrl(link) {
      location.href = `${link}`
    },
  },
}
</script>

<style scoped>
.contents-rgb {
  background: rgba(220 220 220);
  width: 100%;
}
</style>