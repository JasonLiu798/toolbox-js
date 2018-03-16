<script>
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import global from './global/index';

// module.exports = new Vuex.Store({
//     modules: {
//         global,
//     }
// });

export default new Vuex.Store({
	modules: {
        global,
    }
});
</script>
