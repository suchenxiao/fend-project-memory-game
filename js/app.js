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
var $winPage = $('.win');

restart();

//点击卡片
$cards.on('click', function() {
	cardShow($(this));
	var $shown = $cards.filter('.show');
	if ($shown.length == 2){
		addMoves($moves);
		matching($shown);
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
	$stars.removeClass('fa-star-o');

	//隐藏结束页
	$winPage.css({'transform': 'scale(0,0)', 'opacity': 0});
}

//进行比对
function matching($obj){
	if ($obj.first().html() == $obj.last().html()){
		cardMatch($obj);
		if($cards.filter('.match').length == 16){
			gameWin($moves);
		}
	} else {
		$obj.css('animation','cardX 1s');
		setTimeout(function(){ cardHidden($obj); $obj.css('animation',''); }, 1000);
	}
}

//隐藏卡片
function cardHidden($obj){
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

//步数计算
function addMoves($obj){
    var n =  parseInt($obj.text());
    $obj.text(n+1);

	//调整星级
	if (n == 9){ $stars.eq(2).addClass('fa-star-o'); }
	if (n == 12){ $stars.eq(1).addClass('fa-star-o'); }
	if (n == 15){ $stars.eq(0).addClass('fa-star-o'); }
}

//游戏完成
function gameWin($obj){
	var words = $winPage.children('p').first().text().replace('some', parseInt($obj.text())).replace('little', 3-$stars.filter('.fa-star-o').length);
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
