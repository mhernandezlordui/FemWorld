/** Class representing the map view. */
class MapVis{
    /**
     * Creates a Map Visuzation
     * @param globalApplicationState The shared global application state (has the data for all instances in it)
     */
       
    constructor(globalApplicationState) {  
      this.globalApplicationState = globalApplicationState;   
          

      this.svg = null;
      this.svg = null;
      this.projection = null;
      this.path = null;
      this.colorScale = null;
      this.graticule = null;      
      this.infoBox = null;  
      this.yScale = null;
      this.xScale  = null;

  
      this.plotMap() ;  
      this.barChart() ;
      this.SelectorPerpetrator();   
      this.SelectorYear();
      
    }    

    plotMap () {  
        // Load GeoJSON data using globalApplicationState
    let data = globalApplicationState.mapData;
    let fem_data = globalApplicationState.femData;
    const geojsonFeatures = topojson.feature(data, data.objects.countries);
    //console.log("It is the geojsonFeatures.features", geojsonFeatures.features);      
  
    // Code for visualization of the map 

    // Set up the map projection
    this.projection = d3.geoEquirectangular()
      .scale(150) // This set the size of the map
      .translate([480, 240]); // This moves the map to the center of the SVG
    
  
    // Create a path generator
    this.path = d3.geoPath().projection(this.projection);
    this.graticule = d3.geoGraticule()
    const outline = this.graticule.outline();
  

    // Container for the ID map
    this.svg = d3.select("#map");  
    
    // Drawing the map with graticule
    this.svg.append("path")    
    .datum(this.graticule)
    .attr("class", "graticule")
    .attr("d", this.path);
  
    this.svg.append("path")
    .datum(outline)
    .attr("class", "graticule-outline")
    .attr("d", this.path);
  
    // Select all path elements
    this.svg.selectAll("path.country")
      .data(geojsonFeatures.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", this.path)       
      .attr("fill", "#254665")    
    }


    SelectorPerpetrator ( ) {
      let data = globalApplicationState.mapData;
      let fem_data = globalApplicationState.femData;      
      const geojsonFeatures = topojson.feature(data, data.objects.countries);
      //console.log("It is the geoJson", geojsonFeatures);
      //console.log("It is the data fem", fem_data);      
      let dataset = d3.select("#dataset_relation");
      dataset.on("change",function() { 
        const value = d3.select(this).property('value');
      //console.log('Change event fired:', value);
      console.log("Year in the screen", globalApplicationState.selectedYear);

        /////////////////////// First Condiction selector ////////////////////////////////////////////////////////////////////
        if (value=="Other Perpetrator known to the victim") {        
          const OtherPerpetratorknownVictim = fem_data.filter(
            item => item.Relationship === value  && item.Unity==="Counts" && item.Year ===globalApplicationState.selectedYear);
            console.log("Si leyo el Year in the screen", globalApplicationState.selectedYear);     
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          
          const mapCorto = new Map(OtherPerpetratorknownVictim.map(obj => [obj['Iso_code'], obj]));
          geojsonFeatures.features.forEach(objLargo => {
            const objetoCortoCoincidente = mapCorto.get(objLargo['id']);
            if (objetoCortoCoincidente) {              
              objLargo.properties['femicideCases'] = parseInt(objetoCortoCoincidente['Value']);              
            } else {              
              objLargo.properties['femicideCases'] = 0;              
            }
          });
          console.log("The new geojson", geojsonFeatures.features) 
          // Created a color scale
          const minValue = d3.min(OtherPerpetratorknownVictim , d => d.Value);
          const maxValue = d3.max(OtherPerpetratorknownVictim , d => d.Value);
          const colorScale = d3.scaleOrdinal(d3.schemeBuGn[9])
            .domain([minValue, maxValue]);         
          // Actualization of map
          const infoBox = d3.select(".info-box");
          this.svg = d3.select("#map"); 
          this.svg.selectAll("path.country")
            .data(geojsonFeatures.features)
            .style("fill", function(d) {
            return colorScale(d.properties.femicideCases);
            })
            .on("click", function(event, d) {            
              const countryName = d.id; 
              const countryValue = d.properties.femicideCases;           
              infoBox.html(`${countryName}, ${countryValue} cases `)
              .style("display", "block")
              .style("color", "white");
            });
        /////////////////////// Second Condiction selector ////////////////////////////////////////////////////////////////////
        } else if (value=="Intimate partner or family member") {
          const IntimatePartner = fem_data.filter(
            item => item.Relationship === value  && item.Unity==="Counts" && item.Year ===globalApplicationState.selectedYear);
          //console.log("IntimatePartner", IntimatePartner);                       
          const mapCorto = new Map(IntimatePartner.map(obj => [obj['Iso_code'], obj]));
          geojsonFeatures.features.forEach(objLargo => {
            const objetoCortoCoincidente = mapCorto.get(objLargo['id']);
            if (objetoCortoCoincidente) {              
              objLargo.properties['femicideCases'] = parseInt(objetoCortoCoincidente['Value']);
            } else {              
              objLargo.properties['femicideCases'] = 0;
            }
          });
          console.log("The new geojson intimate", geojsonFeatures.features) 
          // Created a color scale
          const minValue = d3.min(IntimatePartner, d => d.Value);
          const maxValue = d3.max(IntimatePartner, d => d.Value);
          const colorScale = d3.scaleOrdinal(d3.schemeReds[9])
            .domain([minValue, maxValue]);         
          // Actualization of map
          const infoBox = d3.select(".info-box");
          this.svg = d3.select("#map"); 
          this.svg.selectAll("path.country")
            .data(geojsonFeatures.features)
            .style("fill", function(d) {
            return colorScale(d.properties.femicideCases);
            })
            .on("click", function(event, d) {            
              const countryName = d.id; 
              const countryValue = d.properties.femicideCases;           
              infoBox.html(`${countryName}, ${countryValue} cases `)
              .style("display", "block")
              .style("color", "white");
            });
        /////////////////////////// Third Condition ////////////////////////////////////////////////////////////////////////////
        } else {
          const UnknownTheVictim = fem_data.filter(
            item => item.Relationship === value  && item.Unity==="Counts" && item.Year ===globalApplicationState.selectedYear);
          console.log("UnknownTheVictim", UnknownTheVictim);                       
          const mapCorto = new Map(UnknownTheVictim.map(obj => [obj['Iso_code'], obj]));
          geojsonFeatures.features.forEach(objLargo => {
            const objetoCortoCoincidente = mapCorto.get(objLargo['id']);
            if (objetoCortoCoincidente) {              
              objLargo.properties['femicideCases'] = parseInt(objetoCortoCoincidente['Value']);
            } else {              
              objLargo.properties['femicideCases'] = 0;
            }
          });
          console.log("The new geojson intimate", geojsonFeatures.features) 
          // Created a color scale
          const minValue = d3.min(UnknownTheVictim, d => d.Value);
          const maxValue = d3.max(UnknownTheVictim, d => d.Value);
          const colorScale = d3.scaleOrdinal(d3.schemeBlues[9])
            .domain([minValue, maxValue]);         
          // Actualization of map
          const infoBox = d3.select(".info-box");
          this.svg = d3.select("#map"); 
          this.svg.selectAll("path.country")
            .data(geojsonFeatures.features)
            .style("fill", function(d) {
            return colorScale(d.properties.femicideCases);
            })
            .on("click", function(event, d) {            
              const countryName = d.id; 
              const countryValue = d.properties.femicideCases;           
              infoBox.html(`${countryName}, ${countryValue} cases `)
              .style("display", "block")
              .style("color", "white");
            });

        }
      });
    }
    SelectorYear() {
      /////////////////////////   Data   ////////////////////////////////////
      let fem_data = globalApplicationState.femData;  
      console.log("MMMMMMMMMMMMMM", fem_data)
      /////////////////////////////////////////////////////////////////////// 
      let datayear = d3.select("#year");
      datayear.on("change",function() {
        const value = d3.select(this).property('value');  
        globalApplicationState.selectedYear = value;       
      });
    }   

    barChart() {
    
      /////////////////////////   Data   ////////////////////////////////////
      let fem_data = globalApplicationState.femData;  
      console.log("MMMMMMMMMMMMMM", fem_data)
      const quantity = 15;
      const attribute = 'Value';
      const highestCountry = fem_data.sort((a, b) => b[attribute] - a[attribute]).slice(0, quantity);
      console.log("NNNNN", highestCountry);
      ///////////////////////////////////////////////////////////////////////
      const ids = new Set();
      const uniquesObject = highestCountry.filter(object => {
        if (!ids.has(object.Iso_code)) {
          ids.add(object.Iso_code);
          return true;
        }
        return false;
      });
      console.log("unicos", uniquesObject)
      /////////////////////////////////////////////////////////////////////// 

    const data = uniquesObject;
    // Set dimensions and margins
    const margin = { top: 20, right: 20, bottom: 30, left: 60 };
    const width = 350 - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    // Create the SVG container
    this.svg = d3.select("#barChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("fill","rgb(43, 122, 226)");

    // Create the y scale

    const yScale = d3.scaleLinear()  
      .domain([0, d3.max(data, d => d.Value)])  
      .range([height, 0]);

    // Create the x scale
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.Country)) // Use index as domain for simple example
      .range([0, width])
      .padding(0.3);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append the bars
    this.svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.Country))
      .attr("y", d => yScale(d.Value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.Value))
      .style("fill", (d, i) => color(i));;    


    // Append the y-axis
    this.svg.append("g")
      .call(d3.axisLeft(yScale));

    // Append the x-axis
    this.svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));    

    this.svg.append("text")
      .attr("class", "axis-label") 
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 3)  
      .attr("x", 0 - (height / 1.5)) 
      .attr("dy", "1em") 
      .style("fill", "black")
      .text("Femicide Cases");

    // Append the frequency labels
    this.svg.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.Country) + 20)
    .attr("y", d => yScale(d.Value) - 13) // Adjust vertical position for spacing
    .attr("dy", ".9em")
    .text(d => d.Value);


    }

   
  }

