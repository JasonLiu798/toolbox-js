
var algorithms = [
    { name: "MD5", type: CryptoJS.algo.MD5 },
    { name: "SHA1", type: CryptoJS.algo.SHA1 },
    { name: "SHA256",  type: CryptoJS.algo.SHA256 },
    { name: "SHA512",  type: CryptoJS.algo.SHA512 },
    { name: "SHA3-224",  type: CryptoJS.algo.SHA3, param: { outputLength: 224 } },
    { name: "SHA3-256",  type: CryptoJS.algo.SHA3, param: { outputLength: 256 } },
    { name: "SHA3-384",  type: CryptoJS.algo.SHA3, param: { outputLength: 384 } },
    { name: "SHA3-512",  type: CryptoJS.algo.SHA3, param: { outputLength: 512 } },
    { name: "RIPEMD-160", type: CryptoJS.algo.RIPEMD160 }
];

/**
 * must new algorithm instance,the raw instance can't reuse,exist dirt data
 */
function getAlgorithms(){
    let enabledAlgorithms=[];
    for (var j = 0; j < algorithms.length; j++) {
        var current = algorithms[j];
        var algoInst = { name: current.name, instance: current.type.create(current.param) };
        enabledAlgorithms.push(algoInst);
    }
    return enabledAlgorithms;
}

/*
 * Horribly inefficient but unless I find another library or
 * (re)write stuff this is the way that just makes it work (TM).
 *
 * Note: Since CryptoJS 3.1 this functionality is in the framework.
 *       However it's currently slower than this juding from my tests.
 *       See CryptoJS components/lib-typedarrays.js
 */
function arrayBufferToWordArray(arrayBuffer) {
    var fullWords = Math.floor(arrayBuffer.byteLength / 4);
    var bytesLeft = arrayBuffer.byteLength % 4;

    var u32 = new Uint32Array(arrayBuffer, 0, fullWords);
    var u8 = new Uint8Array(arrayBuffer);

    var cp = [];
    for (var i = 0; i < fullWords; ++i) {
        cp.push(swapendian32(u32[i]));
    }

    if (bytesLeft) {
        var pad = 0;
        for (var i = bytesLeft; i > 0; --i) {
            pad = pad << 8;
            pad += u8[u8.byteLength - i];
        }

        for (var i = 0; i < 4 - bytesLeft; ++i) {
            pad = pad << 8;
        }
        cp.push(pad);
    }
    return CryptoJS.lib.WordArray.create(cp, arrayBuffer.byteLength);
}

/**
 * read file and calc crypts
 */
function progressiveRead(file, work, done) {
    var chunkSize = 20480; // 20KiB at a time
    var pos = 0;
    var reader = new FileReader();
    var enabledAlgorithms = getAlgorithms();
    var crc32intermediate=new Object;
    crc32intermediate.res = 0;
    function progressiveReadNext() {
        var end = Math.min(pos + chunkSize, file.size);
        reader.onload = function (e) {
            pos = end;
            work(enabledAlgorithms, e.target.result, pos, file,crc32intermediate);
            if (pos < file.size) {
                setTimeout(progressiveReadNext, 0);
            }
            else {
                // Done
                // done(file,crc32intermediate);
                done(enabledAlgorithms,crc32intermediate);
            }
        }

        if (file.slice) {
            var blob = file.slice(pos, end);
        }
        else if (file.webkitSlice) {
            var blob = file.webkitSlice(pos, end);
        }
        reader.readAsArrayBuffer(blob);
    }
    setTimeout(progressiveReadNext, 0);
};

function workerImpl(enabledAlgorithms,data, pos, file,crc32intermediate) {
    var wordArray = arrayBufferToWordArray(data);
    // debugger
    for (var j = 0; j < enabledAlgorithms.length ; j++) {
        enabledAlgorithms[j].instance.update(wordArray);
    }
    crc32intermediate.res = crc32(new Uint8Array(data), crc32intermediate.res);

}


    // Update progress display
    /*
    var progress = Math.floor((pos / file.size) * 100);
    if (progress > lastprogress) {
        var took = ((new Date).getTime() - start) / 1000;

        if (took > 0.1) // Only show progressbar after 100ms so it won't show for very small files
        $("#" + uid + " .progress").progressbar({ value: progress });

        $("#" + uid + " .progresstext").html('('
            + bytes2si2(pos, file.size, 2) + ' @ ' + bytes2si(pos / took, 2) + '/s )');

        lastprogress = progress;
    }
    */


        // results += '</table></div>';

        // results += '<span class="resulttaken">Time taken: ' + digits(took, 2) + 's @ ' + bytes2si(file.size / took, 2) + '/s</span><br />';

        // $("#" + uid).append(results);

        // $("#" + uid + " .progress")
        //     .hide('slow');

        // $("#" + uid)
        //     .css('background-color', '#F0FFF0');



/*
    function progressiveRead(file, instance,done) {
        var chunkSize = 20480; // 20KiB at a time
        var pos = 0;
        var reader = new FileReader();

        function progressiveReadNext() {
            var end = Math.min(pos + chunkSize, file.size);

            reader.onload = function (e) {
                pos = end;
                var wordArray = arrayBufferToWordArray(e.target.result);
                instance.update(wordArray);
                // worksha1(instance,e.target.result, pos, file);
                if (pos < file.size) {
                    setTimeout(progressiveReadNext, 0);
                }
                else {
                    // Done
                    done(instance);
                }
            }

            if (file.slice) {
                var blob = file.slice(pos, end);
            }
            else if (file.webkitSlice) {
                var blob = file.webkitSlice(pos, end);
            }
            reader.readAsArrayBuffer(blob);
        }

        setTimeout(progressiveReadNext, 0);
    };
    */

    // function worksha1(instance, data, pos, file) {
    //     // Work
    //     // if (enabledAlgorithms.length > 0) {
    //         // Easiest way to get this up and running ;-) Obvious optimization potential there.
    //     var wordArray = arrayBufferToWordArray(data);
    //     instance.update(wordArray);
    // }

        // }

        // for (var j = 0; j < enabledAlgorithms.length ; j++) {

        // }

        // if (doCRC32) crc32intermediate = crc32(new Uint8Array(data), crc32intermediate);

        // Update progress display
        /*
        var progress = Math.floor((pos / file.size) * 100);
        if (progress > lastprogress) {
            var took = ((new Date).getTime() - start) / 1000;

            // if (took > 0.1) // Only show progressbar after 100ms so it won't show for very small files
                // $("#" + uid + " .progress").progressbar({ value: progress });

            // $("#" + uid + " .progresstext").html('('
                // + bytes2si2(pos, file.size, 2) + ' @ ' + bytes2si(pos / took, 2) + '/s )');
            //
            // lastprogress = progress;
        }
        */

// progressiveRead(f,





