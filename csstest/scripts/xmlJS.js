//ajax����
function GetXmlHttpObject(){
	var xmlHttp=null;
	if(window.ActiveXObject){try{xmlHttp=new ActiveXObject('Microsoft.XMLHttp');}catch(e){xmlHttp=new ActiveXObject('Msxml2.XMLHTTP');}}else if(window.XMLHttpRequest){xmlHttp=new XMLHttpRequest();}
	return xmlHttp;
}
function x_get(URL,OBJ,XID,ELSE,OTHER){
	var xmlHttp=null;
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null){alert ('Browser does not support HTTP Request!');return false;}
	xmlHttp.onreadystatechange=function(){
	  if(xmlHttp.readyState==4 && xmlHttp.status==200)  
	  {
		  var cDATA=xmlHttp.responseText;
		  if(cDATA){
			  if(XID && XID.indexOf('score')>0){
				  $id(OBJ)?$id(OBJ).innerHTML=parseInt($id(OBJ).innerHTML)+parseInt(cDATA):'';//����
			  }else{
				  $id(OBJ)?$id(OBJ).innerHTML=cDATA:'';//����
			  }
			  //����Ϊ����Դ�
			  if(XID=='bwjp'){
				  $id('reFRESH')?$id('reFRESH').className='':'';
			  }
			  if(XID && XID.indexOf('score')>0){
				  if(cDATA=='1'){
					  TIP('��ϲ�������۳ɹ���');
					  setcookie('sbyou_net_score_'+ELSE,'1');
				  }else{
					  TIP('��Ǹ����ʱ�������ۣ������Ժ����ԣ�');
				  }
			  }
			  if(XID=='com_box' && OTHER=='yes'){
				  var jj_pl=$id('jj_pl').offsetTop-40;
				  $('html,body').animate({scrollTop:jj_pl});
			  }
			  if(XID=='logout'){
				  TIP('��ȫ�˳���');relog();
				  if($('.LogBox')){
					  relog2();
				  }
			  }
			  if(XID=='look'){
				  if(OTHER){
					  setcookie('look_'+OTHER+'_'+ELSE,'1');
				  }else{
					  setcookie('look_'+ELSE,'1');
				  }
			  }
			  if(XID=='good' || XID=='bad'){
				  setcookie('good_'+ELSE,'1');
				  setcookie('bad_'+ELSE,'1');
			  }
			  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			  if(XID=='DEL_fav' || XID=='DEL_look' || XID=='DEL_good' || XID=='DEL_bad'){
				  $id('actionBox'+ELSE).innerHTML='�Ѿ�ɾ��';
				  $id('title'+ELSE).style.textDecoration='line-through';
				  $id('title'+ELSE).style.color='red';
				  if(XID=='DEL_fav'){
					   setcookie('addCollect'+ELSE,'');
				  }
				  if(XID=='DEL_look'){
					   setcookie('look'+ELSE,'');
				  }
				  if(XID=='DEL_good' || XID=='DEL_bad'){
					  setcookie('addGood'+ELSE,'');
					  setcookie('addBad'+ELSE,'');
				  }
			  }
			  if(XID && XID.indexOf('Del_all_')>=0){
				  alert('�ɹ�������м�¼��');
				  location.reload();
			  }
			  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			  if(XID=='NewAdmin'){
				  $id('NewAdmin').innerHTML=cDATA;
			  }
		  }else{
			  if(XID=='DEL_fav' || XID=='DEL_look' || XID=='DEL_good' || XID=='DEL_bad'){
				  $id('actionBox'+ELSE).innerHTML='<span onclick="ajax_Data(\'XID\',\'ELSE\');">����ʧ�ܣ��Ժ�����</span>';
			  }
			  if(XID && XID.indexOf('Del_all_')>=0){
				  TIP('����ʧ�ܣ��Ժ�����...');
			  }
		  }
	  }
	}
	xmlHttp.open('GET',URL,true);
	xmlHttp.send(null);
}
//���ɾ�̬
function ajax_make_html(pageID,id){
	var url=BOOK_URL+'ajax.php?my=ajax_make_html&pageID='+pageID+'&id='+id;
	x_get(url,'','');
}
//��̬����
function ajax_data(my,id1,id2,id3,id4,id5){
	if(my=='bwjp'){
		$id('reFRESH')?$id('reFRESH').className='on':'';
	}
	if(my=='randBOX'){
		$id('btn_img')?$id('btn_img').className='btn_img':'';
	}
	if(my=='score'){
		if(getcookie('sbyou_net_score_'+id1)){
			TIP('��Ǹ��24Сʱ֮��ֻ������һ�Σ�');
			return false;
		}
		my='sbyou_'+my+'_'+id1+'_'+id2;
	}
	var url=BOOK_URL+'ajax.php?my='+my+'&id1='+id1+'&id2='+id2+'&id3='+id3+'&id4='+id4+'&id5='+id5+'&t='+(new Date).getTime();
	x_get(url,my,my,id1,id3);
}
//ͳ�ƻ�Ա�������
function sbyou_NeT_ArticleInfo(aid,mid,mname,regdate,chapter){
	if(chapter){
		var look_cookie=getcookie('look_'+chapter+'_'+aid);
	}else{
		var look_cookie=getcookie('look_'+aid);
	}	
	var url=BOOK_URL+'ajax.php?my=look&aid='+aid+'&mid='+mid+'&mname='+mname+'&regdate='+regdate+'&chapter='+chapter+'&look_cookie='+look_cookie+'&t='+(new Date).getTime();
	x_get(url,'','look',aid,chapter);
}
//ͳ�ƻ�Ա��������
function sbyou_NET_addGood(aid,mid,mname,regdate){
	if(getcookie('good_'+aid) || getcookie('bad_'+aid)){
		return false;
	}
	var url=BOOK_URL+'ajax.php?my=good&aid='+aid+'&mid='+mid+'&mname='+mname+'&regdate='+regdate+'&t='+(new Date).getTime();
	x_get(url,'','good',aid);
}
//ͳ�ƻ�Ա��������
function sbyou_NET_addBad(aid,mid,mname,regdate){
	if(getcookie('good_'+aid) || getcookie('bad_'+aid)){
		return false;
	}
	var url=BOOK_URL+'ajax.php?my=bad&aid='+aid+'&mid='+mid+'&mname='+mname+'&regdate='+regdate+'&t='+(new Date).getTime();
	x_get(url,'','bad',aid);
}

