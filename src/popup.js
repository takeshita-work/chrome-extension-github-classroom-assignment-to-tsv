// メッセージリスナーを事前に登録する
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // content.jsから送信されたデータを取得
    var dataFromContent = message.contentData;

    // 取得したデータを結果表示用のテキストエリアに表示
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = dataFromContent;
});

// ロードされたとき
document.addEventListener('DOMContentLoaded', function() {
    // 現在アクティブなタブを取得する
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // アクティブなタブでcontent.jsを実行する
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
});
