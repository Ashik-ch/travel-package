import { Component, NgZone, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_indiaLow from "@amcharts/amcharts5-geodata/indiaLow";
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';


interface StateInfo {
  color: number;
  details: string;
  img?: string;
}

interface MapDataContext {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TooltipModule, NgFor, ButtonModule, FloatLabelModule, FormsModule],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnDestroy {
  private root!: am5.Root;

  @ViewChild('chartdiv', { static: true }) chartDiv!: ElementRef;

  highlightedStates: Record<string, StateInfo> = {
    "IN-KL": { color: 0xff6f61, details: "Kerala: Backwaters & Beaches", img: "assets/images/a.jpg" },
    "IN-KA": { color: 0x6a5acd, details: "Karnataka: Heritage & IT hub", img: "assets/images/b.jpg" },
    "IN-RJ": { color: 0xffa500, details: "Rajasthan: Desert & Palaces", img: "assets/images/b.jpg" },
    "IN-DL": { color: 0x008000, details: "Delhi: Capital City", img: "assets/images/a.jpg" },
    "IN-MH": { color: 0x1e90ff, details: "Maharashtra: Mumbai & Bollywood", img: "assets/images/a.jpg" },
    "IN-GA": { color: 0xdc143c, details: "Goa: Beaches & Nightlife", img: "assets/images/a.jpg" },
    "IN-TN": { color: 0x800080, details: "Tamil Nadu: Temples & Culture", img: "assets/images/a.jpg" }
  };

  constructor(private zone: NgZone,) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.root = am5.Root.new(this.chartDiv.nativeElement);
      this.root.setThemes([am5themes_Animated.new(this.root)]);

      const chart = this.root.container.children.push(
        am5map.MapChart.new(this.root, {
          panX: "rotateX",
          panY: "none",
          wheelY: "zoom",
          projection: am5map.geoMercator(),
        })
      );

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(this.root, {
          geoJSON: am5geodata_indiaLow,
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
      });

      // Adapter for fill color
      polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
        const dataContext = target.dataItem?.dataContext as MapDataContext;
        const id = dataContext?.id;
        return id && this.highlightedStates[id] ? am5.color(this.highlightedStates[id].color) : fill;
      });

      // Adapter for tooltip HTML
      polygonSeries.mapPolygons.template.adapters.add("tooltipHTML", (_html, target) => {
        const dataContext = target.dataItem?.dataContext as MapDataContext;
        const id = dataContext?.id;
        const name = dataContext?.name;

        if (!id || !this.highlightedStates[id]) return name || "";

        const state = this.highlightedStates[id];

        return `
        <div style="text-align:center; max-width:200px;">
          <h3 style="margin:0; font-size:16px;">${name}</h3>
          <p style="margin:4px 0; font-size:14px;">${state.details}</p>
          ${state.img ? `<img src="${state.img}" style="width:100%; border-radius:6px; margin-bottom:6px;" />` : ""}
          <button style="
            background-color:#ff6f61;
            color:white;
            border:none;
            padding:6px 12px;
            border-radius:4px;
            cursor:pointer;
            font-size:14px;
          ">Book Now</button>
         </div>
      `;
      });

    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) this.root.dispose();
    });
  }
}
