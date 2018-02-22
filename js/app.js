//开始游戏，初始化
$(function(){
    restart();
});

//绑定对象：卡片列表、计时器、星级列表、步数、重新开始、结束页
var $cards = $('.card');
var $timer = $('.timer'), timed = 0, isTiming = false, t;
var $stars = $('.stars li i');
var $moves = $('.moves');
var $restart = $('.restart');
var $winPage = $('.win');

//获取卡片内容列表(HTML)
var cardsHTML = [];
$cards.each(function(i) {
	cardsHTML[i] = $(this).html();
});

//绑定卡片点击效果
$cards.on('click', function() {
	if(!isTiming){
        isTiming = true;
        timedCount();
    }
	cardShow($(this));
	var $shown = $cards.filter('.show');
	if ($shown.length == 2){
		movesAdd($moves);
		matching($shown);
	}
});

//绑定重新开始按钮
$restart.on('click', function() {
    restart();
});

//重新开始
function restart(){

    //准备洗牌列表
    shuffle(cardsHTML);

    //洗牌内容替换
    $cards.each(function(i) {
        $(this).html(cardsHTML[i]);
    });

    //隐藏全部卡片
	cardHide($cards);

    //重新计算步数
    $moves.text(0);
	$stars.removeClass('fa-star-o');

	//隐藏结束页
	$winPage.css({'transform': 'scale(0,0)', 'opacity': 0});

	//计时器归零
	stopCount();
}

//进行比对
function matching($obj){
	if ($obj.first().html() == $obj.last().html()){
		cardMatch($obj);
		if($cards.filter('.match').length == 16){
			gameWin();
		}
	} else {
		$obj.css('animation','cardX 1s').removeClass('show');
		setTimeout(function(){ cardHide($obj); $obj.css('animation',''); }, 1000);
	}
}

//隐藏卡片
function cardHide($obj){
    $obj.removeClass('open show match');
}

//翻开卡片
function cardShow($obj){
    $obj.addClass('open show');
}

//比对成功
function cardMatch($obj){
    $obj.removeClass('show').addClass('match');
}

//步数计算&调整星级
function movesAdd($obj){
    var n =  parseInt($obj.text());
    $obj.text(n+1);

	//调整星级
	if (n == 10){ $stars.eq(2).addClass('fa-star-o'); }
	if (n == 16){ $stars.eq(1).addClass('fa-star-o'); }
}

//计时器功能
//如果单位间隔短于1s，误差较大
function timedCount() {
    timed += 1;
    $timer.text(timed);
    t = setTimeout("timedCount()", 1000);
}
function stopCount() {
    timed = 0;
    $timer.text(timed);
    clearTimeout(t);
    isTiming = false;
}

//游戏完成
function gameWin(){
	var words = $winPage.children('p').first().text().replace('some', parseInt($moves.text())).replace('little', 3-$stars.filter('.fa-star-o').length).replace('many', timed);
	$winPage.children('p').first().text( words );
	$winPage.css({'transform': 'scale(1,1)', 'opacity': 1});
}

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
