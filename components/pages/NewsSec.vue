<template>
  <section>
    <section class="news-rgb">
      <v-container>
        <v-row class="my-2" justify="center">
          <div class="text-h4 text-md-h3 mt-1 font-weight-bold text-center">
            <p>News</p>
          </div>
        </v-row>
        <v-row class="my-2" justify="center">
          <v-col cols="12" md="9">
            <v-card class="pa=10" max-height="300px">
              <ul>
                <li v-for="item in items" :key="item.sentence">
                  <a :href="item.link" target="_blank">
                    <span>{{ item.label }}</span>
                    <time :datetime="item.date">[ {{ item.date }} ]</time>
                    <br class="hidden-md-and-up" />
                    <p class="news-sentence overflow-wrap">
                      {{ item.sentence }}
                    </p>
                  </a>
                </li>
              </ul>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script scoped>
export default {
  name: 'NewsSec',
  data() {
    return {
      items: [
        {
          label: 'サイト',
          date: '2023-05-01',
          sentence: 'サイトを公開しました！',
        },
        {
          label: 'Note',
          date: '2023-04-27',
          sentence: 'Noteをアップロードしました。',
          link: 'https://note.com/',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>
.news-rgb {
  background: rgba(240 240 240);
  width: 100%;
}

li {
  border-bottom: 1px dotted #000;
  list-style: none;
  padding: 10px;
  width: 100%;
}

ul {
  max-height: 300px;
  overflow-y: scroll;
  overflow: scroll;
}

a {
  color: #000;
  text-decoration: none;
}

span {
  background-color: #2388b8;
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  margin-right: 20px;
  padding: 10px;
}

time {
  display: inline-block;
  font-weight: bold;
  margin-right: 40px;
}

.news-sentence {
  color: #1c448d;
  display: inline-block;
  text-decoration: underline;
}
</style>