<template>
  <div>
    <!-- <AboutSec /> -->
    <PurposeSec />
    <v-divider></v-divider>
    <MissionSec />
    <v-divider></v-divider>
    <ContentsSec />
    <v-divider></v-divider>
    <NewsSec />
  </div>
</template>

<script>
// import AboutSec from '~/components/pages/AboutSec.vue'
import PurposeSec from '~/components/pages/PurposeSec.vue'
import MissionSec from '~/components/pages/MissionSec.vue'
import ContentsSec from '~/components/pages/ContentsSec.vue'
import NewsSec from '~/components/pages/NewsSec.vue'

export default {
  name: 'TopPage',
  components: { PurposeSec, MissionSec, ContentsSec, NewsSec },
  data() {
    return {
      // breadcrumbs: [
      //   {
      //     name: 'トップページ',
      //     path: '/',
      //   },
      // ],
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          name: 'ホーム',
          path: '/',
        },
      ]
    },
  },
}
</script>
