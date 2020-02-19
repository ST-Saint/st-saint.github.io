function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
};

const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};


var vm = new Vue({
    el: '#app',

    data: {
        word: "",
        readingAnswer: 0,
        readingCorrectType:  ["", "", "", ""],
        meanings: [],
        info: "",
        value: 10,
        correct: false,
        dictionaryMode: "",
        audio: new Audio(),
        audioReady: false,
        spellingInput: "",
        spellingSubmitted: false,
        spellingCorrect: false,
        spellingCorrectType: "danger",
    },

    methods: {
        pickNext: function(){
            this.spellingInput = "";
            this.spellingCorrect = false,
            this.spellingSubmitted = false;
            var rnd = this.getRndInteger(this.wordlist.length);
            this.word = this.wordlist[rnd];
            this.readingAnswer = rnd;
            this.readingSubmitted = false;
            this.readingCorrectType = ["", "", "", ""];
            this.getAudio(this.word);
            let idx = [rnd];
            for(let i = 0 ; i < 3 ; ++i){
                rnd = this.getRndInteger(this.wordlist.length);
                while( idx.includes(rnd) ){
                    rnd = this.getRndInteger(this.wordlist.length);
                }
                idx.push(rnd);
            }
            idx = shuffle(idx);
            this.requestMeaning(this.word);
            this.meanings = [];
            for(let i = 0 ; i < 4 ; ++i){
                if( idx[i] == this.readingAnswer  ){
                    this.readingAnswer = i;
                }
                this.meanings[i] = this.dictionary[this.wordlist[idx[i]]].meaning;
            }
        },

        requestMeaning: function(volcabulary){
            var appKey = "37ddc7564c10f775";
            var key = "mDI8ZDIVAVlLD5mCeaVa6ktwEyLvw1xh";
            var salt = (new Date).getTime();
            var curTime = Math.round(new Date().getTime()/1000);
            var query = volcabulary;
            // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
            var from = "en";
            var to = "zh-CHS";
            var str = appKey + truncate(query) + salt + curTime + key;
            var sign = sha256(str);
            let params = new URLSearchParams();
            params.append("q", query);
            params.append("appKey", appKey);
            params.append("salt", salt);
            params.append("from", from);
            params.append("to", to);
            params.append("sign", sign);
            params.append("signType", "v3");
            params.append("curtime", curTime);
            axios(
                {
                    url: "https://openapi.youdao.com/api",
                    method: "post",
                    dataType: "jsonp",
                    withCredentials: true,
                    data: params,
                }).then((response)=>{console.log(response);});
        },

        wrapWord: function(filename){
            if( filename.startsWith("bix") ){
                return "bix/" + filename;
            }
            else if( filename.startsWith("gg") ){
                return "gg/" + filename;
            }
            else if( !isNaN(filename[0]) ){
                return "number/" + filename;
            }
            else{
                return filename[0] + "/" + filename;
            }
        },

        getAudio: function(word){
            this.audioReady = false;
            baseURL= "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/";
            key = "fcd21bf9-2c02-4223-be22-a8d3fe9bf6a2";
            URL = baseURL + word + "?key=" + key;
            axios.get(URL).then(response => {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(response.data, "text/xml");
                var wavfile = xmlDoc.getElementsByTagName("sound")[0].getElementsByTagName("wav")[0].textContent;
                var wordAudioURL = "https://media.merriam-webster.com/soundc11/" + this.wrapWord(wavfile);
                this.audio.src = wordAudioURL;
                this.audio.addEventListener("canplaythrough", ()=>{this.audioReady=true;this.playWordAudio();}, false);
            });
        },

        playWordAudio: function(){
            if( this.audioReady ){
                this.audio.play();
            }
        },

        getColor: function(){
            return this.correct;
        },

        correctSpelling: function(){
            if( this.message.length <= this.word.length && this.word.substring(0, this.message.length).trim() == this.message.trim() ){
                this.correct = true;
            }
            else{
                this.correct = false;
            }
            return this.correct;
        },

        getRndInteger: function(maxi){
            return Math.round(Math.random() * maxi);
        },

        getDictionary: async function(){
            const dictionaryURL = "./dictionary.json";
            axios.get('./dictionary.json')
                .then(response => {
                    this.dictionary = response.data;
                    this.wordlist = [];
                    for(var w in this.dictionary){
                        this.wordlist.push(w);
                    }
                });
        },

        readingSubmit: function(choice){
            if( !this.readingSubmitted ){
                this.readingCorrectType = ["", "", "", ""];
                this.readingCorrectType[this.readingAnswer] = "success";
                if( choice != this.readingAnswer ){
                    this.readingCorrectType[choice] = "danger";
                }
                this.playWordAudio();
                this.readingSubmitted = true;
            }
            else{
                if( choice == this.readingAnswer ){
                    this.pickNext();
                }
            }
        },

        spellingSubmit: function(){
            if( !this.spellingSubmitted ){
                this.playWordAudio();
                var ele = document.getElementById("spellingword");
                if( ele ){
                    ele.style.visibility = "";
                }
                this.spellingCorrect = this.spellingInput.trim() == this.word.trim();
                this.spellingCorrectType = this.spellingCorrect ? "success" : "danger";
                this.spellingSubmitted = true;
            }
            else if( !this.spellingCorrect ){
                this.playWordAudio();
                this.spellingCorrect = this.spellingInput.trim() == this.word.trim();
                this.spellingCorrectType = this.spellingCorrect ? "success" : "danger";
            }
            else if( this.spellingCorrect ){
                this.pickNext();
            }
        },

        setDictionaryModeReading(){
            if( this.dictionaryMode != "reading" ){
                this.dictionaryMode = "reading";
                this.pickNext();
            }
        },

        setDictionaryModeSpelling(){
            if( this.dictionaryMode != "spelling" ){
                this.dictionaryMode = "spelling";
                this.pickNext();
            }
        },
    },

    mounted: function(){
        this.getDictionary();
    }
});
