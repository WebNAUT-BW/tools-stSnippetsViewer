$(function () {
	if (window.File) {
		// File APIに関する処理を記述
		//window.alert("File APIが実装されてます。");
		document.getElementById("drop").addEventListener("drop", onDrop, false);
	} else {
		window.alert("本ブラウザではFile APIが使えません");
	}
});

// Drop領域にドロップした際のファイルのプロパティ情報読み取り処理
function onDrop(event) {
	var files = event.dataTransfer.files;
	var disp = document.getElementById("disp");
	disp.innerHTML = "";

	for (var i = 0; i < files.length; i++) {
		var f = files[i];
		// ファイル名とサイズを表示
		//disp.innerHTML += "ファイル名 :" + f.name + "ファイルの型:" + f.type + "ファイルサイズ:" + f.size / 1000 + " KB " + "<br />";
		readText(f.name,files[i]);
		//readText(f.name,f.type);
	}
	event.preventDefault();
}

function onDragOver(event) {
	event.preventDefault();
}

function readText(name,input) {


    // File APIを利用できるかをチェック
    if (window.File) {
      // 指定されたファイルを取得
      //var input = document.querySelector('#file').files[0];
      // ファイル読み込みの準備（1）
      var reader = new FileReader();
      // ファイルの読み込みに成功したら、その内容を<div id="result">に反映（2）
      reader.addEventListener('load', function(e) {
        var output = reader.result.replace(/(\n|\r)/g, '<br />');


        var outputName = '<tr><td>' + name + '</td>';
        var outputContent = '<td>' + output + '</td><td></td></tr>';
        console.log('outputName=' + outputName);
        console.log('outputContent=' + outputContent);

        $('#outputTable').append(outputName + outputContent);
      }, true);
      // ファイルの内容をテキストとして取得（3）
      reader.readAsText(input, 'UTF-8');
    }


}

