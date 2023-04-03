import { ApexOptions } from 'apexcharts';

export const TotalRevenueSeries = [
    {
        name: 'Bieżący miesiąc',
        data: [16, 17, 13, 14, 15, 17, 17],
    },
    {
        name: 'Poprzedni rok',
        data: [14, 15, 13, 14, 12, 15, 13],
    },
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: 'bar',
        toolbar: {
            show: false,
        },
    },
    colors: ['#41b6c2', '#c4e8ef'],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '55%',
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ['transparent'],
        width: 4,
    },
    xaxis: {
        categories: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec'],
    },
    yaxis: {
        title: {
            text: 'zł (tysiące)',
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
    },
    tooltip: {
        y: {
            formatter(val: number) {
                return `$ ${val} thousands`;
            },
        },
    },
};
