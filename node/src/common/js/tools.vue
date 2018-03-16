<script>
import { Message } from 'element-ui';
export default {
	install(Vue, options) {

		function add0(m){return m<10?'0'+m:m }

		Vue.prototype.ts2date = function (ts) {
		    var time = new Date(ts*1000);
		    var y = time.getFullYear();
		    var m = time.getMonth()+1;
		    var d = time.getDate();
		    var h = time.getHours();
		    var mm = time.getMinutes();
		    var s = time.getSeconds();
		    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
		};

		Vue.prototype.datestr2ts = function(y,m,d,h,min,s) {
		    var date = y+'/' + m+'/'+d +' '+ h +':'+min +':'+s;
		    //console.log('date '+date);
		    //date = date.replace(/-/g,'/');
		    var ts = new Date(date).getTime()/1000;
		    //console.log('ts '+ts);
		    return ts;
		};

		//uni encode
		Vue.prototype.decToHex = function(str) {
		    let res=[];
		    for(let i=0;i < str.length;i++)
		        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
		    return "\\u"+res.join("\\u");
		}

		Vue.prototype.decimalToHexString = function (number) {
		    if (number < 0) {
		        number = 0xFFFFFFFF + number + 1;
		    }
		    return number.toString(16);
		}

		//uni decode
		Vue.prototype.hexToDec = function(str) {
		    str=str.replace(/\\/g,"%");
		    return unescape(str);
		}

		const HTTP = 'http://';

		Vue.prototype.httpExt = function() {
			var root = this
			function action(url, method, dat, opt) {
				var data = dat || {}
				var option = opt || {}
				option.params = option.params || {}
				if(method == 'get') {
					option.params = dat || {}
				}
				option.credentials =  true
				// var _URL = root.$store.state.global.url + url
				var _URL = HTTP + url
				var promise = new Promise(function(resolve, reject) {
					var req = null
					if(/^p/.test(method)) {
						req = root.$http[method](_URL, data, option)
					} else {
						req = root.$http[method](_URL, option)
					}
					var tmp = {}
					req.then((response) => {
						tmp = response.body
						if(typeof(tmp) == 'string') {
							try {
								tmp = JSON.parse(tmp)
							} catch(e) {
								console.log(e)
							} finally {

							}
						}
						if(!tmp.succ){
							return
						}
						resolve(tmp)

						/*
						if(tmp.succ.toLowerCase() == "ok") {
							resolve(tmp)
						}

						else if(tmp.succ.toLowerCase() == "jump"){
							if(tmp.result.redirect){
								window.location.href = tmp.result.redirect;
							}
						} else {
							reject(tmp)
						}*/
					}, (response) => {
						tmp.msg = '网络异常，请刷新页面或者联系系统管理员！';
						reject(tmp)
					})

				})
				return promise
			}
			return {
				put: function(url, data, option) {
					return action(url, 'put', data, option)
				},
				putForm: function(url, data, option) {
					var opt = option || {}
					opt.headers = {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
					opt.emulateJSON = true
					return action(url, 'put', data, opt)
				},
				post: function(url, data, option) {
					var opt = option || {}
					opt.headers = {
						'Content-Type': 'application/json; charset=UTF-8'
					}
					return action(url, 'post', data, option)
				},
				postJson: function(url, data, option) {
					return action(url, 'post', data, option)
				},
				postForm: function(url, data, option) {
					var opt = option || {}
					opt.headers = {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
					opt.emulateJSON = true
					return action(url, 'post', data, opt)
				},
				get: function(url, data, option) {
					var opt = option || {}
					opt.headers = {
						'Content-Type': 'application/json; charset=UTF-8'
					}
					return action(url, 'get', data, option)
				},
				delete: function(url, data, option) {
					return action(url, 'delete', data, option)
				}
			}
		};

	}//end of install
}//end of export
</script>
