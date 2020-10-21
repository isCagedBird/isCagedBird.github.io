;
(function() {
	'use strict';
	let intervalOfClock = null;

	function BuildClock() {};

	BuildClock.prototype.drawArc = function(cv, ctx, _style, radius, k0, k1) {
		ctx.beginPath();
		radius < cv.width / 5 ? ctx.fillStyle = _style : ctx.strokeStyle = _style;
		ctx.arc(cv.width / 2, cv.height / 2, radius, k0 * Math.PI, k1 * Math.PI);
		radius < cv.width / 5 ? ctx.fill() : ctx.stroke();
	};

	BuildClock.prototype.drawLine = function(cv, ctx, strokeStyle, n, len, lineWidth) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(cv.width / 2, cv.height / 2);
		ctx.rotate(n * Math.PI / 180);
		ctx.moveTo(0, 0);
		ctx.lineTo(0, len);
		ctx.strokeStyle = strokeStyle;
		ctx.lineCap = 'round';
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.restore();
	};

	function core(clock, cv, ctx) {
		ctx.clearRect(0, 0, cv.width, cv.height);
		let date = new Date(),
			hour = date.getHours(); //0~23
		hour = hour > 12 ? hour - 12 : hour;
		clock.drawLine(cv, ctx, '#000', hour * 30, -(cv.width / 9), 8); /*画时针*/
		let minute = date.getMinutes(); //0~59
		clock.drawLine(cv, ctx, '#000', minute * 6, -(cv.width / 7), 5); /*画分针*/
		let second = date.getSeconds(); //0~59
		clock.drawLine(cv, ctx, '#000', second * 6, -(cv.width / 5), 2); /*画秒针*/
		let k = second * (2 / 60);
		for (let i = cv.width / 4; i <= cv.width / 2; i += 5) {
			//75 -> 150
			!(i % 2) ? clock.drawArc(cv, ctx, '#0f0', i, -0.5, -0.5 + k): clock.drawArc(cv, ctx, '#000', i, -0.5, -0.5 +
				k);
		}
	}

	function clockInitAndLoop(cv, ctx) {
		let clock = new BuildClock();
		core(clock, cv, ctx);
		intervalOfClock = window.setInterval(function() {
			core(clock, cv, ctx);
		}, 1000);
	}
	if (!window['*!*']) {
		window['*!*'] = {};
	}
	window['*!*'].clockInitAndLoop = clockInitAndLoop;
})();
