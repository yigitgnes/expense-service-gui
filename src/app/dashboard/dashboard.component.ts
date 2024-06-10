import {Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {GatewayService} from "../service/gateway.service";
import {Profit} from "../model/Profit";
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    profit: Profit;
    constructor(private gatewayService: GatewayService, private decimalPipe: DecimalPipe) {
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngOnInit() {

        this.gatewayService.getProfit().subscribe((data: Profit) => {
            this.profit = data;
        });

        /* ----------==========     Daily Sales Chart initialization   ==========---------- */
        this.gatewayService.getMonthlySales().subscribe(monthlySales => {
            const labels = monthlySales.map(sale => sale.month.substring(0, 3));
            const series = [monthlySales.map(sale => sale.count)];

            const dataMonthlySalesChart: any = {
                labels: labels,
                series: series
            };

            const optionsMonthlySalesChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: Math.max(...series[0]) + 1,
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            };

            var monthlySalesChart = new Chartist.Line('#monthlySalesChart', dataMonthlySalesChart, optionsMonthlySalesChart);

            this.startAnimationForLineChart(monthlySalesChart);
        });

        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
        this.gatewayService.getMonthlyEarning().subscribe(monthlyEarning => {
            const labels = monthlyEarning.map(earning => earning.month.substring(0, 3));
            const series = [monthlyEarning.map(earning => earning.count)];

            const dataMonthlyEarningChart: any = {
                labels: labels,
                series: series
            };

            const optionsMonthlyEarningChart: any = {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: Math.max(...series[0]) + 100,
                chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
            };

            const responsiveOptions: any[] = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            var monthlyEarningChart = new Chartist.Bar('#earningViewChart', dataMonthlyEarningChart, optionsMonthlyEarningChart, responsiveOptions);
            this.startAnimationForBarChart(monthlyEarningChart);
        })
        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
        this.gatewayService.getMonthlyExpense().subscribe(monthlyExpense => {
            const labels = monthlyExpense.map(earning => earning.month.substring(0, 3));
            const series = [monthlyExpense.map(earning => earning.count)];

            const dataMonthlyExpenseChart: any = {
                labels: labels,
                series: series
            };

            const optionsMonthlyExpenseChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: Math.max(...series[0]) + 50,
                chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
            }

            var monthlyExpenseChart = new Chartist.Line('#completedTasksChart', dataMonthlyExpenseChart, optionsMonthlyExpenseChart);
            this.startAnimationForLineChart(monthlyExpenseChart);
        })
    }

    getFormattedSpending(): string {
        const total = this.profit?.totalNonStaticSpending + this.profit?.totalStaticSpending || 0;
        return this.decimalPipe.transform(total, '1.2-2');
    }

    getFormattedRevenue(): string {
        return this.decimalPipe.transform(this.profit.totalEarning, '1.2-2');
    }

    getFormattedProfit(): string {
        return this.decimalPipe.transform(this.profit.profit, '1.2-2');
    }

}
