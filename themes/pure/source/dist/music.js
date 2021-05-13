var headUrl = 'https://music-source-1257950067.cos.ap-nanjing.myqcloud.com/'
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: false,
    loop: 'all',//音频循环播放, 可选值: 'all'全部循环, 'one'单曲循环, 'none'不循环
    order: 'random', //音频循环顺序, 可选值: 'list'列表循环, 'random'随机循环
    preload: 'none', //预加载，可选值: 'none', 'metadata', 'auto'
    volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    listFolded: false,//列表默认折叠
    listMaxHeight: 60,//列表最大高度
    //fixed: true,//吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
    lrcType: 3,//歌词传递方式
    audio: [
        {
            name: '天空之城',
            artist: '木吉他俱乐部',
            url: headUrl + '%E6%9C%A8%E5%90%89%E4%BB%96%E4%BF%B1%E4%B9%90%E9%83%A8%20-%20%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.mp3',
            lrc: headUrl + '%E6%9C%A8%E5%90%89%E4%BB%96%E4%BF%B1%E4%B9%90%E9%83%A8%20-%20%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.lrc',
            cover: headUrl + '%E6%9C%A8%E5%90%89%E4%BB%96%E4%BF%B1%E4%B9%90%E9%83%A8%20-%20%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.jpg',
        },{
            name: '故梦',
            artist: '墨明棋妙',
            url: headUrl + '%E5%A2%A8%E6%98%8E%E6%A3%8B%E5%A6%99%20-%20%E6%95%85%E6%A2%A6.mp3',
            lrc: headUrl + '%E5%A2%A8%E6%98%8E%E6%A3%8B%E5%A6%99%20-%20%E6%95%85%E6%A2%A6.lrc',
            cover: headUrl + '%E5%A2%A8%E6%98%8E%E6%A3%8B%E5%A6%99%20-%20%E6%95%85%E6%A2%A6.jpg',
        },{
            name: '故梦',
            artist: '双笙',
            url: headUrl + '%E5%8F%8C%E7%AC%99%20-%20%E6%95%85%E6%A2%A6.mp3',
            lrc: headUrl + '%E5%8F%8C%E7%AC%99%20-%20%E6%95%85%E6%A2%A6.lrc',
            cover: headUrl + '%E5%8F%8C%E7%AC%99%20-%20%E6%95%85%E6%A2%A6.jpg',
        },{
            name: '划破气流的人',
            artist: '路壹Lu1',
            url: headUrl + '%E8%B7%AF%E5%A3%B9Lu1%20-%20%E5%88%92%E7%A0%B4%E6%B0%94%E6%B5%81%E7%9A%84%E4%BA%BA.mp3',
            lrc: headUrl + '%E8%B7%AF%E5%A3%B9Lu1%20-%20%E5%88%92%E7%A0%B4%E6%B0%94%E6%B5%81%E7%9A%84%E4%BA%BA.lrc',
            cover: headUrl + '%E8%B7%AF%E5%A3%B9Lu1%20-%20%E5%88%92%E7%A0%B4%E6%B0%94%E6%B5%81%E7%9A%84%E4%BA%BA.jpg',
        },{
            name: '爱你一万年',
            artist: '刘德华',
            url: headUrl + '%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E7%88%B1%E4%BD%A0%E4%B8%80%E4%B8%87%E5%B9%B4.mp3',
            lrc: headUrl + '%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E7%88%B1%E4%BD%A0%E4%B8%80%E4%B8%87%E5%B9%B4.lrc',
            cover: headUrl + '%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E7%88%B1%E4%BD%A0%E4%B8%80%E4%B8%87%E5%B9%B4.jpg',
        },{
            name: '无间道',
            artist: '梁朝伟 & 刘德华',
            url: headUrl + '%E6%A2%81%E6%9C%9D%E4%BC%9F%20_%20%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E6%97%A0%E9%97%B4%E9%81%93.mp3',
            lrc: headUrl + '%E6%A2%81%E6%9C%9D%E4%BC%9F%20_%20%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E6%97%A0%E9%97%B4%E9%81%93.lrc',
            cover: headUrl + '%E6%A2%81%E6%9C%9D%E4%BC%9F%20_%20%E5%88%98%E5%BE%B7%E5%8D%8E%20-%20%E6%97%A0%E9%97%B4%E9%81%93.jpg',
        },{
            name: '华阴老腔一声喊 (Live)',
            artist: '谭维维 & 张喜民',
            url: headUrl + '%E8%B0%AD%E7%BB%B4%E7%BB%B4%20_%20%E5%BC%A0%E5%96%9C%E6%B0%91%20-%20%E5%8D%8E%E9%98%B4%E8%80%81%E8%85%94%E4%B8%80%E5%A3%B0%E5%96%8A%20(Live).mp3',
            lrc: headUrl + '%E8%B0%AD%E7%BB%B4%E7%BB%B4%20_%20%E5%BC%A0%E5%96%9C%E6%B0%91%20-%20%E5%8D%8E%E9%98%B4%E8%80%81%E8%85%94%E4%B8%80%E5%A3%B0%E5%96%8A%20(Live).lrc',
            cover: headUrl + '%E8%B0%AD%E7%BB%B4%E7%BB%B4%20_%20%E5%BC%A0%E5%96%9C%E6%B0%91%20-%20%E5%8D%8E%E9%98%B4%E8%80%81%E8%85%94%E4%B8%80%E5%A3%B0%E5%96%8A%20(Live).jpg',
        },{
            name: 'Rolling in the Deep (Explicit)',
            artist: 'Adele',
            url: headUrl + 'Adele%20-%20Rolling%20in%20the%20Deep%20(Explicit).mp3',
            lrc: headUrl + 'Adele%20-%20Rolling%20in%20the%20Deep%20(Explicit).lrc',
            cover: headUrl + 'Adele%20-%20Rolling%20in%20the%20Deep%20(Explicit).jpg',
        },{
            name: 'Havana',
            artist: 'Camila Cabello & Young Thug',
            url: headUrl + 'Camila%20Cabello%20_%20Young%20Thug%20-%20Havana.mp3',
            lrc: headUrl + 'Camila%20Cabello%20_%20Young%20Thug%20-%20Havana.lrc',
            cover: headUrl + 'Camila%20Cabello%20_%20Young%20Thug%20-%20Havana.jpg',
        },{
            name: 'Handmade Heaven',
            artist: 'MARINA',
            url: headUrl + 'MARINA%20-%20Handmade%20Heaven.mp3',
            lrc: headUrl + 'MARINA%20-%20Handmade%20Heaven.lrc',
            cover: headUrl + 'MARINA%20-%20Handmade%20Heaven.jpg',
        },{
            name: 'Party Hit Kings - I Knew You Were Trouble',
            artist: 'Taylor Swift',
            url: headUrl + 'Party%20Hit%20Kings%20-%20I%20Knew%20You%20Were%20Trouble.mp3',
            lrc: headUrl + 'Party%20Hit%20Kings%20-%20I%20Knew%20You%20Were%20Trouble.lrc',
            cover: headUrl + 'Party%20Hit%20Kings%20-%20I%20Knew%20You%20Were%20Trouble.jpg',
        },{
            name: '卜卦',
            artist: '崔子格',
            url: headUrl + '%E5%B4%94%E5%AD%90%E6%A0%BC%20-%20%E5%8D%9C%E5%8D%A6.mp3',
            lrc: headUrl + '%E5%B4%94%E5%AD%90%E6%A0%BC%20-%20%E5%8D%9C%E5%8D%A6.lrc',
            cover: headUrl + '%E5%B4%94%E5%AD%90%E6%A0%BC%20-%20%E5%8D%9C%E5%8D%A6.jpg',
        },{
            name: '静悄悄',
            artist: '仇志',
            url: headUrl + '%E4%BB%87%E5%BF%97%20-%20%E9%9D%99%E6%82%84%E6%82%84.mp3',
            lrc: headUrl + '%E4%BB%87%E5%BF%97%20-%20%E9%9D%99%E6%82%84%E6%82%84.lrc',
            cover: headUrl + '%E4%BB%87%E5%BF%97%20-%20%E9%9D%99%E6%82%84%E6%82%84.jpg',
        },{
            name: '关于孤独我想说的话(Live)',
            artist: '曹阳',
            url: headUrl + '%E6%9B%B9%E9%98%B3%20-%20%E5%85%B3%E4%BA%8E%E5%AD%A4%E7%8B%AC%E6%88%91%E6%83%B3%E8%AF%B4%E7%9A%84%E8%AF%9D(Live).mp3',
            lrc: headUrl + '%E6%9B%B9%E9%98%B3%20-%20%E5%85%B3%E4%BA%8E%E5%AD%A4%E7%8B%AC%E6%88%91%E6%83%B3%E8%AF%B4%E7%9A%84%E8%AF%9D(Live).lrc',
            cover: headUrl + '%E6%9B%B9%E9%98%B3%20-%20%E5%85%B3%E4%BA%8E%E5%AD%A4%E7%8B%AC%E6%88%91%E6%83%B3%E8%AF%B4%E7%9A%84%E8%AF%9D(Live).jpg',
        },{
            name: '飘向北方(Live)',
            artist: '那吾克热&尤长靖',
            url: headUrl + '%E9%A3%98%E5%90%91%E5%8C%97%E6%96%B9(Live)%20-%20%E9%82%A3%E5%90%BE%E5%85%8B%E7%83%AD%26%E5%B0%A4%E9%95%BF%E9%9D%96.mp3',
            lrc: headUrl + '%E9%A3%98%E5%90%91%E5%8C%97%E6%96%B9(Live)%20-%20%E9%82%A3%E5%90%BE%E5%85%8B%E7%83%AD%26%E5%B0%A4%E9%95%BF%E9%9D%96.lrc',
            cover: headUrl + '%E9%A3%98%E5%90%91%E5%8C%97%E6%96%B9(Live)%20-%20%E9%82%A3%E5%90%BE%E5%85%8B%E7%83%AD%26%E5%B0%A4%E9%95%BF%E9%9D%96.jpg',
        },{
            name: '時の過ぎゆくままに',
            artist: '沢田研二 (さわだ けんじ)',
            url: headUrl + '%E6%B2%A2%E7%94%B0%E7%A0%94%E4%BA%8C%20(%E3%81%95%E3%82%8F%E3%81%9F%E3%82%99%20%E3%81%91%E3%82%93%E3%81%97%E3%82%99)%20-%20%E6%99%82%E3%81%AE%E9%81%8E%E3%81%8D%E3%82%99%E3%82%86%E3%81%8F%E3%81%BE%E3%81%BE%E3%81%AB.mp3',
            lrc: headUrl + '%E6%B2%A2%E7%94%B0%E7%A0%94%E4%BA%8C%20(%E3%81%95%E3%82%8F%E3%81%9F%E3%82%99%20%E3%81%91%E3%82%93%E3%81%97%E3%82%99)%20-%20%E6%99%82%E3%81%AE%E9%81%8E%E3%81%8D%E3%82%99%E3%82%86%E3%81%8F%E3%81%BE%E3%81%BE%E3%81%AB.lrc',
            cover: headUrl + '%E6%B2%A2%E7%94%B0%E7%A0%94%E4%BA%8C%20(%E3%81%95%E3%82%8F%E3%81%9F%E3%82%99%20%E3%81%91%E3%82%93%E3%81%97%E3%82%99)%20-%20%E6%99%82%E3%81%AE%E9%81%8E%E3%81%8D%E3%82%99%E3%82%86%E3%81%8F%E3%81%BE%E3%81%BE%E3%81%AB.jpg',
        },{
            name: '把耳朵叫醒',
            artist: '金海心',
            url: headUrl + '%E9%87%91%E6%B5%B7%E5%BF%83%20-%20%E6%8A%8A%E8%80%B3%E6%9C%B5%E5%8F%AB%E9%86%92.mp3',
            lrc: headUrl + '%E9%87%91%E6%B5%B7%E5%BF%83%20-%20%E6%8A%8A%E8%80%B3%E6%9C%B5%E5%8F%AB%E9%86%92.lrc',
            cover: headUrl + '%E9%87%91%E6%B5%B7%E5%BF%83%20-%20%E6%8A%8A%E8%80%B3%E6%9C%B5%E5%8F%AB%E9%86%92.jpg',
        },{
            name: 'Same Friends',
            artist: 'Sam Fischer',
            url: headUrl + 'Sam%20Fischer%20-%20Same%20Friends.mp3',
            lrc: headUrl + 'Sam%20Fischer%20-%20Same%20Friends.lrc',
            cover: headUrl + 'Sam%20Fischer%20-%20Same%20Friends.jpg',
        },{
            name: 'Take Me to Church',
            artist: 'Hozier',
            url: headUrl + 'Hozier%20-%20Take%20Me%20to%20Church.mp3',
            lrc: headUrl + 'Hozier%20-%20Take%20Me%20to%20Church.lrc',
            cover: headUrl + 'Hozier%20-%20Take%20Me%20to%20Church.jpg',
        },{
            name: 'Thêm Một Lần Đau',
            artist: 'HKT',
            url: headUrl + 'HKT%20-%20The%CC%82m%20Mo%CC%A3%CC%82t%20La%CC%82%CC%80n%20%C4%90au.mp3',
            lrc: headUrl + 'HKT%20-%20The%CC%82m%20Mo%CC%A3%CC%82t%20La%CC%82%CC%80n%20%C4%90au.lrc',
            cover: headUrl + 'HKT%20-%20The%CC%82m%20Mo%CC%A3%CC%82t%20La%CC%82%CC%80n%20%C4%90au.jpg',
        },{
            name: '关山月',
            artist: '周云蓬',
            url: headUrl + '%E5%91%A8%E4%BA%91%E8%93%AC%20-%20%E5%85%B3%E5%B1%B1%E6%9C%88.mp3',
            lrc: headUrl + '%E5%91%A8%E4%BA%91%E8%93%AC%20-%20%E5%85%B3%E5%B1%B1%E6%9C%88.lrc',
            cover: headUrl + '%E5%91%A8%E4%BA%91%E8%93%AC%20-%20%E5%85%B3%E5%B1%B1%E6%9C%88.jpg',
        },{
            name: '千年缘',
            artist: '心然',
            url: headUrl + '%E5%BF%83%E7%84%B6%20-%20%E5%8D%83%E5%B9%B4%E7%BC%98.mp3',
            lrc: headUrl + '%E5%BF%83%E7%84%B6%20-%20%E5%8D%83%E5%B9%B4%E7%BC%98.lrc',
            cover: headUrl + '%E5%BF%83%E7%84%B6%20-%20%E5%8D%83%E5%B9%B4%E7%BC%98.jpg',
        },{
            name: '无问西东',
            artist: '王菲',
            url: headUrl + '%E7%8E%8B%E8%8F%B2%20-%20%E6%97%A0%E9%97%AE%E8%A5%BF%E4%B8%9C.mp3',
            lrc: headUrl + '%E7%8E%8B%E8%8F%B2%20-%20%E6%97%A0%E9%97%AE%E8%A5%BF%E4%B8%9C.lrc',
            cover: headUrl + '%E7%8E%8B%E8%8F%B2%20-%20%E6%97%A0%E9%97%AE%E8%A5%BF%E4%B8%9C.jpg',
        },{
            name: '安和桥',
            artist: '宋冬野',
            url: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E%20-%20%E5%AE%89%E5%92%8C%E6%A1%A5.mp3',
            lrc: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E%20-%20%E5%AE%89%E5%92%8C%E6%A1%A5.lrc',
            cover: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E%20-%20%E5%AE%89%E5%92%8C%E6%A1%A5.jpg',
        },{
            name: '那些花儿',
            artist: '朴树',
            url: headUrl + '%E6%9C%B4%E6%A0%91%20-%20%E9%82%A3%E4%BA%9B%E8%8A%B1%E5%84%BF.mp3',
            lrc: headUrl + '%E6%9C%B4%E6%A0%91%20-%20%E9%82%A3%E4%BA%9B%E8%8A%B1%E5%84%BF.lrc',
            cover: headUrl + '%E6%9C%B4%E6%A0%91%20-%20%E9%82%A3%E4%BA%9B%E8%8A%B1%E5%84%BF.jpg',
        },{
            name: '三万英尺',
            artist: '迪克牛仔',
            url: headUrl + '%E8%BF%AA%E5%85%8B%E7%89%9B%E4%BB%94%20-%20%E4%B8%89%E4%B8%87%E8%8B%B1%E5%B0%BA.mp3',
            lrc: headUrl + '%E8%BF%AA%E5%85%8B%E7%89%9B%E4%BB%94%20-%20%E4%B8%89%E4%B8%87%E8%8B%B1%E5%B0%BA.lrc',
            cover: headUrl + '%E8%BF%AA%E5%85%8B%E7%89%9B%E4%BB%94%20-%20%E4%B8%89%E4%B8%87%E8%8B%B1%E5%B0%BA.jpg',
        },{
            name: '琵琶语',
            artist: '林海',
            url: headUrl + '%E6%9E%97%E6%B5%B7%20-%20%E7%90%B5%E7%90%B6%E8%AF%AD.mp3',
            lrc: headUrl + '%E6%9E%97%E6%B5%B7%20-%20%E7%90%B5%E7%90%B6%E8%AF%AD.lrc',
            cover: headUrl + '%E6%9E%97%E6%B5%B7%20-%20%E7%90%B5%E7%90%B6%E8%AF%AD.jpg',
        },{
            name: '郭源潮', //音频名称
            artist: '宋冬野',//音频艺术家
            url: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E-%E9%83%AD%E6%BA%90%E6%BD%AE.mp3',//音频外链
            lrc: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E-%E9%83%AD%E6%BA%90%E6%BD%AE.lrc', //音频歌词，配合上面的lrcType使用
            cover: headUrl + '%E5%AE%8B%E5%86%AC%E9%87%8E-%E9%83%AD%E6%BA%90%E6%BD%AE.jpg',//音频封面
            theme: '#ebd0c2' //切换到此音频时的主题色，比上面的 theme 优先级高
        }
    ]
});