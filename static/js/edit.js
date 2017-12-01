
/**
 * 去除空行
 */
function rmSpaceLine(textRaw){
	let res = new Array();
	let textLines = textRaw.split("\n");
	// console.log(textLines);
	for(let idx in textLines){
		let line = textLines[idx].trim();
		// console.log('line '+idx+','+line);
		if(line.length >0){
			res.push(line);
		}
	}
	let joined = res.join("\n");
	return joined;
}

/**
 * 去除java 注释
 */
function rmComment(textRaw){
	console.log('bf '+textRaw);
	if(textRaw && textRaw.length>0){
		// textRaw = textRaw.replace(/(?<!:)\/\/.*/g,'');//行注释
		reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
		// textRaw = textRaw.replace(/\/\*([^\*^\/]*|[\*^\/*]*|[^\**\/]*)*\*\//g,'');//块注释
		textRaw = textRaw.replace(reg, '');
	}
	console.log('after '+textRaw);
	return textRaw;
}


//数组乱序
function shuffle(arr){
	var len = arr.length;
	for(var i = 0; i < len - 1; i++){
		var idx = Math.floor(Math.random() * (len - i));
		var temp = arr[idx];
		arr[idx] = arr[len - i - 1];
		arr[len - i -1] = temp;
	}
	return arr;
}


/**
 * 乱序代码
 */
function derangement(textRaw){
	let splitRes = splitBySpaceLine(textRaw);

	let shufferBlocks = shuffle(splitRes.shufferBlocks);
	console.log('before shuffer blocks:'+JSON.stringify(shufferBlocks));
	console.log('before no shuffer blocks:'+JSON.stringify(splitRes.noShufferBlocks));

	//合并 无需乱序 代码块
	let mergedLines = new Array();
	let noShufferBlocks = splitRes.noShufferBlocks;
	if(noShufferBlocks ){
		for(let idx in noShufferBlocks){
			mergedLines = mergedLines.concat(noShufferBlocks[idx].lines);
			mergedLines.push("\n\n");
		}
	}
	mergedLines.push("\n\n");
	//合并 乱序的 代码块
	if(shufferBlocks){
		for(let idx in shufferBlocks){
			mergedLines = mergedLines.concat(shufferBlocks[idx].lines);
			mergedLines.push("\n\n");
		}
	}
	let res = '';
	for(let idx in mergedLines){
		res+=mergedLines[idx];//+"\n"+"\n";
	}

	res+="}\n";
	// console.log('after shuffer'+JSON.stringify(mergedLines));
	return res;
}


let NO_SHUFFER_PREFIX = new Array("package","import","public class");

/**
 * 按空行 分离连续行
 */
function splitBySpaceLine(textRaw){
	textRaw=textRaw.trim();
	let lastidx= textRaw.lastIndexOf("}");
	textRaw = textRaw.substring(0,lastidx);
	// textRaw = textRaw.substring(0,textRaw.length-1);
	console.log('after rm last:'+textRaw);
	let textLines = textRaw.split("\n");
	let tmpShufferBlocks = new Array();
	let tmpNoShufferBlocks = new Array();
	let tmpBlock = new Object();
	tmpBlock.lines = new Array();
	tmpBlock.canShuffer = true;
	for(let idx in textLines){
		let line = textLines[idx].trim();
		console.log('line '+idx+','+line);
		if(line.length >0){
			//非空行
			tmpBlock.lines.push(line+"\n");
			if( containExist(line,NO_SHUFFER_PREFIX)){
				tmpBlock.canShuffer = false;
			}
		}else{
			//空行
			if(tmpBlock.lines.length>0){
				if(tmpBlock.canShuffer){
					tmpShufferBlocks.push(tmpBlock);
				}else{
					tmpNoShufferBlocks.push(tmpBlock);
				}
				tmpBlock = new Object();
				tmpBlock.lines = new Array();
				tmpBlock.canShuffer = true;
			}else{
				//donothing
			}
		}
	}

	let res = new Object();
	res.shufferBlocks = tmpShufferBlocks;
	res.noShufferBlocks = tmpNoShufferBlocks;
	return res;
}




/**
 * 调度函数
 */
function editWord(opType,textRaw){
	if(!textRaw){
		return;
	}
	let callstr = opType+"(textRaw)";
	return eval(callstr);
}



// let txt='';
// console.log(rmComment(txt));















