import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

@Component({
  selector: 'app-outbond-map',
  standalone: true,
  imports: [],
  templateUrl: './outbond-map.component.html',
  styleUrl: './outbond-map.component.css'
})
export class OutbondMapComponent implements OnInit, OnDestroy {
  private root!: am5.Root;

  ngOnInit() {
    this.root = am5.Root.new("worldMapDiv");

    let chart = this.root.container.children.push(
      am5map.MapChart.new(this.root, {
        panX: "rotateX",
        projection: am5map.geoOrthographic(),  // 🌍 Globe style
      })
    );

    chart.set("zoomControl", am5map.ZoomControl.new(this.root, {}));

    // Polygon series (world countries)
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(this.root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    // Highlighted destinations
    const destinations: any = {
      AE: { name: "UAE", color: "#FF6B6B", img: "assets/images/a.jpg" },
      SA: { name: "Saudi Arabia", color: "#FFA94D", img: "assets/images/b.jpg" },
      QA: { name: "Qatar", color: "#74C0FC", img: "assets/c.jpg" },
      OM: { name: "Oman", color: "#63E6BE", img: "assets/d.jpg" },
      MV: { name: "Maldives", color: "#FFD43B", img: "assets/e.jpg" },
      TH: { name: "Thailand", color: "#845EF7", img: "assets/f.jpg" },
      SG: { name: "Singapore", color: "#FF922B", img: "assets/singapore.jpg" },
      MY: { name: "Malaysia", color: "#40C057", img: "assets/malaysia.jpg" },
      ID: { name: "Indonesia (Bali)", color: "#FAB005", img: "assets/bali.jpg" },
      LK: { name: "Sri Lanka", color: "#15AABF", img: "assets/srilanka.jpg" },
      NP: { name: "Nepal", color: "#E64980", img: "assets/images/a.jpg" },
      BT: { name: "Bhutan", color: "#228BE6", img: "assets/bhutan.jpg" },
      GB: { name: "United Kingdom", color: "#D6336C", img: "assets/uk.jpg" },
      FR: { name: "Europe", color: "#7950F2", img: "assets/europe.jpg" }, // you can use multiple EU codes if needed
      US: { name: "United States", color: "#12B886", img: "assets/usa.jpg" },
    };

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const dataContext = target.dataItem?.dataContext as { id?: string };
      const id = dataContext?.id;
      if (id && destinations[id]) {
        return am5.color(destinations[id].color);
      }
      return fill;
    });

    // Tooltip with HTML (image + book now)
    polygonSeries.mapPolygons.template.set("tooltipHTML", `
      <div style="text-align:center; max-width:200px;">
        <strong>{name}</strong><br>
        <img src="{img}" alt="{name}" style="width:100%; border-radius:8px; margin:5px 0;">
        <button style="background:#2563eb; color:white; padding:6px 12px; border:none; border-radius:6px; cursor:pointer;">
          Book Now
        </button>
      </div>
    `);

    // Provide values for template
    polygonSeries.mapPolygons.template.adapters.add("tooltipHTML", (html = "", target) => {
      const dataContext = target.dataItem?.dataContext as { id?: string; name?: string };
      const id = dataContext?.id;

      if (id && destinations[id]) {
        return html
          .replace(/{name}/g, destinations[id].name)
          .replace(/{img}/g, destinations[id].img);
      }
      return html.replace(/{name}/g, dataContext?.name ?? "").replace(/{img}/g, "");
    });
  }


  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
