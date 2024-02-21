# belly-button-challenge
 
# Belly Button Biodiversity Dashboard

## Project Overview
The Belly Button Biodiversity project, launched in January 2011, aims to explore the microbial life thriving in human navels and understand the factors influencing these microscopic communities. This interactive dashboard provides a deep dive into the Belly Button Biodiversity dataset, showcasing the diverse microbes, or operational taxonomic units (OTUs), found in human navels.

## Features
**Test Subject ID Selector**: Users can select a test subject ID to display demographic information and visualize the microbial species found in the selected individual's navel.
**Demographic Information Panel**: Displays selected test subject's demographic details.
**Bar Chart**: Illustrates the top 10 OTUs found in the selected individual.
**Bubble Chart**: Visualizes the microbial species by their OTU IDs and sample values, highlighting the biodiversity in a colorful, interactive format.
**Gauge Chart**: Shows the belly button washing frequency of the selected individual, representing a unique aspect of human hygiene behavior.

## Getting Started
To run this dashboard locally, clone this repository to your machine and us the live server extension to run the html. 

# Technologies Used
HTML for dashboard structure and styling.

JavaScript for dynamic content and interactivity.

D3.js for data manipulation and event handling.

Plotly.js for creating interactive charts.

live server ext for VS code

**Project Specific Notes**:

-  I made a small change to the index.html provided in the starter code to change the color of the header for "Demographic Info" to blue. So that it is more similar to the sample images of the dashboard in the instructions.
-  The plotly link provided for creating the gauge chart does not have a similar example to the gauge chart shown in the module (lack of a arrow/needle). Therefore, I used plotly documentation and CHATGPT to help create with creating the gradient of green color on the chart using RGB instead of solid colors. However, I was not sure how to add the pointer needle.
-  The json was extracted from the URL provided and it is set as const at the top of the code.

## Github Pages:
**This dashboard is deployed on github pages and you can access it at this URL https://amirgol00.github.io/
