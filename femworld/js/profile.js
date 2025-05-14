/** Class representing the profile of countries view. */
class ProfileVis{

    /**
     * Creates a Map Visuzation
     * @param globalApplicationState The shared global application state (has the data for all instances in it)
     */
       
    constructor(globalApplicationState) {  
        this.globalApplicationState = globalApplicationState; 

        this.svg = null;
        this.svg2 = null;
        this.createBarChart();
        this.createCorrelationPearson();
        
            
    }    

    createBarChart() {

    // Set dimensions and margins
    const margin = { top: 10, right: 50, bottom: 35, left: 60 };
    const width = 450 - margin.left - margin.right;
    const height2 = 280 - margin.top - margin.bottom;

    let fem_data = globalApplicationState.femData;  
    //console.log("PPPPPP", fem_data)
    const filteredByCountry = fem_data.filter(item => item.Country === 'France');
    const filteredByCountryMex = fem_data.filter(item => item.Country === 'Mexico');
    const filteredByCountryGer = fem_data.filter(item => item.Country === 'Germany');
    const filteredByCountryCol = fem_data.filter(item => item.Country === 'Colombia');
    const filteredByCountrySweden = fem_data.filter(item => item.Country === 'Sweden');

    ///////////////////////////////////  France  ////////////////////////////////////////////////////////
    console.log("jj", filteredByCountry)
    const filteredByYearRange = filteredByCountry.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRange.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr", filteredByYearRange)

    ///////////////////////////////// Mexico //////////////////////////////////////////////////////////
    console.log("jj Mex", filteredByCountryMex)
    const filteredByYearRangeMex = filteredByCountryMex.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRangeMex.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr Mex", filteredByYearRangeMex)

    ///////////////////////////////// Germany //////////////////////////////////////////////////////////
    console.log("jj Ger", filteredByCountryGer)
    const filteredByYearRangeGer = filteredByCountryGer.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRangeGer.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr Mex", filteredByYearRangeGer)

    ///////////////////////////////// Colombia //////////////////////////////////////////////////////////
    console.log("jj Col", filteredByCountryCol)
    const filteredByYearRangeCol = filteredByCountryCol.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRangeCol.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr Col", filteredByYearRangeCol)

    ///////////////////////////////// Sweden //////////////////////////////////////////////////////////
    console.log("jj Ger", filteredByCountrySweden)
    const filteredByYearRangeSweden = filteredByCountrySweden.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRangeSweden.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr Mex", filteredByYearRangeSweden)

  /////////////////////////////////////// Action button1 France ////////////////////////////////////////       
    d3.select("#button1")
      .on("click", function() { 
        
        const svg = d3.select(".femicideBar"); // Si tu SVG tiene una clase

        svg.selectAll("*").remove();


        // Create the SVG container
        this.svg = d3.select("#femicideYearBar")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height2 + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)          
          .style("fill","rgb(43, 122, 226)");

        const yScale = d3.scaleLinear()  
          .domain([0, 21000])  
          .range([height2, 0]);

        //console.log('el max', d3.min(filteredByYearRange, d => d.Value))

        // Create the x scale
        const xScale = d3.scaleBand()
          .domain(filteredByYearRange.map(d => d.Year)) 
          .range([0, width])
          .padding(0.1);

        // Append the bars
        this.svg.selectAll(".bar")
          .data(filteredByYearRange)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(d.Year))
          .attr("y", d => yScale(d.Value))
          .attr("width", xScale.bandwidth())
          .attr("height", d => height2 - yScale(d.Value));


      // Append the y-axis
      this.svg.append("g")
        .call(d3.axisLeft(yScale));

      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 5)  
        .attr("x", 0 - (height2 / 1.5)) 
        .attr("dy", "1em") 
        .style("fill", "black")
        .text("Femicide Cases");


      // Append the x-axis
        this.svg.append("g")
        .attr("transform", `translate(0,${height2})`)
        .call(d3.axisBottom(xScale))


        this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("x", width / 2)        
        .attr("y", height2 - margin.bottom + 70) 
        .style("fill", "black")
        .text("Year");

       // Append the frequency labels
      this.svg.selectAll(".label")
      .data(filteredByYearRange)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", d => xScale(d.Year) + 20)
      .attr("y", d => yScale(d.Value) - 13)
      .attr("dy", ".9em")
      .text(d => d.Value);     

