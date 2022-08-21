/* 
    鼠标移入顶部导航栏相应栏时 下箭头旋转成上箭头
*/
//获取所有包含箭头的li
let rotate0Li = document.querySelectorAll(".rotate0");
//获取所有箭头
let groupArrow = document.querySelectorAll(".group");
var index = 0;
for (var i = 0; i < rotate0Li.length; i++) {
    //记录索引
    rotate0Li[i].num = i;
    //为含箭头的每一个li绑定鼠标移入事件
    rotate0Li[i].onmouseenter = function () {
        index = this.num;
        //改变类名，箭头旋转为上箭头
        rotate0Li[index].classList.remove("rotate0");
        rotate0Li[index].classList.add("rotate180");
        //判断搜索框是否为出现状态
        if (slideSearch.style.animationName === "slideAppear") {
            //使搜索框滑动收起
            slideSearch.style.animation = "slideDisappear .48s linear 0s 1 both"
        }

        //判断登录框是否为出现状态
        if (loginInterface.style.display === "block") {
            //使登录框消失
            loginInterface.style.display = "none";
            loginInterface.style.height = "0";
            loginWrapper.style.marginTop = "-290px";
        }

    }

    //为含箭头的每一个li绑定鼠标移出事件
    rotate0Li[i].onmouseleave = function () {
        for (let i = 0; i < rotate0Li.length; i++) {
            //改变类名，箭头旋转为下箭头
            rotate0Li[index].classList.remove("rotate180");
            rotate0Li[index].classList.add("rotate0");
        }
    }
}

/* 
    搜索框滑出与消失
*/
//获取搜索栏按钮
let searchWrapper = document.querySelector(".search-wrapper");
//获取滑动搜索框
let slideSearch = document.querySelector(".slide-search");
//获取滑动容器内容区
let slideCon = document.querySelector(".slide-con");

//为搜索栏按钮绑定单击响应函数
searchWrapper.onclick = function (e) {
    //登录框收起
    loginInterface.style.display = "none";
    loginInterface.style.height = "0";
    loginWrapper.style.marginTop = "-290px";

    //滑动容器内容区出现
    slideCon.style.display = "block";
    //搜索框滑动出现
    slideSearch.style.animation = "slideAppear .48s linear 0s 1 both";
    e.stopPropagation();
}

//点击页面任意位置，使 搜索框/登录框 收起
document.onclick = function () {
    //搜索框部分
    //选择菜单收起
    selectMenu.style.display = "none";
    //去除溢出，隐藏滑动容器内容区 
    slideSearch.style.overflow = "hidden";
    //搜索框滑动收起
    slideSearch.style.animation = "slideDisappear .48s linear 0s 1 both"

    //登录框部分
    loginInterface.style.height = "0";
    loginWrapper.style.marginTop = "-290px";

    //热搜榜消失
    searchList[0].style.display = "none";
    searchList[1].style.display = "none";
    searchResult[0].style.display = "none";
    searchResult[1].style.display = "none";
    //输入框提示文字颜色变回默认颜色
    inputs[0].className = "";
    inputs[1].className = "";
    //输入框提示文字自动更换
    placeStart();
}

//滑动搜索框绑定一个单击响应函数 
slideSearch.onclick = function (e) {
    //取消冒泡，单击滑动搜索框时不会被收起 
    e.stopPropagation();
}


/* 
    搜索框 网络 && 视频 选择切换
*/
let searchType = document.querySelector(".search-type");
let selectMenu = document.querySelector(".select-menu");
let selectWeb = document.querySelector(".select-web");
let selectVideo = document.querySelector(".select-video");
searchType.onclick = function () {
    //允许滑动搜索框超出显示，使切换菜单完整出现 
    slideSearch.style.overflow = "visible";
    selectMenu.style.display = "block";
}

selectWeb.onclick = selectTypeChange;
selectVideo.onclick = selectTypeChange;

function selectTypeChange() {
    searchType.innerText = this.innerText;
    //初始化默认颜色 
    selectWeb.style.color = "#666";
    selectVideo.style.color = "#666";
    //调用函数的对象改变字体颜色 
    this.style.color = "#0084ff";
    //设置originalColor属性保存鼠标移入前的颜色 
    selectWeb.originalColor = selectWeb.style.color;
    selectVideo.originalColor = selectVideo.style.color;
    selectMenu.style.display = "none";
}

//鼠标移入时，字体颜色改变
selectWeb.onmouseenter = changeSelectColor;
selectVideo.onmouseenter = changeSelectColor;
//鼠标移出时，恢复原本颜色
selectWeb.onmouseleave = recoverOriginalColor;
selectVideo.onmouseleave = recoverOriginalColor;


function changeSelectColor() {
    this.style.color = "#bf0614";
}

function recoverOriginalColor() {
    //第一次出现选择菜单时，鼠标移出后颜色恢复为浅黑色
    this.style.color = "#666";
    //鼠标移出时，调用函数的对象恢复原来的颜色 
    this.style.color = this.originalColor;
}

/* 
    登录框滑出与消失
*/
//获取用户栏按钮
let userWrapper = document.querySelector(".user-wrapper");
//获取登录框
let loginInterface = document.querySelector(".login-interface");
//获取登录框容器
let loginWrapper = document.querySelector(".login-wrapper");

userWrapper.onclick = function (e) {
    //搜索框收起
    selectMenu.style.display = "none";
    slideSearch.style.overflow = "hidden";
    slideSearch.style.animation = "slideDisappear .48s linear 0s 1 both";


    loginInterface.style.display = "block";
    if (loginInterface.offsetHeight) {
        loginInterface.style.height = "0";
        loginWrapper.style.marginTop = "-290px";
    } else {
        loginInterface.style.height = "290px";
        loginWrapper.style.marginTop = "0";
    }

    e.stopPropagation();
}

loginInterface.onclick = function (e) {
    e.stopPropagation();
}


/* 
    登录框中input的默认提示
*/
let loginInputs = document.querySelectorAll(".login-form input");
for (var i = 0; i < loginInputs.length; i++) {
    //获得焦点时隐藏默认文字
    loginInputs[i].onfocus = function () {
        if (this.value == this.defaultValue) {
            this.value = '';
        }

        //修改密码框type值，使输入的文字加密
        if (this.className === "password") {
            this.type = "password";
        }
    }

    //失去焦点时显示默认文字 
    loginInputs[i].onblur = function () {
        //判断是否为密码框
        if (this.value == '' && this.type == "password") {
            this.type = "text";
        }

        //若输入框为空则显示默认文字
        if (this.value == '') {
            this.value = this.defaultValue;
        }
    }
}

/* 
    分类界面滑出与消失
*/

//获取关闭按钮
let close = document.querySelector(".close");
//获取分类界面
let slideClassifyWrapper = document.querySelector(".slide-classify-wrapper");
//获取分类栏按钮
let classifyWrapper = document.querySelector(".classify-wrapper");

//单击分类栏按钮时，分类界面出现
classifyWrapper.onclick = function () {
    //判断登录框是否为出现状态
    if (loginInterface.style.display === "block") {
        //使登录框消失
        loginInterface.style.display = "none";
        loginInterface.style.height = "0";
        loginWrapper.style.marginTop = "-290px";
    }

    document.body.style.overflowY = "hidden";
    slideClassifyWrapper.style.height = "100%";
}

//单击关闭按钮时，分类界面消失
close.onclick = function () {
    document.body.style.overflowY = "inherit";
    slideClassifyWrapper.style.height = "0";
}

