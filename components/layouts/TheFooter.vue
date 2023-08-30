<template>
  <v-footer padless color="blue lighten-5">
    <v-card flat tile width="100%" class="blue-grey lighten-4 text-center">
      <v-row class="my-2 py-3">
        <v-col cols="12" md="4">
          <v-row class="text-h2 my-2 py-3" justify="center">
            <!-- <strong><a class="primary--text">Hydledge</a></strong> -->
            <v-img :src="logo_src" max-width="200"></v-img>
          </v-row>
          <v-row class="text-h6 my-3" justify="center">
            <a href="mailto:info@hydledge.com">info@hydledge.com</a>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 mx-2"></v-divider>
        <v-divider class="hidden-md-and-up"></v-divider>
        <v-col cols="12" md="3">
          <v-row class="text-left my-2 py-3" justify="start">
            <ul style="list-style-type: none">
              <li v-for="item in items" :key="item.title">
                <v-icon>mdi-chevron-right</v-icon>
                <v-btn
                  color="black"
                  text
                  style="text-transform: none"
                  @click="getCreateUrl(item.link)"
                >
                  {{ item.title }}
                </v-btn>
              </li>
            </ul>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 mx-2"></v-divider>
        <v-divider class="hidden-md-and-up"></v-divider>
        <v-col cols="12" md="4">
          <v-row class="my-2 py-3 mx-2" justify="center" align="center">
            <div class="my-2">
              <v-btn
                x-large
                color="amber darken-3"
                dark
                href="mailto:info@hydledge.com"
                width="100%"
                style="text-transform: none"
              >
                <v-icon>mdi-email-outline</v-icon>
                <strong>&nbsp; お問い合わせはこちらから</strong>
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn
                x-large
                color="#41C9B4"
                dark
                href="https://note.com/hydledge"
                target="_blank"
                width="100%"
                style="text-transform: none"
              >
                <v-icon>mdi-note-outline</v-icon>
                <strong>&nbsp; Hydledge関連記事(Note)</strong>
              </v-btn>
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col class="py-4 text-center black--text" cols="12">
          &copy; {{ new Date().getFullYear() }} —
          <strong>Hydledge</strong>
          <v-btn
            v-for="s in sns"
            :key="s.icon"
            :href="s.link"
            class="mx-4 black--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">
              {{ s.icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>


<script scoped>
// import NoteLogo from '@/assets/img/note_logo.svg?inline'
export default {
  name: 'TheFooter',
  // components: { NoteLogo },

  data() {
    return {
      logo_src: require('@/assets/img/logo_original2.png'),
      sns: [
        {
          icon: 'mdi-facebook',
          link: 'https://www.facebook.com/profile.php?id=100091943935693',
        },
        { icon: 'mdi-twitter', link: 'https://twitter.com/Hydledge' },
        { icon: 'mdi-instagram', link: 'https://www.instagram.com/Hydledge/' },
      ],
      items: [
        { title: '硬度', link: '/hardness' },
        { title: '水道料金', link: '/charge' },
        // { title: 'CO2排出量', link: '/' },
        // { title: 'pH値', link: '/' },
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

<style lang="scss" scoped>
/* ul {
  padding-left: 0;
}

li {
  list-style: none;
} */
.iconSvg {
  svg {
    width: 80px;
    height: 50px;
  }
}
</style>