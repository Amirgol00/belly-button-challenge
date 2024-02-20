// URL of the JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and then call the init function
d3.json(url).then(function(data) {
  init(data);
});

function init(data) {
  // Populate the dropdown menu
  var selector = d3.select("#selDataset");
  data.names.forEach((sampleId) => {
    selector.append("option").text(sampleId).property("value", sampleId);
  });

  // Build initial plots with the first sample
  const firstSample = data.names[0];
  updateCharts(firstSample, data);
}

function updateCharts(sample, data) {
  // Filter data for the selected sample
  var selectedSample = data.samples.filter(obj => obj.id === sample)[0];

  // Bar chart data
  var barData = [{
    x: selectedSample.sample_values.slice(0, 10).reverse(),
    y: selectedSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    text: selectedSample.otu_labels.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h'
  }];

  // Bar chart layout
  var barLayout = {
    title: "Top 10 OTUs Found",
    margin: { t: 30, l: 150 }
  };

  // Bubble chart data
  var bubbleData = [{
    x: selectedSample.otu_ids,
    y: selectedSample.sample_values,
    text: selectedSample.otu_labels,
    mode: 'markers',
    marker: {
      size: selectedSample.sample_values,
      color: selectedSample.otu_ids,
      colorscale: "Earth"
    }
  }];

  // Bubble chart layout
  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30}
  };

  // Plot the charts
  Plotly.newPlot('bar', barData, barLayout);
  Plotly.newPlot('bubble', bubbleData, bubbleLayout);

  // Display the sample metadata
  var metadata = data.metadata.filter(obj => obj.id.toString() === sample)[0];
  var displayPanel = d3.select("#sample-metadata");
  displayPanel.html(""); // Clear the panel
  Object.entries(metadata).forEach(([key, value]) => {
    displayPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
}

// Handle change in dropdown selection
d3.selectAll("#selDataset").on("change", function() {
  var newSample = d3.select(this).node().value;
  d3.json(url).then(function(data) { updateCharts(newSample, data); });
});
