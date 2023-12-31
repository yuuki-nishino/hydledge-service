import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.YOUR_GOOGLE_API_KEY,
        libraries: 'places',
    }
})