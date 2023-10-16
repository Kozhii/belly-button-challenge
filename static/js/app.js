// Define the populateDropdown function
function populateDropdown(subjectIDs) {
    var dropdown = d3.select("#selDataset");
  
    subjectIDs.forEach(function(id) {
      dropdown.append("option").text(id).property("value", id);
    });
  }
  var data; 

 // Load data from JSON file
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then(function(data) { 

  console.log(data); 

  populateDropdown(data.names);

  // Initialize the page with data for the first subject
  updateCharts(data.names[0]);
})
.catch(function(error) {
  console.error("Error loading data:", error);
});

// Function to update the charts when the user selects a test subject
function updateCharts(selectedSubject) {
    // Find the data for the selected subject
    var subjectData = data.samples.find(sample => sample.id === selectedSubject);
  
    // Take the top 10 OTUs (sample_values, otu_ids, and otu_labels)
    var top10Values = subjectData.sample_values.slice(0, 10);
    var top10Ids = subjectData.otu_ids.slice(0, 10);
    var top10Labels = subjectData.otu_labels.slice(0, 10);
  
    top10Values = top10Values.reverse();
    top10Ids = top10Ids.reverse().map(id => `OTU ${id}`); 
  
    // Create a horizontal bar chart 
    var trace1 = {
      x: top10Values,
      y: top10Ids,
      text: top10Labels,
      type: "bar",
      orientation: "h"
    };
  
    var chartData = [trace1];
  
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    Plotly.newPlot("bar", chartData, layout);
  }
  
  

  // Define the populateDropdown function
function populateDropdown(subjectIDs) {
    var dropdown = d3.select("#selDataset");
  
    subjectIDs.forEach(function(id) {
      dropdown.append("option").text(id).property("value", id);
    });
  }
  
  // Function to initialize the page and load data
  function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
   
      console.log(data); 
      // Populate the dropdown with test subject IDs
      populateDropdown(data.names);
  
     
      updateCharts(data.names[0], data); 
      createBubbleChart(data.names[0], data); 
    });
  }
  
  // Function to update the charts when the user selects a test subject
  function updateCharts(selectedSubject, data) {
    // Find the data for the selected subject
    var subjectData = data.samples.find(sample => sample.id === selectedSubject);
  
    // Take the top 10 OTUs (sample_values, otu_ids, and otu_labels)
    var top10Values = subjectData.sample_values.slice(0, 10);
    var top10Ids = subjectData.otu_ids.slice(0, 10);
    var top10Labels = subjectData.otu_labels.slice(0, 10);
  
    top10Values = top10Values.reverse();
    top10Ids = top10Ids.reverse().map(id => `OTU ${id}`); // 
  
    
    var trace1 = {
      x: top10Values,
      y: top10Ids,
      text: top10Labels,
      type: "bar",
      orientation: "h"
    };
  
    var chartData = [trace1];
  
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    Plotly.newPlot("bar", chartData, layout);
  }
  
  // Function to create the bubble chart
  function createBubbleChart(selectedSubject, data) {
    // Find the data for the selected subject
    var subjectData = data.samples.find(sample => sample.id === selectedSubject);
  
    // Define the trace for the bubble chart
    var trace = {
      x: subjectData.otu_ids,
      y: subjectData.sample_values,
      mode: 'markers',
      marker: {
        size: subjectData.sample_values,
        color: subjectData.otu_ids,
        colorscale: 'Viridis',
        showscale: true
      },
      text: subjectData.otu_labels
    };
  
    // Create the data array for the bubble chart
    var bubbleData = [trace];
  
    // Define the layout for the bubble chart
    var layout = {
      title: 'Bubble Chart for Sample',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' }
    };
  
    // Plot the bubble chart
    Plotly.newPlot('bubble', bubbleData, layout);
  }
  
  // Event listener for dropdown change
  d3.select("#selDataset").on("change", function() {
    var selectedSubject = d3.select(this).property("value");
    updateCharts(selectedSubject, data); // Pass the data object to the updateCharts function
    createBubbleChart(selectedSubject, data); // Update the bubble chart
  });
  
  // Call the init() function to start the page
  init();


   // Function to display demographic information
   function displayDemographicInfo(selectedSubject) {
    // Find the metadata for the selected subject
    var metadata = data.metadata.find(item => item.id === parseInt(selectedSubject));

    // Select the div element where you want to display the demographic info
    var demographicInfo = d3.select("#sample-metadata");

    // Clear any existing content
    demographicInfo.html("");

    // Iterate through the desired key-value pairs in the metadata and display them
    var displayFields = ["id", "ethnicity", "gender", "age", "location", "bbtype", "wfreq"];
    displayFields.forEach(field => {
      demographicInfo.append("p").text(`${field}: ${metadata[field]}`);
    });
  }

  // Event listener for dropdown change
  d3.select("#selDataset").on("change", function () {
    var selectedSubject = d3.select(this).property("value");
    updateCharts(selectedSubject); // Pass the selected subject to the updateCharts function
  });

  // Call the init() function to start the page
  init();

  
  
