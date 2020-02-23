# Solar State

This project makes use of DeckGL and Mapbox to visualise the solar potential in Kwh per m^2 in the USA, split into zones of approxiamtly 2000KM^2 in size. 

We have combined this with a dataset indicating the amount of suitable rooftop space for solar in m^2 in each zip code to produce an approximation for the Annual Solar potential for each suitable zip code. We used standard calculations taking into account the angle of the roof, and the efficiency of solar panels for our calculations.

## Data Sources:

Solar Potential: https://catalog.data.gov/dataset/nrel-gis-data-continental-united-states-high-resolution-concentrating-solar-power-2e3ea

Suitable Rooftops by zip code: https://data.world/us-doe-gov/8a2f1ac7-b904-453d-a2ee-78ac261143ca

Zip code to Coordinates : https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/export/

In the project *frontend* directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Project created by:

Adelaida Creosteanu (adelaidaCreosteanu) - Data/Backend

Christopher Coles (chriscoles01) - Frontend

Maria Aufschlager (MariaAufschlager007) - Data/Backend
