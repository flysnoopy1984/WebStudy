//��ȡidԪ��
function $id(id){return document.getElementById(id);}
//����cookie
function setcookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
//��ȡcookie
function getcookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
//�ղؼ�
function addBookmark(){
	var urler=window.location.href;
	var titler=document.title;
	try{  
		window.external.AddFavorite(urler,titler);  
	}catch(e){  
		try{  
			window.sidebar.addPanel(titler,urler,"");  
		}catch(e){  
			alert("360���������֧���Զ�����ղؼС��رձ��Ի��������ʹ�ÿ�ݼ� Ctrl+D ������ӡ�");  
		}  
	}
}

//��ȫ�˳�
function nav_logout(){
	event.returnValue=confirm("ȷ��Ҫ�˳���Ա��½״̬��");
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++��Ա���ĵ� ��ʼ
//��ȡ���
function SByou_Net_Width(my){
	if($id('SBYOU_NET')){
		var SByou_Net_Width=$id('SBYOU_NET').offsetWidth;
	}
	//�����Ҳ�
	if($id('Left_669977_NET')){
		$id('Right_669977_NET')?$id('Right_669977_NET').style.width=SByou_Net_Width-$id('Left_669977_NET').offsetWidth-40+'px':'';
	}else{
		$id('Right_669977_NET')?$id('Right_669977_NET').style.width=SByou_Net_Width-40+'px':'';
	}

	SBYOU_NET_Height();
}
//��ȡ�߶�
function SBYOU_NET_Height(my){
	if($id('Left_669977_NET')){
		$id('Left_669977_NET').style.height='auto';
	}
	if($id('Right_669977_NET')){
		$id('Right_669977_NET').style.height='auto';
	}
	if($id('SBYOU_NET')){
		var SBYOU_NET_Height=$id('SBYOU_NET').offsetHeight-250;
	}
	if($id('Left_669977_NET')){
		if(SBYOU_NET_Height=='0'){
			SBYOU_NET_Height=888;
		}
		$id('Left_669977_NET').style.height=SBYOU_NET_Height+'px';
	}
}
//���ڴ�С�仯
window.onresize=function(){
	SByou_Net_Width();
	SBYOU_NET_Height();
	if($id("List_Box")){
		sort($id("List_Box"));
	}
}
//�ٲ���
function sort(el){
	
	if($id('SBYOU_NET').className=='SBYOU_NET SBYOU_NET101' || $id('SBYOU_NET').className=='SBYOU_NET SBYOU_NET102'){
		return false;
	}
	
	var h=[];
	var box=el.getElementsByTagName("li");
	if(!box[0]){
		return false;
	}
	var minH=box[0].offsetHeight,
	boxW=box[0].offsetWidth,
	boxH,
	n=$id('Right_669977_NET').offsetWidth / boxW | 0;
	el.style.width=n * boxW+"px";
	var right_Height=0;
	
	//����ȥ�ĸ߶�
	var sTop=(document.documentElement.scrollTop || document.body.scrollTop);
	//���ڸ߶�
	var wHeight=document.documentElement.clientHeight;

	for(var i=0;i<box.length;i++){
		boxh=box[i].offsetHeight;//��ȡÿ��Pin�ĸ߶�
		if(i<n){ //��һ��Pin�Ը������У�������Զ�λ
			h[i]=boxh;
			box[i].style.position='';
		}else{
			minH= Math.min.apply({},h);//ȡ�ø����ۼƸ߶���͵�һ��
			minKey=getarraykey(h,minH);
			h[minKey]+=boxh ;//�����¸߶Ⱥ���¸߶�ֵ
			box[i].style.position='absolute';
			box[i].style.top=minH+'px';
			box[i].style.left=(minKey * boxW)+'px';
		}
		//��������һ��߶�
		cur_LiallHehgit=minH+box[i].offsetHeight;
		if(right_Height<cur_LiallHehgit){
			right_Height=cur_LiallHehgit;
		}
		//������Ӵ��ڲż���
		if($id('Right_669977_NET').className=='Right_669977_NET'){
			if(minH>sTop && minH<(sTop+wHeight)){
				var ImgID=box[i].getAttribute('data');
				if(ImgID!='done'){
					if($id('Img'+ImgID)){
						var data_src=$id('Img'+ImgID).getAttribute('data-src');
					}
					if(data_src){
						$id('Img'+ImgID).src=data_src;
						box[i].setAttribute('data','done');
						$id('Img'+ImgID).setAttribute('data-src','');
					}
				}
			}
		}
	}
	//�������Ҳ��ܸ߶�
	if($id('AdBox1') || $id('pageBox')){
		if($id('AdBox1') && $id('AdBox2')){
			var addADHeight=$id('AdBox1').offsetHeight+$id('AdBox2').offsetHeight;
		}
		if($id('pageBox')){
			var addADHeight=addADHeight+$id('pageBox').offsetHeight;
		}
	}else{
		var addADHeight='';
	}
	if($id('List_Box')){
		$id('List_Box').style.height=right_Height+'px';
		$id('Right_669977_NET').style.height=right_Height+50+addADHeight+'px';
	}
	$id('Left_669977_NET').style.height=right_Height+40-250+50+addADHeight+'px';
};
/* ����������ĳһֵ�Ķ�Ӧ���� */
function getarraykey(s,v){
	for(k in s){
		if(s[k] == v){
			return k;
		}
	}
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++��Ա���ĵ� ����

//���ض���
function pageScroll(){
	var toolbarHeight=document.documentElement.clientHeight;
    window.scrollBy(0,-toolbarHeight);
    scrolldelay = setTimeout('pageScroll()',100);
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    if(sTop==0) clearTimeout(scrolldelay);
}


//�������������������ײ�����
window.onscroll=function(){
	var top = (document.documentElement.scrollTop || document.body.scrollTop);
	if($id('header')){
		var height=$id('header').offsetHeight;
		//���ض���
		if($id('pageScroll')){
			if(top>height){
				$id('pageScroll').style.display='block';
			}else{
				$id('pageScroll').style.display='none';
			}
		}
	}
	//������������
	if($id('navBox')){
		var navBoxTop=$id('navBox').offsetTop;
		if (top>navBoxTop){
			$(".topbox").addClass("topFLOAT");$(".UD").fadeIn();
		}else{
			$(".topbox").removeClass("topFLOAT");$(".UD").fadeOut();
		}
	}
	//����ҳ�Ҳม��
	if($id('PHBOX_Float')){
		var wei='';
		var ConBoxTop=$id('readcontainer').offsetTop+$id('PHBOX').offsetTop;
		if(top>ConBoxTop){
			var inHTML=$id('PHBOX').innerHTML;
			if(inHTML){
				$id('PHBOX').innerHTML='';
				$id('PHBOX_Float').innerHTML=inHTML;
				$id('PHBOX').style.visibility='hidden';
			}

			//�����ײ���ҳ�涥���ĸ߶�
			var FloatBottom2To=top+$id('PHBOX').offsetHeight;
			//��������ײ���ҳ�涥���ĸ߶�
			var FatherBottom2To=window.document.body.offsetHeight-$id('footer').offsetHeight;
			
			if(FloatBottom2To>FatherBottom2To){
				$id('PHBOX_Float').className='box PHBOX_Float PHBOX_Float_bottom';
			}else{
				$id('PHBOX_Float').className='box PHBOX_Float PHBOX_Float_on';
			}
		}else{
			var inHTML=$id('PHBOX_Float').innerHTML;
			if(inHTML){
				$id('PHBOX_Float').innerHTML='';
				$id('PHBOX').innerHTML=inHTML;
				$id('PHBOX').style.visibility='visible';
			}
			$id('PHBOX_Float').className='box PHBOX_Float';
		}
	}
}
//����ַ���ǰ��ո�
function Trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//�ύ����
function SoNow(){
	var ToTypeid=Trim($id('typeid').value);
	var ToKey=encodeURI(Trim($id('key').value));
	if(!ToKey){
		var ToUrl=SO_URL;
		window.open(ToUrl);
		return false;
	}else{
		if(ToTypeid=='author'){
			var ToUrl=SO_URL+'?author-'+ToKey+'-'+'1.html';
		}else if(isNaN(ToTypeid)){
			var ToUrl=SO_URL+'?'+ToKey+'-'+ToTypeid+'-'+'1.html';
		}else{
			var ToUrl=SO_URL+'?'+ToKey+'.html';
		}
		window.open(ToUrl);
		return false;
	}
	return false;
}
//��������
document.onkeydown=function(e){
	if($id('key')){
		var theEvent=window.event || e;var keycode=theEvent.keyCode || theEvent.which;
		if(keycode=='13'){
			if($id('key')==document.activeElement){
				SoNow();
			}
		}
	}
}
//����������������
function cleanKey(){
	$id('key').value='';
	$id('key').focus();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//���ض���
function pageScroll(){
	var toolbarHeight=document.documentElement.clientHeight;
    window.scrollBy(0,-toolbarHeight);
    scrolldelay = setTimeout('pageScroll()',100);
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    if(sTop==0) clearTimeout(scrolldelay);
}
//����������������
function cleanKey(){
	$id('key').value='';
	$id('key').focus();
}
//�ύ����
function SoNow(){
	var ToTypeid=Trim($id('typeid').value);
	var ToKey=encodeURI(Trim($id('key').value));
	if(!ToKey){
		var ToUrl=SO_URL;
		window.open(ToUrl);
		return false;
	}else{
		if(ToTypeid=='author'){
			var ToUrl=SO_URL+'?author-'+ToKey+'-'+'1.html';
		}else if(isNaN(ToTypeid)){
			var ToUrl=SO_URL+'?'+ToKey+'-'+ToTypeid+'-'+'1.html';
		}else{
			var ToUrl=SO_URL+'?'+ToKey+'.html';
		}
		window.open(ToUrl);
		return false;
	}
	return false;
}
//�����İ�
function ShowNewBox(id){
	for(i=1;i<=8;i++){
		$id('Tab_0'+i)?$id('Tab_0'+i).className='':'';
		$id('Box_0'+i)?$id('Box_0'+i).className='Box':'';
	}
	$id('Tab_0'+id)?$id('Tab_0'+id).className='cur':'';
	$id('Box_0'+id)?$id('Box_0'+id).className='Box cur':'';
}
function ShowListBox(id,obj){
	for(i=1;i<=5;i++){
		$id('Btn_'+obj+'_'+i)?$id('Btn_'+obj+'_'+i).className='':'';
		$id('PiC_'+obj+'_'+i)?$id('PiC_'+obj+'_'+i).className='PiC':'';
		$id('WorD_'+obj+'_'+i)?$id('WorD_'+obj+'_'+i).className='WorD':'';
	}
	document.getElementById('Btn_'+obj+'_'+id).className='cur';
		$id('PiC_'+obj+'_'+id)?$id('PiC_'+obj+'_'+id).className='PiC cur':'';
		$id('WorD_'+obj+'_'+id)?$id('WorD_'+obj+'_'+id).className='WorD cur':'';
}
//��Ŀ���Ҳ��л�
function ShowBook(id1,id2){
	if(id1=='wei' || id1=='zugu' || id1=='gu'){
		var li_array=document.getElementById('tabBox'+id1).getElementsByTagName('li');
		for(i=1;i<=li_array.length;i++){
			$id('litab'+id1+i).className='';
			$id('libox'+id1+i).className='';
		}
		$id('litab'+id1+id2).className='cur';
		$id('libox'+id1+id2).className='cur';
	}else{
		var li_array=document.getElementById('Box'+id1).getElementsByTagName('li');
		for(i=1;i<=(li_array.length/2);i++){
			$id('litab'+id1+i).className='';
			$id('libox'+id1+i).className='first_con';
		}
		$id('litab'+id1+id2).className='cur';
		$id('libox'+id1+id2).className='first_con cur';
	}
}
//��Ŀҳ�����Ҳ��л�
function ShowPic(id){
	var li_array=document.getElementById('ShowPic_tab').getElementsByTagName('li');
	for(i=1;i<=li_array.length;i++){
		$id('tab'+i).className='';
		$id('litab_'+i).className='';
	}
	$id('tab'+id).className='cur';
	$id('litab_'+id).className='cur';
}
//�½����������б�ҳ��
function ReMakeList(box){
	if(!$id(box)){
		return false;
	}
	var li_Array=$id(box).getElementsByTagName('li');
	var arrayObj=new Array();
	var arrayKey=new Array();
	for(i=0;i<li_Array.length;i++){
		arrayObj[li_Array.item(i).getAttribute('data')]=li_Array.item(i).innerHTML;
		arrayKey[i]=li_Array.item(i).getAttribute('data');
	}
	arrayKey.sort(function(a,b){return b-a});
	var www_669977_net='';
	var ii=0;
	for(x in arrayKey){
		ii++;
		if(ii%2==0){
			www_669977_net+='<li class="odd">'+arrayObj[arrayKey[x]]+'</li>';
		}else{
			www_669977_net+='<li>'+arrayObj[arrayKey[x]]+'</li>';
		}
	}
	$id(box).innerHTML=www_669977_net;
}
//�½���������Ŀ¼ҳ��
function ReMakeChapter(box,orderBy){
	if(!$id(box)){
		return false;
	}
	var li_Array=$id(box).getElementsByTagName('li');
	var arrayObj=new Array();
	var arrayKey=new Array();
	var x;
	if(orderBy=='desc'){
		for(i=0;i<li_Array.length;i++){
			arrayObj[li_Array.item(i).getAttribute('data')]=li_Array.item(i).innerHTML;
			arrayKey[i]=li_Array.item(i).getAttribute('data');
		}
		arrayKey.sort(function(a,b){return b-a});
		var www_669977_net='';
		for(x in arrayKey){
			www_669977_net+='<li data="'+arrayKey[x]+'">'+arrayObj[arrayKey[x]]+'</li>';
		}
	}else{
		for(i=0;i<li_Array.length;i++){
			arrayObj[li_Array.item(i).getAttribute('data')]=li_Array.item(i).innerHTML;
		}
		var www_669977_net='';
		for(x in arrayObj){
			www_669977_net+='<li data="'+x+'">'+arrayObj[x]+'</li>';
		}
	}
	$id(box).innerHTML=www_669977_net;
}
//�½�������
function ChapterOrder(order,cookie){
	if(!order){
		var orderBy=$id('ChapterOrder').getAttribute('data');
	}else{
		var orderBy=order;
	}
	if(orderBy=='asc'){
		ReMakeChapter('booklistBox','asc');
		$id('ChapterOrder').setAttribute('data','desc');
		$id('ChapterOrder').innerHTML='��������';
		$id('ChapterOrder').className='ChapterOrder desc';
		if(!cookie){
			setcookie('ChapterOrder','asc');
		}
	}else{
		ReMakeChapter('booklistBox','desc');
		$id('ChapterOrder').setAttribute('data','asc');
		$id('ChapterOrder').innerHTML='��������';
		$id('ChapterOrder').className='ChapterOrder asc';
		if(!cookie){
			setcookie('ChapterOrder','desc');
		}
	}
}
//��ʾ��Ϣ
function TIP(msg){$('.TIP').html('<div class="h">��ܰ��ʾ��</div><span class="MSG">'+msg+'</span>');$('.TIP,.MAK').show();setTimeout(function(){$('.TIP,.MAK').fadeOut();$('.TIP,.MAK').removeClass('on');},1500);}
//���ض���
function pageScroll(){
	var toolbarHeight=document.documentElement.clientHeight;
    window.scrollBy(0,-toolbarHeight);
    scrolldelay = setTimeout('pageScroll()',100);
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    if(sTop==0) clearTimeout(scrolldelay);
}
//���ҳ���Զ�����ָ��λ��
function intval(v) {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
function getPos(e) {
    var l = 0;
    var t = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent) {
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
    t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
    return {
        x: l,
        y: t,
        w: w,
        h: h,
        wb: wb,
        hb: hb
    };
}
function getScroll() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        t: t,
        l: l,
        w: w,
        h: h
    };
}
function scroller(el, duration) {
    if (typeof el != "object") {
        el = document.getElementById(el);
    }
    if (!el) return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function() {
        window.clearInterval(z.timer);
        z.timer = null
    };
    z.t = (new Date).getTime();
    z.step = function() {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function() {
                z.scroll(z.p.y, z.p.x)
            }, 13);
        } else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function(t, l) {
        window.scrollTo(l, t)
    };
    z.timer = window.setInterval(function() {
        z.step();
    }, 13);
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++Ƥ�� ��ʼ
function skin(id,color,auto){
	var SkinBox=$id('SkinBox').getElementsByTagName('a');
	for(i=0;i<SkinBox.length;i++){
		SkinBox.item(i).className='';
	}
	SkinBox.item(id-1).className='cur';
	$id('Body').className='Body'+color;
	setcookie('Body',color,30);
	setcookie('skin',id,30);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++Ƥ�� ����
/*++++++++++
++
+++++++++++
+++*/
//+++++++++++++++++++++++++++++++++++++++++++++++++++++�Ķ���¼ ��ʼ
function showReaded(my){
	if(my && my=='single'){
		var Readed=getcookie('Readed');
		if(Readed){
			Readed=Readed.split(",");
			var cookie=Readed[0];
		}
		if(mid!='0'){
			//������Ա��
			SByouNet_SingleReaded('SingleMid',cookie);
		}else{
			//����cookie��
			if(cookie){
				SByouNet_SingleReaded('SingleCookie',cookie);
			}else{
				$id('ReadedHere').innerHTML='���޼�¼';
			}
		}
	}else{
		var ReadedIMG=$id('ReadedIMG');
		if(!ReadedIMG){
			return false;
		}
		var cookie=getcookie('Readed');
		if(mid!='0'){
			//�����Ա��
			SByouNet_MoreReaded('MoreMid',cookie);
		}else{
			//���cookie��
			if(cookie){
				SByouNet_MoreReaded('MoreCookie',cookie);
			}else{
				$id('Readed').innerHTML='<p>���޼�¼...</p>';
			}
		}
	}
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++�Ķ���¼ ����
/*++++++++++
++
+++++++++++
+++*/
//˫������
var currentpos,timer,SpeedTime;
function initialize(){
	if(!SpeedTime){
		SpeedTime=10;
	}
	timer=setInterval("scrollwindow()",SpeedTime);
	setcookie('ScNow','1',30);
} 
function sc(obj){
	clearInterval(timer);
	if(!obj || obj=='[object MouseEvent]'){
		setcookie('ScNow','0',30);
	}
}
function scrollwindow(){ 
	currentpos=document.body.scrollTop; 
	window.scroll(0,++currentpos); 
	if (currentpos != document.body.scrollTop){
		var checkedCur=$id('AutoNext').checked;
		if(checkedCur==true){
			sc('1');
			var url=document.getElementById('keyright').href;
			if (!!window.ActiveXObject || "ActiveXObject" in window){
				//IE��֧���Զ�����
			}else{
				location.href=url;
			}
		}else{
			sc('0');
		}
	}
}
//ȫվ������ǰ����
function ScRadio(obj){
	if(!obj){
		return false;
	}
	$id('radio1').checked=false;
	$id('radio2').checked=false;
	$id(obj).checked=true;
	$id('ReHere').className='';
	setcookie('ScRadio',obj,30);
}
//�Ƿ��Զ���ҳ
function AutoNext(obj){
	if(obj){
		var checked=$id('AutoNext').checked;
		if(checked==true){
			checked=false;
		}else{
			checked=true;
		}
		$id('AutoNext').checked=checked;
	}else{
		var checked=$id('AutoNext').checked;
	}
	$id('ReHere').className='';
	setcookie('AutoNext',checked,30);
}
//�����ٶ�
function speed(obj){
	if(!obj){
		return false;
	}
	$id('man').className='';
	$id('zhong').className='';
	$id('kuai').className='';
	$id(obj).className='cur';
	$id('ReHere').className='';
	setcookie('speed',obj,30);
	if(obj=='man'){
		SpeedTime=20;
	}
	if(obj=='zhong'){
		SpeedTime=10;
	}
	if(obj=='kuai'){
		SpeedTime=5;
	}
}
//�ָ�Ĭ��
function ReHere(){
	setcookie('ScRadio','',30);
	setcookie('AutoNext','',30);
	setcookie('speed','',30);
	setcookie('ScNow','0',30);
	$id('radio1').checked=true;
	$id('radio2').checked=false;
	$id('AutoNext').checked=true;
	$id('man').className='';
	$id('zhong').className='cur';
	$id('kuai').className='';
	$id('ReHere').className='cur';
	SpeedTime=15;
}
//�����
function weixin(my,url,title,description){
	if(my=='close'){
		$id('WeiXinBox').style.display='none';
		$id('TIP').style.display='none';
		$id('MAK').style.display='none';
	}else{
		$id('TIP').innerHTML='';
		$id('weixin_title').innerHTML='��'+title+'��';
		$id('weixin_word').innerHTML=description;
		$id('weixin_code').src='http://s.jiathis.com/qrcode.php?url='+url;
		$id('WeiXinBox').style.display='block';
		$id('TIP').style.display='block';
		$id('MAK').style.display='block';
		$id('TIP').innerHTML=$id('WeiXinBox').innerHTML;
	}
}