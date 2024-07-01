// まずはランキング上位30曲の情報を取得
document.addEventListener('DOMContentLoaded', (event) => {
    const url = 'https://itunes.apple.com/jp/rss/topsongs/limit=30/json'; 
    fetch(url)
    // 曲のデータをアプリ内のどこでも使えるデータとしてJSON内に保持する
    .then(response => response.json())
        .then(data => {
        window.songData = data.feed.entry;
        })
});

// スタートボタンの処理
function playRandomSong() {

    // ランダムに変数つくって曲をピックアップ
    const randomIndex = Math.floor(Math.random() * window.songData.length);
    const randomSong = window.songData[randomIndex];
    window.randomSongData = songData[randomIndex]

    // 選択した曲のプレビューURLを取得
    const previewUrl = randomSong.link[1].attributes.href;

    // 曲を再生
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}

// ストップボタンの処理
function pauseSong(){
    $("#audio-player")[0].pause();
}

// ファイナルアンサーボタンの処理
function quizResult(){

    // ユーザーの回答を保持
    const userAnswer = $('#keyword').val()

    // 正解の定義
    const songTitle = randomSongData['im:name'].label;
    const artistName = randomSongData['im:artist'].label;
    const artworkUrl = randomSongData['im:image'][2].label; 
    console.log(songTitle);

    // 答え合わせ

    if (userAnswer === songTitle){
        $('#result').html('正解！')
    }else{
        $('#result').html('残念！正解は・・・')
    }

    // 正解発表
    document.getElementById('song-title').textContent = songTitle;
    document.getElementById('artist-name').textContent = artistName;
    document.getElementById('artwork').src = artworkUrl;

}

// リセットボタンの処理
function resetQuiz(){
    window.location.reload();
}