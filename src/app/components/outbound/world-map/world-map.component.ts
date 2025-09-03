import { Component, NgZone, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import am5geodata_indiaLow from "@amcharts/amcharts5-geodata/indiaLow";
import am5geodata_uaeLow from "@amcharts/amcharts5-geodata/uaeLow";
import am5geodata_ukLow from "@amcharts/amcharts5-geodata/ukLow";
import am5geodata_singaporeLow from "@amcharts/amcharts5-geodata/singaporeLow";
import am5geodata_sriLankaLow from "@amcharts/amcharts5-geodata/sriLankaLow";
import am5geodata_southAfricaLow from "@amcharts/amcharts5-geodata/southAfricaLow";
import { Router } from '@angular/router';

interface CountryInfo {
  color: number;
  details: string;
  image: string;
  countryCode: string;
}

interface MapDataContext {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5map.MapChart;
  private polygonSeries!: am5map.MapPolygonSeries;
  private isDrillDown = false;
  private currentGeoData: any = am5geodata_worldLow;

  @ViewChild('chartdiv', { static: true }) chartDiv!: ElementRef;

  // Highlighted countries with their details
  highlightedCountries: Record<string, CountryInfo> = {
    "US": { 
      color: 0xff6f61, 
      details: "United States: Land of opportunities and diverse landscapes", 
      image: "assets/images/a.jpg",
      countryCode: "usa"
    },
    "IN": { 
      color: 0x6a5acd, 
      details: "India: Incredible diversity, rich culture and heritage", 
      image: "assets/images/b.jpg",
      countryCode: "india"
    },
    "AE": { 
      color: 0xffa500, 
      details: "UAE: Modern marvels and desert adventures", 
      image: "assets/images/c.jpg",
      countryCode: "uae"
    },
    "GB": { 
      color: 0x008000, 
      details: "United Kingdom: Royal heritage and modern charm", 
      image: "assets/images/d.jpg",
      countryCode: "uk"
    },
    "SG": { 
      color: 0x1e90ff, 
      details: "Singapore: Garden city with futuristic architecture", 
      image: "assets/images/e.jpg",
      countryCode: "singapore"
    },
    "LK": { 
      color: 0xdc143c, 
      details: "Sri Lanka: Pearl of the Indian Ocean", 
      image: "assets/images/f.jpg",
      countryCode: "sri-lanka"
    },
    "ZA": { 
      color: 0x800080, 
      details: "South Africa: Rainbow nation with stunning wildlife", 
      image: "assets/images/c.jpg",
      countryCode: "south-africa"
    }
  };

  // Country-specific geo data mapping
  private countryGeoData: Record<string, any> = {
    "US": am5geodata_usaLow,
    "IN": am5geodata_indiaLow,
    "AE": am5geodata_uaeLow,
    "GB": am5geodata_ukLow,
    "SG": am5geodata_singaporeLow,
    "LK": am5geodata_sriLankaLow,
    "ZA": am5geodata_southAfricaLow
  };

  constructor(private zone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createGlobe();
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  private createGlobe(): void {
    this.root = am5.Root.new(this.chartDiv.nativeElement);
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create 3D globe chart
    this.chart = this.root.container.children.push(
      am5map.MapChart.new(this.root, {
        panX: "rotateX",
        panY: "rotateY",
        wheelY: "zoom",
        projection: am5map.geoOrthographic(),
        homeGeoPoint: { longitude: 0, latitude: 0 },
        homeZoomLevel: 1,
        maxZoomLevel: 10,
        minZoomLevel: 0.5
      })
    );

    // Add polygon series
    this.polygonSeries = this.chart.series.push(
      am5map.MapPolygonSeries.new(this.root, {
        geoJSON: this.currentGeoData,
        exclude: ["AQ"] // Exclude Antarctica for better visualization
      })
    );

    this.setupPolygonStyling();
    this.setupInteractions();
    this.setupTooltips();
  }

  private setupPolygonStyling(): void {
    // Default styling for all countries
    this.polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xaaaaaa),
      stroke: am5.color(0xffffff),
      strokeWidth: 1,
      tooltipText: "{name}",
      interactive: true,
      cursorOverStyle: "pointer"
    });

    // Adapter for highlighted countries
    this.polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const dataContext = target.dataItem?.dataContext as MapDataContext;
      const id = dataContext?.id;
      
      if (id && this.highlightedCountries[id]) {
        return am5.color(this.highlightedCountries[id].color);
      }
      return fill;
    });

    // Adapter for stroke width on highlighted countries
    this.polygonSeries.mapPolygons.template.adapters.add("strokeWidth", (strokeWidth, target) => {
      const dataContext = target.dataItem?.dataContext as MapDataContext;
      const id = dataContext?.id;
      
      if (id && this.highlightedCountries[id]) {
        return 2;
      }
      return strokeWidth;
    });
  }

  private setupInteractions(): void {
    // Add click event listener
    this.polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const dataContext = ev.target.dataItem?.dataContext as MapDataContext;
      const id = dataContext?.id;
      
      if (id && this.highlightedCountries[id]) {
        this.drillDownToCountry(id);
      }
    });
  }

  private setupTooltips(): void {
    this.polygonSeries.mapPolygons.template.adapters.add("tooltipHTML", (_html, target) => {
      const dataContext = target.dataItem?.dataContext as MapDataContext;
      const id = dataContext?.id;
      const name = dataContext?.name;

      if (!id || !this.highlightedCountries[id]) {
        return `<div style="text-align:center; padding:8px;"><strong>${name}</strong></div>`;
      }

      const country = this.highlightedCountries[id];

      return `
        <div style="text-align:center; max-width:250px; padding:12px;">
          <h3 style="margin:0 0 8px 0; font-size:18px; color:#333;">${name}</h3>
          <p style="margin:0 0 12px 0; font-size:14px; color:#000; line-height:1.4;">${country.details}</p>
          <img src="${country.image}" style="width:100%; max-width:200px; border-radius:8px; margin-bottom:12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
          <button onclick="window.navigateToCountry('${country.countryCode}')" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)'" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)'">
            Explore ${name}
          </button>
        </div>
      `;
    });
  }

  private drillDownToCountry(countryId: string): void {
    if (!this.countryGeoData[countryId]) return;

    this.isDrillDown = true;
    this.currentGeoData = this.countryGeoData[countryId];

    // Update the series with new geo data
    this.polygonSeries.set("geoJSON", this.currentGeoData);
    
    // Adjust projection for country view
    this.chart.set("projection", am5map.geoMercator());
    this.chart.set("homeZoomLevel", 2);
    
    // Add back button functionality
    this.addBackButton();
  }

  private addBackButton(): void {
    // Create back button
    const backButton = this.chart.children.push(
      am5.Button.new(this.root, {
        x: am5.percent(10),
        y: am5.percent(10),
        centerX: am5.percent(0),
        centerY: am5.percent(0),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        background: am5.Rectangle.new(this.root, {
          fill: am5.color(0x667eea),
          stroke: am5.color(0xffffff),
          strokeWidth: 2
        }),
        icon: am5.Graphics.new(this.root, {
          svgPath: "M20 6L9 17l11 11",
          fill: am5.color(0xffffff),
          centerX: am5.percent(50),
          centerY: am5.percent(50)
        })
      })
    );

    backButton.events.on("click", () => {
      this.returnToGlobe();
      backButton.dispose();
    });
  }

  private returnToGlobe(): void {
    this.isDrillDown = false;
    this.currentGeoData = am5geodata_worldLow;
    
    // Update series with world data
    this.polygonSeries.set("geoJSON", this.currentGeoData);
    
    // Return to globe projection
    this.chart.set("projection", am5map.geoOrthographic());
    this.chart.set("homeZoomLevel", 1);
  }

  // Method to be called from tooltip button
  navigateToCountry(countryCode: string): void {
    this.zone.run(() => {
      this.router.navigate(['/outbound', countryCode]);
    });
  }

  // Method to get featured countries for the grid display
  getFeaturedCountries(): Array<{name: string, details: string, image: string, color: number}> {
    return Object.entries(this.highlightedCountries).map(([code, info]) => ({
      name: this.getCountryName(code),
      details: info.details,
      image: info.image,
      color: info.color
    }));
  }

  private getCountryName(code: string): string {
    const countryNames: Record<string, string> = {
      "US": "United States",
      "IN": "India", 
      "AE": "UAE",
      "GB": "United Kingdom",
      "SG": "Singapore",
      "LK": "Sri Lanka",
      "ZA": "South Africa"
    };
    return countryNames[code] || code;
  }
}

// Make navigateToCountry available globally for tooltip buttons
(window as any).navigateToCountry = (countryCode: string) => {
  // This will be handled by the component instance
  const component = document.querySelector('app-world-map') as any;
  if (component && component.navigateToCountry) {
    component.navigateToCountry(countryCode);
  }
};
