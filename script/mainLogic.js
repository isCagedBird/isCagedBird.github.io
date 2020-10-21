;
(function() {
	'use strict';

	(function() {
		let cv = document.getElementById('cv');
		let ctx = cv.getContext('2d');
		window['*!*'].clockInitAndLoop(cv, ctx);
	})();

	let containers = document.querySelectorAll('#one-speak>ul>li>span');
	let timeout = true;
	let ajaxToGet = function() {
		let xhr = new XMLHttpRequest();
		xhr.open('get', 'https://v1.hitokoto.cn');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					let data = JSON.parse(xhr.responseText);
					let type, type_end;
					switch (data.type) {
						case 'a':
							type = '来自动画<<';
							type_end = '>>';
							break;
						case 'b':
							type = '来自漫画<<';
							type_end = '>>';
							break;
						case 'c':
							type = '来自游戏<<';
							type_end = '>>';
							break;
						case 'd':
							type = '来自小说<<';
							type_end = '>>';
							break;
						case 'e':
							;
						case 'f':
							;
						case 'g':
							type = '';
							type_end = '';
							break;
						default:
							;
					}
					containers[0].innerText = data.hitokoto;
					containers[1].innerText = `${type}${data.from}${type_end}`;
					change.innerHTML = '换一句';
				}
			}
		};
		xhr.send();
	};
	ajaxToGet();

	let text =
		`<span>求职前端开发</span><ul><li>个人信息<ul><li>本科 · 软件工程</li><li>2016 ~ 2020</li></ul></li>
	<li>掌握技能<ul><li>熟悉原生ES6+ · TS</li><li>Vue · React · webpack持续学习中</li></ul></li><li>自我评价<ul><li>逻辑思维尚可</li>
	<li>做事有条理</li><li>团队责任感强</li><li>具备思维沟通和学习潜力</li><li>热爱前端事业</li></ul></li><li>兴趣爱好<ul><li>动漫手绘</li><li>关注前端领域新变化</li>
	<li>热衷学习新知识</li></ul></li><li>联系方式<ul><li>手机 : 见纸质简历</li><li>邮箱: vogel_im_kafig2016@outlook.com</li></ul></li></ul><span>Shift + P 开关粒子特效</span>`;
	let mBar = null,
		about = null,
		change = null;
	let H = Math.round(document.documentElement.clientHeight);
	let W = document.documentElement.clientWidth;
	let w = Math.round(W / 2);

	(function() {
		let create = function(style) {
			let div = document.createElement('div');
			div.setAttribute('style', style);
			document.body.appendChild(div);
			return div;
		};
		let same = 'text-align:center;color:#0f0;opacity:0.4;background:#000;';
		let lt = Math.round(W / 4);
		let navigatorStr = navigator.userAgent.toLowerCase();
		mBar = create(
			`${same}position:fixed;overflow:auto;font-size:20px;width:0px;height:0px;left:${lt}px;top:0px;`);
		if (navigatorStr.indexOf('windows') === -1 && navigatorStr.indexOf('mobile') !== -1) {
			/* 移动端 */
			change = create(
				`${same}position:absolute;line-height:50px;right:10px;top:60px;width:50px;height:50px;border-radius:50%;`
			);
			about = create(
				`${same}position:fixed;line-height:50px;right:10px;top:10px;width:50px;height:50px;border-radius:50%;`
			);
			window['*!*'].isLine = false;
		} else {
			/* 桌面端 */
			change = create(
				`${same}position:absolute;line-height:50px;right:70px;top:20px;width:100px;height:50px;border-radius:50%;`
			);
			about = create(
				`${same}position:fixed;line-height:50px;right:20px;top:20px;width:50px;height:50px;border-radius:50%;`
			);
		}
		mBar.id = 'slider-top';
		mBar.innerHTML = '';
		about.innerHTML = '关于我';
		change.innerHTML = '换一句';
	})();
	let resize = true;
	let flag = false;
	/* 监听mBar尺寸变化 */
	window.addEventListener('resize', function(e) {
		if (resize) {
			resize = false;
			window.requestAnimationFrame(() => {
				let navigatorStr = navigator.userAgent.toLowerCase();
				H = Math.round(document.documentElement.clientHeight);
				W = document.documentElement.clientWidth;
				w = Math.round(W / 2);
				let lt = Math.round(W / 4);
				let set = function(o, t, th, f) {
					about.style.right = about.style.top = o;
					change.style.right = t;
					change.style.top = th;
					change.style.width = f;
				};
				if (navigatorStr.indexOf('windows') === -1 && navigatorStr.indexOf('mobile') !== -1) { /* 移动端 */
					if (about.style.right !== `10px`) {
						set('10px', '10px', '60px', '50px');
					}
					window['*!*'].isLine = false;
				} else { /* 桌面端 */
					if (about.style.right !== `20px`) {
						set('20px', '70px', '20px', '100px');
					}
					window['*!*'].isLine = true;
				}
				if (flag) {
					mBar.style.width = `${w}px`;
				}
				mBar.style.left = `${lt}px`;
				resize = true;
			});
		}
	}, false);

	let callbackForAbout = function(e = window.event) {
		if (!flag) {
			window['*!*'].animate(mBar, {
				w: w,
				h: H,
				o: '1.00',
			}, function() {
				mBar.innerHTML = text;
			});
			about.style.boxShadow = '1px 1px 25px #0f0 inset';
			flag = true;
		} else {
			mBar.innerHTML = '';
			window['*!*'].animate(mBar, {
				w: 0,
				h: 0,
				o: '0.40',
			});
			about.style.boxShadow = '';
			flag = false;
		}
		e.stopPropagation();
	};

	let callbackForChange = function(e = window.event) {
		if (timeout) { //true
			timeout = false;
			change.innerHTML = '稍等...';
			window.setTimeout(function() {
				/* 更新一次格言数据 */
				ajaxToGet();
				timeout = true;
			}, 2000);
		}
		e.stopPropagation();
	};

	about.addEventListener('mousedown', callbackForAbout, false);
	change.addEventListener('mousedown', callbackForChange, false);

})();

