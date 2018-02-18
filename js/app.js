//获取对象：卡片列表、星级列表、步数、重新开始
var $cards = $('.card');
var $stars = $('.stars li i');
var $moves = $('.moves');
var $restart = $('.restart');
//获取卡片内容(HTML)
var cardsHTML = [];
$cards.each(function(i) {
	cardsHTML[i] = $(this).html();
});

restart();

//点击卡片
$cards.on('click', function() {
	cardShow($(this));
	var $shown = $cards.filter('.show');
	if ($shown.length == 2){
		addMoves($moves);
		setTimeout(function(){ matching($shown); }, 500);
	}
})

//点击重新开始
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
	cardHidden($cards);

    //重新计算步数
    $moves.text(0);
}

//进行匹配
function matching($obj){
	if ($obj.first().html() == $obj.last().html()){
		cardMatch($obj);
		if($cards.filter('.match').length == 16){
			gameWin($moves);
		}
	} else {
		cardHidden($obj);
	}
}

//隐藏卡片
function cardHidden($obj){
    $obj.removeClass().addClass('card');
}

//显示卡片
function cardShow($obj){
    $obj.addClass('open show');
}

//匹配卡片
function cardMatch($obj){
    $obj.removeClass('show').addClass('match');
}

//步数计算
function addMoves($obj){
    var n =  parseInt($obj.text());
    $obj.text(n+1);
}

//游戏完成
function gameWin($obj){
    alert("Congratulations! With "+ parseInt($obj.text()) +" moves.");
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


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */



