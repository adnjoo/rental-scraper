const equityUrls = {
  owner: "Equity Apartments",
  site: "https://www.equityapartments.com/san-francisco-bay-apartments/",
  location: "SFBay",
  urls: [
    {
      url: "https://www.equityapartments.com/san-francisco-bay/mission-bay/azure-apartments",
      name: "Azure Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco/rincon-hill/340-fremont-apartments",
      name: "340 Fremont Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/soma/77-bluxome-apartments",
      name: "77 Bluxome Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/soma/soma-square-apartments",
      name: "SoMa Square Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco/potrero-hill/potrero-1010-apartments",
      name: "Potrero 1010 Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco/design-district/one-henry-adams-apartments",
      name: "One Henry Adams Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco/soma/855-brannan-apartments",
      name: "855 Brannan Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/downtown-san-francisco/geary-courtyard-apartments",
      name: "Geary Courtyard Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/lower-nob-hill/the-terraces-apartments",
      name: "The Terraces Apartments",
      location: "San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco/alameda/aero-apartments",
      name: "Aero Apartments",
      location: "Alameda",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/emeryville/artistry-emeryville-apartments",
      name: "Artistry Emeryville Apartments",
      location: "Emeryville",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/emeryville/parc-on-powell-apartments",
      name: "Parc on Powell Apartments",
      location: "Emeryville",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/daly-city/88-hillside-apartments",
      name: "88 Hillside Apartments",
      location: "Daly City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/colma/la-terrazza-apartments",
      name: "La Terrazza Apartments",
      location: "Colma",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/south-san-francisco/south-city-station-apartments",
      name: "South City Station Apartments",
      location: "S. San Francisco",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/burlingame/northpark-apartments",
      name: "Northpark Apartments",
      location: "Burlingame",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-mateo/creekside-apartments",
      name: "Creekside Apartments",
      location: "San Mateo",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-mateo/55-west-fifth-apartments",
      name: "55 West Fifth Apartments",
      location: "San Mateo",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-mateo/west-5th-apartments",
      name: "West 5th Apartments",
      location: "San Mateo",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-mateo/park-place-at-san-mateo-apartments",
      name: "Park Place at San Mateo Apartments",
      location: "San Mateo",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/foster-city/lantern-cove-apartments",
      name: "Lantern Cove Apartments",
      location: "Foster City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/foster-city/schooner-bay-apartment-homes",
      name: "Schooner Bay Apartment Homes",
      location: "Foster City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/redwood-city/riva-terra-apartments-at-redwood-shores",
      name: "Riva Terra Apartments at Redwood Shores",
      location: "Redwood City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/redwood-city/huxley-apartments",
      name: "Huxley Apartments",
      location: "Redwood City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-ramon/canyon-creek-ca-apartments",
      name: "Canyon Creek Apartments",
      location: "San Ramon",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/union-city/parkside-apartments",
      name: "Parkside Apartments",
      location: "Union City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/union-city/skylark-apartments",
      name: "Skylark Apartments",
      location: "Union City",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/fremont/archstone-fremont-center-apartments",
      name: "Archstone Fremont Center Apartments",
      location: "Fremont",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/fremont/alborada-apartments",
      name: "Alborada Apartments",
      location: "Fremont",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/mountain-view/reserve-at-mountain-view-apartments",
      name: "Reserve at Mountain View Apartments",
      location: "Mountain View",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/sunnyvale/briarwood-apartments",
      name: "Briarwood Apartments",
      location: "Sunnyvale",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/sunnyvale/arbor-terrace-apartments",
      name: "Arbor Terrace Apartments",
      location: "Sunnyvale",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/sunnyvale/the-arches-apartments",
      name: "The Arches Apartments",
      location: "Sunnyvale",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/north-san-jose/vista-99-apartments",
      name: "Vista 99 Apartments",
      location: "San Jose",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/milpitas/mill-creek-apartments",
      name: "Mill Creek Apartments",
      location: "Milpitas",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/santa-clara/estancia-at-santa-clara-apartments",
      name: "Estancia at Santa Clara Apartments",
      location: "Santa Clara",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/santa-clara/laguna-clara-apartments",
      name: "Laguna Clara Apartments",
      location: "Santa Clara",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/cupertino/city-gate-at-cupertino-apartments",
      name: "City Gate at Cupertino Apartments",
      location: "Cupertino",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/campbell/woodleaf-apartments",
      name: "Woodleaf Apartments",
      location: "Campbell",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-jose/verde-apartments",
      name: "Verde Apartments",
      location: "San Jose",
    },
    {
      url: "https://www.equityapartments.com/san-francisco-bay/san-jose/the-lex-apartments",
      name: "The Lex Apartments",
      location: "San Jose",
    },
  ],
};

module.exports = equityUrls;
