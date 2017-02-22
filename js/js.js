//轮播图
(function () {
    function Tab(opt) {
        if (!opt.id) return;//当ID没有传的话，不执行任何程序
        this.default = {
            url: 'json/data.txt',
            duration: 4000,
            effect: 0
        };
        for (var attr in opt) {
            this.default[attr] = opt[attr];
        }
        //把全局变量，都作为私有属性写在构造函数中
        this.$box = $('#' + this.default.id);
        this.$oDiv = this.$box.find('.div1');
        this.$boxInner = this.$oDiv.find('.boxInner');
        this.$aDiv = null;//jquery没有DOM映射
        this.$aImg = null;//find:子子孙孙
        this.$ul = this.$oDiv.children('ul');
        this.$aLi = null;
        this.data = null;
        this.n = 0;
        this.timer = null;
        this.init();
    }
    Tab.prototype = {
        constructor: Tab,
        init: function () {
            var _this = this;
            //1.获取数据
            this.getData();
            //2.绑定数据
            this.bind();
            //3.延迟加载+第一张图片显示
            this.lazyImg();
            //4.图片渐隐渐现
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.autoMove();
            }, this.default.duration);
            //5.焦点自动轮播
            //6.鼠标移入停止移出继续
            this.overout();
            //7.点击焦点手动切换
            this.handleChange();
        },
        getData: function () {
            //jquery获取数据：$.ajax();
            var _this = this;
            $.ajax({//type,url,async,dataType,success  如果前端需要向后台传递数据：data.txt
                type: 'GET',
                url: _this.default.url,
                async: false,//同步
                dataType: 'json',
                success: function (val) {
                    _this.data = val;
                }
            })
        },
        bind: function () {
            if(window.navigator.userAgent.indexOf('MSIE')>=0){
                //遍历数据：$.each(对象,callback);
                var strDiv = '';
                var strLi = '';
                $.each(this.data, function (index, item) {
                    strDiv += '<div><img src="" realImg="' + item.imgSrc + '" alt=""></div>';
                    strLi += index == 0 ? '<li class="on1"></li>' : '<li></li>';
                });
                this.$boxInner.html(strDiv);
                this.$ul.html(strLi);
                this.$aDiv = this.$boxInner.children('div');
                this.$aImg = this.$boxInner.find('img');
                this.$aLi = this.$ul.children('li');
            }else {
                //遍历数据：$.each(对象,callback);
                var strDiv = '';
                var strLi = '';
                $.each(this.data, function (index, item) {
                    strDiv += '<div><img src="" realImg="' + item.imgSrc + '" alt=""></div>';
                    strLi += index == 0 ? '<li class="on"></li>' : '<li></li>';
                });
                this.$boxInner.html(strDiv);
                this.$ul.html(strLi);
                this.$aDiv = this.$boxInner.children('div');
                this.$aImg = this.$boxInner.find('img');
                this.$aLi = this.$ul.children('li');
            }

        },
        lazyImg: function () {
            var _this = this;
            $.each(this.$aImg, function (index, item) {
                var tmpImg = new Image;
                tmpImg.src = $(item).attr('realImg');
                tmpImg.onload = function () {
                    $(item).attr('src', tmpImg.src);
                    tmpImg = null;
                    _this.$aDiv.first().css('zIndex', 1).animate({opacity: 1})
                }
            })
        },
        autoMove: function () {
            if (this.n >= this.$aDiv.length - 1) {
                this.n = -1;
            }
            this.n++;
            this.setBanner();
        },
        setBanner: function () {
            var _this = this;
            $.each(this.$aDiv, function (index, item) {
                if (index == _this.n) {
                    $(item).css('zIndex', 1).siblings().css('zIndex', 0);
                    $(item).animate({opacity: 1}, function () {
                        $(item).siblings().animate({opacity: 0});
                    })
                }
            });
            this.bannerTip();
        },
        bannerTip: function () {
            var _this = this;
            $.each(this.$aLi, function (index, item) {
                if(window.navigator.userAgent.indexOf('MSIE')>=0){
                    item.className = index == _this.n ? 'on1' : null;
                }else {
                    item.className = index == _this.n ? 'on' : null;
                }
                /*if(index==_this.n){
                 $(item).addClass('on');
                 }else{
                 $(item).removeClass('on');
                 }*/
            });
            this.$box.attr('class', 'headerCon bg' + this.n % 6);
        },
        overout: function () {
            var _this = this;
            this.$boxInner.mouseover(function () {
                clearInterval(_this.timer);
            });
            this.$boxInner.mouseout(function () {
                _this.timer = setInterval(function () {
                    _this.autoMove();
                }, _this.default.duration);
            })
        },
        handleChange: function () {
            var _this = this;
            this.$aLi.click(function () {
                _this.n = $(this).index();
                _this.setBanner();
            });
        }
    };
    var tab1 = new Tab({
        id: 'headerCon'
    });
})();
//左侧选项卡
(function () {
    $(document).ready(function () {
        $('.ol li').mouseover(function () {
            $(this).children('.nav_more').show();
            $(this).siblings('li').children('.nav_more').hide();
        });
        $('.ol li').mouseout(function () {
            $(this).children('.nav_more').hide();
        })
    });
})();
//定时器
(function () {
    function timer() {
        var oP = document.getElementById("pp2"),
            oSpan = oP.getElementsByTagName('span')[0],
            oSpan1 = oP.getElementsByTagName('span')[1],
            oSpan2 = oP.getElementsByTagName('span')[2];
        countDown();
        setInterval(countDown, 1000);
        function getTime(n) {
            return n >= 0 && n < 10 ? '0' + n : '' + n;
        }
        function countDown() {
            var oDate = new Date();
            var s = Math.floor((new Date('2017/3/1 00:00:00') - oDate) / 1000);
            var d = Math.floor(s / 86400);
            s %= 86400;
            var h = Math.floor(s / 3600);
            s %= 3600;
            var m = Math.floor(s / 60);
            s %= 60;
            var str = getTime(h);
            var str1 = getTime(m);
            var str2 = getTime(s);
            oSpan.innerHTML = str;
            oSpan1.innerHTML = str1;
            oSpan2.innerHTML = str2;
        }
    }
    timer();
})();
//回到顶部
(function () {
    function Totop(opt) {
        if (!opt.id) return;
        this.default = {
            duration: 1000
        };
        for (var attr in opt) {
            this.default[attr] = opt[attr];
        }
        this.id = $('#' + this.default.id);
        this.init();
    }
    Totop.prototype = {
        constructor: Totop,
        init: function () {
            //1.点击按钮回到顶部
            this.goHome();
            //2.超过一屏显示，否则隐藏
            this.showHide();
            //3.点击立即隐藏
        },
        goHome: function () {
            var _this = this;
            this.id.click(function () {
                _this.id.hide();
                $(window).off('scroll');
                var target = $(window).scrollTop();
                var interval = 10;
                var step = target / _this.default.duration * interval;
                clearInterval(timer);
                var timer = setInterval(function () {
                    var curTop = $(window).scrollTop();
                    if (curTop <= 0) {
                        clearInterval(timer);
                        $(window).on('scroll', function () {
                            _this.computedDisplay();
                        });
                        return;
                    }
                    curTop -= step;
                    $(window).scrollTop(curTop);
                }, interval)
            })
        },
        showHide: function () {
            var _this = this;
            $(window).on('scroll', function () {
                _this.computedDisplay();
            })
        },
        computedDisplay: function () {
            if ($(window).scrollTop() > $(window).height()) {
                this.id.show();
            } else {
                this.id.hide();
            }
        }
    };
    var t1 = new Totop({
        id: 'toTop'
    })
})();
//隐藏搜索
(function () {
    var oNav = document.getElementById('headerNode');
    var oForm1 = document.getElementById('topForm');
    var oTxt1 = oForm1.getElementsByTagName('input')[0];
    var oS = oForm1.getElementsByTagName('span')[0];
    var oDiv2 = oForm1.getElementsByTagName('div')[0];
    var n = -1;
    var oldValue = null;
    window.onscroll = computedDisplay;
    function computedDisplay() {
        if (utils.win('scrollTop') > utils.win('clientHeight')) {//如果滚动距离>一屏
            oNav.style.display = 'block'
        } else {
            oNav.style.display = 'none'
        }
    }
})();
//延迟加载
(function () {
    $(function () {
        $("img").delayLoading({
            defaultImg: "img/140.png",   // 预加载前显示的图片
            errorImg: "img/140.png",   // 读取图片错误时替换图片(默认：与defaultImg一样)
            imgSrcAttr: "originalSrc",//记录图片路径的属性(默认：originalSrc，页面img的src属性也要替换为originalSrc)
            beforehand: 0,  // 预先提前多少像素加载图片(默认：0)
            event: "scroll", // 触发加载图片事件(默认：scroll)
            duration: "normal", // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
            container: window,     // 对象加载的位置容器(默认：window)
            success: function (imgObj) {
            }, // 加载图片成功后的回调函数(默认：不执行任何操作)
            error: function (imgObj) {
            }  // 加载图片失败后的回调函数(默认：不执行任何操作)
        });
    });
})();