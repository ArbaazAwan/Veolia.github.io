
import { Component } from '@angular/core';
export interface data {
	[key: string]: any;
}

@Component({
  selector: 'app-dummy-charts',
  templateUrl: './dummy-charts.component.html',
  styleUrls: ['./dummy-charts.component.scss']
})

export class DummyChartsComponent {

  chartOptions = {
	  title: {
		  text: ""
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: true
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: [
			{ x: 10, y: 71 },
			{ x: 20, y: 55 },
			{ x: 30, y: 50 },
			{ x: 40, y: 65 },
			{ x: 50, y: 71 },
			{ x: 60, y: 92, indexLabel: "Highest\u2191" },
			{ x: 70, y: 68 },
			{ x: 80, y: 38, indexLabel: "Lowest\u2193"  },
			{ x: 90, y: 54 },
			{ x: 100, y: 60 }
		]
	  }]
	}

  chart: any;
	isButtonVisible = false;

	visitorsChartDrilldownHandler = (e: any) => {
		this.chart.options = this.visitorsDrilldownedChartOptions;
		this.chart.options.data = this.options[e.dataPoint.name];
		this.chart.options.title = { text: e.dataPoint.name }
		this.chart.render();
		this.isButtonVisible = true;
	}

	visitorsDrilldownedChartOptions = {
		animationEnabled: true,
		theme: "light2",
		axisY: {
			gridThickness: 0,
			lineThickness: 1
		},
		data: []
	};

	newVSReturningVisitorsOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "New vs Returning Visitors"
		},
		subtitles: [{
			text: "Click on Any Segment to Drilldown",
			backgroundColor: "#2eacd1",
			fontSize: 16,
			fontColor: "white",
			padding: 5
		}],
		data: []
	};

	options: data = {
		"New vs Returning Visitors": [{
			type: "pie",
			name: "New vs Returning Visitors",
			startAngle: 90,
			cursor: "pointer",
			explodeOnClick: false,
			showInLegend: true,
			legendMarkerType: "square",
			click: this.visitorsChartDrilldownHandler,
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{ y: 551160, name: "New Visitors", color: "#058dc7", indexLabel: "62.56%" },
				{ y: 329840, name: "Returning Visitors", color: "#50b432", indexLabel: "37.44%" }
			]
		}],
		"New Visitors": [{
			color: "#058dc7",
			name: "New Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 42600 },
				{ label: "Feb", y: 44960 },
				{ label: "Mar", y: 46160 },
				{ label: "Apr", y: 48240 },
				{ label: "May", y: 48200 },
				{ label: "Jun", y: 49600 },
				{ label: "Jul", y: 51560 },
				{ label: "Aug", y: 49280 },
				{ label: "Sep", y: 46800 },
				{ label: "Oct", y: 57720 },
				{ label: "Nov", y: 59840 },
				{ label: "Dec", y: 54400 }
			]
		}],
		"Returning Visitors": [{
			color: "#50b432",
			name: "Returning Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 21800 },
				{ label: "Feb", y: 25040 },
				{ label: "Mar", y: 23840 },
				{ label: "Apr", y: 24760 },
				{ label: "May", y: 25800 },
				{ label: "Jun", y: 26400 },
				{ label: "Jul", y: 27440 },
				{ label: "Aug", y: 29720 },
				{ label: "Sep", y: 29200 },
				{ label: "Oct", y: 31280 },
				{ label: "Nov", y: 33160 },
				{ label: "Dec", y: 31400 }
			]
		}]
	};

	handleClick(event: Event) {
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render();
		this.isButtonVisible = false;
	  }

	getChartInstance(chart: object) {
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render();
	}



  chartOptions3 = {
		animationEnabled: true,
		theme: "light2",
		title:{
			text: "Site Traffic"
		},
		axisX:{
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Number of Visits",
			crosshair: {
				enabled: true
			}
		},
		toolTip:{
			shared:true
		},
		legend:{
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "right",
			dockInsidePlotArea: true,
			itemclick: function(e: any) {
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Total Visit",
			lineDashType: "dash",
			markerType: "square",
			xValueFormatString: "DD MMM, YYYY",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 650 },
				{ x: new Date(2022, 0, 4), y: 700 },
				{ x: new Date(2022, 0, 5), y: 710 },
				{ x: new Date(2022, 0, 6), y: 658 },
				{ x: new Date(2022, 0, 7), y: 734 },
				{ x: new Date(2022, 0, 8), y: 963 },
				{ x: new Date(2022, 0, 9), y: 847 },
				{ x: new Date(2022, 0, 10), y: 853 },
				{ x: new Date(2022, 0, 11), y: 869 },
				{ x: new Date(2022, 0, 12), y: 943 },
				{ x: new Date(2022, 0, 13), y: 970 },
				{ x: new Date(2022, 0, 14), y: 869 },
				{ x: new Date(2022, 0, 15), y: 890 },
				{ x: new Date(2022, 0, 16), y: 930 }
			]
		},
		{
			type: "line",
			showInLegend: true,
			name: "Unique Visit",
			lineDashType: "dot",
			dataPoints: [
				{ x: new Date(2022, 0, 3), y: 510 },
				{ x: new Date(2022, 0, 4), y: 560 },
				{ x: new Date(2022, 0, 5), y: 540 },
				{ x: new Date(2022, 0, 6), y: 558 },
				{ x: new Date(2022, 0, 7), y: 544 },
				{ x: new Date(2022, 0, 8), y: 693 },
				{ x: new Date(2022, 0, 9), y: 657 },
				{ x: new Date(2022, 0, 10), y: 663 },
				{ x: new Date(2022, 0, 11), y: 639 },
				{ x: new Date(2022, 0, 12), y: 673 },
				{ x: new Date(2022, 0, 13), y: 660 },
				{ x: new Date(2022, 0, 14), y: 562 },
				{ x: new Date(2022, 0, 15), y: 643 },
				{ x: new Date(2022, 0, 16), y: 570 }
			]
		}]
	}
}
