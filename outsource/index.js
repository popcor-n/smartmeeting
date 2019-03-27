const subBt = document.getElementById('submit');
//处理登陆后成功或失败的逻辑函数
const juLog = function(output,status){
    const logErr = document.getElementById('logerr');
    if(status == 0){
        logErr.style.display = 'none';        
        const container = document.getElementsByClassName('container')[0];
        let loginTime = setInterval(() =>{
            container.style.opacity -= 0.1;
            if(container.style.opacity <= 0){
                token = output.msg;
                userName = output.data.username;
                window.clearInterval(loginTime);
                container.style.opacity = 0;
                container.style.display = 'none';
                // window.open('file:///E:/web/demo/outsource/index.html');
                document.getElementById('body').style.display = 'block';
                window.location.hash = '';                
                window.location.hash = '#users';
                document.getElementById('user').innerHTML = '<img src='+output.data.avatarUrl+' class="layui-nav-img">'+userName;
            }
        },60);

    }else{
        logErr.style.display = 'inline-block';
        const errTime = setInterval(function(){
            logErr.style.marginTop = parseInt(logErr.style.marginTop) - 1 + 'px';
            if(parseInt(logErr.style.marginTop) <= -5){
                window.clearInterval(errTime);                    
                logErr.style.marginTop = '2px';
            }
        },10); 
    }
}
//获取登录数据
let token , userName;
subBt.addEventListener('click',() =>{
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let output = JSON.parse(xhr.responseText);
        console.log(output);
        juLog(output,output.status);//上面定义的登录操作函数
    }
    xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/user/login.do',true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
    xhr.send("phone="+document.getElementById('phone').value.toString()+"&password="+document.getElementById('password').value.toString());
    console.log("phone="+document.getElementById('phone').value+"&password="+document.getElementById('password').value);
})


