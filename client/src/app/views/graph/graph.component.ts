import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../../data-helpers/data.service';

@Component({
    selector: 'graph-component',
    templateUrl: './graph.component.html',
    standalone: true,
    imports: [ChartModule]
})
export class GraphComponent {
    options: any;

    labels: any[] = [];

    graphData: any;

    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef, private dataService: DataService) {
        this.dataService.updateSubject.subscribe(() => this.initChart());
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.graphData = {
                labels: this.dataService.dataArray.map(entry => entry.timestamp),
                datasets: [
                    {
                        label: 'Helligkeit',
                        data: this.dataService.dataArray.map(entry => entry.value),
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        tension: 0.4
                    }
                ]
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            this.cd.markForCheck();
        }
    }
}