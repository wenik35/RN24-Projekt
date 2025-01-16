import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ApiService } from '../api.service';

@Component({
    selector: 'graph-component',
    templateUrl: './graph.component.html',
    standalone: true,
    imports: [ChartModule]
})
export class GraphComponent implements OnInit {
    options: any;

    rawData: any[] = [];

    graphData: any;

    platformId = inject(PLATFORM_ID);

    constructor(private apiService: ApiService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
      try{
        this.apiService.getData().subscribe(data => {
            this.rawData = (data as any[]);
            this.initChart();
        });
      } catch (e) {
        console.log(e);
      }
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.graphData = {
                labels: this.rawData.map(entry => entry.timestamp),
                datasets: [
                    {
                        label: 'Helligkeit',
                        data: this.rawData.map(entry => entry.value),
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