      // Make the container visible using D3's style method
      //chartContainer.style("display", "block");    

      
      let gini = globalApplicationState.giniData;
      console.log("el gini data", gini);
      ////////////////////////////////////////// Filter year in gini.csv ////////////////////
      const filteredData = [];
      if (gini.length > 0) {
        const headers = Object.keys(gini[0]);
        const filteredHeaders = headers.slice(3, 10);    
        if (filteredHeaders.length > 0) {
          filteredData.push(Object.fromEntries(filteredHeaders.map(header => [header, header]))); // Add header row
    
          gini.forEach(row => {
            const newRow = {};
            filteredHeaders.forEach(header => {
              if (row.hasOwnProperty(header)) {
                newRow[header] = row[header];
              }
            });
            filteredData.push(newRow);
          }); 
        } else {
          return 'There are not enough columns'; 
        }
      } else {
        return 'the CSV is empty'; 
      }
      const franceGini = filteredData[1];
      const mexicoGini = filteredData[2];
      const germaniGini = filteredData[3];
      const colombiaGini = filteredData[4];
      const SwedenGini = filteredData[5];
      
      const filteredFrance = [];
      const attributeName = "Value"
      filteredByYearRange.forEach(obj => {
        if (obj.hasOwnProperty(attributeName)) {
          filteredFrance.push(obj[attributeName]);
        }
      });
      console.log("france femicide", filteredFrance)
      const franceFemicide = Object.values(franceGini);
      //console.log("femicide value", franceFemicide)
      
      /////////////////////////// Pearson Correlation /////////////////////////

      const arrX = filteredFrance.map(str => parseInt(str, 10));
      const arrY = franceFemicide.map(str => parseInt(str, 10));

        
      ///////////////////////////////////////// radial chart GDP  /////////////////////////////////

          const chartContainer2 = d3.select("#svgContainer2"); 

          const width_R = 370;
          const height_R = 360;
          const radius = Math.min(width_R, height_R) / 2.5;
          const innerRadius = 20;
  
          const GDPData = arrY.map((value, index) => ({
            year: 2016 + index,
            value: value
          }));
          console.log("GDP", GDPData)
  
  
          this.svg2 = d3.select("#radialChart")
            .attr("width", width_R)
            .attr("height", height_R)
            .append("g")
            .attr("transform", `translate(${200}, ${190})`); // Center the chart          
  
          
              const angleScaleGDP = d3.scaleBand()
                .domain(GDPData.map(d => d.year))
                .range([0, 2 * Math.PI]);
          
              const radiusScaleGDP = d3.scaleLinear()
                .domain([0, 32])
                .range([innerRadius, radius]);
          
              // Create Radial Area Generator
              const areaGeneratorGDP = d3.areaRadial()
                .innerRadius(innerRadius)
                .outerRadius(d => radiusScaleGDP(d.value))
                .angle(d => angleScaleGDP(d.year) + angleScaleGDP.bandwidth() / 2)
                .curve(d3.curveLinearClosed);     
  
  
              // Append the filled area
              this.svg2.append("path")
                .datum(GDPData)
                .attr("class", "radial-area2")
                .attr("fill", "lightblue")
                .attr("d", areaGeneratorGDP)
                .attr("transform", `rotate(-90)`);           
  
                    
              // Draw the Radial Bars (optional - you might want to remove these if only the filled area is needed)
              this.svg2.selectAll(".radial-bar")
                .data(GDPData)
                .enter().append("rect")
                  .attr("class", "radial-bar")
                  .attr("x", 0)
                  .attr("y", d => -radiusScaleGDP(d.value))
                  .attr("width", angleScaleGDP.bandwidth())
                  .attr("height", d => radiusScaleGDP(d.value) - innerRadius)
                  .attr("transform", d => `rotate(${((angleScaleGDP(d.year) + angleScaleGDP.bandwidth() / 2) * 180 / Math.PI - 90)})`);
          
                // Draw Category Labels
                this.svg2.selectAll(".label")
                  .data(GDPData)
                  .enter().append("text")
                    .attr("class", "label")
                    .attr("x", 0)
                    .attr("y", d => -radiusScaleGDP(d.value) - 10)
                    .attr("transform", d => `rotate(${((angleScaleGDP(d.year) + angleScaleGDP.bandwidth() / 2) * 180 / Math.PI - 90)})`)
                    .style("text-anchor", "middle")
                    .text(d => d.year);
  
