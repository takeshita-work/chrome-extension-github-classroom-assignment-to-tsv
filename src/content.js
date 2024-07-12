// 日付文字列をフォーマットする関数
function formatDateString(dateString) {
    let date = new Date(dateString);

    // 9時間をミリ秒単位で追加
    date.setTime(date.getTime() + 9 * 60 * 60 * 1000);

    let year = date.getUTCFullYear();
    let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + date.getUTCDate()).slice(-2);
    let hours = ("0" + date.getUTCHours()).slice(-2);
    let minutes = ("0" + date.getUTCMinutes()).slice(-2);
    let seconds = ("0" + date.getUTCSeconds()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// ページのタイトルを取得
var title = document.querySelector('h1').textContent.trim();

// 課題リストの要素を取得
var assignments = document.getElementsByClassName('assignment-repo-list-item');

// CSVデータの配列を作成する
var csvData = [];

// 各課題をループで処理
for (let i = 0; i < assignments.length; i++) {
    // 学生名を取得
    let name = assignments[i].querySelector('.d-table .col-8 .d-flex .flex-column span.h5').textContent.trim();
    
    // 課題ラベルを取得
    let issueLabel = assignments[i].querySelector('.IssueLabel').textContent.trim();
    
    // リンクを全て取得
    let links = assignments[i].querySelectorAll('a');

    // GitHubアカウントリンクを取得 (1番目のリンク)
    let githubAccount = links[0].textContent.trim();

    // コミットリンクとコミット数を取得 (最後から2番目のリンク)
    let commitLink = links[links.length - 2].href;
    let commitCount = links[links.length - 2].textContent.trim().match(/\d+/)[0];

    // リポジトリリンクを取得 (最後のリンク)
    let repositoryLink = links[links.length - 1].href;

    // コミット日時要素を取得
    const commitDateElement = assignments[i].querySelector('relative-time');
    
    // コミット日時をフォーマットして取得
    let commitDate = "";
    if (commitDateElement) {
        commitDate = formatDateString(commitDateElement.getAttribute('datetime'));
    }

    // 取得した情報をCSVデータの配列に追加
    csvData.push([
        title,
        githubAccount,
        name,
        issueLabel,
        commitDate,
        commitCount,
        commitLink,
        repositoryLink
    ]);
}

// CSVデータの配列をCSV形式の文字列に変換
var csvContent = "";
csvData.forEach(function(rowArray) {
    let row = rowArray.join("\t");
    csvContent += row + "\r\n";
});

// デバッグ用のCSVデータとCSVコンテンツをコンソールに出力
console.log(csvData);

// popupに情報を送信
chrome.runtime.sendMessage({contentData: csvContent});