/* 
    自适应
*/
//获取频道列表
let channelList = document.querySelector(".channel-list");
//获取央视网Logo
let titleList = document.querySelector(".title-list");
//获取banner部分中导航栏的每一分区
let navt = document.querySelectorAll(".navt");
//获取节目导航栏图片
let navtImg = document.querySelectorAll(".navigation-left i");
//获取向左倒退按钮
let pro = document.querySelector(".pro");
let next = document.querySelector(".next");
//获取正在热播剧集内容区
let content = document.querySelector(".con>ul");
var flag = true;
var originalWidth;
//获取直播节目列表
let streamUl = document.querySelector(".stream-con>ul");
//获取直播导视节目按钮
let proBtn = document.querySelector(".pro-btn");
let nextBtn = document.querySelector(".next-btn");
//监听屏幕大小变化
window.addEventListener('resize', function () {

    //当分类界面高度变化时，频道列表高度也会随之变化，甚至会出现滚动条
    channelList.style.height = slideClassifyWrapper.clientHeight - 130 + "px";

    //为频道列表绑定滚动条滚动事件
    channelList.onscroll = function () {
        //当频道列表出现滚动条时，滚动条一旦滚动，标题列表下出现阴影
        titleList.style.boxShadow = "0px 0px 6px 0px rgb(0 0 0 / 30%)";
        //判断滚动条是否回到顶部
        if (channelList.scrollTop === 0) {
            //阴影消失
            titleList.style.boxShadow = "none";
        }
    }

    if (window.innerWidth < 1350) {
        //缩放时剧集列表变化
        resizeChange(content, calcMinLeft);
        //窗口变化时剧集列表左边距改变函数
        function calcMinLeft() {
            switch (true) {
                //窗口由大变小
                case content.offsetLeft == -808:
                    return "-636px";
                case content.offsetLeft == -1616:
                    return "-1272px";
            }
        }
        //正在热播剧集列表 左右滚动 
        scrollBack(pro, 636, 0);
        scrollForward(next, 636, -1272);

        //缩放时节目列表变化
        resizeChange(streamUl, streamMinLeft);
        //窗口变化时节目列表左边距改变函数
        function streamMinLeft() {
            switch (true) {
                //窗口由大变小
                case streamUl.offsetLeft == -229:
                    return "-227px";
                case streamUl.offsetLeft == -458:
                    return "-454px";
                case streamUl.offsetLeft == -687:
                    return "-681px";
                case streamUl.offsetLeft == -916:
                    return "-908px";
                case streamUl.offsetLeft == -1145:
                    return "-1135px";
                case streamUl.offsetLeft == -1374:
                    return "-1362px";
                case streamUl.offsetLeft == -1603:
                    return "-1589px";
                case streamUl.offsetLeft == -1832:
                    return "-1816px";
                case streamUl.offsetLeft == -2061:
                    return "-2043px";
                case streamUl.offsetLeft == -2290:
                    return "-2270px";
                case streamUl.offsetLeft == -2519:
                    return "-2497px";
                case streamUl.offsetLeft == -2748:
                    return "-2724px";
                case streamUl.offsetLeft == -2977:
                    return "-2951px";
                case streamUl.offsetLeft == -3206:
                    return "-3178px";
                case streamUl.offsetLeft == -3435:
                    return "-3405px";
            }
        }
        //直播导视节目列表 左右滚动
        scrollBack(proBtn, 908, 0);
        scrollForward(nextBtn, 908, -3632);
    }



    if (window.innerWidth >= 1350 && window.innerWidth <= 1683) {
        changeNavtBg("-Min");
        //缩放时剧集列表变化
        resizeChange(content, calcMidLeft);
        //窗口变化时剧集列表左边距改变函数
        function calcMidLeft() {
            switch (true) {
                //窗口由小变大
                case content.offsetLeft == -636:
                    return "-808px";
                case content.offsetLeft == -1272:
                    return "-1616px";
                //窗口由大变小
                case content.offsetLeft == -1004:
                    return "-808px";
                case content.offsetLeft == -2008:
                    return "-1616px";
            }
        }
        //正在热播剧集列表 左右滚动 
        scrollBack(pro, 808, 0);
        scrollForward(next, 808, -1616);

        //缩放时节目列表变化
        resizeChange(streamUl, streamMidLeft);
        //窗口变化时节目列表左边距改变函数
        function streamMidLeft() {
            switch (true) {
                //窗口由小变大
                case streamUl.offsetLeft == -227:
                    return "-229px";
                case streamUl.offsetLeft == -454:
                    return "-458px";
                case streamUl.offsetLeft == -681:
                    return "-687px";
                case streamUl.offsetLeft == -908:
                    return "-916px";
                case streamUl.offsetLeft == -1135:
                    return "-1145px";
                case streamUl.offsetLeft == -1362:
                    return "-1374px";
                case streamUl.offsetLeft == -1589:
                    return "-1603px";
                case streamUl.offsetLeft == -1816:
                    return "-1832px";
                case streamUl.offsetLeft == -2043:
                    return "-2061px";
                case streamUl.offsetLeft == -2270:
                    return "-2290px";
                case streamUl.offsetLeft == -2497:
                    return "-2519px";
                case streamUl.offsetLeft == -2724:
                    return "-2748px";
                case streamUl.offsetLeft == -2951:
                    return "-2977px";
                case streamUl.offsetLeft == -3178:
                    return "-3206px";
                case streamUl.offsetLeft == -3405:
                    return "-3435px";
                case streamUl.offsetLeft == -3632:
                    return "-3435px";
                //窗口由大变小
                case streamUl.offsetLeft == -239:
                    return "-229px";
                case streamUl.offsetLeft == -478:
                    return "-458px";
                case streamUl.offsetLeft == -717:
                    return "-687px";
                case streamUl.offsetLeft == -956:
                    return "-916px";
                case streamUl.offsetLeft == -1434:
                    return "-1374px";
                case streamUl.offsetLeft == -1195:
                    return "-1145px";
                case streamUl.offsetLeft == -1673:
                    return "-1603px";
                case streamUl.offsetLeft == -1912:
                    return "-1832px";
                case streamUl.offsetLeft == -2151:
                    return "-2061px";
                case streamUl.offsetLeft == -2390:
                    return "-2290px";
                case streamUl.offsetLeft == -2629:
                    return "-2519px";
                case streamUl.offsetLeft == -2748:
                    return "-2724px";
                case streamUl.offsetLeft == -2868:
                    return "-2748px";
                case streamUl.offsetLeft == -2977:
                    return "-3107px";
                case streamUl.offsetLeft == -3346:
                    return "-3206px";
            }
        }
        //直播导视节目列表 左右滚动
        scrollBack(proBtn, 1145, 0);
        scrollForward(nextBtn, 1145, -3435);
    }

    if (window.innerWidth >= 1684 && window.innerWidth <= 1899) {
        changeNavtBg("-Max");
        //缩放时剧集列表变化
        resizeChange(content, calcMaxLeft);
        //窗口变化时剧集列表左边距改变函数
        function calcMaxLeft() {
            switch (true) {
                //窗口由小变大
                case content.offsetLeft == -808:
                    return "-1004px";
                case content.offsetLeft == -1616:
                    return "-2008px";
            }
        }
        //正在热播剧集列表 左右滚动 
        scrollBack(pro, 1004, 0);
        scrollForward(next, 1004, -2008);

        //缩放时节目列表变化
        resizeChange(streamUl, streamMaxLeft);
        function streamMaxLeft() {
            switch (true) {
                //窗口由小变大
                case streamUl.offsetLeft == -229:
                    return "-239px";
                case streamUl.offsetLeft == -458:
                    return "-478px";
                case streamUl.offsetLeft == -687:
                    return "-717px";
                case streamUl.offsetLeft == -916:
                    return "-956px";
                case streamUl.offsetLeft == -1145:
                    return "-1195px";
                case streamUl.offsetLeft == -1374:
                    return "-1434px";
                case streamUl.offsetLeft == -1603:
                    return "-1673px";
                case streamUl.offsetLeft == -1832:
                    return "-1912px";
                case streamUl.offsetLeft == -2061:
                    return "-2151px";
                case streamUl.offsetLeft == -2290:
                    return "-2390px";
                case streamUl.offsetLeft == -2519:
                    return "-2629px";
                case streamUl.offsetLeft == -2748:
                    return "-2868px";
                case streamUl.offsetLeft == -2977:
                    return "-3107px";
                case streamUl.offsetLeft == -3206:
                    return "-3346px";
                case streamUl.offsetLeft == -3435:
                    return "-3346px";
            }
        }
        //直播导视节目列表 左右滚动
        scrollBack(proBtn, 1434, 0);
        scrollForward(nextBtn, 1434, -3346);

    }

    if (window.innerWidth >= 1900) {
        changeNavtBg("-Max");
    }
})


