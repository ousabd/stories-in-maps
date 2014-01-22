canvas.selectAll("*").remove();

var dataset1 = [];
for (var i = 0; i < 25; i++) {
  	var newNumber = Math.floor(15+Math.random()*85);
    dataset1.push(newNumber);
}


var svgW = 700;
var svgH = 500;
var svg = canvas.append("svg")
	            .attr("width", svgW)
    	        .attr("height", svgH)
				      .attr("display","block");

var n = dataset1.length;
var w = Math.floor((svgW-2*n)/n);
svg.selectAll("rect")
	.data(dataset1)
	.enter()
	.append("rect")

	.attr("x",function(d,i){return (w+2)*i;})
	.attr("y",function(d,i){return 120-d;})
	.attr("width",function(d,i){return w;})
	.attr("fill","black")
	.attr("height",function(d) {return d;})
	.attr("fill",function(d,i){return "rgb(0,0,"+Math.floor(d*2.55)+")";});

svg.selectAll("text")
	.data(dataset1)
	.enter()
	.append("text")
	.attr("x",function(d,i){return (w+2)*i+w/2;})
	.attr("y",function(d,i){return 115;})
	.text(function(d,i){return d;})
	.attr("width",w)
	.attr("text-anchor","middle")
	.attr("font-family","monospace")
	.attr("font-size",12)
	.attr("fill","white")
/*
var nlines = 9;
svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx",function(d,i){return 50+50*(i%nlines);})
.attr("cy",function(d,i){return 50+50*Math.floor(i/nlines);})
.attr("r",function(d){return d/5;})
.attr("fill",function(d,i){return "rgb("+i*10+",0,0)";})
.attr("stroke","rgba(50,50,50,0.5)")
.attr("stroke-width","10")
*/

// SCATTER PLOT
// Dataset
var dataset2 = [];
var xRange = Math.random() * 1;
var yRange = Math.random() * 1000;
for (var i = 0; i < 100; i++) {
  	var newX = Math.random()*xRange;
  	var newY = Math.floor(Math.random()*yRange);
  	var newZ = Math.floor(Math.random()*1000);
    dataset2.push([newX,newY,newZ]);
}
// Scales
var margin = 4;
var axisMargin = 50;
var xScale = d3.scale.linear()
				.domain([0,xRange])
				.range([0+axisMargin,svgW-axisMargin]);
var yScale = d3.scale.linear()
				.domain([0,yRange])
				.range([svgH-axisMargin,svgH/2]);
var cScale = d3.scale.linear()
				.domain([0,1000])
				.rangeRound([0,255]);

svg.selectAll("circle")
.data(dataset2)
.enter()
.append("circle")
.attr("cx",function(d){return xScale(d[0]);})
.attr("cy",function(d){return yScale(d[1]);})
.attr("r",4)
.attr("fill",function(d,i){return "rgba("+cScale(d[2])+",0,0,1)";})
.attr("stroke","black")

//Axes
var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(5)
				.tickFormat(d3.format(".1%"));
svg.append("g")
	.attr("transform","translate(0,"+(svgH-axisMargin)+")")
	.attr("fill","none")
	.attr("stroke","black")
	.attr("shape-rendering","crispEdges")
	.call(xAxis);
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
svg.append("g")
	.attr("transform","translate("+axisMargin+",0)")
	.attr("fill","none")
	.attr("stroke","black")
	.attr("shape-rendering","crispEdges")
	.call(yAxis);

d3.json("testDB.json", function(json) {
    console.log(json);
})

