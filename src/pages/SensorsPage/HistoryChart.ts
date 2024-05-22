import "highcharts-border-radius";
export const HISTORY_CHART_OPTIONS = {
    chart: {
        type: 'spline'
    },
    title: {
        text: ''
    },
    plotOptions: {
        column: {
            borderRadiusTopLeft: 20,
            borderRadiusTopRight: 5,
        },
    },
    xAxis: {
        categories: [1,2,3,4,5,6,7,8,6,3,35,6,34,63,634,634,3,5,33,5,35,]
    },
    series: [
        {
            data: [1,2,3,4,8,9,10,11,15,15,14,14,14,16,17,15,14,13,12,11,]
        }
    ],

};