//自动触发resize事件
let resizeEvent = new Event('resize');
window.dispatchEvent(resizeEvent);

//缩放时 剧集列表 && 节目列表 改变函数
function resizeChange(obj, fun) {
    //缩放时取消动画
    obj.style.transition = "none";
    obj.style.marginLeft = fun();
}


//创建 banner部分中下方导航栏图片 切换函数
function changeNavtBg(sizeStr) {
    for (let i = 0; i < navtImg.length; i++) {
        //修改图片路径
        navtImg[i].style.background = "url(" + "images/img-" + (i + 1) + sizeStr + ".png) no-repeat center center";

        //记录索引
        navt[i].num = i;
        //鼠标移入，图片变蓝
        navt[i].onmouseenter = function () {
            index = this.num;
            navtImg[index].style.background = "url(" + "images/img-" + (index + 1) + sizeStr + "-cur.png) no-repeat center center";

            //增加类名，使弹窗出现
            navt[index].classList.add("pop-contain");
        }

        navt[i].onmouseleave = function () {
            for (let j = 0; j < navtImg.length; j++) {
                navtImg[j].style.background = "url(" + "images/img-" + (j + 1) + sizeStr + ".png) no-repeat center center";

                //删除类名，使弹窗消失
                navt[j].classList.remove("pop-contain");
            }
        }
    }
}


/* 
    更多+ 弹窗 出现与消失
*/
let moreNavt = document.querySelector(".more-navt");
let moreCon = document.querySelector(".more-con")
moreNavt.onmouseenter = function () {
    moreCon.style.display = "block";
    moreNavt.style.color = "#0084ff";

}

moreNavt.onmouseleave = function () {
    moreCon.style.display = "none";
    moreNavt.style.color = "#000";
}

moreCon.onmouseenter = function () {
    moreCon.style.display = "block";
    moreNavt.style.color = "#0084ff";
}

moreCon.onmouseleave = function () {
    moreCon.style.display = "none";
    moreNavt.style.color = "#000";
}



/* 
    手机看 && 二维码 的切换
*/
let phoneBox = document.querySelector(".phone-box");
let qrCode = document.querySelector(".qr-code");
let phoneDisplay = document.querySelector(".phone-display")


//鼠标移入，手机看 转变为 二维码
phoneDisplay.onmouseover = function () {
    phoneBox.style.display = "none";
    qrCode.style.display = "block";

}

//鼠标移出，二维码 转变为 手机看
phoneDisplay.onmouseout = function () {
    qrCode.style.display = "none";
    phoneBox.style.display = "block";
}



/* 
    热搜榜数据渲染
*/
//获取输入框 
let inputs = document.querySelectorAll(".inputVal input");
//获取热搜榜
let searchList = document.querySelectorAll(".search-list");
//设置控制执行次数的变量
var flag = true;


for (var i = 0; i < inputs.length; i++) {
    //为输入框绑定一个单击响应函数
    inputs[i].onclick = function (e) {
        //使函数只执行一次
        if (flag) {
            sealAjax({
                url: 'http://106.52.74.37:8000/getHotSearch',
            }).then(res => {
                console.log(res)
                for (var i = 0; i < searchList.length; i++) {
                    //使用模板字符串渲染页面
                    for (j in res.data.hotSearchData) {
                        searchList[i].innerHTML += `<li>
                                                        <a href="javascript:;">
                                                            <i>${res.data.hotSearchData[j].rank}</i>
                                                            ${res.data.hotSearchData[j].title}
                                                        </a>
                                                    </li>`
                    }
                    //热搜榜出现
                    searchList[i].style.display = "block";
                    searchList[i].classList.add("cur");
                    //修改变量，避免数据重复添加
                    flag = false;
                }
            }).catch(err => {
                console.log("失败", err)
            })
        }

        //改变输入框提示文字颜色
        inputs[0].className = "cur";
        inputs[1].className = "cur";
        //关闭定时器,停止字体轮播
        clearInterval(placetimer);
        //取消冒泡，使热搜榜能够出现
        e.stopPropagation();
    }
}


/* 
    输入框内文字轮播
*/
sealAjax({
    url: 'http://106.52.74.37:8000/getHotSearch',
}).then(res => {
    //将数据赋值给全局空数组，使全局能够操作ajax返回的数据
    for (i in res.data.hotSearchData) {
        searchItems.push(res.data.hotSearchData[i].title);
    }
}).catch(err => {
    console.log("失败", err)
})

//创建一个空数组
var searchItems = [];
var placetimer = null;
num = 0;
function placeStart() {
    //避免定时器叠加
    clearInterval(placetimer);
    placetimer = setInterval(function () {
        num++;
        //判断是否超出最大索引
        num %= searchItems.length;
        inputs[0].setAttribute("placeholder", "" + searchItems[num]);
        inputs[1].setAttribute("placeholder", "" + searchItems[num]);
    }, 3000)
}
//输入框提示文字自动更换
placeStart();

/* 
    搜索框输入关键词 跳转页面
*/
//获取搜索框
var bannerSearch = document.querySelectorAll(".banner-search");
//获取搜索内容容器
var searchResult = document.querySelectorAll(".search-result");
//获取历史记录容器
var historyWrapper = document.querySelectorAll(".history-wrapper");
//获取历史记录列表
var history = document.querySelectorAll("ul.history");
// 清除建议框内容
function clearContent() {
    let size = searchResult[0].childNodes.length;
    for (let i = size - 1; i >= 0; i--) {
        searchResult[0].removeChild(searchResult[0].childNodes[i]);
    }
    searchResult[1].innerHTML = searchResult[0].innerHTML;
};

//绑定输入框键盘抬起事件
inputs[0].onkeyup = callInterface;
inputs[1].onkeyup = callInterface;

//绑定输入框单击事件,若输入框未清空,再次单击时搜索内容依旧显示
inputs[0].addEventListener('click', callInterface);
inputs[1].addEventListener('click', callInterface);

//调用百度接口函数
function callInterface() {
    //热搜榜消失，搜索内容出现
    searchList[0].style.display = "none";
    searchList[1].style.display = "none";
    searchResult[0].style.display = "block";
    searchResult[1].style.display = "block";
    //value值保持一致
    inputs[0].value = inputs[1].value = this.value;
    // 如果输入框内容为空 清除内容且无需跨域请求
    if (this.value.length === 0) {
        clearContent();
        //搜索内容消失,热搜榜出现
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
        //确保第一次单击搜索框时,热搜榜数据已经渲染完成
        if (searchList[0].getAttribute("class") == "search-list cur" || searchList[1].getAttribute("class") == "search-list cur") {
            searchList[0].style.display = "block";
            searchList[1].style.display = "block";
        }
        recordHistory(inputs[0].key);
        return;
    }
    if (this.timer) {
        clearTimeout(this.timer);
    }
    //如果检索不到相关内容,则搜索内容容器消失
    if (searchResult[0].innerText == '' && searchResult[1].innerText == '') {
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
    }
    // 函数节流优化
    this.timer = setTimeout(() => {
        // 创建script标签JSONP跨域
        var script = document.createElement("script");
        //src属性指向百度接口路径
        script.src = "https://www.baidu.com/sugrec?prod=pc&wd=" + encodeURI(this.value.trim()) + "&cb=handleSuggestion";
        //动态插入script标签
        document.body.appendChild(script);
    }, 130)
}

