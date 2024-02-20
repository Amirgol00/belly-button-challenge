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
  var metadata = data.metadata.filter(obj => obj.id.toString() === sample)[0];
  var wfreq = metadata.wfreq;

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
  Plotly.newPlot("bar", barData, barLayout);

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

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  var gaugeData = [{
    type: "indicator",
    mode: "gauge+number",
    value: wfreq,
    title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 28 } },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "red" },
      bar: { color: "brown" },
      steps: [
        { range: [0, 1], color: "rgb(248, 243, 236)" },
        { range: [1, 2], color: "rgb(244, 241, 229)" },
        { range: [2, 3], color: "rgb(233, 230, 202)" },
        { range: [3, 4], color: "rgb(229, 231, 179)" },
        { range: [4, 5], color: "rgb(213, 228, 157)" },
        { range: [5, 6], color: "rgb(183, 204, 146)" },
        { range: [6, 7], color: "rgb(140, 191, 136)" },
        { range: [7, 8], color: "rgb(138, 187, 143)" },
        { range: [8, 9], color: "rgb(133, 180, 138)" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 9
      }
    }
  }];

  var gaugeLayout = {
    width: 600,
    height: 500,
    margin: { t: 0, b: 0 }
  };

  Plotly.newPlot('gauge', gaugeData, gaugeLayout);




  // Display the sample metadata
  var displayPanel = d3.select("#sample-metadata");
  displayPanel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
    displayPanel.append("h6").text(`${key}: ${value}`);
  });
}

// Handle change in dropdown selection
d3.selectAll("#selDataset").on("change", function() {
  var newSample = d3.select(this).node().value;
  d3.json(url).then(function(data) { updateCharts(newSample, data); });
});
