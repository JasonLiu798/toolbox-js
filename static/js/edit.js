

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

function editWord(opType,textRaw){
	if(!textRaw){
		return;
	}
	let callstr = opType+"(textRaw)";
	return eval(callstr);
}


