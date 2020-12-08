// load chart
var width = parseFloat(d3.select('#scatter').style('width'));
var height = width * .66;
//append svg 
var svg = d3.select('#scatter')
    .append('svg')
    .style('height', height)
    .style('width', width)
    .style('border', '2px solid black');
// append group
var xText = svg.append('g').attr('transform', `translate(${width / 2},${height})`);

showData();
// creat lables
xText
    .append('text')
    .text('Household Income (Median)')
    .attr('axisInfo', 'income')
    .attr('class', 'aText inactive x')
    .attr('y', -10);

xText
    .append('text')
    .text('Age (Median)')
    .attr('axisInfo', 'age')
    .attr('class', 'aText inactive x')
    .attr('y', -30);

xText
    .append('text')
    .text('In Poverty (%)')
    .attr('axisInfo', 'poverty')
    .attr('class', 'aText active x')
    .attr('y', -50);


var yText = svg.append('g').attr('transform', `translate(0,${height / 2})rotate(-90)`);

yText
    .append('text')
    .text('Obese (%)')
    .attr('axisInfo', 'obesity')
    .attr('class', 'aText active y')
    .attr('y', 20);

yText
    .append('text')
    .text('Smokers (%)')
    .attr('axisInfo', 'smokes')
    .attr('class', 'aText inactive y')
    .attr('y', 40);

yText
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('axisInfo', 'healthcare')
    .attr('class', 'aText inactive y')
    .attr('y', 60);
// create axes and append
var yAxis = svg.append('g').attr('transform', `translate(${width*.12},${height*.03})`);
var xAxis = svg.append('g').attr('transform', `translate(${width*.12},${height*.83})`);

var circles = svg.append('g').attr('transform', `translate(${width*.12},${height*.10})`);;

function showData() {

    d3.csv('assets/data/data.csv').then(csvData => {
        data = csvData;
        console.log(data[10]);
       
        activeY = d3.selectAll('.active').filter('.y').attr('axisInfo');
        activeX = d3.selectAll('.active').filter('.x').attr('axisInfo');

        xData = data.map(obj => +obj[activeX]);
        yData = data.map(obj => +obj[activeY]);

        xScale = d3.scaleLinear().domain([d3.min(xData)*.90,d3.max(xData)*1.10]).range([0,width*.80]);
        yScale = d3.scaleLinear().domain([d3.min(yData)*.90,d3.max(yData)*1.10]).range([0,height*.80]);

        xAxis.call(d3.axisBottom(xScale));
        yAxis.call(d3.axisLeft(yScale));

        xData.forEach((val,i) => {
            var circle = circles.append('g');

            circle.append('circle').attr('r',width*.02).attr('class','stateCircle').attr('cx',xScale(val)).attr('cy',yScale(yData[i]));

            circle.append('text').text(data[i].abbr).attr('class','stateText').attr('x',xScale(val)).attr('y',yScale(yData[i])+5);
        });

    });
};

// browser loads, makeResponsive() is called
makeResponsive();

// browser window loads and is resized, makeResponsive() is called
d3.select(window).on("resize", makeResponsive);