function logout(){
	var url=BOOK_URL+'member/index_do.php?fmdo=login&dopost=exit';
	x_get(url,'','logout');
}
//��Ա�������
function ajax_Data(my,id,obj){
	//���ǹ���Ա������ʾ������ť
	if(my=='click'){
		ajax_Data('addBang',id,'myDoBtn');
	}
	//�Զ���ҳ
	if(my=='make_single'){
		if($id('pre_page') || $id('next_page')){
			if(getcookie('money_value')=='1'){
				setTimeout(function(){
					location.href=$id('next_page').href;
				},parseInt(Math.random()*10+1)*1000);
				return false;
			}
		}
	}
	if(!id){
		id=1;
	}
	if(my=='addCollect' || my=='addGood' || my=='addBad'){
		if(my=='addCollect'){
			if($id(my+'Box'+id).className!='sc'){
				$id(my+'Box'+id).style.display='block';
				$id(my+'Box'+id).style.fontSize='14px';
				$id(my+'Box'+id).style.background='#c50dfa';
			}
		}
		if(getcookie(my+id)=='1'){
			if(my=='addCollect'){
				$id(my+'Box'+id).innerHTML='<a href="'+BOOK_URL+'member/?action=favorite" title="��������ղؼ�" target="_blank">���Ѿ��ղع���</a>';
			}
			if(my=='addGood'){
				$id(my+'Box'+id).innerHTML='���Ѿ����޻���ӹ���';
			}
			if(my=='addBad'){
				$id(my+'Box'+id).innerHTML='���Ѿ����޻���ӹ���';
			}
			return false;
		}
		$id(my+'Box'+id).innerHTML='�ύ�У��Ե�...';
	}
	var url=BOOK_URL+'ajax.php?my='+my+'&id='+id;
	if(my && my=='update' || my=='addGood' || my=='addBad' || my=='DEL_fav' || my=='DEL_look' || my=='DEL_good' || my=='DEL_bad' || my.indexOf('Del_all_')>=0){

		if(my=='update'){
			var look_cookie=getcookie('look'+id);
			url=BOOK_URL+'ajax.php?my='+my+'&id='+id+'&memberID='+mid+'&memberNAME='+mname+'&memberTIME='+regdate+'&look_cookie='+look_cookie;
		}
		
		if(my.indexOf('Del_all_')>=0){
			url=BOOK_URL+'ajax.php?my='+my+'&id='+id+'&memberID='+mid+'&memberNAME='+mname+'&memberTIME='+regdate;
		}
		
		if(my=='DEL_fav' || my=='DEL_look' || my=='DEL_good' || my=='DEL_bad'){
			
			//��Ա��Ϣδ�������
			if(typeof(mid)=='undefined'){
				$id('actionBox'+id).innerHTML='������...';
				setTimeout(function(){
					$id('actionBox'+id).innerHTML='�Ժ�����';
					setTimeout(function(){
						$id('actionBox'+id).innerHTML='<a href="javascript:;" onclick="ajax_Data(\'DEL_bad\',\''+id+'\');">ɾ����¼</a>';
					},500);
				},500);
				return false;
			}

			url=BOOK_URL+'ajax.php?my='+my+'&id='+id+'&memberID='+mid+'&memberNAME='+mname+'&memberTIME='+regdate;

			$id('actionBox'+id).innerHTML='ɾ����...';
		}
	}
	if(my=='addBang'){
		if(obj!='myDoBtn'){
			$id('addBang'+obj+'Box'+id).innerHTML='�Ժ�...';
		}
		url=BOOK_URL+'ajax.php?my='+my+'&id='+id+'&obj='+obj+'&memberID='+mid+'&memberNAME='+mname+'&memberTIME='+regdate;
	}
	x_get(url,'',my,id,obj);
}
//��վ��ͼ
function SByou_Net_Sitemap(){
	var url=BOOK_URL+'ajax.php?my=Sitemap';
	x_get(url);
}
//�Ķ���¼��������
function SByouNet_SingleReaded(my,cookie){
	var url=BOOK_URL+'ajax.php?my='+my+'&cookie='+cookie+'&mid='+mid+'&mname='+mname+'&regdate='+regdate;
	x_get(url,'ReadedHere');
}
//�Ķ���¼�������
function SByouNet_MoreReaded(my,cookie){
	//��Ա��Ϣδ�������
	if(typeof(mid)=='undefined'){
		setTimeout(function(){
			$id('readyTIP').innerHTML='ҳ�����δ��ɣ��Ժ�����...';
			setTimeout(function(){
				$id('readyTIP').innerHTML='������...';
			},1000);
		},1000);
		return false;
	}
	var url=BOOK_URL+'ajax.php?my='+my+'&cookie='+cookie+'&mid='+mid+'&mname='+mname+'&regdate='+regdate;
	x_get(url,'Readed');
}
//��̨�ɼ�ҳ��ͳ���Ѳɼ���δ�ɼ�����
function SByou_Net_NumCoMain(nid,channelid,obj){
	var url=BOOK_URL+'ajax.php?my=NumCoMain&nid='+nid+'&channelid='+channelid+'&obj='+obj;
	x_get(url,obj);
}