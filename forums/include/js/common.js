var Forum={addLoadEvent:function(fn)
{var x=window.onload;window.onload=(x&&typeof x=='function')?function(){x();fn()}:fn;},hasClass:function(n,x)
{return(new RegExp('\\b'+ x+'\\b')).test(n.className)},addClass:function(n,x)
{if(Forum.hasClass(n,x))return false;else n.className+=' '+ x;return true;},removeClass:function(n,x)
{if(!Forum.hasClass(n,x))return false;x=new RegExp('\\s*\\b'+ x+'\\b','g');n.className=n.className.replace(x,'');return true;},blink:function(n,i)
{if(typeof i=='undefined')i=2;var x=n.style.visibility;if(i&&x!='hidden')
{n.style.visibility='hidden';setTimeout(function(){n.style.visibility=x},200);setTimeout(function(){Forum.blink(n,i-1)},400);}},onScreen:function(n)
{function pageYOffset()
{var y=-1;if(self.pageYOffset)y=self.pageYOffset;else if(document.documentElement&&document.documentElement.scrollTop)
y=document.documentElement.scrollTop;else if(document.body)y=document.body.scrollTop;return y;}
function innerHeight()
{var y=-1;if(self.innerHeight)y=self.innerHeight;else if(document.documentElement&&document.documentElement.clientHeight)
y=document.documentElement.clientHeight;else if(document.body)y=document.body.clientHeight;return y;}
function nodeYOffset(n)
{var y=n.offsetTop;n=n.offsetParent;return n?y+=nodeYOffset(n):y;}
var screenTop=pageYOffset();var screenBottom=screenTop+ innerHeight();var nodeTop=nodeYOffset(n);var nodeBottom=nodeTop+ n.clientHeight;return nodeTop>=screenTop&&nodeBottom<screenBottom;},map:function(fn,arr)
{for(var i=0,len=arr.length;i<len;i++)
{arr[i]=fn(arr[i])}
return arr;},find:function(fn,arr)
{for(var i=0,len=arr.length;i<len;i++)
{if(fn(arr[i]))return i;}
return-1;},arrayOfMatched:function(fn,arr)
{matched=[];for(var i=0,len=arr.length;i<len;i++)
{if(fn(arr[i]))matched.push(arr[i])}
return matched;},flatten:function(arr)
{flt=[];for(var i=0,len=arr.length;i<len;i++)
{if(typeof arr[i]=='object'&&arr.length)
{flt.concat(Forum.flatten(arr[i]))
alert('length1!!'+ arr.length);}
else flt.push(arr[i])}
return flt},validateForm:function(form)
{var elements=form.elements;var fn=function(x){return x.name&&x.name.indexOf('req_')==0};var nodes=Forum.arrayOfMatched(fn,elements);fn=function(x){return/^\s*$/.test(x.value)};var empty=Forum.find(fn,nodes);if(empty>-1)
{var n=document.getElementById('req-msg');Forum.removeClass(n,'req-warn');var newlyAdded=Forum.addClass(n,'req-error');if(!Forum.onScreen(n))
{n.scrollIntoView();setTimeout(function(){Forum.blink(n)},500);}
else if(!newlyAdded)Forum.blink(n);if(Forum.onScreen(nodes[empty]))nodes[empty].focus();return false;}
return true;},doQuickjumpRedirect:function(url,forum_names)
{var selected_forum_id=document.getElementById('qjump-select')[document.getElementById('qjump-select').selectedIndex].value;url=url.replace('$1',selected_forum_id);url=url.replace('$2',forum_names[selected_forum_id]);document.location=url;return false;},toggleCheckboxes:function(curForm)
{var inputlist=curForm.getElementsByTagName("input");for(i=0;i<inputlist.length;i++)
{if(inputlist[i].getAttribute("type")=='checkbox'&&inputlist[i].disabled==false)
inputlist[i].checked=!inputlist[i].checked;}
return false;},attachValidateForm:function()
{var forms=document.forms;for(var i=0,len=forms.length;i<len;i++)
{var elements=forms[i].elements;var fn=function(x){return x.name&&x.name.indexOf('req_')==0};if(Forum.find(fn,elements)>-1)
{fn=function(x){return x.type&&(x.type=='submit'&&x.name!='cancel')};var nodes=Forum.arrayOfMatched(fn,elements)
var formRef=forms[i];fn=function(){return Forum.validateForm(formRef)};nodes=Forum.map(function(x){x.onclick=fn},nodes);}}},attachWindowOpen:function()
{if(!document.getElementsByTagName)return;var nodes=document.getElementsByTagName('a');for(var i=0;i<nodes.length;i++)
{if(Forum.hasClass(nodes[i],'exthelp'))
nodes[i].onclick=function(){window.open(this.href);return false;};}},autoFocus:function()
{var nodes=document.getElementById('afocus');if(!nodes||window.location.hash.replace(/#/g,''))return;nodes=nodes.all?nodes.all:nodes.getElementsByTagName('*');var fn=function(x){return x.tagName.toUpperCase()=='TEXTAREA'||(x.tagName.toUpperCase()=='INPUT'&&(x.type=='text')||(x.type=='password'))};var n=Forum.find(fn,nodes);if(n>-1)nodes[n].focus();}}
Forum.addLoadEvent(Forum.attachValidateForm);Forum.addLoadEvent(Forum.attachWindowOpen);Forum.addLoadEvent(Forum.autoFocus);