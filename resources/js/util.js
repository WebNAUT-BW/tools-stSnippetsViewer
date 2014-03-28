$(function () {
	if (window.File) {
		// File APIに関する処理を記述
		document.getElementById("drop").addEventListener("drop", onDrop, false);
	} else {
		window.alert("本ブラウザではFile APIが使えません");
	}
});

// Drop領域にドロップした際のファイルのプロパティ情報読み取り処理
function onDrop(event) {
	var files = event.dataTransfer.files;

	for (var i = 0; i < files.length; i++) {
		var f = files[i];
		// ファイル名とサイズを表示
		//disp.innerHTML += "ファイル名 :" + f.name + "ファイルの型:" + f.type + "ファイルサイズ:" + f.size / 1000 + " KB " + "<br />";
		readText(f.name,files[i]);
	}
	event.preventDefault();
}

function onDragOver(event) {
	event.preventDefault();
}

function readText(name,input) {
	// File APIを利用できるかをチェック
	if (window.File) {

		// ファイル読み込みの準備
		var reader = new FileReader();

		// ファイルの読み込みに成功した後の処理
		reader.addEventListener('load', function(e) {
			//var fileContent = reader.result.replace(/(\n|\r)/g, '<br />');

			//ファイルの中身格納
			var fileContent = reader.result;

			//fileContent内の文字列処理：<content>の中身を取り出す、"<![CDATA["と"]]>"も合わせて削除
			var indexTagContent = fileContent.indexOf("<content>"); 
			var indexTagContentEnd = fileContent.indexOf("</content>"); 
			var txtContent = fileContent.substring(indexTagContent,indexTagContentEnd).replace("<![CDATA[", "").replace("]]>", "").replace("<content>", "").replace("</content>", "");

			//txtContentをそのまま出力するとタグとして生成されるので、ASCII文字に変換
			txtContent_length = txtContent.length;
			var txtContentAs = "";
			for(var i=0;i<txtContent_length;i++){
				txtContentAs = txtContentAs + "&" + "#" + txtContent.charCodeAt(i) + ";";
			}

			//fileContent内の文字列処理：<tabTrigger>の中身を取り出す
			var indexTabTrigger = fileContent.indexOf("<tabTrigger>"); 
			var indexTabTriggerEnd = fileContent.indexOf("</tabTrigger>"); 
			var txtTabTrigger = fileContent.substring(indexTabTrigger,indexTabTriggerEnd).replace("<tabTrigger>", "").replace("</tabTrigger>", "");

			//出力用HTMLの文字列を作成
			var outputName = '<td>' + name + '</td>';
			var outputContent = '<td><pre>' + txtContentAs + '</pre></td>';
			var outputTabTrigger = '<td>' + txtTabTrigger + '</td>';
			var outputAll = '<tr>' + outputName + outputContent + outputTabTrigger + '</tr>';

			//HTML出力
			$('#outputTable').append(outputAll);
		}, true);

		// ファイルの内容をテキストとして取得（3）
		reader.readAsText(input, 'UTF-8');
	}
}