// 回调函数处理返回值
function handleSuggestion(res) {
    // 清空之前的数据！！
    clearContent();
    //定义一个空数组，用来接收返回的搜索结果
    let result = [];
    for (i in res.g) {
        result.push(res.g[i].q);
    }
    // 截取前十个搜索建议项
    if (result.length > 9) {
        result = result.slice(0, 10)
    }
    for (let i = 0; i < result.length; i++) {
        // 动态创建li标签
        let liObj = document.createElement("li");
        liObj.innerHTML = highlightText(result[i], inputs[0].value);
        searchResult[0].appendChild(liObj);
        searchResult[1].innerHTML = searchResult[0].innerHTML;
    }
    // 自执行匿名函数--删除用于跨域的script标签
    (function () {
        let s = document.querySelectorAll('script');
        for (let i = 1; i < s.length; i++) {
            document.body.removeChild(s[i]);
        }
    })()
}

//搜索结果中关键词 高亮
//source 原字符串  target 搜索关键词 
function highlightText(source, target) {
    //检索不到相关内容
    if (!source || !target) {
        return '';
    } else {
        //记录关键词开头下标,定位关键词
        let indexPosition = source.indexOf(target);
        //存在关键词
        if (indexPosition != -1) {
            //获取原字符串长度
            let sourceLength = source.length;
            //截取关键词前的内容,组成一个新数组
            let prefix = source.substring(0, indexPosition);
            //记录关键词之后的数组元素下标
            let suffixIndex = (prefix ? prefix.length : 0) + (target ? target.length : 0);
            //截取关键词之后的内容,组成另一个新数组
            let suffix = source.substring(suffixIndex, sourceLength);
            //当关键词在原字符串开头
            if (indexPosition == 0) {
                return `<span>${target}</span>${suffix}`;
                //当关键词在原字符串结尾
            } else if (indexPosition + target.length == source.length) {
                return `${prefix}<span">${target}</span>`;
                //当关键词在原字符串中间
            } else {
                return `${prefix}<span>${target}</span>${suffix}`;
            }
            //不存在关键词
        } else {
            return `<span>${source}<span/>`;
        }
    }
}


//跳转页面函数
function jumpPage(obj) {
    window.open(`https://www.baidu.com/s?word=${encodeURI(obj.value)}`);
}

// 事件委托 点击li标签或者点击搜索按钮跳转到百度搜索页面
bannerSearch[0].addEventListener("click", searchClick, false);
bannerSearch[1].addEventListener("click", searchClick, false);
var target = false;
function searchClick(e) {
    //单击li标签
    if (e.target.nodeName.toLowerCase() === 'li' && e.target.parentNode.className === 'search-result') {
        var keywords = e.target.innerText;
        inputs[0].value = keywords;
        inputs[1].value = keywords;
        jumpPage(inputs[0]);
        //关闭热搜榜
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
        target = true;
        //单击搜索按钮
    } else if (e.target.type === 'button') {
        jumpPage(inputs[0]);
        //关闭热搜榜
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
        target = true;
        //单击清除记录时历史记录清空，搜索框不会收起
    } else if (e.target.className == 'right' || e.target.nodeName.toLowerCase() === 'b') {
        clearHistory();
        searchList[0].style.display = "block";
        searchList[1].style.display = "block";
        e.stopPropagation();
    }
    inputs[0].key = inputs[0].value;


}

//保存历史记录
function recordHistory(info) {
    if (!target) {
        return;
    }
    //获取历史记录容器
    var historyWrapper = document.querySelectorAll(".history-wrapper");
    //获取历史记录列表
    var history = document.querySelectorAll("ul.history");
    var lis = history[0].getElementsByTagName('li');
    //内容查重
    for (let i = 0; i < lis.length; i++) {
        //搜索内容重复时，不增加新的历史记录
        if (lis[i].innerHTML == info) {
            return;
        }
    }
    // 动态创建li标签
    var liHis = document.createElement("li");
    liHis.innerHTML = info;
    //将新的历史记录插入容器首位
    history[0].insertBefore(liHis, history[0].children[0]);
    //最多只存储六条历史记录
    if (lis.length > 6) {
        history[0].removeChild(history[0].lastElementChild);
    }
    history[1].innerHTML = history[0].innerHTML;
    searchList[1].innerHTML = searchList[0].innerHTML;
    historyWrapper[0].style.display = "block";
    historyWrapper[1].style.display = "block";
    target = false;
}

//清除历史记录
function clearHistory() {
    //获取历史记录容器
    let historyWrapper = document.querySelectorAll(".history-wrapper");
    //获取历史记录列表
    let history = document.querySelectorAll("ul.history");
    let lis = history[0].getElementsByTagName('li');

    for (var i = lis.length - 1; i >= 0; i--) {
        history[0].removeChild(history[0].childNodes[i]);
    }
    history[1].innerHTML == history[0].innerHTML;
    historyWrapper[0].style.display = "none";
    historyWrapper[1].style.display = "none";
}

//回车页面跳转
bannerSearch[0].addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        jumpPage(inputs[0]);
        inputs[0].key = inputs[0].value;
        //关闭热搜榜
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
        target = true;
    };
}, false);

bannerSearch[1].addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        jumpPage(inputs[0]);
        inputs[0].key = inputs[0].value;
        //关闭热搜榜
        searchResult[0].style.display = "none";
        searchResult[1].style.display = "none";
        target = true;
    };
}, false);


/* 
    轮播图数据渲染
*/
//获取右侧菜单栏
let floatText = document.querySelector(".floatText");

