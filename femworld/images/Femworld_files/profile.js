/** Class representing the profile of countries view. */
class ProfileVis{

    /**
     * Creates a Map Visuzation
     * @param globalApplicationState The shared global application state (has the data for all instances in it)
     */
       
    constructor(globalApplicationState) {  
        this.globalApplicationState = globalApplicationState; 

        this.svg = null;
        this.createBarChart();
        this.createCorrelationChart();
        
            
    }    

    createBarChart() {

    // Set dimensions and margins
    const margin = { top: 10, right: 20, bottom: 35, left: 60 };
    const width = 450 - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    let fem_data = globalApplicationState.femData;  
    console.log("PPPPPP", fem_data)
    const filteredByCountry = fem_data.filter(item => item.Country === 'France');
    console.log("jj", filteredByCountry)
    const filteredByYearRange = filteredByCountry.filter(item => {
      return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
        item.Year >= '2016' && item.Year <= '2022';
    });
    filteredByYearRange.sort((a, b) => parseInt(a.Year)  - parseInt(b.Year));
    console.log("rrr", filteredByYearRange)

         
    d3.select("#button1")
      .on("click", function() {
        const chartContainer = d3.select("#svgContainer1");  

        // Create the SVG container
        this.svg = d3.select("#femicideYearBar")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)
          .style("fill","rgb(43, 122, 226)");

        const yScale = d3.scaleLinear()  
          .domain([0, 21000])  
          .range([height, 0]);

        //console.log('el max', d3.max(filteredByYearRange, d => d.Value))

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
          .attr("height", d => height - yScale(d.Value));



      // Append the y-axis
      this.svg.append("g")
        .call(d3.axisLeft(yScale));

      this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 5)  
        .attr("x", 0 - (height / 1.5)) 
        .attr("dy", "1em") 
        .style("fill", "black")
        .text("Femicide Cases");


      // Append the x-axis
        this.svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))


        this.svg.append("text")
        .attr("class", "axis-label") 
        .attr("x", width / 2)        
        .attr("y", height - margin.bottom + 70) 
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
        chartContainer.style("display", "block");          

      });   
     

    }

    createCorrelationChart() {
      let gini = this.globalApplicationState.giniData;
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
      
      let fem_data = globalApplicationState.femData;         
      const filteredByCountry = fem_data.filter(item => item.Country === 'France');      
      const filteredByYearRange = filteredByCountry.filter(item => {
        return item.Relationship=='Intimate partner or family member' && item.Unity == "Counts" && 
          item.Year >= '2016' && item.Year <= '2022';
      });
      console.log('jajaja', filteredByYearRange)
      const filteredFrance = [];
      const attributeName = "Value"
      filteredByYearRange.forEach(obj => {
        if (obj.hasOwnProperty(attributeName)) {
          filteredFrance.push(obj[attributeName]);
        }
      });
      //console.log("france femicide", filteredFrance)
      const franceFemicide = Object.values(franceGini);
      //console.log("femicide value", franceFemicide)
      /////////////////////////// Pearson Correlation /////////////////////////
      // Calculate means
      const n = filteredFrance.length;
      const arrX = filteredFrance.map(str => parseInt(str, 10));
      const arrY = franceFemicide.map(str => parseInt(str, 10));
      console.log(arrX, arrY)

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
      const r = numerator / ((n - 1) * stdDevX * stdDevY);
      console.log("coef Pearson", r)



      // 2. Define Dimensions and Radius
      const width = 200;
      const height = 200;
      const radius = Math.min(width, height) / 2;

      // 3. Select the SVG Container
      this.svg = d3.select("#radialChart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the chart

      // 4. Create Scales
      const angleScale = d3.scaleBand()
        .domain(filteredByYearRange.map(d => d.Year))
        .range([0, 2 * Math.PI]); // Full circle

      const radiusScale = d3.scaleLinear()
        .domain([0, 21000])
        .range([0, radius]);

      // 5. Draw the Radial Bars
      this.svg.selectAll(".radial-bar")
        .data(filteredByYearRange)
        .enter().append("rect")
          .attr("class", "radial-bar")
          .attr("x", 0)
          .attr("y", d => -radiusScale(d.Value))
          .attr("width", angleScale.bandwidth())
          .attr("height", d => radiusScale(d.Value))
          .attr("transform", d => `rotate(${((angleScale(d.Year) + angleScale.bandwidth() / 2) * 180 / Math.PI - 90)})`);

      // 6. Draw Category Labels
      this.svg.selectAll(".label")
        .data(filteredByYearRange)
        .enter().append("text")
          .attr("class", "label")
          .attr("x", 0)
          .attr("y", d => -radiusScale(d.Value) - 10) // Position above the bar
          .attr("transform", d => `rotate(${((angleScale(d.Year) + angleScale.bandwidth() / 2) * 180 / Math.PI - 90)})`)
          .style("text-anchor", "middle")
          .text(d => d.Year);


    }





}