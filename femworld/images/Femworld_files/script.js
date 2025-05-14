// ******* DATA LOADING *******
// We took care of that for you
async function loadData () {
    const femData = await d3.csv('data/femicidedata.csv');
    const mapData = await d3.json('data/world.json');  
    const giniData = await d3.csv('data/gini.csv');         
    return {femData, mapData, giniData};
  }
  
  
  // ******* STATE MANAGEMENT *******
  // This should be all you need, but feel free to add to this if you need to 
  // communicate across the visualizations
  var globalApplicationState = {
    selectedYear: '2013',  
    femData: null,
    mapData: null,
    giniData: null,
    worldMap: null,
    profileChart: null,
  };
    
  //******* APPLICATION MOUNTING *******
  loadData().then((loadedData) => {
    console.log('Here is the imported data:', loadedData.femData);
  
    // Store the loaded data into the globalApplicationState
    globalApplicationState.femData = loadedData.femData;
    globalApplicationState.mapData = loadedData.mapData;   
    globalApplicationState.giniData = loadedData.giniData 

  
    // Creates the view objects with the global state passed in 
    const worldMap = new MapVis(globalApplicationState);
    const profileChart = new ProfileVis(globalApplicationState);

  
    globalApplicationState.worldMap = worldMap;
    globalApplicationState.profileChart = profileChart;

  
    //TODO add interactions for Clear Selected Countries button
  }); 

   
  