//获取 正在热播 & 精彩推荐轮播图容器
let swiperWrapper = document.querySelectorAll(".swiper-wrapper");
//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getSwiper',
}).then(res => {
    //渲染轮播图右侧菜单栏数据
    floatText.innerHTML = `<div class="live-on cur">${res.data.liveData.liveState}</div>
                           <div class="live-introduce">${res.data.recommendData.recommendation}</div>
                           <ul class="swiper-pagination"></ul>
                            `
    //获取轮播图分页器
    let swiperPagination = document.querySelector(".swiper-pagination");
    for (j in res.data.recommendData.recomendContent) {
        swiperPagination.innerHTML += `<li class="bullet">
                                        <a href="${res.data.recommendData.recomendContent[j].link}" target="_blank">${res.data.recommendData.recomendContent[j].title}</a>
                                        </li>
                                      `
    }



    //渲染正在热播剧集内容区数据
    for (j in res.data.liveData.livePlay) {
        content.innerHTML += `<li>
                                    <a href="${res.data.liveData.livePlay[j].link}" target="_blank">
                                        <img src="${res.data.liveData.livePlay[j].imgSrc}">
                                    </a>
                                    <h5>
                                        <a href="${res.data.liveData.livePlay[j].link}" target="_blank">${res.data.liveData.livePlay[j].name}</a>
                                    </h5>
                                </li>

                             `
    }

    //渲染精彩推荐按轮播图数据
    for (j in res.data.recommendData.recomendContent) {
        swiperWrapper[1].innerHTML += `<a href="${res.data.recommendData.recomendContent[j].link}" target="_blank" class="swiper-slide">
                                        <img src="${res.data.recommendData.recomendContent[j].imgSrc}">
                                    </a>       
                                    `
    }


    //默认精彩推荐第一张显示
    let swiperSlide = document.querySelectorAll(".swiper-slide");
    swiperSlide[0].className = "swiper-slide current";

    /* 
        轮播图右侧菜单
    */
    let bannerWrapper = document.querySelector(".banner-wrapper");
    let liveOn = document.querySelector(".live-on");
    let liveIntro = document.querySelector(".live-introduce");
    let bullet = document.querySelectorAll(".bullet");
    var index = 0;
    var timer = null;
    /* 
        轮播图 自动播放
    */
    start();
    //开启定时器
    function start() {
        timer = setInterval(function () {
            index++;
            //判断轮播图是否超过最大索引
            index %= swiperSlide.length;
            bannerChange();
        }, 5000)
    }

    //关闭定时器
    function stop() {
        clearInterval(timer);
    }


    //轮播图变化函数
    function bannerChange() {
        if (index == 0) {
            swiperWrapper[0].className = "swiper-wrapper cur";
            swiperWrapper[1].className = "swiper-wrapper";
            //右侧菜单标题颜色变化
            liveOn.className = "live-on cur";
            liveIntro.className = "live-introduce";
        } else {
            swiperWrapper[0].className = "swiper-wrapper";
            swiperWrapper[1].className = "swiper-wrapper cur";
            liveOn.className = "live-on";
            liveIntro.className = "live-introduce cur";

        }
        //所有背景图消失
        for (var i = 0; i < swiperSlide.length; i++) {
            swiperSlide[i].className = "swiper-slide";
        }
        //当前背景图出现
        swiperSlide[index].className = "swiper-slide current";

        //右侧菜单栏小标题轮播
        for (var i = 0; i < bullet.length; i++) {
            bullet[i].className = "bullet";
        }
        if (index >= 1) {
            bullet[index - 1].className = "bullet active";
        }
    }

    // 鼠标移入时,关闭定时器
    bannerWrapper.onmouseenter = stop;
    // 鼠标移出时,开始定时器
    bannerWrapper.onmouseleave = start;

    //正在热播绑定鼠标移入事件
    liveOn.onmouseenter = function () {
        index = 0;
        bannerChange();
    }


    for (var i = 0; i < bullet.length; i++) {
        //记录索引
        bullet[i].num = i;
        //为精彩推荐每一个菜单栏绑定鼠标移入事件
        bullet[i].onmouseenter = function () {
            index = this.num + 1;
            bannerChange();
        }
    }

}).catch(err => {
    console.log("失败", err)
})



/* 
    横向滚动条 左右滚动
*/

//向左倒退按钮
function scrollBack(obj, x, target) {
    obj.onclick = function () {
        //节流
        if (!flag) {
            return;
        }

        //正在热播剧集列表 
        if (obj == pro) {
            content.style.transition = "all .7s";
            content.style.marginLeft = content.offsetLeft + x + "px";
            //向右快进按钮出现
            next.style.display = "block";
            //保存新的margin-left值
            var newLeft = content.offsetLeft + x;
            if (newLeft >= target) {
                content.style.marginLeft = target + "px";
                //向左倒退按钮消失
                pro.style.display = "none";
            }
            //直播导视节目列表
        } else if (obj == proBtn) {
            streamUl.style.transition = "all .7s";
            streamUl.style.marginLeft = streamUl.offsetLeft + x + "px";
            //向右快进按钮恢复默认样式
            nextBtn.className = "next-btn";
            //保存新的margin-left值
            let newLeft = streamUl.offsetLeft + x;
            if (newLeft >= target) {
                streamUl.style.marginLeft = target + "px";
                proBtn.className = "pro-btn grey-left";
            }
        }

        //关闭节流阀
        flag = false;
        //延迟一定的时候开启节流阀
        setTimeout(function () {
            flag = true;
        }, 700)
    }
}

//向右快进按钮
function scrollForward(obj, x, target) {
    obj.onclick = function () {
        //节流
        if (!flag) {
            return;
        }

        //正在热播剧集列表 
        if (obj == next) {
            content.style.transition = "all .7s";
            content.style.marginLeft = content.offsetLeft - x + "px";
            //向左倒退按钮出现
            pro.style.display = "block";
            //保存新的margin-left值
            var newLeft = content.offsetLeft - x;
            //当剧集右侧滚到尽头时
            if (newLeft <= target) {
                content.style.marginLeft = target + "px";
                //向右快进按钮消失
                next.style.display = "none";
            }
        } else if (obj == nextBtn) {
            streamUl.style.transition = "all .7s";
            streamUl.style.marginLeft = streamUl.offsetLeft - x + "px";
            //向左倒退按钮恢复默认样式
            proBtn.className = "pro-btn";
            //保存新的margin-left值
            let newLeft = streamUl.offsetLeft - x;
            //当剧集右侧滚到尽头时
            if (newLeft <= target) {
                streamUl.style.marginLeft = target + "px";
                nextBtn.className = "next-btn grey-right";
            }
        }
        flag = false;
        //延迟一定的时候再次单击才执行
        setTimeout(function () {
            flag = true;
        }, 700)
    }
}




/* 
    今日热门 数据渲染
*/
//获取今日热门图片
let popularImgLi = document.querySelectorAll(".popular-today>li");

//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getHotTopic',
}).then(res => {
    //使用模板字符串渲染页面
    for (var i = 0; i < popularImgLi.length; i++) {
        popularImgLi[i].innerHTML = `<a href="${res.data.hotTopicData[i].img.link}" target="_blank">
                                        <img data-src=${res.data.hotTopicData[i].img.src}>
                                    </a>
                                    <h5>
                                        <a href="${res.data.hotTopicData[i].title.link}" target="_blank">${res.data.hotTopicData[i].title.text}</a>
                                    </h5>`
    }

    //第一个热门看点内容
    popularImgLi[0].innerHTML = `<a href="${res.data.hotTopicData[0].img.link}" target="_blank">
                                    <img data-src=${res.data.hotTopicData[0].img.src}>
                                </a>
                                <div class="text">
                                    <h5>
                                        <a href="${res.data.hotTopicData[0].title.link}" target="_blank">${res.data.hotTopicData[0].title.text}</a>
                                    </h5>
                                    <p class="brief">${res.data.hotTopicData[0].brief}</p>
                                </div>`
    //获取今日热门图片
    let popularImg = document.querySelectorAll(".popular-today img");
    // 绑定页面滚动和加载事件
    window.onload = window.onscroll = thorttle(lazyload, popularImg, 200);
}).catch(err => {
    console.log("失败", err)
})

/* 
    今日热门 && 直播导视(本周CCTV) && 精品 && 片库 && 看点 使用懒加载
*/

function lazyload(Imgs) {
    //获取浏览器可视区域的高度
    let viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //获取浏览器滚动高度
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (let i = 0; i < Imgs.length; i++) {
        //滚动条与页面左侧的距离
        let st = Imgs[i].offsetTop;
        let ofparent = Imgs[i].offsetParent;
        while (ofparent != null) {
            st += ofparent.offsetTop;
            ofparent = ofparent.offsetParent;
        }
        //当需要加载的图片滚到可视区域
        if (st < viewHeight + scrollTop) {
            Imgs[i].src = Imgs[i].getAttribute('data-src');
        }
    }
}

//给滚动添加节流函数
function thorttle(fn, Imgs, delay) {
    var timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn(Imgs);
                timer = null
            }, delay)
        }
    }
}

//获取本周CCTV图片
let thisWeekImgs = document.querySelectorAll(".this-week-program>img");
//获取精品图片
let zoneImgs = document.querySelectorAll(".zone-wrapper img");
//获取片库图片
let televisionImgs = document.querySelectorAll(".lazy .television-program>img");