              // Append the chart title
              this.svg2.append("text")
              .attr("class", "chart-title")
              .attr("x", 20)
              .attr("y", -40)
              .style("text-anchor", "middle")
              .style("font-size", "1.2em")
              .style("font-weight", "bold")
              .text("GDP"); 
  
          
          //////////////////////////// Radial chart Femicide /////////////////////////////////////////////////  
  
  
            this.svg2 = d3.select("#radialChart")
              .attr("width", width_R)
              .attr("height", height_R)
              .append("g")
              .attr("transform", `translate(${200}, ${190})`); // Center the chart          
  
            
                const angleScale = d3.scaleBand()
                  .domain(filteredByYearRange.map(d => d.Year))
                  .range([0, 2 * Math.PI]);
            
                const radiusScale = d3.scaleLinear()
                  .domain([0, 21000])
                  .range([innerRadius, radius]);
            
                // Create Radial Area Generator
                const areaGenerator = d3.areaRadial()
                  .innerRadius(innerRadius)
                  .outerRadius(d => radiusScale(d.Value))
                  .angle(d => angleScale(d.Year) + angleScale.bandwidth() / 2)
                  .curve(d3.curveLinearClosed);     
  
  
                // Append the filled area
                this.svg2.append("path")
                  .datum(filteredByYearRange)
                  .attr("class", "radial-area")
                  .attr("d", areaGenerator)
                  .attr("transform", `rotate(-90)`);          
      
                      
                // Draw the Radial Bars (optional - you might want to remove these if only the filled area is needed)
                this.svg2.selectAll(".radial-bar")
                  .data(filteredByYearRange)
                  .enter().append("rect")
                    .attr("class", "radial-bar")
                    .attr("x", 0)
                    .attr("y", d => -radiusScale(d.Value))
                    .attr("width", angleScale.bandwidth())
                    .attr("height", d => radiusScale(d.Value) - innerRadius)
                    .attr("transform", d => `rotate(${((angleScale(d.Year) + angleScale.bandwidth() / 2) * 180 / Math.PI - 90)})`);      
  
                // Append the chart title
                this.svg2.append("text")
                .attr("class", "chart-title")
                .attr("x", 40)
                .attr("y",  -90)
                .style("text-anchor", "middle")
                .style("font-size", "1.2em")
                .style("font-weight", "bold")
                .text("Femicide"); 
  
            // Make the container visible using D3's style method
            chartContainer2.style("display", "block");           

      });        

