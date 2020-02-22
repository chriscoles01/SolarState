U.S. PV-Suitable Rooftop Resources
==================================

These data provide zipcode level estimates of number of suitable rooftops and suitable rooftop area in three building classes:

  * Small (1,000 - 5,000 m^2)
  * Medium (5,000 - 10,000 m^2)
  * Large (> 10,000 m^2)
  
The estimates are made using a statistical model described in detail in this technical report:

Pieter Gagnon, Robert Margolis, Jennifer Melius, Caleb Phillips, and Ryan Elmore. Rooftop Solar Photovoltaic Technical Potential in the United States: A Detailed Assessment. National Renewable Energy Laboratory. Technical Report. NREL/TP-6A20-65298. January, 2016. http://www.nrel.gov/docs/fy16osti/65298.pdf

Upper and lower estimates correspond to a 95% confidence interval around the mean (center) prediction. Medium and large building results are provided at a census-region resolution due to limited source data for building counts.

When "true" data was available from LiDAR data, those numbers are provided in place of estimates.

## File Format

Each file is a standard CSV with these fields:

  * zip - the zipcode	
  * locale - the NECS locale description (e.g., Rural, Suburb, etc,)
  * npln - the predicted number of suitable planes
  * nbld - the predicted number of suitable buildings
  * pct.suitable - the percentage of buildings that are suitable	
  * area_t?a? - the amount of area in m^2 in each tilt and azimuth class
  * bldg_t?a? - the number of planes in each tilt and azimuth class
  
The tilt classes are:

  * 0 degress (flat)
  * 15 degrees
  * 28 degrees
  * 41 degrees
  * 54 degrees
  
The azimuth classes are:

  * 0: Flat
  * 3: East
  * 4: Southeast
  * 5: South
  * 6: Southwest
  * 7: West