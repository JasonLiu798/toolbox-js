
//批量 ajax
for(var i=0;i<params.length;i++){
	$.ajax({
        type: "POST",
        url:'http://urls',
        contentType: "application/json;charset=utf-8",
        data: params[i],
        dataType: "json",
        crossDomain: true,
        xhrFields: { withCredentials: true },
        success: function (data) {
            console.log('res:succ '+ JSON.stringify(data));
            //JSON.stringify(JSON.parse(jsonRaw), null, 4)
            //this.ajaxReq.res = JSON.stringify(data,null, 4);
        }.bind(this),
        error: function (data) {
        	console.log('res: err '+JSON.stringify(data));
            //this.ajaxReq.res = data;
        }.bind(this)
    });
}


