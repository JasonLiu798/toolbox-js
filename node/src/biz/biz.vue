<template>
<div>
	<time-stamp></time-stamp>
	<cqrs-ajax></cqrs-ajax>
</div>
</template>
<script>
import timeStamp from './timestamp.vue'
import cqrsAjax from '../srvtest/cqrsajax.vue';
export default {
	data(){
		return {
		}
	},
	mounted:function(){
	},
	methods: {
	},
	components: {
		timeStamp,cqrsAjax,
	},
}
</script>
