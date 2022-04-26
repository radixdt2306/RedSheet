/**
 * @author Dimitry Kudrayvtsev
 * @version 2.1
 */

d3.gantt = function (chartId,noOfCount,minDate,maxDate) {
	var FIT_TIME_DOMAIN_MODE = "fit";
	var FIXED_TIME_DOMAIN_MODE = "fixed";

	// var margin = {
	// 	top: 0,
	// 	right: 100,
	// 	bottom: 0,
	// 	left: 100
	// };
	var margin = {
		top: 0,
		right: 100,
		bottom: 0,
		left: 279
	};
	var selector = 'body';
	var timeDomainStart = d3.time.day.offset(new Date(minDate), -3);
	var timeDomainEnd = d3.time.day.offset(new Date(maxDate), +3);
	var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
	var taskTypes = [];
	var taskStatus = [];

	// var height = document.body.clientHeight - margin.top - margin.bottom-5;
	// var width = document.body.clientWidth - margin.right - margin.left-5;
	var height = noOfCount * 40;
	var width = 600;
	// var width = document.body.clientWidth - margin.right - margin.left-5;

	//var tickFormat = "%H:%M";
	//var tickFormat = "%Y-%m-%d";
	//var tickFormat = "%d-%m-%Y";
	//var tickFormat = "%m/%d";

	var keyFunction = function (d) {
		return d.startDate + d.taskName + d.endDate;
	};

	var rectTransform = function (d) {
		return "translate(" + (parseInt(x(d.startDate)) + 15) + "," + y(d.taskName) + ")";
	};

	var diamondTransform = function (d) {
		return "translate(" + (parseInt(x(d.startDate)) + 15) + "," + (parseInt(y(d.taskName)) + 20) + ")";
	};
	var x = d3.time.scale().domain([timeDomainStart, timeDomainEnd]).range([0, width]).clamp(true);

	var y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([0, height - margin.top - margin.bottom], .1);


	//var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("%d-%m-%y")).tickSubdivide(true)
		.tickSize(8).tickPadding(8);

	var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

	var initTimeDomain = function (tasks) {
		if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
			if (tasks === undefined || tasks.length < 1) {
				timeDomainStart = d3.time.day.offset(new Date(minDate), -180);
				timeDomainEnd = d3.time.day.offset(new Date(maxDate), +330);
				return;
			}
			tasks.sort(function (a, b) {
				return a.endDate - b.endDate;
			});
			timeDomainEnd = tasks[tasks.length - 1].endDate;
			tasks.sort(function (a, b) {
				return a.startDate - b.startDate;
			});
			timeDomainStart = tasks[0].startDate;
		}
	};

	var initAxis = function () {
		x = d3.time.scale().domain([timeDomainStart, timeDomainEnd]).range([0, width]).clamp(true);
		y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([0, height - margin.top - margin.bottom], .1);
		xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
			.tickSize(2).tickPadding(8);

		yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
	};

	function gantt(tasks) {
		//initTimeDomain(tasks);
		initAxis();
		var svg = d3.select('#' + chartId)
			.append("svg")
			.attr("class", "chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom + 100)
			.append("g")
			.attr("class", "gantt-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

		var Events = tasks.filter(t => t.isEvent == true);
		svg.selectAll(".chart")
			.data(Events, keyFunction)
			.enter()
			.append("rect")
			.attr("rx", 5)
			.attr("ry", 5)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) { return "bar"; }
				return taskStatus[d.status];
			})
			.attr("y", 10)
			.attr("transform", rectTransform)
			//.attr("height", function (d) { return y.rangeBand()-10; })
			.attr("height", 10)
			.attr("fill", "#425563")
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});
		var Milestones = tasks.filter(t => t.isEvent == false);
		svg.selectAll('.chart')
			.data(Milestones, keyFunction)
			.enter()
			.append('path')
			.attr('transform', diamondTransform)
			.attr("fill", "#ef3340")
			.attr('d', d3.svg.symbol().type("diamond").size(function (d) {
				return (20 * 40) / 2;
			}));

		svg.append("g")
			.attr("class", "x axis")
			.attr("fill", "#425563")
			.attr("height", 100)
			.attr("transform", "translate(15, " + (height - margin.top - margin.bottom) + ")")
			.transition()
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-65)");

		svg.append("g").attr("class", "y axis").transition().call(yAxis).attr("fill", "#425563");
		return gantt;
	};

	gantt.redraw = function (tasks) {

		initTimeDomain(tasks);
		initAxis();

		var svg = d3.select(".chart");

		var ganttChartGroup = svg.select(".gantt-chart");
		var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);

		rect.enter()
			.insert("rect", ":first-child")
			.attr("rx", 5)
			.attr("ry", 5)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) { return "bar"; }
				return taskStatus[d.status];
			})
			.transition()
			.attr("y", 0)
			.attr("transform", rectTransform)
			.attr("height", function (d) { return y.rangeBand(); })
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});

		rect.transition()
			.attr("transform", rectTransform)
			.attr("height", function (d) { return y.rangeBand(); })
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});

		rect.exit().remove();

		svg.select(".x").transition().call(xAxis);
		svg.select(".y").transition().call(yAxis);

		return gantt;
	};

	gantt.margin = function (value) {
		if (!arguments.length)
			return margin;
		margin = value;
		return gantt;
	};

	gantt.timeDomain = function (value) {
		debugger;
		if (!arguments.length)
			return [timeDomainStart, timeDomainEnd];
		timeDomainStart = +value[0], timeDomainEnd = +value[1];
		return gantt;
	};

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
	gantt.timeDomainMode = function (value) {
		if (!arguments.length)
			return timeDomainMode;
		timeDomainMode = value;
		return gantt;

	};

	gantt.taskTypes = function (value) {
		if (!arguments.length)
			return taskTypes;
		taskTypes = value;
		return gantt;
	};

	gantt.taskStatus = function (value) {
		if (!arguments.length)
			return taskStatus;
		taskStatus = value;
		return gantt;
	};

	gantt.width = function (value) {
		if (!arguments.length)
			return width;
		width = +value;
		return gantt;
	};

	gantt.height = function (value) {
		if (!arguments.length)
			return height;
		height = +value;
		return gantt;
	};

	gantt.tickFormat = function (value) {
		if (!arguments.length)
			return tickFormat;
		tickFormat = value;
		return gantt;
	};

	gantt.selector = function (value) {
		if (!arguments.length)
			return selector;
		selector = value;
		return gantt;
	};
	return gantt;
};


