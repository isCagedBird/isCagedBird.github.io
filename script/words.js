;
(function() {
	'use strict';

	const writtenWordsTitle = [
		'H5浏览器本地存储......',
		'你需要了解的“闭包”......',
		'JavaScript原型链剖析......',
		'闲聊JSONP......',
		'总结的常用正则表达式......',
		'简单使用Object.defineProperty......',
		'大话浏览器同源限制......',
		'闲聊requestAnimationFrame......',
		'浅叙高频事件与函数节流，函数防抖......',
		'事件捕获，事件冒泡以及事件委托......',
	];

	const writtenWordsHtml = [
		`<h4>什么是Cookie？</h4>
		<p>HTTP Cookie是服务器发送到浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。</p>
		<p>通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。</p>
		<p>Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。</p>
		<pre>
		cookie特点:
		1.cookie的大小受限制，cookie大小被限制在4KB。
		2.cookie也可以设置过期的时间，默认是会话结束的时候，当时间到期自动销毁。
		3.一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样，一般为20个。
		4.用户每请求一次服务器数据，cookie会随着这些请求发送到服务器。
		5.cookie数据始终在同源的http请求中携带（即使不需要），这也是Cookie不能太大的重要原因。
		</pre>
		<h4>什么是session？</h4>
		<p>session 代表着服务器和客户端一次会话的过程。</p>
		<p>session 对象存储特定用户会话所需的属性及配置信息。</p>
		<p>这样，当用户在应用程序的 Web 页之间跳转时，存储在 session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。</p>
		<p>当客户端关闭会话，或者 session 超时失效时会话结束。</p>
		<pre>
		cookie和session区别：
		1.cookie数据存放在客户的浏览器上，session数据放在服务器上。
		2.cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session。
		3.session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用cookie。
		4.单个cookie保存的数据不能超过4K，session 可存储数据远高于 cookie。
		5.cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，session 一般失效时间较短，客户端关闭或者 session 超时都会失效。
		6.cookie 只能保存 ASCII，session 可以存任意数据类型。
		</pre>
		<h4>h5新的前端储存方法(localStorage和sessionStorage)</h4>
		<h5>什么是localStorage？</h5>
		<p>这是一种持久化的存储方式，也就是说如果不手动清除，数据就永远不会过期。</p>
		<p>它也是采用Key - Value键值对的方式存储数据，底层数据接口是sqlite，按域名将数据分别保存到对应数据库文件里。</p>
		<p>它能保存更大的数据。</p>
		<pre>
		特点：
		1.保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
		2.大小为5M左右。仅在客户端使用，不和服务端进行通信。
		3.存储的信息在同一域中是共享的。
		4.localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。
		操作：
		1.设置：localStorage.setItem（'name': 'xs'）
		2.获取：localStorage.getItem('username') 
		也可以获取键名：
		localStorage.key(0) 获取第一个键名。
		3.删除：localStorage.removeItem('username') 
		清楚所有：localStorage.clear()
		</pre>
		<h5>什么是sessionStorage？</h5>
		<p>和服务器端使用的session类似，是一种会话级别的缓存，关闭浏览器会数据会被清除。</p>
		<p>不过有点特别的是它的作用域是窗口级别的，也就是说不同窗口间的sessionStorage数据不能共享的。</p>
		<p>使用方法（和localStorage完全相同）操作：和localStorage操作一样。</p>
		<pre>
		sessionStorage和localStorage区别：
		1.localStorage是永久存储，除非手动删除。
		2.sessionStorage当会话结束（当前页面关闭的时候，自动销毁）localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
		</pre>
		<h4>什么是IndexedDB?</h4>
		<p>IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。</p>
		<p>IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。</p>
		<p>这些都是 LocalStorage 所不具备的。</p>
		<p>就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。</p>
		<pre>
		特点：
		1.键值对储存。
			IndexedDB 内部采用对象仓库（object store）存放数据。
			所有类型的数据都可以直接存入，包括 JavaScript 对象。
			对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
		2.异步。
			IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。
			异步设计是为了防止大量数据的读写，拖慢网页的表现。
		3.支持事务。
			IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
		4.同源限制。
			IndexedDB 受到同源限制，每一个数据库对应创建它的域名。
			网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
		5.储存空间大。
			IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
		6.支持二进制储存。
			IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。
		</pre>
		<pre>
		基本操作：
		1.打开数据库：使用indexedDB.open()方法。
			var request = window.indexedDB.open(databaseName, version)。
			这个方法接受两个参数，第一个参数是字符串，表示数据库的名字。
			如果指定的数据库不存在，就会新建数据库。
			第二个参数是整数，表示数据库的版本。
			如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为1。
		indexedDB.open()方法返回一个 IDBRequest 对象。
			这个对象通过三种事件error、success、upgradeneeded，处理打开数据库的操作结果。
		2.关闭IndexedDB：indexdb.close() 。
		3.删除IndexedDB：window.indexedDB.deleteDatabase(indexdb) 。
		</pre>`,
		`<p>在JS中， 闭包的一大作用就是防止全局变量污染的。</p>
		<p>封装私密性数据的同时， 最好是还提供给外部作用域可访问的接口， 比如你可以构建get， set函数。</p>
		<p>先上一段代码：</p>
		<pre>
		/*
		 *  这里是全局作用域
		 */
		const use = (function() {
			/*
			 * 这里是当前匿名函数内的函数作用域 
			 */
			let secret = 'something_secret';
			/*
			 * 这是私密的数据，我们要确保只有自己才可以访问到它
			 */
			return {
				set: function(_value_) {
					secret = _value_;
				},
				get: function() {
					return secret;
				}
			};
		})();
		
		console.info(use.get());
		//这里打印的结果是 something_secret
		use.set('fine');
		console.info(use.get());
		//这里将会打印 fine
		</pre>
		<p>这小段代码很简单， 首先在window全局作用域下， 一个匿名立即执行函数返回一个包含set， get方法的对象赋值给常量use。 这里在全局作用域下， 匿名立即执行函数内的数据secret变量并没有在函数执行完毕后被消除， 它所占用的内存空间仍然是存在的， 当返回给全局作用域下的use后， 他仍然是可访问的， 这就是一个闭包。</p>
		<p>这里需要注意的是JS的垃圾回收机制并不会消除私密性数据secret， 简单的来说是因为我们仍然可以访问到它， 如果我们：</p>
		<pre>
		use = null;
		</pre>
		<p>这时的引用就没有了， JS自动垃圾回收就会清除掉了， 就不会发生内存溢出的问题了。</p>`,
		`<p>JS中的原型链相关内容是学习JS语法的一大重难点， 学好这部分内容对于理解JS面向对象机制是很有帮助的。</p>
		<p>下面我从几个方面来详细阐述原型链相关的内容。</p>
		<h4>神秘的链接</h4>
		<p>JS中的每一个对象都有一个私密的属性， 它用来连接到该对象的原型对象， 在chrome等浏览器， 它被实现为__proto__（ 这里是两个下划线･_･）， 所有除null以外的对象都有自己的__proto__属性。</p>
		<h4>prototype属性</h4>
		<p>这个对象属性相较于__proto__更具特殊性， 只有函数对象function才拥有prototype属性， 一个函数通过prototype指针链接到原型对象， 而该函数原型对象通过内置的constructor指针反过来连接到构造函数。</p>
		<h4>JS世界三大原始对象</h4>
		<p>首先就是五大基本数据类型之一的null， 它是JS中一切对象__proto__连接的终点， 是对象的祖先对象； 然后在是Object.prototype， 这是对象构造器Object() 的原型对象； Function.prototype是函数构造器Function() 的原型对象。</p>
		<p>这里值得注意的一点是函数构造器Function() 同时拥有__proto__以及prototype两个链接指针（ 既是对象， 又是构造函数）， 它们都连接到Function() 的原型对象上面， 这一点是与众不同的。</p>
		<h4>原型链</h4>
		<p>一个构造函数() 是一个对象， 所以它拥有自己的prototype指针， 这个指针链接到它的原型对象 构造函数.prototype上， 构造函数.prototype也通过constructor指针连接到该构造函数本身， 构造函数通过new关键字构建自己的实例对象， 该实例对象通过__proto__指针连接到构造函数的原型对象上， 同时因为要节省存储空间， 构造函数prototype上存放大量共享的方法或属性。</p>
		<p>自然， 构造函数() 另外通过__proto__指针连接Function.prototype， 它是所有函数的构造器。</p>
		<p>而原型对象 构造函数.prototype 也通过__proto__指针连接到Objectprototype对象构造器。</p>
		<p>上面写了一大推， 我们可以发现在JS中， 是只存在“ 对象” 这个概念的， 而在其他高级语言， 譬如java， C++中还有“ 类” 的概念， 我们这里可以近似的把 JS中的构造函数() 看作是一个“ 类”。</p>`,
		`<p>JSONP 即 JSON with padding。</p>
		<p>通过这种方式我们可以一定程度上避开同源限制获得数据。</p>
		<p>常用的就是以下几步获得数据。首先在客户端定义好一个接收数据的函数 getData ,该函数将会在收到服务器响应后执行。</p>
		<pre>
		function getData(data) {
			console.log('得到数据了!');
			console.log(data);
			// 拿到数据就可以做一些处理了
		}
		</pre>
		<p>第二步,在客户端动态创建script元素节点，设置src属性为: url?callback=getData ,设置完src属性后，客户端会立即发送请求。</p>
		<p>第三步,服务器接受客户端请求，发送数据。</p>
		<pre>
		function serverResponse() {
			// 获取url中callback的值
			let fn = 'getData';
			let data = "{xxx: 'yyy'}";
			// getData({xxx: 'yyy'})
			return fn + '(' + data + ')';
		}
		</pre>
		<p>第四步,客户端收到响应，立即执行script脚本,之后客户端收到"getData({xxx: 'yyy'})"的字符串,字符串会被浏览器解析并执行。</p>
		<pre>
		eval(serverResponse());
		//这个时候步骤一中的getData()函数就被执行了，打印出{xxx: 'yyy'}
		</pre>`,
		`<p>Email地址：^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$</p>
		<h5>—</h5>
		<p>域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?</p>
		<h5>—</h5>
		<p>InternetURL：[a-zA-z]+://[^\\s]* 或 ^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$</p>
		<h5>—</h5>
		<p>手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$</p>
		<h5>—</h5>
		<p>电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$</p>
		<h5>—</h5>
		<p>国内电话号码(0511-4405222、021-87888822)：\\d{3}-\\d{8}|\\d{4}-\\d{7}</p>
		<h5>—</h5>
		<p>身份证号(15位、18位数字)：^\\d{15}|\\d{18}$</p>
		<h5>—</h5>
		<p>短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$</p>
		<h5>—</h5>
		<p>帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$</p>
		<h5>—</h5>
		<p>密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\\w{5,17}$</p>
		<h5>—</h5>
		<p>强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$</p>
		<h5>—</h5>
		<p>日期格式：^\\d{4}-\\d{1,2}-\\d{1,2}</p>
		<h5>—</h5>
		<p>一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$</p>
		<h5>—</h5>
		<p>一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$</p>
		<h5>—</h5>
		<p>xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\\\.[x|X][m|M][l|L]$</p>
		<h5>—</h5>
		<p>中文字符的正则表达式：[\\u4e00-\\u9fa5]</p>
		<h5>—</h5>
		<p>双字节字符：[^\\x00-\\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))</p>
		<h5>—</h5>
		<p>空白行的正则表达式：\\n\\s*\\r (可以用来删除空白行)</p>
		<h5>—</h5>
		<p>腾讯QQ号：[1-9][0-9]{4,} (腾讯QQ号从10000开始)</p>
		<h5>—</h5>
		<p>中国邮政编码：[1-9]\\d{5}(?!\\d) (中国邮政编码为6位数字)</p>`,
		`<h4>学习使用JS的 Object.defineProperty</h4>
		<p>body有一个子span,id为'span',其兄弟节点有一个input,id为'input',使用 Object.defineProperty
		就可以简单实现一个数据绑定的功能:</p>
		<pre>
		let obj = {};
		
		/*
		 *	value: 设置属性的值
		 *	writable: 值是否可以重写。true | false
		 *	enumerable: 目标属性是否可以被枚举。true | false
		 *	configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false
		 *	一旦使用Object.defineProperty给对象添加属性，
		 *	如果不设置属性的特性，那么configurable、enumerable、writable这些值都为默认的false
		 *	当使用了getter或setter方法，不允许使用writable和value这两个属性
		 */
		
		Object.defineProperty(obj, 'content', {
			enumerable: true, //可以再枚举
			configurable: false, //不能再次defineProperty
			set(val, oldValue) {
				let span = document.getElementById('span');
				this.value = val;
				span.innerHTML = this.content;
				/* console.info('set()', this.value); */
			},
			get() {
				/* console.info('get()'); */
				return this.value;
			}
		});
		
		window.addEventListener('keydown', function(e) {
			if (e.target === input && e.key === 'Enter') {
				let input = document.getElementById('input');
				obj.content = input.value;
			}
		}, false);
		</pre>`,
		`<h4>什么是同源策略</h4>
		<p>同domain（或ip）,同端口，同协议视为同一个域，一个域内的脚本仅仅具有本域内的权限，
		可以理解为本域脚本只能读写本域内的资源，而无法访问其它域的资源。这种安全限制称为同源策略。</p> 
		<h4>为什么说同源策略限制了人类文明的发展</h4>
		<p>安全性和方便性是成反比的，十位数的密码提高了安全性，但是不方便记忆。
		同样，同源策略提升了Web前端的安全性，但牺牲了Web拓展上的灵活性。
		设想若把html、js、css、flash，image等文件全部布置在一台服务器上，小网站这样凑活还行，大中网站如果这样做服务器根本受不了的。
		所以，现代浏览器在安全性和可用性之间选择了一个平衡点。在遵循同源策略的基础上，选择性地为同源策略“开放了后门”。
		例如img script style等标签，都允许垮域引用资源，严格说这都是不符合同源要求的。(JSONP 跨域就是利用了这一点)
		因此浏览器降低了那么一点点安全性，却大大提升网站布置的灵活性。
		尽管浏览器开放了“后门”，然而现代文明却仍不满足。打破同源策略的方法有很多，抛开漏洞不谈，Server端的大数据整合和浏览器的插件往往就充当着这样一个角色。</p>
		<h4>如果没有同源策略，普通用户将无密可保</h4>
		<p>尽管浏览器遵循同源策略，用户访问过的网站、买过的东西、搜索过的字串、甚至兴趣爱好，都可以被远端分析出来。
		这些数据都有着被泄露的风险。
		如果浏览器不遵循同源策略，那么情况更糟：网站站长、广告联盟、流量统计商、xss黑客，
		随便哪个人都将无障碍的获取私密信息，例如各个网站的Cookie、email的邮件内容、OA页面的内容、QQ空间里设置为隐私的照片等</p>
		<h4>最严重的跨域——跨特权域</h4>
		<p>所有跨域行为中最严重的莫过于跨特权域。在客户端中，有一些域的权限比较高，
		例如file://这个协议域，ie中允许调用ActiveX执行cmd，Webkit中可以读取磁盘上的文件。另外还有客户端自定义的特权域，
		例如Chrome的chrome://downloads/域，有着执行exe的权限。这事儿太严重了，
		这不仅意味着任意一个网站都可以浏览/修改用户的浏览器配置，而且可以不经用户同意上传文件，甚至会在用户的电脑上安装恶意软件。</p>
		<p>同源策略的重要性毋庸置疑。</p>`,
		`<p>requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，
		并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。</p>
		<pre>
		1.像setTimeout、setInterval一样，requestAnimationFrame是一个全局函数。
		2.调用requestAnimationFrame后，它会要求浏览器根据自己的频率进行一次重绘，它接收一个回调函数作为参数。
		3.在即将开始的浏览器重绘时，会调用这个函数，并会给这个函数传入调用回调函数时的时间作为参数。
		4.由于requestAnimationFrame的功效只是一次性的，所以若想达到动画效果，
			则必须连续不断的调用requestAnimationFrame，就像我们使用setTimeout来实现动画所做的那样。
		5.requestAnimationFrame函数会返回一个资源标识符，可以把它作为参数传入cancelAnimationFrame函数来取消requestAnimationFrame的回调。
		</pre>	  
		<p>与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。
		具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，
		换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。
		它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。</p>
		<pre>
		CPU节能：
		使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，
		由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。
		而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，
		因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
			   
		函数节流：
		在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，
		使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。
		一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。
		</pre>
		<p>由于requestAnimationFrame目前还存在兼容性问题，而且不同的浏览器还需要带不同的前缀。兼容性简单封装：</p>
		<pre>
		window.requestAnimationFrame = window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame || function (callback) {
			//为了使setTimteout的尽可能的接近每秒60帧的效果
			window.setTimeout(callback, 1000 / 60);
		};

		window.cancelAnimationFrame = window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.msCancelAnimationFrame ||
		window.oCancelAnimationFrame || function (timeoutId) {
			//为了使setTimteout的尽可能的接近每秒60帧的效果
			window.clearTimeout(timeoutId);
			timeoutId = null;
		};
		</pre>`,
		`<h4>函数节流</h4>
		<p>函数节流是指一定时间内js方法只跑一次。</p>
		<p>函数节流应用的实际场景，多数在监听页面元素滚动事件的时候会用到。</p>
		<p>因为滚动事件，是一个高频触发的事件。</p>
		<pre>
		函数节流：一定时间内只执行最开始触发的函数
		</pre>
		<p>以下是监听页面元素滚动的示例代码：</p>
		<pre>
		// 函数节流
		let can = true;
		document.getElementById("throttle").onscroll = function(){
			if(can){
				can = false;
				window.setTimeout(function(){
					console.info('函数节流');
					/* 这里写将要做的逻辑代码 */
					can = true;
				},1000);
			}
		};
		</pre>
		<h4>函数防抖</h4>
		<p>函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。</p>
		<p>函数防抖的应用场景，最常见的就是用户注册时候的手机号码验证和邮箱验证了。</p>
		<p>只有等用户输入完毕后，前端才需要检查格式是否正确，如果不正确，再弹出提示语。</p>
		<pre>
		函数防抖：一定时间内只执行最后触发的函数
		</pre>
		<p>以下还是以页面元素滚动监听的例子，来进行解析：</p>
		<pre>
		// 函数防抖
		let timeout = null;
		document.getElementById("debounce").onscroll = function(){
			if(timeout !== null){
				window.clearTimeout(timeout);
				timeout = null;
			}
			// 清除未执行的代码，重置回初始化状态
			timeout = window.setTimeout(function(){
				console.info('函数防抖');
				/* 这里写将要做的逻辑代码 */
			},1000);
		};
		</pre>
		<h4>高频事件</h4>
		<p>高频事件是短时间内大量执行的事件,最常见的有:</p>
		<pre>
		window 的 onresize 窗口尺寸调整事件, input 事件, onscroll 事件
		桌面端的 onmousemove 事件
		移动端的 ontouchmove 事件, ondeviceorientation 重力方向事件等
		</pre>`,
		`<p>它们是描述事件触发时序问题的术语，一个完整的JS事件流是从window开始，最后回到window的一个过程</p>
		<p>假如在body的子div里包含一个p </p>
		<pre>
		问题1：冒泡与捕获触发过程？
			事件冒泡: p -> div -> body -> document -> window
			事件捕获: window -> document -> body -> div -> p
		问题2：冒泡与捕获触发的先后顺序？
			事件捕获 --> 目标过程 --> 事件冒泡
		问题3：目前各大浏览器都支持那种方式？
			chrome、firefox、360、百度、猎豹、IE 这些支持是都支持的,只是IE仅支持事件捕获的冒泡阶段
		问题4：如何控制使用那种方式？
			W3C: element.addEventListener（'click/mouseover...',fn,boolean）第三个参数为true（捕获） 为false（冒泡）
			IE: element.attachEvent('onclick/onmouseover...',fn) 只能在IE浏览器使用（反人类终将被放弃）仅支持冒泡。
		问题5：冒泡与捕获孰优孰劣？
			对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议使用事件冒泡模型
		问题6：如何阻止它们？
			在支持addEventListener()的浏览器中，可以调用事件对象的stopPropagation()方法以阻止事件的继续传播。
			如果在同一对象上定义了其他处理程序，剩下的处理程序将依旧被调用，但调用stopPropagation()之后任何其他对象上的事件处理程序将不会被调用。
			不仅可以阻止事件在冒泡阶段的传播，还能阻止事件在捕获阶段的传播。
			在IE9中，是通过设置事件对象cancelBubble属性为true来实现阻止事件进一步传播。
			阻止事件的默认行为 e.preventDefault() 可以阻止事件的默认行为发生
			默认行为是指：点击a标签就转跳到其他页面、拖拽一个图片到浏览器会自动打开、点击表单的提交按钮会提交表单等等，因为有的时候我们并不希望发生这些事情，所以需要阻止默认行为。　　
			IE9之前的IE中，可以通过设置事件对象的returnValue属性为false达到同样的效果。
		</pre>
		<p>事件委托在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。导致这一问题的原因是多方面的。
		首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。
		对事件处理程序过多问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。</p>
		<p>例如，click事件会一直冒泡到document层次。也就是说，我们可以为整个页面指定一个onclick事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。</p>
		<p>现在有一个ul,id是list,包含三个子li,innerText分别是red,yellow,blue</p>
		<p>如果点击页面中的li元素，然后输出li当中的颜色，我们通常会这样写</p>
		<pre>
		(function(){
		    let list = document.getElementById('list');
		    let colors = list.getElementsByTagName('li');
		    for(let i = 0;i < colors.length;i++){
		        colors[i].addEventListener('click',showColor,false);
		    };
		    function showColor(e){
		        let x = e.target;
		        alert('The color is ' + x.innerHTML);
		    };
		})();
		</pre>
		<p>利用事件流的特性，我们只绑定一个事件处理函数也可以完成</p>
		<pre>
		(function(){
		    let list = document.getElementById('list');
		    list.addEventListener('click',showColor,false);
		    function showColor(e){
		        let x = e.target;
		        if(x.nodeName.toLowerCase() === 'li'){
		            alert('The color is ' + x.innerHTML);
		        }
		    }
		})();
		</pre>
		<p>事件委托还有一个好处就是添加进来的元素也能绑定事件没有使用事件委托：</p>
		<p>还用刚才那个例子,有一个ul,id是list,包含三个子li,innerText分别是red,yellow,blue</p>
		<p>ul下面是一个兄弟节点button,绑定一个onclick事件,回调函数是fun</p>
		<pre>
		let list = document.getElementById('list');
		let li = list.getElementsByTagName('li');
		for (let i = 0; i < li.length; i++) {
		　　li[i].onclick = fn;
		}
		
		function fn (){
		  console.log(this.innerHTML);
		}
	
		function fun(){
			let node=document.createElement('li');
			let textnode=document.createTextNode('new create');
			node.appendChild(textnode);
			document.getElementById('list').appendChild(node);
		}
		</pre>
		<p>使用了事件委托：</p>
		<pre>
		let list = document.getElementById('list');
		list.onclick = function(ev) {
			ev = ev || event;
			let target = ev.target || ev.srcElement;
			if (target.nodeName.toLowerCase() === 'li') {
				console.log(target.innerHTML);
			}
		};
	
		function fun(){
			let node=document.createElement('li');
			let textnode=document.createTextNode('new create');
			node.appendChild(textnode);
			document.getElementById('list').appendChild(node);
		}
		</pre>`
	];
	if (!window['*!*']) {
		window['*!*'] = {};
	}
	window['*!*'].writtenWordsHtml = writtenWordsHtml;
	window['*!*'].writtenWordsTitle = writtenWordsTitle;

})();