/////////////////////////////////////// Action button2 Mexico //////////////////////////////////////// 
    

    d3.select("#button2")
      .on("click", function() {
            // **Selecciona el SVG para el gráfico**
        this.svg = d3.select("#femicideYearBar");

        // **Borra el contenido existente en el SVG**
        this.svg.selectAll("*").remove();


        const margin2 = { top: 20, right: 30, bottom: 30, left: 40 };// Ejemplo de nuevos márgenes
        const width2 = 450 - margin2.left - margin2.right;
        const height2 = 280 - margin2.top - margin2.bottom;
    
        const gMex = this.svg.append("g")          
          .attr("width", width2)
          .attr("height", height2)   
          .append("g") 
          .attr("transform", `translate(${margin2.left}, ${margin2.top})`);   
   

        const yScale2 = d3.scaleLinear()  
          .domain([0, 15600])  
          .range([height2, 0]);

        //console.log('el max', d3.max(filteredByYearRange, d => d.Value))

        // Create the x scale
        const xScale2 = d3.scaleBand()
          .domain(filteredByYearRangeMex.map(d => d.Year)) 
          .range([0, width2])
          .padding(0.1);

        // Append the y-axis
        this.svg.append("g") 
          .attr("class", "eje-y")
          .attr("transform", `translate(60, 20)`)
          .call(d3.axisLeft(yScale2));

        // Append the x-axis
        this.svg.append("g")
          .attr("class", "eje-x")
          .attr("transform", `translate(60, ${height2 + margin2.top})`)
          .call(d3.axisBottom(xScale2))


        // Append the bars
        this.svg.selectAll(".bar")
          .data(filteredByYearRangeMex)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale2(d.Year) + 60)
          .attr("y", d => yScale2(d.Value)+ margin.top + 10 )
          .attr("width", xScale2.bandwidth())
          .attr("height", d => (height2 - yScale2(d.Value)));

        this.svg.append("text")
          .attr("class", "axis-label") 
          .attr("transform", "rotate(-90)")
          .attr("y", -20)  //xxx
          .attr("x", 0 - (height2 - 50 ))   //xxx
          .attr("dy", "2em") 
          .style("fill", "black")
          .text("Femicide Cases");       


        this.svg.append("text")
          .attr("class", "axis-label") 
          .attr("x", width2 - margin2.left -90)        
          .attr("y", 280) 
          .style("fill", "black")        
          .text("Year");

       // Append the frequency labels
        this.svg.selectAll(".label")
          .data(filteredByYearRangeMex)
          .enter().append("text")
          .attr("class", "label")
          .attr("x", d => xScale2(d.Year) + 90)
          .attr("y", d => yScale2(d.Value) - 5)
          .attr("dy", ".9em")
          .text(d => d.Value);       
       
      });

    /////////////////////////////////////// Action button3 Germany //////////////////////////////////////// 
    

    d3.select("#button3")
    .on("click", function() {
          // **Selecciona el SVG para el gráfico**
      this.svg = d3.select("#femicideYearBar");

      // **Borra el contenido existente en el SVG**
      this.svg.selectAll("*").remove();
      console.log("aca el germany", filteredByCountryGer)

      const margin2 = { top: 20, right: 30, bottom: 30, left: 40 };// Ejemplo de nuevos márgenes
      const width2 = 450 - margin2.left - margin2.right;
      const height2 = 280 - margin2.top - margin2.bottom;
  
      const gGer = this.svg.append("g")          
        .attr("width", width2)
        .attr("height", height2)   
        .append("g") 
        .attr("transform", `translate(${margin2.left}, ${margin2.top})`);   


      const yScale2 = d3.scaleLinear()  
        .domain([0, 10000])  
        .range([height2, 0]);

      //console.log('el max', d3.max(filteredByYearRange, d => d.Value))

      // Create the x scale
      const xScale2 = d3.scaleBand()
        .domain(filteredByYearRangeGer.map(d => d.Year)) 
        .range([0, width2])
        .padding(0.1);

      // Append the y-axis
      this.svg.append("g") 
        .attr("class", "eje-y")
        .attr("transform", `translate(60, 20)`)
        .call(d3.axisLeft(yScale2));

      // Append the x-axis
      this.svg.append("g")
        .attr("class", "eje-x")
        .attr("transform", `translate(60, ${height2 + margin2.top})`)
        .call(d3.axisBottom(xScale2))


      // Append the bars
      this.svg.selectAll(".bar")
        .data(filteredByYearRangeGer)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale2(d.Year) + 60)
        .attr("y", d => yScale2(d.Value)+ margin.top + 10 )
        .attr("width", xScale2.bandwidth())
        .attr("height", d => (height2 - yScale2(d.Value)));

      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("transform", "rotate(-90)")
        .attr("y", -20)  //xxx
        .attr("x", 0 - (height2 - 50 ))   //xxx
        .attr("dy", "2em") 
        .style("fill", "black")
        .text("Femicide Cases");       


      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("x", width2 - margin2.left -90)        
        .attr("y", 280) 
        .style("fill", "black")        
        .text("Year");

     // Append the frequency labels
      this.svg.selectAll(".label")
        .data(filteredByYearRangeGer)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => xScale2(d.Year) + 90)
        .attr("y", d => yScale2(d.Value) - 5)
        .attr("dy", ".9em")
        .text(d => d.Value);       
     
    });

       /////////////////////////////////////// Action button4 Colombia //////////////////////////////////////// 
    

       d3.select("#button4")
       .on("click", function() {
             // **Selecciona el SVG para el gráfico**
         this.svg = d3.select("#femicideYearBar");
   
         // **Borra el contenido existente en el SVG**
         this.svg.selectAll("*").remove();
         console.log("aca el colombia", filteredByCountryCol)
   
         const margin2 = { top: 20, right: 30, bottom: 30, left: 40 };// Ejemplo de nuevos márgenes
         const width2 = 450 - margin2.left - margin2.right;
         const height2 = 280 - margin2.top - margin2.bottom;
     
         const gCol = this.svg.append("g")          
           .attr("width", width2)
           .attr("height", height2)   
           .append("g") 
           .attr("transform", `translate(${margin2.left}, ${margin2.top})`);   
   
   
         const yScale2 = d3.scaleLinear()  
           .domain([0, 2500])  
           .range([height2, 0]);
   
         //console.log('el max', d3.max(filteredByYearRange, d => d.Value))
   
         // Create the x scale
         const xScale2 = d3.scaleBand()
           .domain(filteredByYearRangeCol.map(d => d.Year)) 
           .range([0, width2])
           .padding(0.1);
   
         // Append the y-axis
         this.svg.append("g") 
           .attr("class", "eje-y")
           .attr("transform", `translate(60, 20)`)
           .call(d3.axisLeft(yScale2));
   
         // Append the x-axis
         this.svg.append("g")
           .attr("class", "eje-x")
           .attr("transform", `translate(60, ${height2 + margin2.top})`)
           .call(d3.axisBottom(xScale2))
   
   
         // Append the bars
         this.svg.selectAll(".bar")
           .data(filteredByYearRangeCol)
           .enter().append("rect")
           .attr("class", "bar")
           .attr("x", d => xScale2(d.Year) + 60)
           .attr("y", d => yScale2(d.Value)+ margin.top + 10 )
           .attr("width", xScale2.bandwidth())
           .attr("height", d => (height2 - yScale2(d.Value)));
   
         this.svg.append("text")
           .attr("class", "axis-label") 
           .attr("transform", "rotate(-90)")
           .attr("y", -20)  //xxx
           .attr("x", 0 - (height2 - 50 ))   //xxx
           .attr("dy", "2em") 
           .style("fill", "black")
           .text("Femicide Cases");       
   
   
         this.svg.append("text")
           .attr("class", "axis-label") 
           .attr("x", width2 - margin2.left -90)        
           .attr("y", 280) 
           .style("fill", "black")        
           .text("Year");
   
        // Append the frequency labels
         this.svg.selectAll(".label")
           .data(filteredByYearRangeCol)
           .enter().append("text")
           .attr("class", "label")
           .attr("x", d => xScale2(d.Year) + 90)
           .attr("y", d => yScale2(d.Value) - 5)
           .attr("dy", ".9em")
           .text(d => d.Value);       
        
       });

    /////////////////////////////////////// Action button5 Sweden //////////////////////////////////////// 
    

    d3.select("#button5")
    .on("click", function() {
          // **Selecciona el SVG para el gráfico**
      this.svg = d3.select("#femicideYearBar");

      // **Borra el contenido existente en el SVG**
      this.svg.selectAll("*").remove();
      console.log("aca el sweden", filteredByCountrySweden)

      const margin2 = { top: 20, right: 30, bottom: 30, left: 40 };// Ejemplo de nuevos márgenes
      const width2 = 450 - margin2.left - margin2.right;
      const height2 = 280 - margin2.top - margin2.bottom;
  
      const gCol = this.svg.append("g")          
        .attr("width", width2)
        .attr("height", height2)   
        .append("g") 
        .attr("transform", `translate(${margin2.left}, ${margin2.top})`);   


      const yScale2 = d3.scaleLinear()  
        .domain([0, 3500])  
        .range([height2, 0]);

      //console.log('el max', d3.max(filteredByYearRange, d => d.Value))

      // Create the x scale
      const xScale2 = d3.scaleBand()
        .domain(filteredByYearRangeSweden.map(d => d.Year)) 
        .range([0, width2])
        .padding(0.1);

      // Append the y-axis
      this.svg.append("g") 
        .attr("class", "eje-y")
        .attr("transform", `translate(60, 20)`)
        .call(d3.axisLeft(yScale2));

      // Append the x-axis
      this.svg.append("g")
        .attr("class", "eje-x")
        .attr("transform", `translate(60, ${height2 + margin2.top})`)
        .call(d3.axisBottom(xScale2))


      // Append the bars
      this.svg.selectAll(".bar")
        .data(filteredByYearRangeSweden)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale2(d.Year) + 60)
        .attr("y", d => yScale2(d.Value)+ margin.top + 10 )
        .attr("width", xScale2.bandwidth())
        .attr("height", d => (height2 - yScale2(d.Value)));

      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("transform", "rotate(-90)")
        .attr("y", -20)  //xxx
        .attr("x", 0 - (height2 - 50 ))   //xxx
        .attr("dy", "2em") 
        .style("fill", "black")
        .text("Femicide Cases");       


      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("x", width2 - margin2.left -90)        
        .attr("y", 280) 
        .style("fill", "black")        
        .text("Year");

     // Append the frequency labels
      this.svg.selectAll(".label")
        .data(filteredByYearRangeSweden)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => xScale2(d.Year) + 90)
        .attr("y", d => yScale2(d.Value) - 5)
        .attr("dy", ".9em")
        .text(d => d.Value);       
     
    });


    }

    createCorrelationPearson() {
     
      ///////////// Pearson coeficient ////////////////////////////////////////////////////////////////

      let gini = globalApplicationState.giniData;
      console.log("el gini data", gini);
      ////////////////////////////////////////// Filter year in gini.csv ////////////////////
      const filteredData = [];
      if (gini.length > 0) {
        const headers = Object.keys(gini[0]);
        const filteredHeaders = headers.slice(3, 10);    
        if (filteredHeaders.length > 0) {
          filteredData.push(Object.fromEntries(filteredHeaders.map(header => [header, header]))); // Add header row
    
          gini.forEach(row => {
            const newRow = {};
            filteredHeaders.forEach(header => {
              if (row.hasOwnProperty(header)) {
                newRow[header] = row[header];
              }
            });
            filteredData.push(newRow);
          }); 
        } else {
          return 'There are not enough columns'; 
        }
      } else {
        return 'the CSV is empty'; 
      }
      const franceGini = filteredData[1];
      const mexicoGini = filteredData[2];
      const germanyGini = filteredData[3];
      const colombiaGini = filteredData[4];
      const swedenGini = filteredData[5];

      ////////////////////////// Data France for calculating Pearson //////////////////////
      
      let fem_data = globalApplicationState.femData;         
      const filteredByCountryFrance = fem_data.filter(item => item.Country === 'France');      
      const filteredByYearRangeFrance = filteredByCountryFrance.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      const filteredFrance = [];
      const attributeName = "Value"
      filteredByYearRangeFrance.forEach(obj => {
        if (obj.hasOwnProperty(attributeName)) {
          filteredFrance.push(obj[attributeName]);
        }
      });
      console.log("france femicide", filteredFrance)
      const franceFemicide = Object.values(franceGini);

      ////////////////////////// Pearson Correlation  France /////////////////////////////    
      // Calculate means
      const n = filteredFrance.length;
      const arrX = filteredFrance.map(str => parseInt(str, 10));
      const arrY = franceFemicide.map(str => parseInt(str, 10));   

      const meanX = arrX.reduce((sum, x) => sum + x, 0) / n;
      const meanY = arrY.reduce((sum, y) => sum + y, 0) / n;

      // Calculate standard deviations
      const stdDevX = Math.sqrt(arrX.reduce((sumSq, x) => sumSq + Math.pow(x - meanX, 2), 0) / (n - 1));
      const stdDevY = Math.sqrt(arrY.reduce((sumSq, y) => sumSq + Math.pow(y - meanY, 2), 0) / (n - 1));

      if (stdDevX === 0 || stdDevY === 0) {
          console.log("Cannot calculate if standard deviation is zero")
      } 
      // Calculate Pearson correlation coefficient
      let numerator = 0;
      for (let i = 0; i < n; i++) {
        numerator += (arrX[i] - meanX) * (arrY[i] - meanY);
      }
      let pearsonFrance = numerator / ((n - 1) * stdDevX * stdDevY);
      pearsonFrance = parseFloat(pearsonFrance.toFixed(2))
      console.log("coef Pearson", pearsonFrance)


      //////////////////////// Data Mexico for calculating Pearson //////////////////////
     
      const filteredByCountryMex = fem_data.filter(item => item.Country === 'Mexico');    
      console.log("mexico", filteredByCountryMex)  
      const filteredByYearRangeMex = filteredByCountryMex.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      const filteredMex = [];
      const attributeNameMex = "Value"
      filteredByYearRangeMex.forEach(obj => {
        if (obj.hasOwnProperty(attributeNameMex)) {
          filteredMex.push(obj[attributeNameMex]);
        }
      });
      console.log("Mexico femicide", filteredMex)
      

      console.log("Mexico gini", mexicoGini )
      const primerasClavesMex = Object.keys(mexicoGini);
      if (primerasClavesMex.length > 0) {
        const primeraClave = primerasClavesMex[0];
        delete mexicoGini[primeraClave];      }
      const mexFemicide = Object.values(mexicoGini)
      console.log("gini mex modify and fem in Mex", mexFemicide, filteredMex)

            ////////////////////////// Pearson Correlation  MExico/////////////////////////////    
      // Calculate means
      const nM = filteredMex.length;
      const arrXMex = filteredMex.map(str => parseInt(str, 10));
      const arrYMex = mexFemicide.map(str => parseInt(str, 10));   

      const meanXMex= arrXMex.reduce((sum, x) => sum + x, 0) / nM;
      const meanYMex = arrYMex.reduce((sum, y) => sum + y, 0) / nM;

      // Calculate standard deviations
      const stdDevXMex = Math.sqrt(arrXMex.reduce((sumSq, x) => sumSq + Math.pow(x - meanXMex, 2), 0) / (nM - 1));
      const stdDevYMex = Math.sqrt(arrYMex.reduce((sumSq, y) => sumSq + Math.pow(y - meanYMex, 2), 0) / (nM - 1));

      if (stdDevXMex === 0 || stdDevYMex === 0) {
          console.log("Cannot calculate if standard deviation is zero")
      } 
      // Calculate Pearson correlation coefficient
      let numeratorMex = 0;
      for (let i = 0; i < nM; i++) {
        numeratorMex += (arrXMex[i] - meanXMex) * (arrYMex[i] - meanYMex);
      }
      let pearsonMex = numeratorMex / ((nM - 1) * stdDevXMex * stdDevYMex);
      pearsonMex = parseFloat(pearsonMex.toFixed(2))
      console.log("coef mexico", pearsonMex)


      //////////////////////// Data Germany for calculating Pearson //////////////////////
     
      const filteredByCountryGer = fem_data.filter(item => item.Country === 'Germany');    
      console.log("Germany", filteredByCountryGer)  
      const filteredByYearRangeGer = filteredByCountryGer.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      const filteredGer = [];
      const attributeNameGer = "Value"
      filteredByYearRangeGer.forEach(obj => {
        if (obj.hasOwnProperty(attributeNameGer)) {
          filteredGer.push(obj[attributeNameGer]);
        }
      });
      console.log("Ger femicide", filteredGer)
      const gerFemicide = Object.values(germanyGini)
      console.log("Germany gini", gerFemicide)

      ////////////////////////// Pearson Correlation  Germany /////////////////////////////////    
      // Calculate means
      const nG = filteredGer.length;
      const arrXGer = filteredGer.map(str => parseInt(str, 10));
      const arrYGer = gerFemicide.map(str => parseInt(str, 10));   

      const meanXGer= arrXGer.reduce((sum, x) => sum + x, 0) / nG;
      const meanYGer = arrYGer.reduce((sum, y) => sum + y, 0) / nG;

      // Calculate standard deviations
      const stdDevXGer = Math.sqrt(arrXGer.reduce((sumSq, x) => sumSq + Math.pow(x - meanXGer, 2), 0) / (nG - 1));
      const stdDevYGer = Math.sqrt(arrYGer.reduce((sumSq, y) => sumSq + Math.pow(y - meanYGer, 2), 0) / (nG - 1));

      if (stdDevXGer === 0 || stdDevYGer === 0) {
          console.log("Cannot calculate if standard deviation is zero")
      } 
      // Calculate Pearson correlation coefficient
      let numeratorGer = 0;
      for (let i = 0; i < nG; i++) {
        numeratorGer += (arrXGer[i] - meanXGer) * (arrYGer[i] - meanYGer);
      }
      let pearsonGer = numeratorGer / ((nG - 1) * stdDevXGer * stdDevYGer);
      pearsonGer = parseFloat(pearsonGer.toFixed(2))
      console.log("coef germany", pearsonGer)

      //////////////////////// Data Colombia for calculating Pearson //////////////////////
     
      const filteredByCountryCol = fem_data.filter(item => item.Country === 'Colombia');    
      console.log("Colombia", filteredByCountryCol)  
      const filteredByYearRangeCol = filteredByCountryCol.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      const filteredCol = [];
      const attributeNameCol = "Value"
      filteredByYearRangeCol.forEach(obj => {
        if (obj.hasOwnProperty(attributeNameCol)) {
          filteredCol.push(obj[attributeNameCol]);
        }
      });
      console.log("Colombia femicide", filteredCol)    
      console.log("Colombia gini", colombiaGini)

      const eraserYear = ["2019", "2020"];

      for (const key in colombiaGini) {
        if (colombiaGini.hasOwnProperty(key) && eraserYear.includes(key)) {
          delete colombiaGini[key];
        }
      }
      const colFemicide = Object.values(colombiaGini)
      console.log("Colombia gini modify", colFemicide, filteredCol)


      ////////////////////////// Pearson Correlation  Colombia /////////////////////////////////    
      // Calculate means
      const nC = filteredCol.length;
      const arrXCol = filteredCol.map(str => parseInt(str, 10));
      const arrYCol = colFemicide.map(str => parseInt(str, 10));   

      const meanXCol= arrXCol.reduce((sum, x) => sum + x, 0) / nC;
      const meanYCol = arrYCol.reduce((sum, y) => sum + y, 0) / nC;

      // Calculate standard deviations
      const stdDevXCol = Math.sqrt(arrXCol.reduce((sumSq, x) => sumSq + Math.pow(x - meanXCol, 2), 0) / (nC - 1));
      const stdDevYCol = Math.sqrt(arrYCol.reduce((sumSq, y) => sumSq + Math.pow(y - meanYCol, 2), 0) / (nC - 1));

      if (stdDevXCol === 0 || stdDevYCol === 0) {
          console.log("Cannot calculate if standard deviation is zero")
      } 
      // Calculate Pearson correlation coefficient
      let numeratorCol = 0;
      for (let i = 0; i < nC; i++) {
        numeratorCol += (arrXCol[i] - meanXCol) * (arrYCol[i] - meanYCol);
      }
      let pearsonCol = numeratorCol / ((n - 1) * stdDevXCol * stdDevYCol);
      pearsonCol = parseFloat(pearsonCol.toFixed(2))
      console.log("coef Colombia", pearsonCol)

      //////////////////////// Data Sweden for calculating Pearson //////////////////////
     
      const filteredByCountrySweden = fem_data.filter(item => item.Country === 'Sweden');    
      console.log("Colombia", filteredByCountrySweden)  
      const filteredByYearRangeSweden = filteredByCountrySweden.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      const filteredSweden = [];
      const attributeNameSweden = "Value"
      filteredByYearRangeSweden.forEach(obj => {
        if (obj.hasOwnProperty(attributeNameSweden)) {
          filteredSweden.push(obj[attributeNameSweden]);
        }
      });
      console.log("Sweden femicide", filteredSweden)
      
      console.log("Sweden gini", swedenGini)

      const eraserYearS = ["2016", "2017", "2018"];

      for (const key in colombiaGini) {
        if (swedenGini.hasOwnProperty(key) && eraserYearS.includes(key)) {
          delete swedenGini[key];
        }
      }
      const swedenFemicide = Object.values(swedenGini)
      console.log("Sweden gini modify", swedenFemicide , filteredSweden)

      ////////////////////////// Pearson Correlation  Sweden /////////////////////////////////    
      // Calculate means
      const nS = filteredSweden.length;
      const arrXSw = filteredSweden.map(str => parseInt(str, 10));
      const arrYSw = swedenFemicide.map(str => parseInt(str, 10));   

      const meanXSw= arrXSw.reduce((sum, x) => sum + x, 0) / nS;
      const meanYSw = arrYSw.reduce((sum, y) => sum + y, 0) / nS;

      // Calculate standard deviations
      const stdDevXSw = Math.sqrt(arrXSw.reduce((sumSq, x) => sumSq + Math.pow(x - meanXSw, 2), 0) / (nS - 1));
      const stdDevYSw = Math.sqrt(arrYSw.reduce((sumSq, y) => sumSq + Math.pow(y - meanYSw, 2), 0) / (nS - 1));

      if (stdDevXSw === 0 || stdDevYSw === 0) {
          console.log("Cannot calculate if standard deviation is zero")
      } 
      // Calculate Pearson correlation coefficient
      let numeratorSw = 0;
      for (let i = 0; i < nS; i++) {
        numeratorSw += (arrXSw[i] - meanXSw) * (arrYSw[i] - meanYSw);
      }
      let pearsonSw = numeratorSw / ((nS - 1) * stdDevXSw * stdDevYSw);
      pearsonSw = parseFloat(pearsonSw.toFixed(2))
      console.log("coef Colombia", pearsonSw)

      
      const boton = d3.select("#button6");
      const contenedor = d3.select("#svgContainer3");
      
      boton.on("click", function() {
        const infobox = contenedor.append("div")
        .attr("class", "infobox")
        .style("width", "250px")
        .style("height", "260px")
        .style("left", "160px") 
        .style("top", "5px")
        .style("fill", "#22598679");
      
      
      infobox.text("France: " + pearsonFrance )
        .append("p")
        .text("Mexico: " + pearsonMex )
        .append("p")
        .text("Germany: " + pearsonGer )
        .append("p")
        .text("Colombia: " + pearsonCol)
        .append("p")
        .text("Sweden: " + pearsonSw);

    
      const cerrarBoton = infobox.append("button")
        .text("Close")
        .style("margin-top", "20px")        
        .on("click", function() {
          infobox.remove(); 
        });
      });

    }

    pearsonCoeficient () {

  }


}