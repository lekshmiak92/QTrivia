(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,t,a){},117:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(18),r=a.n(o),c=(a(75),a(76),a(19)),i=a(21),l=a(13),u=a(14),m=a(16),d=a(15),p=a(17),h=a(119),g=a(120),f=a(61),w=a.n(f),E=a(62),b=a.n(E),v=a(63),k=a.n(v),y=(a(25),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"Game"},s.a.createElement(h.a,{className:"pad1"},s.a.createElement(g.a,{src:w.a,fluid:!0}),s.a.createElement("ul",null,s.a.createElement("li",{className:"hometabs"},s.a.createElement(c.b,{to:"/game/"},s.a.createElement(g.a,{src:b.a,fluid:!0,className:"start"}),s.a.createElement("span",{className:"text"}," Start"))),s.a.createElement("li",{className:"hometabs"},s.a.createElement(c.b,{to:"/howToPlay/"},s.a.createElement(g.a,{src:k.a,fluid:!0,className:"start"}),s.a.createElement("span",{className:"text"}," How to Play"))))))}}]),t}(n.Component)),N=a(33);a(81),a(84);N.initializeApp({apiKey:"AIzaSyBwtQofl2d8GoBm6TU67q1ImaLqWH7Tevc",authDomain:"qtrivia-1ebab.firebaseapp.com",databaseURL:"https://qtrivia-1ebab.firebaseio.com",projectId:"qtrivia-1ebab",storageBucket:"qtrivia-1ebab.appspot.com",messagingSenderId:"13126744922",appId:"1:13126744922:web:993d64f1600b169c"});var O=N.database(),A=(N.auth(),a(122)),S=a(44),C=a.n(S),I=a(121),j=function(e){return s.a.createElement(I.a,null,s.a.createElement(C.a,{className:"quesCard"},s.a.createElement(C.a.Body,null,s.a.createElement("pre",null,e.ques))))},T=a(125),P=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).isCorrectAnswer=function(){return"on"===a.props.clickStatus&&""!==a.props.chosenAnswer&&a.props.answerOption===a.props.correctAnswer},a.isWrongAnswer=function(){return"on"===a.props.clickStatus&&!1===a.props.revealresult&&a.props.chosenAnswer===a.props.answerOption},a.state={},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.isCorrectAnswer()?s.a.createElement(I.a,{xs:12,sm:6,className:"leftPull bottomPadding"},s.a.createElement(T.a,{className:"answerWrap bg-green "},s.a.createElement(T.a.Body,{className:"noPadding"},this.props.answerOption))):this.isWrongAnswer()?s.a.createElement(s.a.Fragment,null,s.a.createElement(I.a,{xs:12,sm:6,className:"leftPull bottomPadding"},s.a.createElement(T.a,{className:"answerWrap bg-red "},s.a.createElement(T.a.Body,{className:"noPadding"},this.props.answerOption)))):"on"===this.props.clickStatus?s.a.createElement(I.a,{xs:12,sm:6,className:"leftPull bottomPadding"},s.a.createElement(T.a,{className:"answerWrap bg-lightBlue"},s.a.createElement(T.a.Body,{className:"noPadding"},this.props.answerOption))):s.a.createElement(I.a,{xs:12,sm:6,className:"leftPull bottomPadding"},s.a.createElement(T.a,{className:"answerWrap bg-lightBlue",onClick:this.props.handleClick},s.a.createElement(T.a.Body,{className:"noPadding"},this.props.answerOption)))}}]),t}(n.Component),x=a(67),B=a.n(x),q=a(66),Q=a.n(q),D=function(e){var t;return t="on"!==e.clickStatus,s.a.createElement(Q.a,{className:"navWrap",style:{padding:"0% 10%"}},s.a.createElement(B.a,{variant:"warning",onClick:e.onClickOfNext,disabled:t},e.text))},L=function(e){return s.a.createElement(A.a,{className:"statistics"},s.a.createElement(I.a,null,"Que.No: ",s.a.createElement("span",{className:"gamePoints"},e.currentQuestion)),s.a.createElement(I.a,null,"Points:",s.a.createElement("span",{className:"gamePoints"},e.gamePoints)))},G=a(123),U=a(124),W=(a(93),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).handleClose=function(){a.setState({show:!1})},a.handleNew=function(){a.handleClose()},a.state={show:!1},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.setState({show:!0})},2e3)}},{key:"render",value:function(){var e=this.props.points;return s.a.createElement(s.a.Fragment,null,s.a.createElement(G.a,{show:this.state.show,centered:!0},s.a.createElement(G.a.Header,null,s.a.createElement(G.a.Title,null,"Time up ..!! ")),s.a.createElement(G.a.Body,null,s.a.createElement("h4",null,"Scoreboard"),e.map(function(e,t){return s.a.createElement("p",{className:"scorerow",key:t},s.a.createElement("span",{className:"username"},e[0]),s.a.createElement("span",{className:"userscore"},e[1]))})),s.a.createElement(G.a.Footer,null,s.a.createElement(c.b,{to:"/"},s.a.createElement(U.a,{variant:"secondary",onClick:this.handleNew},"Home")))))}}]),t}(n.Component)),M=a(24),H=a(126),F=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).tick=a.tick.bind(Object(M.a)(a)),a.state={seconds:e.seconds},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.timer=setInterval(this.tick,1e3)}},{key:"tick",value:function(){this.state.seconds>0?this.setState({seconds:this.state.seconds-1}):(clearInterval(this.timer),this.props.onFinish())}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(H.a,{animated:!0,now:this.state.seconds*(5/3),label:"".concat(this.state.seconds,"sec")}))}}]),t}(n.Component),_=a(45),R=a.n(_);var $=function(e){var t=e?e.split("?")[1]:window.location.search.slice(1),a={};if(t)for(var n=(t=t.split("#")[0]).split("&"),s=0;s<n.length;s++){var o=n[s].split("="),r=o[0],c="undefined"===typeof o[1]||o[1];if(r=r.toLowerCase(),"string"===typeof c&&(c=c.toLowerCase()),r.match(/\[(\d+)?\]$/)){var i=r.replace(/\[(\d+)?\]/,"");if(a[i]||(a[i]=[]),r.match(/\[\d+\]$/)){var l=/\[(\d+)\]/.exec(r)[1];a[i][l]=c}else a[i].push(c)}else a[r]?a[r]&&"string"===typeof a[r]?(a[r]=[a[r]],a[r].push(c)):a[r].push(c):a[r]=c}return a}(window.location.href),z=$.id?$.id:"",J=!0===$.isdebug||"true"===$.isdebug,K=!0===$.istestuser||"true"===$.istestuser;console.log($);var X=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).getUserId=function(){if(console.log("getUser Id functions",a.state.gameID),!a.state.userId){var e,t,n;console.log("[App.js] getUserId()");var s={id:[0,0],name:["",""]};try{e=window.QTalkApp.getUserAuthToken()}catch(r){e="cdc9b8e03a9e85e02a425983028b602ecdd7bdd5"}var o=J?"https://staging.remote.qtalk.io/v1/verifyAuthIdToken":"https://remote.qtalk.io/v1/verifyAuthIdToken";K&&(o+="?isTestUser=true"),o+="?isTestUser=true",console.log(o),e&&fetch(o,{method:"GET",headers:{"X-Auth-Id-Token":e||""}}).then(function(e){return e.json()}).then(function(e){console.log(e.userId),t=e.userId,n=e.userDetails.displayName,a.setState({userId:t||"newid",userName:n||"newname"})}).catch(function(e){console.log(e)}),O.ref("rooms/".concat(a.state.gameID,"/players")).once("value",function(e){if(e){console.log(e),console.log(e.val()),(s=e.val())||(s={id:[],name:[]});try{var o=s.id.indexOf(0);-1!==o?(s.id[o]=t||"testid",s.name[o]=n||"testUser"):(0===s.id.length?(console.log("hoy"),a.setState({isInitialiser:!0}),a.getQuestions(),O.ref("rooms/".concat(a.state.gameID,"/")).update({initialiser:t||999,playerPoints:""})):O.ref("rooms/".concat(a.state.gameID,"/gamelib")).once("value",function(e){var t=e.val().results;a.setState({gameLib:t,gameBegin:"true",gameTime:60})}),s.id.push(t||"testid"),s.name.push(n||"testUser"))}catch(r){console.log(r)}a.setState({userName:n,userId:t,playerList:s,loading:!1}),console.log(s),O.ref("rooms/".concat(a.state.gameID,"/players")).set(s)}}),console.log("token",e)}},a.getQuestions=function(){fetch("https://opentdb.com/api.php?amount=60").then(function(e){return e.json()}).then(function(e){O.ref("rooms/".concat(a.state.gameID)).update({gamelib:e,gameStatus:"start"}),a.setState({gameLib:e.results,gameBegin:"true",gameTime:60})})},a.getState=function(){var e=a.state.currentQuestion-1,t=a.state.gameLib[e];console.log(e);var n=t.incorrect_answers,s=t.correct_answer,o=a.shuffleChoices(n,s),r=R.a.decodeHTML(t.question);a.setState({question:r,answer:t.correct_answer,choicesArray:o})},a.shuffleChoices=function(e,t){for(var a=e.concat(t),n=0;n<a.length;n++)a[n]=R.a.decodeHTML(a[n]);return a=a.sort(function(e,t){return.5-Math.random()})},a.handleOptionClick=function(e){var t=e.target.textContent;t===a.state.answer?a.setState({clickStatus:"on",choseCorrectAnswer:!0,chosenAnswer:t,points:a.state.points+20}):a.setState({clickStatus:"on",choseCorrectAnswer:!1,chosenAnswer:t})},a.handleClickOfNext=function(){a.setState({currentQuestion:a.state.currentQuestion+1,chosenAnswer:"",clickStatus:"off",choseCorrectAnswer:!1}),a.getState()},a.resetGameBegin=function(){a.setState({gameBegin:"false"})},a.setGameEnd=function(){a.setState({gameEnd:!0});var e=a.state.userName?a.state.userName:Math.random().toString(36).substring(7);O.ref("rooms/".concat(a.state.gameID,"/playerPoints/").concat(e)).set(a.state.points)},a.state={question:"Loading...",answer:"",wrongAnswers:[],choicesArray:[" "," "," "," "],chosenAnswer:"",clickStatus:"off",choseCorrectAnswer:!1,points:0,currentQuestion:1,userName:"ddd",totalPoints:0,userLevel:"",gameID:document.location.pathname?"QTrivia"===document.location.pathname.slice(1,8)?z:"no_game_id":"no_location_pathname",userId:null,isInitialiser:!1,gameTime:0,gameLib:{},gameBegin:"",gameEnd:null,pointsTable:[]},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getUserId(),O.ref("rooms/".concat(this.state.gameID,"/gameStatus")).on("value",function(e){if(console.log(e.val()),"start"===e.val())try{window.QTalkApp&&window.QTalkApp.notifyGameRoundStarted()}catch(t){console.log("Present Game started")}else if("end"===e.val())try{window.QTalkApp&&window.QTalkApp.notifyGameRoundEnded()}catch(t){console.log("Present Game ended")}}),O.ref("rooms/".concat(this.state.gameID,"/playerPoints/")).on("value",function(t){if(t.val()){var a=Object.entries(t.val());e.setState({pointsTable:a})}})}},{key:"render",value:function(){var e,t=this,a=this.state.gameBegin,n=this.state.gameEnd;return"true"===a&&null!==this.state.gameLib&&(this.getState(),this.resetGameBegin()),e=n?s.a.createElement(W,{points:this.state.pointsTable}):"",s.a.createElement("div",{className:"App"},s.a.createElement(h.a,{className:"noPadding"},s.a.createElement(F,{seconds:60,onFinish:this.setGameEnd}),s.a.createElement(L,{gamePoints:this.state.points,currentQuestion:this.state.currentQuestion}),s.a.createElement(A.a,null,s.a.createElement(j,{ques:this.state.question})),this.state.choicesArray.map(function(e,a){return s.a.createElement(P,{key:a,answerOption:e,handleClick:t.handleOptionClick,chosenAnswer:t.state.chosenAnswer,revealresult:t.state.choseCorrectAnswer,clickStatus:t.state.clickStatus,correctAnswer:t.state.answer,prophistory:t.props.history,points:t.state.points})}),s.a.createElement(D,{text:"Next",clickStatus:this.state.clickStatus,onClickOfNext:this.handleClickOfNext,choseCorrectAnswer:this.state.choseCorrectAnswer}),e))}}]),t}(n.Component),Y=(a(116),function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(h.a,null,s.a.createElement("div",{className:"progCard "},s.a.createElement(A.a,null,s.a.createElement(I.a,null,s.a.createElement("h3",null,"How to Play"),s.a.createElement("ul",{className:"textAllignLeft"},s.a.createElement("li",null,"You should choose the correct answer from the four multiple choices given."),s.a.createElement("li",null,"For each Correct answer, you get 20 points and can advance to next question by clicking on next button")," ",s.a.createElement("li",null,"Earn Maximum points by answering as many questions you can in 60 seconds..!! Make your moves fast !!")),s.a.createElement("div",null,s.a.createElement(c.b,{to:"/"},s.a.createElement(U.a,{variant:"danger"},"Home"))))))))}),V=function(){return s.a.createElement(c.a,{basename:"/QTrivia"},s.a.createElement("div",null,s.a.createElement(i.a,{path:"/",exact:!0,component:y}),s.a.createElement(i.a,{path:"/game/",component:X}),s.a.createElement(i.a,{path:"/howToPlay/",component:Y})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},25:function(e,t,a){},61:function(e,t,a){e.exports=a.p+"static/media/logoTransparent.90bfb623.png"},62:function(e,t,a){e.exports=a.p+"static/media/Button-Play-icon.6ea0c212.png"},63:function(e,t,a){e.exports=a.p+"static/media/qmark.75b3d39c.png"},70:function(e,t,a){e.exports=a(117)},75:function(e,t,a){},93:function(e,t,a){}},[[70,1,2]]]);
//# sourceMappingURL=main.10d09c1c.chunk.js.map