(function() {
	'use strict';

	let input = document.querySelector('#one-speak>ul>li:nth-child(3)>input');
	let ul = document.querySelector('#one-speak>ul>li:nth-child(3)>ul');

	let timeout = null;
	let script = null;
	/* 当常量 TIME 为0时，则效果等于是没有执行防抖函数 */
	const TIME = 500;

	let clearInnerHtml = function() {
		if (ul.innerHTML !== '') {
			ul.innerHTML = '';
		}
	};

	let get_$_data = function(data) {
		let arr = data.s;
		let l = arr.length;
		if (l !== 0) {
			/* 这里每次新添加子li时,先清空 */
			clearInnerHtml();
			for (let i = 0; i < l; i++) {
				let li = document.createElement('li');
				li.innerText = arr[i];
				ul.appendChild(li);
			}
		}
	};

	let callback_blur = function(e = window.event) {
		clearInnerHtml();
		if (e.target.value !== '') {
			e.target.value = '';
		}
	};

	let callback_mousedown = function(e = window.event) {
		window.location.href = `https://www.baidu.com/s?wd=${e.target.innerText}`;
		e.stopPropagation();
	};

	/*
	 *	每执行一次onkeyup 回调函数，清除上一次创建的script标签，并重新创建
	 *	这样就能调用该script内已定义好的 get_$_data 函数，获取实参
	 *	高频事件启用函数防抖
	 */

	let callback_keyup = function(e = window.event) {
		if (timeout !== null) {
			window.clearTimeout(timeout);
			timeout = null;
		}
		/* 在 onkeyup 事件被触发半秒后再执行回调，如果在这半秒内又被触发，则清除原来的延时器并重新计时 */
		timeout = window.setTimeout(function() {
			if (e.target === input) {
				if (script !== null) {
					document.body.removeChild(script);
					script = null;
				}
				/* 此标签内的JavaScript代码就是在调用 get_$_data 函数 */
				script = document.createElement('script');
				script.setAttribute('type', 'text/javascript');
				script.setAttribute('src',
					`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${input.value}&cb=get_$_data__`);
				document.body.appendChild(script);
			}
		}, TIME);
	};

	window.get_$_data__ = get_$_data;

	window.addEventListener('keyup', callback_keyup, false);
	/* onblur 事件不支持冒泡 */
	input.addEventListener('blur', callback_blur, false);
	/* 阻止冒泡 */
	ul.addEventListener('mousedown', callback_mousedown, false);
})();

(function() {
	'use strict';
	let ul = document.getElementById('box');
	let words = window['*!*'].writtenWordsHtml;
	let ll = words.length; // 10

	(function() {
		let titles = window['*!*'].writtenWordsTitle;
		let htmlText = '';
		for (let i = 0; i < ll; i++) {
			htmlText += `<li><div class="container"><h3>${titles[i]}</h3></div></li>`;
		}
		ul.innerHTML = htmlText;
	})();


	let container = document.querySelectorAll('#box>li>.container');
	let h3s = document.querySelectorAll('#box>li>.container>h3');
	let buildDiv = [];
	let flag = true;

	function create() {
		let div = document.createElement('div');
		div.setAttribute('style',
			'overflow:hidden;left:0px;width:0px;display:inline-block;background:#fffacd;text-align:left;padding-top:20px;padding-bottom:20px;'
		);
		return div;
	}
	(function() {
		for (let i = 0; i < ll; i++) {
			buildDiv[i] = create();
			buildDiv[i].innerHTML = ``;
			container[i].appendChild(buildDiv[i]);
			buildDiv[i].isShow = false;
		}
	})();

	let W = parseInt(window['*!*'].getStyle(container[0], 'width'));
	window.addEventListener('resize', function() {
		/* 高频事件 */
		if (flag) {
			flag = false;
			window.requestAnimationFrame(() => {
				W = parseInt(window['*!*'].getStyle(container[0], 'width'));
				flag = true;
			});
		}
	}, false);

	let willDo = function(domEl, n) {
		if (!domEl.isShow) {
			window['*!*'].animate(domEl, {
				w: W,
				r: '360,100%,0%'
			}, function() {
				domEl.innerHTML = words[n];
			});
			domEl.isShow = true;
		} else {
			domEl.innerHTML = '';
			window['*!*'].animate(domEl, {
				w: 0,
				r: '-360,0%,0%'
			});
			domEl.isShow = false;
		}

	};

	ul.addEventListener('mousedown', function(e) {
		e.preventDefault();
		switch (e.target) {
			case h3s[0]:
				willDo(buildDiv[0], 0);
				break;
			case h3s[1]:
				willDo(buildDiv[1], 1);
				break;
			case h3s[2]:
				willDo(buildDiv[2], 2);
				break;
			case h3s[3]:
				willDo(buildDiv[3], 3);
				break;
			case h3s[4]:
				willDo(buildDiv[4], 4);
				break;
			case h3s[5]:
				willDo(buildDiv[5], 5);
				break;
			case h3s[6]:
				willDo(buildDiv[6], 6);
				break;
			case h3s[7]:
				willDo(buildDiv[7], 7);
				break;
			case h3s[8]:
				willDo(buildDiv[8], 8);
				break;
			case h3s[9]:
				willDo(buildDiv[9], 9);
				break;
			default:
				;
		}
		e.stopPropagation();
	}, false);

})();