// 绑定滚动事件并懒加载
window.addEventListener('scroll', thorttle(lazyload, thisWeekImgs, 200));
window.addEventListener('scroll', thorttle(lazyload, zoneImgs, 200));
window.addEventListener('scroll', thorttle(lazyload, televisionImgs, 200));

/* 
    侧边导航栏 && 顶部第二个导航条出现与消失
*/
//获取侧边导航栏
let floatNav = document.querySelector(".floatNav");
//获取今日热门外层容器
let popularColumn = document.querySelector(".popular-column");
//获取第二个导航条
let secondHeader = document.querySelector(".second-header");

//banner部分下方导航栏分区中间位置与页面顶部的距离
let st = navt[navt.length - 1].offsetTop;
let parent = navt[navt.length - 1].offsetParent;
while (parent != null) {
    st += parent.offsetTop;
    parent = parent.offsetParent;
}

// 页面滚动事件
window.addEventListener('scroll', function () {
    //页面滚动到banner部分下方导航栏分区的中间位置
    if (window.pageYOffset >= st) {
        //侧边导航栏出现
        floatNav.style.display = "block";
    } else {
        //侧边导航栏消失
        floatNav.style.display = "none";
    }

    //页面滚动到热门搜索
    if (window.pageYOffset >= popularColumn.offsetTop) {
        //第二个导航条出现
        secondHeader.style.opacity = "1";
        secondHeader.style.visibility = "visible";
        secondHeader.style.pointerEvents = "auto";
    } else {
        //第二个导航条消失
        secondHeader.style.visibility = "hidden";
        secondHeader.style.opacity = "0";
        secondHeader.style.pointerEvents = "hidden";
    }
})


/* 
    频道列表弹出层 滑出与消失
*/
let secondNavLi = document.querySelectorAll("ul.second-nav-list>li.pop-wrapper");
let channelPopup = document.querySelectorAll(".channel-popup");
//声明变量存储定时器id，用来防抖
var timeID = null;
for (var i = 0; i < secondNavLi.length; i++) {
    //记录索引
    secondNavLi[i].num = i;
    secondNavLi[i].onmouseenter = function () {
        index = this.num;
        //清除上一次的定时器
        clearTimeout(timeID)
        timeID = setTimeout(function () {
            channelPopup[index].style.animation = "channelSlideDown .45s linear 0s 1 both";
            switch (index) {
                //频道大全弹出层
                case 0:
                    channelPopup[index].style.animationName = "channelSlideDown";
                    break;
                //栏目大全弹出层
                case 1:
                    channelPopup[index].style.animationName = "columnSlideDown";
                    break;
                case 2:
                    channelPopup[index].style.animationName = "highlightDown";
                    break;
                case 3:
                    channelPopup[index].style.animationName = "allDown";
                    break;
            }

            //鼠标移入的Li增加类名
            secondNavLi[index].classList.add("current");
        }, 200)

    }

    secondNavLi[i].onmouseleave = function () {
        clearTimeout(timeID)
        //保存判断前index的值
        var currentIndex = index;
        channelPopup[index].style.animation = "channelSlideUp .45s linear 0s 1 both";
        switch (index) {
            //频道大全弹出层
            case 0:
                channelPopup[index].style.animationName = "channelSlideUp";
                break;
            //栏目大全弹出层
            case 1:
                channelPopup[index].style.animationName = "columnSlideUp";
                break;
            case 2:
                channelPopup[index].style.animationName = "highlightUp";
                break;
            case 3:
                channelPopup[index].style.animationName = "allUp";
        }


        //延时调用，使弹出层收起后阴影消失
        var timer = setTimeout(function () {
            //做二次判断，确保延时前的index还是原来的值
            // if (currentIndex == index) {
            secondNavLi[currentIndex].classList.remove("current");
            // }
        }, 450);
    }


}


/* 
    栏目大全 内容切换
*/
//获取栏目切换选项
let columnBtn = document.querySelectorAll(".column-header li");
//获取栏目大全内容
let columnBody = document.querySelectorAll(".column-body");
var indexId;
//默认显示第一个栏目大全内容
columnBody[0].style.display = "block";
for (var i = 0; i < columnBtn.length; i++) {
    //记录索引
    columnBtn[i].num = i;
    //为栏目切换选项绑定单击响应函数
    columnBtn[i].onclick = function () {
        indexId = this.num;
        //所有选项为默认样式
        for (var j = 0; j < columnBtn.length; j++) {
            columnBtn[j].className = ""
            //隐藏所有栏目大全内容
            columnBody[j].style.display = "none";
        }
        //当前选项为选中样式
        columnBtn[indexId].className = "cur";
        //显示所有栏目大全内容
        columnBody[indexId].style.display = "block";
    }
}


/* 
    直播导视 自动刷新图标旋转
*/
let refreshBtn = document.querySelector(".refresh-wrapper");
let refresh = document.querySelector(".refresh");
refreshBtn.onclick = function () {
    //节流
    if (!flag) {
        return;
    }
    refresh.className = "refresh hopt";
    //关闭节流阀
    flag = false;
    //延迟一定的时候开启节流阀
    setTimeout(function () {
        refresh.className = "refresh";
        flag = true;
    }, 400)

}


/* 
    直播导视 渲染数据
*/

//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getLiveGuide',
}).then(res => {
    for (i in res.data) {
        streamUl.innerHTML += `<li>
                                    <div class="li-con">
                                        <a href="${res.data[i].img.link}" target="_blank">
                                            <img src="${res.data[i].img.src}">
                                            <i>${res.data[i].topic}</i>
                                        </a>
                                        
                                        <div class="time">
                                            <a href="${res.data[i].img.link}" target="_blank">${res.data[i].time.startTime} - ${res.data[i].time.endTime}</a>
                                        </div>
                                        <div class="brief">
                                            <a href="${res.data[i].img.link}" target="_blank">${res.data[i].itemName}</a>
                                        </div>
                                    </div>
                                    <!-- 下划线 -->
                                    <span class="li-line"></span>
                                </li>
                              `
    }

}).catch(err => {
    console.log("失败", err)
})



/* 
    片库 剧集切换
*/
//获取种类菜单栏
let typeBtn = document.querySelectorAll(".type-menu a");
//获取片库四种内容区
let cont = document.querySelectorAll(".cont");

//默认显示电视剧内容区
cont[0].style.left = "0";
cont[0].style.display = "block";
for (var i = 0; i < typeBtn.length; i++) {
    //记录索引
    typeBtn[i].num = i;
    //绑定鼠标移入事件
    typeBtn[i].onmouseenter = function () {
        index = this.num;
        if (typeBtn[index].className != "cur-type") {
            //全部栏目为默认样式
            for (var i = 0; i < typeBtn.length; i++) {
                if (typeBtn[i].className == "cur-type") {
                    typeBtn[i].classList.remove("cur-type");
                    cont[i].style.left = "0";
                    move(cont[i], -1524, 400);
                }

            }
            //鼠标移入的一栏添加类名
            typeBtn[index].classList.add("cur-type");
            cont[index].style.left = "1524px";
            cont[index].style.display = "block";
            move(cont[index], 0, 400)
        }
    }

}

function move(obj, target, speed) {
    //关闭上一个定时器
    clearInterval(obj.timer);
    //开启一个定时器，用来执行动画效果
    obj.timer = setInterval(function () {
        //获取元素目前的位置
        var current = parseInt(getComputedStyle(obj, null)["left"]);
        var newValue = current - speed;
        if (newValue <= target) {
            newValue = target;
        }
        obj.style.left = newValue + "px";
        if (newValue == target) {
            //达到目标，关闭定时器
            clearInterval(obj.timer);
            //0 减到 -1524
            if (target < 0) {
                obj.style.left = "1524px";
                obj.style.display = "none";
            }
        }
    }, 70)
}


