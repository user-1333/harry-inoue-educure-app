const ele = document.getElementById("test");
console.log("JavaScriptファイルが読み込まれました");
ele.textContent = "JavaScriptファイルが読み込まれました";
fetch("http://192.168.80.120:8080/test/hello")
  .then(response => {
    if (!response.ok) {
      throw new Error("通信エラー");
    }
    return response.json(); // JSONとして取得
  })
  .then(data => {
    console.log("取得データ:", data);
    ele.textContent = data.message; // 取得したデータを表示
  })
  .catch(error => {
    console.error("エラー:", error);
    ele.textContent = error.message; // エラーメッセージを表示";
  });
