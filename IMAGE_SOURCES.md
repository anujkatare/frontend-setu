# Image sources

The frontend uses externally hosted Wikimedia Commons images for the image-led hero/auth experience. They are used as visual infrastructure references and remain separate from the SETU backend data.

1. Aerial view of Central Vista, New Delhi, India — Wikimedia Commons — CC BY-SA 4.0.
   https://commons.wikimedia.org/wiki/File:Aerial_view_of_Central_Vista,_New_Delhi_,_India.jpg

2. Aerial view of Dhola-Sadiya bridge across the Brahmaputra — Wikimedia Commons — Government Open Data License (India).
   https://commons.wikimedia.org/wiki/File:An_Aerial_view_of_the_Dhola-Sadiya_bridge_across_River_Brahmaputra,_inaugurated_by_the_Prime_Minister,_Shri_Narendra_Modi,_in_Assam_on_May_26,_2017_(2).jpg

3. Aerial view of Ghatkopar Metro Station and Ghatkopar Railway Station — Wikimedia Commons.
   https://commons.wikimedia.org/wiki/File:Aerial_view_of_Ghatkopar_Metro_Station_and_Ghatkopar_Railway_Station.jpg

If the app is later deployed where external image hosting is undesirable, replace the three URLs in `src/main.jsx` with local assets.
