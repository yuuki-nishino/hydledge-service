<template>
  <section>
    <section class="mission-rgb">
      <v-container>
        <v-row justify="center">
          <div
            class="text-h4 text-md-h3 mt-1 font-weight-bold text-center white--text"
          >
            <p>- Our Missions -</p>
          </div>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12" md="6">
            <div
              class="text-h5 text-md-h4 font-weight-bold text-center white--text"
            >
              <p>
                ① <br />
                水に関する情報を発信
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div
              class="text-h5 text-md-h4 font-weight-bold text-center white--text"
            >
              <p>
                ② <br />
                水の価値をデータと<br />共に掘り起こす
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row class="my-2 mb-4" justify="center">
          <v-img
            :src="mission_img_src"
            max-width="55%"
            class="hidden-sm-and-down"
          >
          </v-img>
          <v-img
            :src="mission_img_src"
            max-width="90%"
            class="hidden-md-and-up"
          >
          </v-img>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script scoped>
export default {
  name: 'MissionSec',
  data() {
    return {
      mission_img_src: require('@/assets/img/mission.png'),
    }
  },
  methods: {},
}
</script>

<style scoped>
.mission-rgb {
  background: #5c9ee7;
  width: 100%;
}
</style>