/* 
    看点数据渲染
*/
//获取看点顶部导航条
let attentionNav = document.querySelector(".attention-nav");
//获取图片列表容器
let attentionImgWrapper = document.querySelectorAll(".attention-img-wrapper");
//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getHighLight',
}).then(res => {
    //渲染顶部导航条内容
    for (i in res.data.navigation) {
        attentionNav.innerHTML += `<a href="${res.data.navigation[i].link}" target="_blank">${res.data.navigation[i].text}</a>`
    }


    //渲染图片列表
    for (let i = 0; i < 18; i++) {
        attentionImgWrapper[0].innerHTML += `<li>
                                                <a href="${res.data.highlightData[i].img.link}" target="_blank">
                                                    <img data-src="${res.data.highlightData[i].img.src}">
                                                </a>
                                                <div class="attention-text">
                                                    <h3>
                                                        <a href="${res.data.highlightData[i].title.link}" target="_blank">${res.data.highlightData[i].title.text}</a>
                                                    </h3>
                                                    <p class="brief">
                                                        <a href="${res.data.highlightData[i].keyword.link}" target="_blank">${res.data.highlightData[i].keyword.text}</a>
                                                    </p>
                                                </div>
                                            </li>
                                            `
    }

    for (let i = 18; i < 36; i++) {
        attentionImgWrapper[1].innerHTML += `<li>
                                                <a href="${res.data.highlightData[i].img.link}" target="_blank">
                                                    <img data-src="${res.data.highlightData[i].img.src}">
                                                </a>
                                                <div class="attention-text">
                                                    <h3>
                                                        <a href="${res.data.highlightData[i].title.link}" target="_blank">${res.data.highlightData[i].title.text}</a>
                                                    </h3>
                                                    <p class="brief">
                                                        <a href="${res.data.highlightData[i].keyword.link}" target="_blank">${res.data.highlightData[i].keyword.text}</a>
                                                    </p>
                                                </div>
                                            </li>
                                            `
    }

    for (let i = 36; i < 54; i++) {
        attentionImgWrapper[2].innerHTML += `<li>
                                                <a href="${res.data.highlightData[i].img.link}" target="_blank">
                                                    <img data-src="${res.data.highlightData[i].img.src}">
                                                </a>
                                                <div class="attention-text">
                                                    <h3>
                                                        <a href="${res.data.highlightData[i].title.link}" target="_blank">${res.data.highlightData[i].title.text}</a>
                                                    </h3>
                                                    <p class="brief">
                                                        <a href="${res.data.highlightData[i].keyword.link}" target="_blank">${res.data.highlightData[i].keyword.text}</a>
                                                    </p>
                                                </div>
                                            </li>
                                            `
    }

    let attentionLi = document.querySelectorAll(".attention-img-wrapper>li");
    for (let i = 5; i < 54; i += 6) {
        attentionLi[i].className = "disappear-zero";
    }

    for (let i = 4; i < 54; i += 6) {
        attentionLi[i].className = "disappear-first";
    }

    for (let i = 3; i < 54; i += 6) {
        attentionLi[i].className = "disappear-second";
    }

    //获取看点图片
    let attentionImgs = document.querySelectorAll(".attention-img-wrapper img");
    // 绑定页面滚动和加载事件
    window.addEventListener('scroll', thorttle(lazyload, attentionImgs, 200));

}).catch(err => {
    console.log("失败", err)
})

/* 
    收视Top榜 数据渲染
*/
let audienceUl = document.querySelectorAll(".audience-content>ul");
//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getHotSearch',
}).then(res => {
    for (i in res.data.hotSearchData) {
        audienceUl[0].innerHTML += `<li>
                                    <i>${res.data.hotSearchData[i].rank}</i>
                                    <a href="javascript:;">${res.data.hotSearchData[i].title}</a>
                                 </li>
                                `
    }

}).catch(err => {
    console.log("失败", err)
})

/* 
    节目品牌 横向扩展长图片
*/
let brandItem = document.querySelectorAll(".brand-item");
for (var i = 0; i < brandItem.length; i++) {
    ///记录索引
    brandItem[i].num = i;
    //绑定鼠标移入事件
    brandItem[i].onmouseenter = function () {
        index = this.num;
        if (index > brandItem.length / 2) {
            for (var i = 3; i < brandItem.length; i++) {
                brandItem[i].style.width = "0";
                brandItem[i].style.padding = "0";
            }
        }

        brandItem[index].style.width = "846px";
        brandItem[index].style.padding = "";

    }

    brandItem[i].onmouseleave = function () {
        for (var i = 0; i < brandItem.length; i++) {
            brandItem[i].style.width = "";
            brandItem[i].style.padding = "";
        }
    }
}

/* 
    央视大全 数据渲染
*/
//获取央视大全栏目列表
let programBody = document.querySelector(".program-body");
//获取央视大全栏目底部
let programFooter = document.querySelector(".program-footer");
//获取服务器数据
sealAjax({
    url: 'http://106.52.74.37:8000/getProgram',
}).then(res => {
    for (i in res.data.programData) {
        programBody.innerHTML += `<li>
                                    <a href="javascript:;">
                                        ${res.data.programData[i].name}
                                        <br>
                                        ${res.data.programData[i].topic}
                                    </a>
                                    <span></span>
                                </li>
                                `

        programFooter.innerHTML += `<div class="list-box">
                                        <div class="play-box">
                                            <div class="play-inner">
                                                <a href="${res.data.programData[i].img.link}" target="_blank">
                                                    <img src="${res.data.programData[i].img.src}">
                                                </a>
                                                <div class="play-text">
                                                    <p>正在播出：</p>
                                                    <a href="javascript:;">${res.data.programData[i].programList[0].text}</a>
                                                    <p>精彩预告：</p>
                                                    <a href!>${res.data.programData[i].programList[1].text}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="prom-list">
                                            <ul></ul>
                                        </div>
                                    </div>
                                    `
        let promUl = document.querySelectorAll(".prom-list>ul")[i];
        for (j in res.data.programData[i].programList) {
            promUl.innerHTML += `<li>
                                    <a href="${res.data.programData[i].programList[j].href}" target="_blank">${res.data.programData[i].programList[j].text}</a>
                                </li>
                                `
        }

    }

    let programLi = document.querySelectorAll(".program-body>li");
    let listBox = document.querySelectorAll(".list-box");
    //默认第一个为选中状态
    programLi[0].className = "cur";
    listBox[0].style.display = "block";
    for (var i = 0; i < programLi.length; i++) {
        programLi[i].num = i;
        //为每一个Li绑定单击响应函数
        programLi[i].onclick = function () {
            index = this.num;
            //所有Li默认无类名
            for (var j = 0; j < programLi.length; j++) {
                programLi[j].className = ""
                listBox[j].style.display = "none";
            }
            //修改当前单击Li的类名，出现红色下划线
            programLi[index].className = "cur";
            listBox[index].style.display = "block";
        }

    }


}).catch(err => {
    console.log("失败", err)
})

/* 
    侧边栏添加图片
*/
let floatNavItem = document.querySelectorAll(".floatNav-item");
for (let i = 0; i < floatNavItem.length; i++) {
    //初始默认图片
    floatNavItem[i].style.backgroundImage = "url(images/floatNav-item-" + (i + 1) + ".png)";

}

/* 
    侧边栏到达指定位置
*/
let floatNavLi = document.querySelectorAll(".floatNav ul>li");
let layout = document.querySelectorAll(".layout");
//绑定点击事件
for (let i = 0; i < layout.length; i++) {
    floatNavLi[i].addEventListener('click', function () {
        window.scrollTo({
            top: layout[i].offsetTop - secondHeader.offsetHeight,
            behavior: "smooth"
        })
    })
}



