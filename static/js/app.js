// Set variable url as constant url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function selectData() {
  d3.json(url).then(function(data){
    metadata = data.metadata;
    id = data.names;
    samples = data.samples;
    var individualData = d3.select("#selDataset");
    
    for (var i = 0; i < id.length; i++){
      individualData.append("option").text(id[i]).attr("value", id[i]);
    };
    barChart(id[0]);
    bubbleChart(id[0]);
    individualInfo(id[0]);
  });
}

// Function to create BubbleChart
function bubbleChart(subject){
    for (var i = 0; i < id.length; i++){
      if (subject == id[i]){
        var sample_values = samples[i].sample_values;
        var otu_ids = samples[i].otu_ids;
        var otu_labels = samples[i].otu_labels;
        var bubbleData = [{
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          text: otu_labels,
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth",
          }
        }];
        Plotly.newPlot("bubble", bubbleData);
      };
    };
  };
  
// Function to pull and display metadata for demographics
function individualInfo(subject){
  d3.select("metadata").selectAll("p").remove();
  subjectData = d3.select("#sample-metadata").append("p")
  for (var i = 0; i < id.length; i++){
    if (subject == id[i]){
      d3.select("#sample-metadata").append("p").text(`ID: ${metadata[i].id}`);
      d3.select("#sample-metadata").append("p").text(`ETHNICITY: ${metadata[i].ethnicity}`);
      d3.select("#sample-metadata").append("p").text(`GENDER: ${metadata[i].gender}`);
      d3.select("#sample-metadata").append("p").text(`AGE: ${metadata[i].age}`);
      d3.select("#sample-metadata").append("p").text(`LOCATION: ${metadata[i].location}`);
      d3.select("#sample-metadata").append("p").text(`BBTYPE: ${metadata[i].bbtype}`);
      d3.select("#sample-metadata").append("p").text(`WFREQ: ${metadata[i].wfreq}`);
    };
  };
};

// Function to create BarChart
function barChart(subject){
  for (var i = 0; i < id.length; i++){
    if (subject == id[i]){
      var sample = samples[i].sample_values.slice(0, 10)
      var labels = samples[i].otu_ids.slice(0, 10);
      var otu_ids = labels.map(function (x) {
        return "OTU " + x;});
      var otu_labels = samples[i].otu_labels.slice(0, 10);
      var barData = [{
        type: 'bar',
        x: sample,
        y: otu_ids,
        yaxis: otu_labels,
        orientation: 'h'}];
      Plotly.newPlot("bar", barData);
    };
  };

};

// Function to change the values for different subject IDs
function optionChanged(value) {
  barChart(value);
  bubbleChart(value)
  individualInfo(value)
}

selectData();