//登录结束 进行数据展示以及处理
const leOut = document.getElementById('left-out');
const leAll = document.getElementById('left-all');
const shBox = document.getElementById('show_box');
const userdt = document.getElementById('userdata');
const roomdt = document.getElementById('roomdata');
const ipPhone = document.getElementById('ip_find_phone');
const ipName = document.getElementById('ip_find_name');
const ipId = document.getElementById('ip_find_id');
const fdj1 = document.getElementById('fdjPic');
const fdj2 = document.getElementById('fdjpic2');
const fdj3 = document.getElementById('fdjPic3');
const uTable = document.getElementById('userTable');
const rTable = document.getElementById('roomTable');
const rtable = document.getElementById('roomtable');
const rMore = document.getElementById('roomMore');
const rmore = document.getElementById('rmoretable');
const fdUser = document.getElementById('finduser');
const fdRoom = document.getElementById('findroom');
const fdMeet = document.getElementById('findmeet');
const users = document.getElementById('userManagement');
const rooms = document.getElementById('roomManagement');
const meets = document.getElementById('meetManagement');
const ipMtId = document.getElementById('meetId');
const meetform = document.getElementById('meetform');
const meetcard = document.getElementById('meetcard');
let rNumber;
let allUserDt;
//用户部分  除了hash以外的其他逻辑处理
window.addEventListener('hashchange',function(){

    const hash = document.location.hash;
    if( hash == '#users' ) {
        document.getElementById('ip_find_phone').style.display = 'none';
        document.getElementById('ip_find_name').style.display = 'none';        
        document.getElementById('personData').style.display = 'none';
        document.getElementById('left-out-Userfind').style.display = 'block';    
        // document.getElementById('left-out-roomfind').style.display = 'none';     
        document.getElementById('left-out-Room').style.display = 'none';       
        document.getElementById('fdjPic').style.display = 'none';
        document.getElementById('fdjpic2').style.display = 'none';                
        shBox.style.display = 'block';
        users.style.display = 'block';
        rooms.style.display = 'none';
        meets.style.display = 'none';        
        uTable.style.display = 'content';
        // this.document.getElementById('left-out-userfind').style.display = 'block';
        this.document.getElementById('userTable').style.marginRight = '0px';
        fdUser.style.display = 'block';
        let proThis,proAll;
        document.getElementById('left-out-name').innerHTML = '所有名单';
        document.getElementById('left-out-name2').innerHTML = '查询人员';   
        document.getElementById('left-out-name').href = '#users';        
        // document.getElementById('userfind').style.display = 'block';     
        console.log('ok');
         
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let output = JSON.parse(xhr.responseText);
            allUserDt = output.data;
            userdt.style.display = 'block';
            fdUser.style.display = 'none';  
            // console.log(output);
            let leftAllTime = setInterval(function(){
                leAll.style.marginLeft = parseInt(leAll.style.marginLeft) + 5 + 'px';
                if(parseInt(leAll.style.marginLeft) >= 300){
                                  
                    leAll.style.marginLeft = '300px';
                    window.clearInterval(leftAllTime);
                }
            },10)
            for(let i in output.data){
                let tr = document.createElement('tr');
                tr.setAttribute('id','user_'+i.toString());
                document.getElementById('usertable').appendChild(tr);
                document.getElementById('user_'+i.toString()).innerHTML = '<td>'+ output.data[i].id.toString()+ '</td><td>'+output.data[i].username.toString()+ '</td><td>'+output.data[i].sex.toString()+'</td><td>'+output.data[i].phone.toString()+'</td><td>'+output.data[i].email.toString()+'</td>';
            }
            let useBackTime = setInterval(function(){
                userdt.style.marginTop = parseInt(userdt.style.marginTop) - 1 + 'px';
                if(parseInt(userdt.style.marginTop) <= 0){
                                  
                    userdt.style.marginTop = '0px';
                    window.clearInterval(useBackTime);
                }
            },20)

        }
        
        xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/user/getAll.do',true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("token", token);     
        xhr.send();
    }
    else if( hash == '#finduser1' ) { 
            users.style.display = 'contents';
            rooms.style.display = 'none';
            meets.style.display = 'none';
            
            document.getElementById('left-out-Userfind').style.display = 'block';
            this.document.getElementById('left-out-Room').style.display = 'none';
            document.getElementById('left-out-name').innerHTML = '所有名单';
            document.getElementById('left-out-name2').innerHTML = '查询人员';   
            document.getElementById('left-out-name').href = '#users';        //手机号查询的样式显示
            ipName.style.display = 'none';
            ipPhone.style.display = 'block';
            fdj1.style.display = 'block';
            fdj2.style.display = 'none';            
        let userTime = setInterval(function(){
            userdt.style.marginTop = parseInt(userdt.style.marginTop) + 1 + 'px';
            if(parseInt(userdt.style.marginTop) >= 40){
                userdt.style.marginTop = '40px';
                window.clearInterval(userTime);
                fdUser.style.display = 'block';
            }
        },20);
        fdj1.addEventListener( 'click', function() {
            // if( window.location.href == '#finduser1')
            window.location.hash = '#find-byphone';
        });
    }
    else if (hash == '#finduser2') {    
        users.style.display = 'contents';
        rooms.style.display = 'none';
        meets.style.display = 'none';
        document.getElementById('left-out-name').innerHTML = '所有名单';
        document.getElementById('left-out-name2').innerHTML = '查询人员';   
        document.getElementById('left-out-name').href = '#users';       //按用户名查询 
        document.getElementById('left-out-Userfind').style.display = 'block';
        this.document.getElementById('left-out-Room').style.display = 'none';
        ipName.style.display = 'block';
        ipPhone.style.display = 'none';
        fdj1.style.display = 'none';
        fdj2.style.display = 'block'; 
        let userNameTime = setInterval(function(){
            userdt.style.marginTop = parseInt(userdt.style.marginTop) + 1 + 'px';
            if(parseInt(userdt.style.marginTop) >= 40){
                userdt.style.marginTop = '40px';
                window.clearInterval(userNameTime);
                fdUser.style.display = 'block';
            }
        },20);
        fdj2.onclick = function() {
            console.log('test');
            let judge = 0;// 判断是否在所有名单中有这一输入的名字，默认没有
                for(let i  = 0; i < allUserDt.length; i++) {
                    if( allUserDt[i].username == ipName.value){
                        judge = 1;
                        // console.log(allUserDt[i]);
                        document.getElementById('personname').value =  allUserDt[i].username;
                        document.getElementById('personsex').value =  allUserDt[i].sex;
                        document.getElementById('personphone').value =  allUserDt[i].phone;
                        document.getElementById('personemail').value =  allUserDt[i].email;   
                        document.getElementById('personPic').style.background = 'url(' + allUserDt[i].avatarUrl + ')'  
                      
                        let userdtLeTime = setInterval( function() {
                            uTable.style.marginRight = parseInt( uTable.style.marginRight ) + 5+ 'px';
                            if( parseInt( uTable.style.marginRight ) >= 1320 ) {
                                uTable.style.marginRight == '1320px';
                                window.clearInterval(userdtLeTime);
                                document.getElementById('personData').style.display = 'block';
                                fdUser.style.display = 'none';
                            }
                        },5)
                        
                    }
                }
                if(judge == 0) {
                    console.log('未找到对应信息哦')
                }
            
        };
        
    }
    else if( hash == '#find-byphone') {     //手机号查询的 逻辑处理
        let phoneData = ipPhone.value;
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let roomdtBkTime = setInterval( function() {
                rTable.style.marginRight = parseInt( rTable.style.marginRight ) - 5+ 'px';
                if( parseInt( rTable.style.marginRight ) <= 0 ) {
                    rTable.style.marginRight == '0px';
                    window.clearInterval(roomdtBkTime);
                    // document.getElementById('personData').style.display = 'block';
                }
            },5);
            let output = JSON.parse(xhr.responseText);
            // console.log(output);
            document.getElementById('personname').value =  output.data.username;
            document.getElementById('personsex').value =  output.data.sex;
            document.getElementById('personphone').value =  output.data.phone;
            document.getElementById('personemail').value =  output.data.email;   
            document.getElementById('personPic').style.background = 'url(' + output.data.avatarUrl + ')'  
            if( output.status == 0 ) {
                let userdtLeTime = setInterval( function() {
                    uTable.style.marginRight = parseInt( uTable.style.marginRight ) + 5+ 'px';
                    if( parseInt( uTable.style.marginRight ) >= 1320 ) {
                        uTable.style.marginRight == '1320px';
                        window.clearInterval(userdtLeTime);
                        document.getElementById('personData').style.display = 'block';
                        fdUser.style.display = 'none';
                    }
                },5)
            }
        }
        xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/user/getOneByPhone.do',true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("token", token);     
        xhr.send('phone='+ipPhone.value);
    }else if (hash =='#rooms') {
        let leftAllTime = setInterval(function(){
            leAll.style.marginLeft = parseInt(leAll.style.marginLeft) + 5 + 'px';
            if(parseInt(leAll.style.marginLeft) >= 300){
                              
                leAll.style.marginLeft = '300px';
                window.clearInterval(leftAllTime);
            }
        },10)
        rTable.style.marginRight = '0px';
        rMore.style.opacity = '0';     
        fdRoom.style.display = 'none';      
        document.getElementById('roomData').style.display = 'none';          
        let xhr = new XMLHttpRequest();
        let roomMoreDt;
        xhr.onload = ()=> {
            let roomBackTime = setInterval(function(){
                roomdt.style.marginTop = parseInt(roomdt.style.marginTop) - 1 + 'px';
                if(parseInt(roomdt.style.marginTop) <= 0){
                                  
                    roomdt.style.marginTop = '0px';
                    window.clearInterval(roomBackTime);
                }
            },20)
            rooms.style.display = 'block';        
            this.document.getElementById('roomdata').style.display = 'block';
            document.getElementById('left-out-name').innerHTML = '会议室列表';
            document.getElementById('left-out-name').href = '#rooms';
            // document.getElementById('left-out-name2').innerHTML = '会议室查询';
            // document.getElementById('left-out-roomfind').style.display = 'block';    
            this.document.getElementById('left-out-room').innerHTML= '会议室查询'; 
            this.document.getElementById('left-out-room').href = '#findroom';                             
            users.style.display = 'none';
            meets.style.display = 'none';
            document.getElementById('left-out-Userfind').style.display = 'none';
            this.document.getElementById('left-out-Room').style.display = 'block'
            let output = JSON.parse(xhr.responseText);
            // console.log(output);
            rNumber = output.data.length;            
            var meetingList = [];
            for(let i in output.data){
                meetingList[i] = output.data[i].meetingLists;
                let tr = document.createElement('tr');
                tr.setAttribute('id','room_'+i.toString());
                document.getElementById('roomtable').appendChild(tr);
                document.getElementById('room_'+i.toString()).innerHTML = '<td>'+ output.data[i].roomNumber.toString()+ '</td><td>'+output.data[i].machineNumber.toString()+ '</td><td>'+output.data[i].content.toString()+'</td><td>'+output.data[i].status.toString()+'</td><td class="roommore"id='+'roommore_'+i.toString() +'>☛☛☛</td>';
                
            }
            // console.log(meetingList);
            while(rmore.hasChildNodes()){
                　　　rmore.removeChild(rmore.firstChild);
            }
            rmore.innerHTML = '<tr><th>会议id</th><th>会议名称</th><th>会议简介</th><th>会议状态</th><th>组织者id</th><th>开始时间</th><th>结束时间</th></tr>'
            for(let i in output.data) {
                document.getElementById('roommore_'+i).onclick = function(){
                    
                    for(let j in meetingList[i]){
                        // console.log(meetingList[i][j]);
                        if (meetingList[i][j].length != 0) {
                            let roomdtLeTime = setInterval( function() {
                                rTable.style.marginRight = parseInt( rTable.style.marginRight ) + 5+ 'px';
                                if( parseInt( rTable.style.marginRight ) >= 1320 ) {
                                    rTable.style.marginRight == '1320px';
                                    window.clearInterval(roomdtLeTime);
                                    // document.getElementById('personData').style.display = 'block';
                                }
                            },5);
                            let tr = document.createElement('tr');
                            tr.setAttribute('id','rmore_'+i.toString());
                            rmore.appendChild(tr);
                            document.getElementById('rmore_'+i.toString()).innerHTML = '<td>'+ meetingList[i][j].id+ '</td><td>'+meetingList[i][j].meetingName+ '</td><td>'+meetingList[i][j].meetingIntro+'</td><td>'+meetingList[i][j].status+'</td><td>'+meetingList[i][j].masterId+'</td><td>'+meetingList[i][j].createTime+'</td><td>'+meetingList[i][j].endTime+'</td>';
                            window.location.hash = '#room_'+i+'meetingLists';
                            setTimeout(() => {
                                rMore.style.opacity = '1';
                            }, 1500);
                        }
                        }
                       
                }
            }

        }
        xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/room/getAllRooms.do',true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("token", token);     
        xhr.send();
    }else if(hash == '#findroom') {
        users.style.display = 'none';
        document.getElementById('left-out-name').innerHTML = '会议室列表';
        document.getElementById('left-out-name').href = '#rooms';
        // document.getElementById('left-out-name2').innerHTML = '会议室查询';
        // document.getElementById('left-out-roomfind').style.display = 'block';    
        this.document.getElementById('left-out-room').innerHTML= '会议室查询'; 
        this.document.getElementById('left-out-room').href = '#findroom';                             
        rooms.style.display = 'contents';
        let roomTime = setInterval(function(){
            roomdt.style.marginTop = parseInt(roomdt.style.marginTop) + 1 + 'px';
            if(parseInt(roomdt.style.marginTop) >= 40){
                roomdt.style.marginTop = '40px';
                window.clearInterval(roomTime);
                fdRoom.style.display = 'block';
            }
        },20);
        fdj3.onclick = function (){
            window.location.hash = '#find-byid';
        }
    }else if ( hash == '#find-byid') {
        users.style.display = 'none';
        document.getElementById('left-out-name').innerHTML = '会议室列表';
        document.getElementById('left-out-name').href = '#rooms';
        // document.getElementById('left-out-name2').innerHTML = '会议室查询';
        // document.getElementById('left-out-roomfind').style.display = 'block';    
        this.document.getElementById('left-out-room').innerHTML= '会议室查询'; 
        this.document.getElementById('left-out-room').href = '#findroom';  
        rooms.style.display = 'contents';
        let id ;
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            let output = JSON.parse(xhr.responseText);
            // console.log(output);
            document.getElementById('roomid').value =  output.data.id;
            document.getElementById('roomname').value =  output.data.roomNumber;
            document.getElementById('roomcontent').value =  output.data.content;
            document.getElementById('roommachine').value =  output.data.machineNumber;   
            document.getElementById('roomstatus').value =  output.data.status;               
            if( output.status == 0 ) {
                let userdtLeTime = setInterval( function() {
                    rTable.style.marginRight = parseInt( rTable.style.marginRight ) + 5+ 'px';
                    if( parseInt( rTable.style.marginRight ) >= 1320 ) {
                        rTable.style.marginRight == '1320px';
                        window.clearInterval(userdtLeTime);
                        document.getElementById('roomData').style.display = 'block';
                        fdRoom.style.display = 'none';
                    }
                },5)
            }
        }
        xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/room/getRoomById.do',true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("token", token);     
        xhr.send('roomId='+ipId.value);
    } else if (hash == '#meetings') {
        document.getElementById('meet-people').style.display = 'block';        
        let leftAllTime = setInterval(function(){
            leAll.style.marginLeft = parseInt(leAll.style.marginLeft) - 5 + 'px';
            if(parseInt(leAll.style.marginLeft) <= 0){
                              
                leAll.style.marginLeft = '0px';
                window.clearInterval(leftAllTime);
            }
        },10)
        rooms.style.display = 'none';
        users.style.display = 'none';
        this.document.getElementById('meetpeople').style.display = 'none';
        document.getElementById('meetInformation').style.display = 'none';
        meets.style.display = 'block';     
        fdMeet.style.marginTop = '0px';
        fdMeet.style.display = 'block'; 
        document.getElementById('fdjPic4').onclick = function(){
            window.location.hash = '#find-meetings';
        }  
    }else if(hash =='#find-meetings') {
        this.document.getElementById('meetpeople').style.display = 'none';
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            rooms.style.display = 'none';
            users.style.display = 'none';
            leAll.style.marginLeft = '0px';
            meets.style.display = 'block';
            document.getElementById('findmeet').style.display = 'none';
            document.getElementById('meetInformation').style.display = 'block';
            let output = JSON.parse(xhr.responseText);
            // console.log(output);
            meetcard.style.display = 'block';            
            document.getElementById('meetid').value = output.data.meetingId;
            document.getElementById('meetname').value = output.data.meetingName;            
            document.getElementById('mastername').value = output.data.masterName;            
            document.getElementById('masterid').value = output.data.masterId;            
            document.getElementById('meetintro').value = output.data.meetingIntro;            
            document.getElementById('rname').value = output.data.roomName;            
            document.getElementById('peoplnum').value = output.data.peopleNum;            
            document.getElementById('meetstatus').value = output.data.status;  
            console.log(output.data.memberStatus)                
            for(let i in output.data.memberStatus){
                let tr = document.createElement('tr');
                tr.setAttribute('id','muser_'+i.toString());
                document.getElementById('rpeopletable').appendChild(tr);
                document.getElementById('muser_'+i.toString()).innerHTML = '<td>'+output.data.memberStatus[i].userId.toString()+ '</td><td>'+output.data.memberStatus[i].username.toString()+'</td><td>'+output.data.memberStatus[i].userStatus.toString()+'</td>';
            } 
            if( output.status == 0 ) {
                // meetcard.style.opacity = 0;
                let findup = setInterval( function () {
                    fdMeet.style.marginTop = parseInt( fdMeet.style.marginTop )- 1 + 'px';
                    if( parseInt( fdMeet.style.marginTop ) <= -80) {
                        fdMeet.style.marginTop == '-80px';
                        fdMeet.style.display = 'none';
                        window.clearInterval(findup);
                        document.getElementById('meetInformation').style.display = 'block';
                    }
                            
                },5)
            }
            document.getElementById('meet-people').onmouseover = function (){
                document.getElementById('duihuakuang').style.display = 'block';
            }
            document.getElementById('meet-people').onmouseout = function (){
                document.getElementById('duihuakuang').style.display = 'none';
            }
            document.getElementById('meet-people').onclick = function (){
                meetcard.style.display = 'none';
                document.getElementById('meet-people').style.display = 'none';
                document.getElementById('meetpeople').style='none';
                
            }
        }
        xhr.open('POST','http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingById.do',true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("token", token);     
        xhr.send('meetingId='+ipMtId.value);

    }

    for ( let i = 0; i < rNumber; i++) {
        if( hash == '#room_'+i+'meetingLists'){
            document.getElementById('left-out-name').innerHTML = '会议室列表';
            document.getElementById('left-out-name').href = '#rooms';
            // document.getElementById('left-out-name2').innerHTML = '会议室查询';
            // document.getElementById('left-out-roomfind').style.display = 'block';    
            this.document.getElementById('left-out-room').innerHTML= '会议室查询'; 
            this.document.getElementById('left-out-room').href = '#findroom';  
            users.style.display = 'none';
            rooms.style.display = 'block';
            setTimeout(() => {
                rMore.style.opacity = 1;
                rmore.style.display = 'content'; 
            }, 1500);
            // rTable.style.marginRight = '1320px';
            fdRoom.style.display = 'none';        
            
        }
    }


})