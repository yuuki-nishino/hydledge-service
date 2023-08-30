<template>
  <section class="purpose-img">
    <section class="purpose-rgb">
      <v-container>
        <v-row
          class="d-flex justify-center align-center text-center"
          align-content="center"
          style="height: 30vh"
        >
          <v-col cols="12" class="primary--text">
            <!-- <div class="text-h3 text-md-h2 font-weight-black mb-15">
              Purpose
            </div> -->
            <div class="text-h4 text-md-h2 mt-5 font-weight-bold">
              <p class="serif">
                「水のチカラで<br class="hidden-md-and-up" />
                現在から未来の<br />
                全ての人と地球を<br class="hidden-md-and-up" />
                健康にする」
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script scoped>
export default {
  name: 'PurposeSec',
  data: () => ({}),
  methods: {},
}
</script>

<style scoped>
.purpose-img {
  background-image: url('~@/assets/img/purpose_back.jpg');
  background-position: center;
  width: 100%;
  height: 30vh;
  background-size: 100%;
}

.purpose-rgb {
  background: rgba(255 255 255 / 70%);
  width: 100%;
  height: 30vh;
}

.serif {
  font-family: 'Noto Serif JP', serif;
}
</style>