//回到顶部
let backTop = document.querySelector(".back-top");
//绑定单击事件
backTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})


// 滚动的页面位置相应侧边栏部分变蓝
window.addEventListener('scroll', function () {
    //节流
    if (!flag) {
        return;
    }
    //央视大全前五个部分样式
    for (let i = 0; i < layout.length - 1; i++) {
        //页面滚动到相应区域时
        if (window.pageYOffset >= layout[i].offsetTop - secondHeader.offsetHeight && window.pageYOffset < layout[i].offsetTop + layout[i].offsetHeight - secondHeader.offsetHeight) {
            //侧边栏对应部分为选中样式
            floatNavItem[i].style.backgroundImage = "url(images/floatNav-item-cur-" + (i + 1) + ".png)";
            floatNavItem[i].style.color = "#0084ff";
        } else {
            //其余部分为默认样式
            floatNavItem[i].style.backgroundImage = "url(images/floatNav-item-" + (i + 1) + ".png)";
            floatNavItem[i].style.color = "#222";
        }
    }

    //央视大全部分样式
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (scrollHeight > clientHeight && Math.round(scrollTop + clientHeight) == scrollHeight) {
        floatNavItem[5].style.backgroundImage = "url(images/floatNav-item-cur-" + 6 + ".png)";
        floatNavItem[5].style.color = "#0084ff";
    } else {
        floatNavItem[5].style.backgroundImage = "url(images/floatNav-item-" + 6 + ".png)";
        floatNavItem[5].style.color = "#222";
    }

    //关闭节流阀
    flag = false;
    //延迟一定的时候开启节流阀
    setTimeout(function () {
        flag = true;
    }, 5)

})

// function floatNavHover() {
for (var i = 0; i < floatNavItem.length; i++) {
    //记录索引
    floatNavItem[i].num = i;
    //鼠标移入，图片变蓝
    floatNavItem[i].onmouseenter = function () {
        index = this.num;
        floatNavItem[index].style.backgroundImage = "url(images/floatNav-item-cur-" + (index + 1) + ".png)";
        floatNavItem[index].style.color = "#0084ff";
    }
    //鼠标移出，图片为默认样式
    floatNavItem[i].onmouseleave = function () {
        floatNavItem[index].style.backgroundImage = "url(images/floatNav-item-" + (index + 1) + ".png)";
        floatNavItem[index].style.color = "#222";
    }
}
// }

// floatNavHover();

/* 
    侧边栏拖拽并调整模块顺序
*/
for (let i = 0; i < layout.length; i++) {
    //遍历绑定鼠标按下事件
    floatNavLi[i].addEventListener('mousedown', e => {
        //侧边栏li的偏移量
        let ol = e.clientX - floatNavLi[i].offsetLeft;
        let ot = e.clientY;
        let lastY = null;
        floatNavLi[i].static = null;
        document.onmousemove = (e) => {
            let left = e.clientX - ol;
            let top = e.clientY - ot;
            let curY = e.clientY;
            floatNavLi[i].style.left = left + "px";
            floatNavLi[i].style.top = top + "px";
            if (lastY == null) {
                lastY = curY;
                return;
            }
            for (let j = 0; j < layout.length; j++) {
                floatNavLi[j].style.transform = "translate3d(0px,0px,0px)";
                //初始化定义pass属性为0
                floatNavLi[j].pass = 0;
                //向下拖拽
                if (j > i && floatNavLi[i].getBoundingClientRect().top + floatNavLi[i].offsetHeight > floatNavLi[j].getBoundingClientRect().top) {
                    floatNavLi[i].static = "down";
                    floatNavLi[j].style.transform = "translate3d(0px,-80px,0px)";
                    //每经过一个li，其属性pass变为1
                    floatNavLi[j].pass = 1;
                    //中途变卦往上拖拽
                    if (curY < lastY && floatNavLi[i].getBoundingClientRect().top - floatNavLi[i].offsetHeight < floatNavLi[j].getBoundingClientRect().top) {
                        floatNavLi[j].style.transform = "translate3d(0px,0px,0px)";
                        floatNavLi[j].pass = 0;
                        continue;
                    }
                    lastY = curY;
                    //向上拖拽
                } else if (j < i && floatNavLi[i].getBoundingClientRect().top - floatNavLi[i].offsetHeight < floatNavLi[j].getBoundingClientRect().top) {
                    floatNavLi[i].static = "up";
                    floatNavLi[j].style.transform = "translate3d(0px,80px,0px)";
                    floatNavLi[j].pass = 1;
                    //中途变卦往下拖拽
                    if (curY > lastY && floatNavLi[i].getBoundingClientRect().top + floatNavLi[i].offsetHeight > floatNavLi[j].getBoundingClientRect().top) {
                        floatNavLi[j].style.transform = "translate3d(0px,0px,0px)";
                        floatNavLi[j].pass = 0;
                        continue;
                    }
                    lastY = curY;
                }
            }

        }
        document.onmouseup = () => {
            for (let j = 0; j < layout.length; j++) {
                if (i == j) {
                    continue;
                }
                //向下拖拽
                if (floatNavLi[i].static == "down") {
                    //未拖至结尾时，插入位置在属性pass为1和0之间
                    if (floatNavLi[j].pass - floatNavLi[j + 1].pass == 1) {
                        replaceContent(i, j);
                        break;
                        //拖至结尾时
                    } else {
                        if (j == layout.length - 1) {
                            replaceContent(i, j);
                            break;
                        }
                        continue;
                    }
                    //向上拖拽
                } else if (floatNavLi[i].static == "up") {
                    //未拖至开头时，插入位置在属性pass为0和1之间
                    if (floatNavLi[j].pass - floatNavLi[j + 1].pass == -1) {
                        replaceContent(i, j);
                        break;
                        //拖至开头时
                    } else {
                        if (j == 0) {
                            replaceContent(i, j);
                            break;
                        }
                        continue;
                    }
                }
            }
            for (let j = 0; j < layout.length; j++) {
                floatNavLi[j].style.transform = "";
            }

            floatNavLi[i].style.left = "0";
            floatNavLi[i].style.top = "0";
            //取消document的onmousemove事件
            document.onmousemove = null;
            //取消document的onmouseup事件
            document.onmouseup = null;

        }
        //阻止浏览器默认行为
        e.preventDefault();

    })
}

//调换位置 begin:被挪动li的起始下标 end:被挪动li的终止下标
function replaceContent(begin, end) {
    //获取所有板块父节点
    let parent = layout[begin].parentNode;
    //深拷贝板块对象
    let layoutTemp = layout[begin].cloneNode(true);
    //删除拖拽对象原本的位置
    parent.removeChild(layout[begin]);
    //插入新位置
    parent.insertBefore(layoutTemp, layout[end]);
    let temp = floatNavLi[begin].innerHTML;
    //拖至开头
    if (end == 0) {
        for (let j = layout.length - 1; j > 0; j--) {
            if (j <= begin) {
                floatNavLi[j].innerHTML = floatNavLi[j - 1].innerHTML;
                layout[j].innerHTML = layout[j - 1].innerHTML;
            }
        }
    //拖至结尾
    } else if (end == layout.length - 1) {
        for (let j = 1; j < layout.length; j++) {
            if (j > begin) {
                floatNavLi[j - 1].innerHTML = floatNavLi[j].innerHTML;
                layout[j - 1].innerHTML = layout[j].innerHTML;
            }
        }
    //拖至中间
    } else {
        for (let j = 0; j < layout.length; j++) {
            if (begin <= j && j < end) {
                floatNavLi[j].innerHTML = floatNavLi[j + 1].innerHTML;
                layout[j].innerHTML = layout[j + 1].innerHTML;
            }
        }
    }
    floatNavLi[end].innerHTML = temp;
}











