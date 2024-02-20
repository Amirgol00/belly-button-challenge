
// URL of the JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Using d3.json() to get the data from the URL
d3.json(url).then(function(data) {
  console.log(data);
  // We can now use this data to create visualizations
});
