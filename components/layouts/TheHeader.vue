<template>
  <v-card>
    <v-app-bar fixed dense height="70">
      <!-- <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(255,255,255,.99), rgba(255,255,255,.99)"
        ></v-img>
      </template> -->

      <v-toolbar-title
        class="text-h3 text-md-h2 font-weight-bold white--text mb-1"
        style="cursor: pointer"
        @click="returnTop"
      >
        <v-img :src="logo_src" max-width="250"></v-img>
        <!-- {{ Title }} -->
      </v-toolbar-title>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-tabs height="50%" hide-slider class="mt-10 hidden-sm-and-down">
        <v-tab v-for="item in items" :key="item.name">
          <v-btn
            v-if="!item.children"
            text
            class="primary--text"
            @click="getCreateUrl(item.link)"
          >
            <strong>{{ item.name }}</strong>
          </v-btn>
          <v-menu v-else offset-y>
            <template #activator="{ on, attrs }">
              <v-btn text class="primary--text" v-bind="attrs" v-on="on">
                <strong>{{ item.name }}</strong>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="child in item.children" :key="child.name">
                <v-list-item-title @click="getCreateUrl(child.link)">
                  {{ child.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tab>
      </v-tabs>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <!-- <template #extension>
        <v-tabs align-with-title hide-slider class="hidden-sm-and-down">
          <v-tab v-for="item in items" :key="item.name">
            <v-btn
              v-if="!item.children"
              text
              class="white--text"
              @click="getCreateUrl(item.link)"
            >
              <strong>{{ item.name }}</strong>
            </v-btn>
            <v-menu v-else offset-y>
              <template #activator="{ on, attrs }">
                <v-btn text class="white--text" v-bind="attrs" v-on="on">
                  <strong>{{ item.name }}</strong>
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="child in item.children"
                  :key="child.name"
                  link
                >
                  <v-list-item-title @click="getCreateUrl(child.link)">
                    {{ child.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      fixed
      temporary
      class="gradation"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item v-for="item in items" :key="item.name">
            <v-list-item-title
              v-if="!item.children"
              @click="getCreateUrl(item.link)"
            >
              <strong>{{ item.name }}</strong>
            </v-list-item-title>
            <v-menu v-else offset-y>
              <template #activator="{ on, attrs }">
                <v-list-item-title text v-bind="attrs" v-on="on">
                  <strong>{{ item.name }}</strong>
                  <v-icon>mdi-chevron-down</v-icon>
                </v-list-item-title>
              </template>
              <v-list>
                <v-list-item v-for="child in item.children" :key="child.name">
                  <v-list-item-title @click="getCreateUrl(child.link)">
                    {{ child.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-divider></v-divider>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script scoped>
export default {
  name: 'TheHeader',
  data: () => ({
    Title: 'Hydledge',
    logo_src: require('@/assets/img/logo_original.png'),
    image_src: require('@/assets/img/falling.jpeg'),
    isOpen: false,
    items: [
      { name: 'Home', link: '/' },
      {
        name: '硬度',
        link: '/hardness',
        children: [
          { name: '硬度の説明', link: '/hardness' },
          { name: '日本の硬度データ', link: '/hardness/data' },
          {
            name: '都道府県ごとの硬度データ',
            link: '/hardness/data/select_pref',
          },
        ],
      },
      {
        name: '水道料金',
        link: '/charge',
        children: [
          { name: '水道料金の説明', link: '/charge' },
          { name: '日本の水道料金データ', link: '/charge/data' },
          {
            name: '都道府県ごとの水道料金データ',
            link: '/charge/data/select_pref',
          },
        ],
      },
      // { name: '今後公開予定', link: '/' },
    ],
    drawer: false,
    group: null,
  }),

  // watch: {
  //   group() {
  //     this.drawer = false
  //   },
  // },

  methods: {
    returnTop() {
      this.$router.push('/')
    },
    moveHard() {
      this.$router.push('/hardness/')
    },
    getCreateUrl(link) {
      location.href = `${link}`
    },
    open() {
      this.isOpne = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
  text-decoration: none;
}

.v-toolbar__title:hover {
  opacity: 0.7;
}

.gradation {
  background: linear-gradient(to bottom, #0e2997, white);
  display: flex;
}
</style>

