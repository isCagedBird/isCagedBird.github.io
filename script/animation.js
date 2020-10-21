;
(function() {
	'use strict';

	let getStyle = function(domEl, style) {
		if (domEl) {
			if (typeof window.getComputedStyle === 'function') {
				return window.getComputedStyle(domEl, null)[style];
			} else {
				return domEl.currentStyle[style];
			}
		}
	};

	let animate = function(domEl, use, whenDone) {
		/* whenDone 是各动画项目完成后要调用的函数 */
		if (domEl instanceof HTMLElement) {
			let clear = function() {
				window.clearInterval(domEl.interval);
				domEl.interval = null;
			};
			/* 当该函数被高频调用时，清除上一次的定时器,重新设置定时器 */
			if (domEl.interval !== null && domEl.interval !== undefined) {
				console.info('clear before interval');
				clear();
			}
			/* 动画项目对象 */
			let w_do = null,
				h_do = null,
				x_do = null,
				y_do = null,
				o_do = null,
				r_do = null;
			/* 动画项目公用函数 */
			let setSpeed = null,
				setTransform = null,
				x_y = null;
			/* 初始化操作 */
			for (let i in use) {
				switch (i) {
					case 'w':
						if (typeof use[i] !== 'number') {
							console.error('w not number');
							return;
						}
						w_do = {};
						w_do.target = use[i];
						w_do.fn = function() {
							domEl.style['width'] = w_do.target + 'px';
						};
						w_do.current = Number(getStyle(domEl, 'width').match(/\-?\d+(\.\d+)?/g)[0]);
						break;
					case 'h':
						if (typeof use[i] !== 'number') {
							console.error('h not number');
							return;
						}
						h_do = {};
						h_do.target = use[i];
						h_do.fn = function() {
							domEl.style['height'] = h_do.target + 'px';
						};
						h_do.current = Number(getStyle(domEl, 'height').match(/\-?\d+(\.\d+)?/g)[0]);
						break;
					case 'x':
						if (typeof use[i] !== 'number') {
							console.error('x not number');
							return;
						}
						x_do = {};
						x_do.target = use[i];
						break;
					case 'y':
						if (typeof use[i] !== 'number') {
							console.error('y not number');
							return;
						}
						y_do = {};
						y_do.target = use[i];
						break;
					case 'o':
						if (typeof use[i] !== 'string') {
							console.error('o not string');
							return;
						} else {
							if (use[i].match(/^\d\.\d{2}$/g) === null) {
								console.error('o 需要是两位小数,例如1.00');
								return;
							}
						}
						o_do = {};
						o_do.target = Number(use[i]);
						o_do.fn = function() {
							domEl.style['opacity'] = o_do.target;
						};
						o_do.current = Number(getStyle(domEl, 'opacity'));
						/* 只有透明度动画是线性的，速率恒定 */
						o_do.speed = 0.01;
						break;
					case 'r':
						if (typeof use[i] !== 'string') {
							console.error('r not string');
							return;
						}
						let str = use[i].match(/^(\-?\d+(\.\d+)?(,(100|\d{1,2})%){2}|\-?\d+(\.\d+)?)$/g);
						if (str === null) {
							console.error(`r 格式错误,形如'45,50%,50%'或'-30'`);
							return;
						}
						str = str[0].split(',');
						r_do = {};
						r_do.target = Number(str[0]);
						let v1 = str[1];
						let v2 = str[2];
						domEl.style['transform-origin'] = v1 === undefined ? `50% 50%` : `${v1} ${v2}`;
						break;
					default:
						;
				}
			}

			if (w_do === null && h_do === null && x_do === null && y_do === null && o_do === null && r_do === null) {
				console.warn('no any property is one of [ w, h, x, y, o, r ]');
				return;
			}

			if (x_do !== null || y_do !== null || r_do !== null) {
				if (getStyle(domEl, 'transform') === 'none') {
					/* 只有DOM元素没有设置transform属性时执行此操作 */
					if (getStyle(domEl, 'left') === 'auto' || getStyle(domEl, 'top') === 'auto') {
						if (getStyle(domEl, 'left') === 'auto') {
							domEl.style['transform'] = `matrix(1, 0, 0, 1, 0, ${getStyle(domEl, 'top').replace(/px/,'')})`;
							domEl.style['top'] = '0px';
						}
						if (getStyle(domEl, 'top') === 'auto') {
							domEl.style['transform'] = `matrix(1, 0, 0, 1, ${getStyle(domEl, 'left').replace(/px/,'')}, 0)`;
							domEl.style['left'] = '0px';
						}
					} else {
						domEl.style['transform'] =
							`matrix(1, 0, 0, 1, ${getStyle(domEl, 'left').replace(/px/,'')}, ${getStyle(domEl, 'top').replace(/px/,'')})`;
						domEl.style['top'] = domEl.style['left'] = '0px';
					}
				}
				setTransform = function(ct, flag) {
					let A = getStyle(domEl, 'transform').split(',');
					let str;
					if (flag === 'x') {
						str = `${A[0]},${A[1]},${A[2]},${A[3]}, ${ct},${A[5]}`;
					} else if (flag === 'r') {
						let k = Math.PI / 180 * ct;
						let cos = Math.cos(k);
						let sin = Math.sin(k);
						str = `matrix(${cos}, ${sin}, ${-sin}, ${cos},${A[4]},${A[5]}`;
					} else {
						str = `${A[0]},${A[1]},${A[2]},${A[3]},${A[4]}, ${ct})`;
					}
					domEl.style['transform'] = str;
				};
			}

			if (w_do !== null || h_do !== null || x_do !== null || y_do !== null || r_do !== null) {
				setSpeed = function(target, current) {
					let speed = (target - current) / 10;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					return speed;
				};
			}

			if (x_do !== null || y_do !== null) {
				x_y = function(flag) {
					let style = getStyle(domEl, 'transform');
					let current;
					if (flag === 'x') {
						current = style.split(',')[4];
						if (typeof current === 'string') {
							current = Number(current);
						}
					} else {
						current = style.split(',')[5];
						if (typeof current === 'string') {
							current = Number(current.replace(')', ''));
						}
					}
					return current;
				};
			}

			if (x_do !== null) {
				x_do.fn = function() {
					setTransform(x_do.target, 'x');
				};
				x_do.current = x_y('x');
			}
			if (y_do !== null) {
				y_do.fn = function() {
					setTransform(y_do.target, '');
				};
				y_do.current = x_y('');
			}
			if (r_do !== null) {
				r_do.fn = function() {
					setTransform(r_do.target, 'r');
				};
				let cos = Number(getStyle(domEl, 'transform').split(',')[0].replace('matrix(', ''));
				let k = Math.acos(cos);
				r_do.current = Math.floor(k / Math.PI * 180);
			}

			/* 设置定时器 */
			domEl.interval = window.setInterval(() => {
				if (w_do !== null) {
					w_do.speed = setSpeed(w_do.target, w_do.current);
				}
				if (h_do !== null) {
					h_do.speed = setSpeed(h_do.target, h_do.current);
				}
				if (x_do !== null) {
					x_do.speed = setSpeed(x_do.target, x_do.current);
				}
				if (y_do !== null) {
					y_do.speed = setSpeed(y_do.target, y_do.current);
				}
				if (r_do !== null) {
					r_do.speed = setSpeed(r_do.target, r_do.current);
				}
				/* 清除定时器 */
				/* 这里是这样的情况，哪一项先完成了，则哪一项先清除掉定时器；
				这样有一个隐患，其他的项目并没有达到目标值定时器就被清除了；
				解决方法是每当有一个项目完成将要清除定时器时，如果有其他项目
				存在，则将他们样式赋为目标值 */
				if (w_do !== null) {
					if (w_do.speed === 0 && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (h_do !== null) {
							h_do.fn();
						}
						if (x_do !== null) {
							x_do.fn();
						}
						if (y_do !== null) {
							y_do.fn();
						}
						if (o_do !== null) {
							o_do.fn();
						}
						if (r_do !== null) {
							r_do.fn();
						}
						/* console.info('w first done'); */
						return;
					}
				}
				if (h_do !== null) {
					if (h_do.speed === 0 && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (w_do !== null) {
							w_do.fn();
						}
						if (x_do !== null) {
							x_do.fn();
						}
						if (y_do !== null) {
							y_do.fn();
						}
						if (o_do !== null) {
							o_do.fn();
						}
						if (r_do !== null) {
							r_do.fn();
						}
						/* console.info('h first done'); */
						return;
					}
				}
				if (x_do !== null) {
					if (x_do.speed === 0 && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (w_do !== null) {
							w_do.fn();
						}
						if (h_do !== null) {
							h_do.fn();
						}
						if (y_do !== null) {
							y_do.fn();
						}
						if (o_do !== null) {
							o_do.fn();
						}
						if (r_do !== null) {
							r_do.fn();
						}
						/* console.info('x first done'); */
						return;
					}
				}
				if (y_do !== null) {
					if (y_do.speed === 0 && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (w_do !== null) {
							w_do.fn();
						}
						if (h_do !== null) {
							h_do.fn();
						}
						if (x_do !== null) {
							x_do.fn();
						}
						if (o_do !== null) {
							o_do.fn();
						}
						if (r_do !== null) {
							r_do.fn();
						}
						/* console.info('y first done'); */
						return;
					}
				}
				if (o_do !== null) {
					if (o_do.current === o_do.target && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (w_do !== null) {
							w_do.fn();
						}
						if (x_do !== null) {
							x_do.fn();
						}
						if (y_do !== null) {
							y_do.fn();
						}
						if (h_do !== null) {
							h_do.fn();
						}
						if (r_do !== null) {
							r_do.fn();
						}
						/* console.info('o first done'); */
						return;
					}
				}
				if (r_do !== null) {
					if (r_do.speed === 0 && domEl.interval !== null) {
						clear();
						if (typeof whenDone === 'function') {
							whenDone();
						}
						if (w_do !== null) {
							w_do.fn();
						}
						if (h_do !== null) {
							h_do.fn();
						}
						if (x_do !== null) {
							x_do.fn();
						}
						if (o_do !== null) {
							o_do.fn();
						}
						if (y_do !== null) {
							y_do.fn();
						}
						/* console.info('r first done'); */
						return;
					}
				}
				/* 更新操作 */
				if (w_do !== null) {
					w_do.current += w_do.speed;
					domEl.style['width'] = w_do.current + 'px';
				}
				if (h_do !== null) {
					h_do.current += h_do.speed;
					domEl.style['height'] = h_do.current + 'px';
				}
				if (x_do !== null) {
					x_do.current += x_do.speed;
					setTransform(x_do.current, 'x');
				}
				if (y_do !== null) {
					y_do.current += y_do.speed;
					setTransform(y_do.current, '');
				}
				if (o_do !== null) {
					if (o_do.current > o_do.target) {
						o_do.current -= o_do.speed;
						if (o_do.current <= o_do.target) {
							o_do.current = o_do.target;
						}
						domEl.style['opacity'] = o_do.current;
					} else if (o_do.current < o_do.target) {
						o_do.current += o_do.speed;
						if (o_do.current >= o_do.target) {
							o_do.current = o_do.target;
						}
						domEl.style['opacity'] = o_do.current;
					}
				}
				if (r_do !== null) {
					r_do.current += r_do.speed;
					setTransform(r_do.current, 'r');
				}
			}, 1000 / 30);
		} else {
			console.error('first is not html object');
		}
	};
	if (!window['*!*']) {
		window['*!*'] = {};
	}
	window['*!*'].animate = animate;
	window['*!*'].getStyle = getStyle;
})();
