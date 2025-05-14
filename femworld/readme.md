## Introduction 

FemWorld offers an engaging way to understand femicide through statistical visualizations. Users can explore a D3 map (map.js) to investigate country-specific case numbers by clicking on countries, revealing data in an Infobox. The map also features a static, color-coded bar chart highlighting top countries. The profile.js file provides interactive bar charts for France, Mexico, Germany, Colombia, and Sweden (activated by individual buttons within a single container) and a visualization of the GDP-femicide correlation (initially showing France's moderate Pearson score of 0.56, with a button to see and other button for clear function). The core logic and data management are handled by script.js, while the website's structure is defined by HTML files for the "home", "statistics", and "country profile" sections.


## Project Files

This project includes three main JavaScript files:

* **map.js:** This file displays an interactive map using D3, allowing users to navigate and explore the number of femicide cases in each country. Additionally, a static bar chart visualizes the countries with the highest number of cases in the analyzed data. The bar chart uses different colors for each bar to facilitate comparison across categories. The map employs the `d3.geoEquirectangular()` projection from D3 and features an event handler (`on('click)`) that enables users to click on a country to view its specific statistics, which are displayed in an Infobox tool.

* **profile.js:** This file handles several `on('click)` events associated with five country buttons: France, Mexico, Germany, Colombia, and Sweden. Clicking each button renders a bar chart showing the number of femicide cases in the respective country within the same designated container. A second visualization within this file explores the correlation between GDP (used as a poverty indicator) and the number of femicide cases in each of these countries. Currently, only the visualization for France is displayed by default, which showed a moderate Pearson correlation coefficient of 0.56 after analysis. A separate button click event allows users to visualize the Pearson coefficient for each of the five countries. Finally, another button provides functionality for the user to clear this visualization container and its content.

* **script.js:** This file serves as the main script, instantiating the necessary classes and providing data to all functions and classes across the other JavaScript files.

## HTML Structure

The website's content is organized using the following HTML files, corresponding to the main menu sections:

* **home:** This section likely contains introductory information and potentially links or summaries related to the project.
* **estadistas:** This section (likely "Statistics" in English) houses the global and potentially summarized femicide statistics visualized by the project.
* **country profile:** This section displays the detailed country-specific statistics and visualizations, as managed by `profile.js`.
