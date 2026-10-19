const airports = {
  KIX: { name: "Kansai", full: "Kansai International Airport" },
  HND: { name: "Tokyo Haneda", full: "Tokyo Haneda Airport" },
  NRT: { name: "Tokyo Narita", full: "Narita International Airport" },
  CTS: { name: "Sapporo", full: "New Chitose Airport" },
  FUK: { name: "Fukuoka", full: "Fukuoka Airport" },
  SFO: { name: "San Francisco", full: "San Francisco International Airport" },
  SEA: { name: "Seattle", full: "Seattle–Tacoma International Airport" },
  JFK: { name: "New York", full: "John F. Kennedy International Airport" },
  ICN: { name: "Seoul", full: "Incheon International Airport" },
  TPE: { name: "Taipei", full: "Taiwan Taoyuan International Airport" },
  SIN: { name: "Singapore", full: "Singapore Changi Airport" },
  HKG: { name: "Hong Kong", full: "Hong Kong International Airport" },
  HNL: { name: "Honolulu", full: "Daniel K. Inouye International Airport" },
  YVR: { name: "Vancouver", full: "Vancouver International Airport" },
  PDX: { name: "Portland", full: "Portland International Airport" },
  SAN: { name: "San Diego", full: "San Diego International Airport" },
  LAX: { name: "Los Angeles", full: "Los Angeles International Airport" },
  PHX: { name: "Phoenix", full: "Phoenix Sky Harbor International Airport" },
  DEN: { name: "Denver", full: "Denver International Airport" },
  MSP: { name: "Minneapolis", full: "Minneapolis–Saint Paul International Airport" },
  DFW: { name: "Dallas", full: "Dallas/Fort Worth International Airport" },
  IAH: { name: "Houston", full: "George Bush Intercontinental Airport" },
  MEX: { name: "Mexico City", full: "Mexico City International Airport" },
  MIA: { name: "Miami", full: "Miami International Airport" },
  LOS: { name: "Lagos", full: "Murtala Muhammed International Airport" },
  IST: { name: "Istanbul", full: "Istanbul Airport" },
  CDG: { name: "Paris", full: "Charles de Gaulle Airport" },
  CAI: { name: "Cairo", full: "Cairo International Airport" },
  PEK: { name: "Beijing", full: "Beijing Capital International Airport" },
  DXB: { name: "Dubai", full: "Dubai International Airport" },
  CPH: { name: "Copenhagen", full: "Copenhagen Airport" },
  ATH: { name: "Athens", full: "Athens International Airport" },
  BLR: { name: "Bengaluru", full: "Kempegowda International Airport" },
  CGK: { name: "Jakarta", full: "Soekarno–Hatta International Airport" },
  BER: { name: "Berlin", full: "Berlin Brandenburg Airport" },
  ANC: { name: "Anchorage", full: "Ted Stevens Anchorage International Airport" },
  BUD: { name: "Budapest", full: "Budapest Ferenc Liszt International Airport" },
  TFS: { name: "Tenerife", full: "Tenerife South Airport" },
  LAS: { name: "Las Vegas", full: "Harry Reid International Airport" },
  ORD: { name: "Chicago", full: "O’Hare International Airport" },
  MNL: { name: "Manila", full: "Ninoy Aquino International Airport" },
  ARN: { name: "Stockholm", full: "Stockholm Arlanda Airport" },
  SYD: { name: "Sydney", full: "Sydney Airport" },
  LIS: { name: "Lisbon", full: "Humberto Delgado Airport" },
  DOH: { name: "Doha", full: "Hamad International Airport" },
  CPT: { name: "Cape Town", full: "Cape Town International Airport" },
  MAD: { name: "Madrid", full: "Adolfo Suárez Madrid–Barajas Airport" },
  LHR: { name: "London", full: "Heathrow Airport" },
  KWI: { name: "Kuwait City", full: "Kuwait International Airport" },
  FRA: { name: "Frankfurt", full: "Frankfurt Airport" },
  KMG: { name: "Kunming", full: "Kunming Changshui International Airport" },
  AKL: { name: "Auckland", full: "Auckland Airport" },
  YYZ: { name: "Toronto", full: "Toronto Pearson International Airport" },
  DEL: { name: "Delhi", full: "Indira Gandhi International Airport" },
  HEL: { name: "Helsinki", full: "Helsinki Airport" },
  SVO: { name: "Moscow", full: "Sheremetyevo International Airport" },
  ADD: { name: "Addis Ababa", full: "Bole International Airport" },
  FCO: { name: "Rome", full: "Leonardo da Vinci–Fiumicino Airport" },
  DPS: { name: "Denpasar", full: "I Gusti Ngurah Rai International Airport" },
  GRU: { name: "São Paulo", full: "São Paulo/Guarulhos International Airport" },
  BCN: { name: "Barcelona", full: "Barcelona–El Prat Airport" },
  TFU: { name: "Chengdu", full: "Chengdu Tianfu International Airport" },
  SHE: { name: "Shenyang", full: "Shenyang Taoxian International Airport" },
  TNA: { name: "Jinan", full: "Jinan Yaoqiang International Airport" },
  PER: { name: "Perth", full: "Perth Airport" },
  KEF: { name: "Reykjavik", full: "Keflavík International Airport" },
  BKK: { name: "Bangkok", full: "Suvarnabhumi Airport" },
  CAN: { name: "Guangzhou", full: "Guangzhou Baiyun International Airport" },
  CGO: { name: "Zhengzhou", full: "Zhengzhou Xinzheng International Airport" },
  CKG: { name: "Chongqing", full: "Chongqing Jiangbei International Airport" },
  HAN: { name: "Hanoi", full: "Noi Bai International Airport" },
  HRB: { name: "Harbin", full: "Harbin Taiping International Airport" },
  MAA: { name: "Chennai", full: "Chennai International Airport" },
  SGN: { name: "Ho Chi Minh City", full: "Tan Son Nhat International Airport" },
  XMN: { name: "Xiamen", full: "Xiamen Gaoqi International Airport" },
};

const airportCoordinates = {
  KIX: { lat: 34.4347, lon: 135.2442 }, HND: { lat: 35.5494, lon: 139.7798 },
  SFO: { lat: 37.6213, lon: -122.3790 }, SEA: { lat: 47.4502, lon: -122.3088 },
  SIN: { lat: 1.3644, lon: 103.9915 }, HKG: { lat: 22.3080, lon: 113.9185 },
  JFK: { lat: 40.6413, lon: -73.7781 }, HNL: { lat: 21.3187, lon: -157.9225 },
  YVR: { lat: 49.1967, lon: -123.1844 }, PDX: { lat: 45.5898, lon: -122.5975 },
  SAN: { lat: 32.7338, lon: -117.1897 }, LAX: { lat: 33.9416, lon: -118.4085 },
  PHX: { lat: 33.4342, lon: -112.0116 }, DEN: { lat: 39.8561, lon: -104.6737 },
  MSP: { lat: 44.8848, lon: -93.2223 }, DFW: { lat: 32.8998, lon: -97.0403 },
  IAH: { lat: 29.9902, lon: -95.3414 }, MEX: { lat: 19.4363, lon: -99.0721 },
  MIA: { lat: 25.7959, lon: -80.2870 }, IST: { lat: 41.2753, lon: 28.7519 },
  CDG: { lat: 49.0097, lon: 2.5479 },
  CAI: { lat: 30.1219, lon: 31.4056 }, PEK: { lat: 40.0799, lon: 116.6031 },
  DXB: { lat: 25.2532, lon: 55.3657 }, CPH: { lat: 55.6181, lon: 12.6560 },
  ATH: { lat: 37.9364, lon: 23.9445 }, BLR: { lat: 13.1986, lon: 77.7066 },
  CGK: { lat: -6.1256, lon: 106.6559 }, BER: { lat: 52.3667, lon: 13.5033 },
  ANC: { lat: 61.1743, lon: -149.9962 }, BUD: { lat: 47.4369, lon: 19.2556 },
  TFS: { lat: 28.0445, lon: -16.5725 }, LAS: { lat: 36.0840, lon: -115.1537 },
  ORD: { lat: 41.9742, lon: -87.9073 }, MNL: { lat: 14.5086, lon: 121.0198 },
  ARN: { lat: 59.6519, lon: 17.9186 }, SYD: { lat: -33.9399, lon: 151.1753 },
  LIS: { lat: 38.7742, lon: -9.1342 }, DOH: { lat: 25.2731, lon: 51.6081 },
  CPT: { lat: -33.9715, lon: 18.6021 }, MAD: { lat: 40.4983, lon: -3.5676 },
  LHR: { lat: 51.4700, lon: -0.4543 }, KWI: { lat: 29.2266, lon: 47.9689 },
  FRA: { lat: 50.0379, lon: 8.5622 }, KMG: { lat: 25.1019, lon: 102.9292 },
  AKL: { lat: -37.0082, lon: 174.7850 }, YYZ: { lat: 43.6777, lon: -79.6248 },
  DEL: { lat: 28.5562, lon: 77.1000 }, HEL: { lat: 60.3172, lon: 24.9633 },
  SVO: { lat: 55.9726, lon: 37.4146 }, ADD: { lat: 8.9779, lon: 38.7993 },
  FCO: { lat: 41.8003, lon: 12.2389 }, DPS: { lat: -8.7482, lon: 115.1672 },
  GRU: { lat: -23.4356, lon: -46.4731 }, BCN: { lat: 41.2974, lon: 2.0833 },
  TFU: { lat: 30.3125, lon: 104.4410 }, SHE: { lat: 41.6398, lon: 123.4830 },
  TNA: { lat: 36.8572, lon: 117.2150 },
  PER: { lat: -31.9403, lon: 115.9672 }, KEF: { lat: 63.9850, lon: -22.6056 },
  LOS: { lat: 6.5774, lon: 3.3212 },
  BKK: { lat: 13.6900, lon: 100.7501 }, CAN: { lat: 23.3924, lon: 113.2988 },
  CGO: { lat: 34.5197, lon: 113.8409 }, CKG: { lat: 29.7192, lon: 106.6417 },
  CTS: { lat: 42.7752, lon: 141.6923 }, HAN: { lat: 21.2212, lon: 105.8072 },
  ICN: { lat: 37.4602, lon: 126.4407 },
  HRB: { lat: 45.6234, lon: 126.2503 }, MAA: { lat: 12.9941, lon: 80.1709 },
  SGN: { lat: 10.8188, lon: 106.6519 }, XMN: { lat: 24.5440, lon: 118.1277 },
};

const airlineInfo = {
  tsuki: { name: "Tsuki Airways", mark: "月", class: "tsuki", slogan: "The long way, well taken" },
  orbit: { name: "Tsuki Orbit", mark: "◉", class: "orbit", slogan: "Closer, with a new view" },
  pacifica: { name: "Grand Pacifica Air", mark: "✳", class: "pacifica", slogan: "Across the blue" },
};
const cabinClasses = {
  economy: { label: "Economy", multiplier: 1 },
  premium: { label: "Premium Economy", multiplier: 1.35 },
  silver: { label: "Class Silver · Business Class", multiplier: 2.4 },
  gold: { label: "Class Gold · First Class", multiplier: 3.8 },
};

// Network details transcribed from the airline-simulator screenshots.
const pacificaRoutes = [
  { city: "San Francisco", code: "SFO", distance: 8692, weekly: 32, lat: 37.6213, lon: -122.3790, labelX: -36, labelY: -8 },
  { city: "Honolulu", code: "HNL", distance: 6614, weekly: 25, lat: 21.3187, lon: -157.9225, labelX: -6, labelY: 22 },
  { city: "Houston", code: "IAH", distance: 11103, weekly: 15, lat: 29.9902, lon: -95.3414, labelX: 10, labelY: 16 },
  { city: "New York", code: "JFK", distance: 11155, weekly: 13, lat: 40.6413, lon: -73.7781, labelX: 10, labelY: -8 },
  { city: "Seattle", code: "SEA", distance: 8091, weekly: 22, lat: 47.4502, lon: -122.3088, labelX: 12, labelY: -12 },
  { city: "Dallas", code: "DFW", distance: 10752, weekly: 11, lat: 32.8998, lon: -97.0403, labelX: 12, labelY: 0 },
  { city: "San Diego", code: "SAN", distance: 9393, weekly: 15, lat: 32.7338, lon: -117.1897, labelX: -38, labelY: 27 },
  { city: "Portland", code: "PDX", distance: 8184, weekly: 16, lat: 45.5898, lon: -122.5975, labelX: -40, labelY: 20 },
  { city: "Vancouver", code: "YVR", distance: 7934, weekly: 13, lat: 49.1967, lon: -123.1844, labelX: -40, labelY: -15 },
  { city: "Phoenix", code: "PHX", distance: 9718, weekly: 6, lat: 33.4342, lon: -112.0116, labelX: 12, labelY: 21 },
  { city: "Los Angeles", code: "LAX", distance: 9222, weekly: 3, lat: 33.9416, lon: -118.4085, labelX: 12, labelY: -7 },
  { city: "Minneapolis", code: "MSP", distance: 9935, weekly: 3, lat: 44.8848, lon: -93.2223, labelX: 12, labelY: -9 },
  { city: "Denver", code: "DEN", distance: 9721, weekly: 1, lat: 39.8561, lon: -104.6737, labelX: 12, labelY: -6 },
  { city: "Mexico City", code: "MEX", distance: 11720, weekly: 0, lat: 19.4363, lon: -99.0721, labelX: 12, labelY: 22 },
];

const tsukiRoutes = [
  { from: "HND", to: "SFO", distance: 8286, weekly: 75 },
  { from: "KIX", to: "MIA", distance: 12343, weekly: 26 },
  { from: "HND", to: "IST", distance: 8958, weekly: 25 },
  { from: "HND", to: "SIN", distance: 5300, weekly: 26 },
  { from: "KIX", to: "IST", distance: 8746, weekly: 23 },
  { from: "KIX", to: "CAI", distance: 9286, weekly: 17 },
  { from: "HND", to: "PEK", distance: 2092, weekly: 40 },
  { from: "HND", to: "DXB", distance: 7935, weekly: 15 },
  { from: "KIX", to: "SIN", distance: 4902, weekly: 18 },
  { from: "KIX", to: "JFK", distance: 11155, weekly: 9 },
  { from: "HND", to: "HNL", distance: 6192, weekly: 19 },
  { from: "HND", to: "CDG", distance: 9707, weekly: 9 },
  { from: "KIX", to: "HNL", distance: 6614, weekly: 12 },
  { from: "HND", to: "CPH", distance: 8708, weekly: 10 },
  { from: "KIX", to: "ATH", distance: 9297, weekly: 13 },
  { from: "HND", to: "SEA", distance: 7712, weekly: 14 },
  { from: "HND", to: "LAX", distance: 8813, weekly: 11 },
  { from: "KIX", to: "BLR", distance: 6220, weekly: 11 },
  { from: "KIX", to: "MSP", distance: 9935, weekly: 6 },
  { from: "KIX", to: "DXB", distance: 7577, weekly: 9 },
  { from: "KIX", to: "CGK", distance: 5417, weekly: 13 },
  { from: "KIX", to: "BER", distance: 8837, weekly: 7 },
  { from: "HND", to: "ANC", distance: 5565, weekly: 14 },
  { from: "KIX", to: "BUD", distance: 8907, weekly: 7 },
  { from: "KIX", to: "TFS", distance: 12463, weekly: 7 },
  { from: "HND", to: "YVR", distance: 7559, weekly: 10 },
  { from: "HND", to: "LAS", distance: 8910, weekly: 7 },
  { from: "KIX", to: "ORD", distance: 10449, weekly: 5 },
  { from: "KIX", to: "MNL", distance: 2635, weekly: 17 },
  { from: "HND", to: "JFK", distance: 10875, weekly: 6 },
  { from: "HND", to: "MEX", distance: 11312, weekly: 6 },
  { from: "HND", to: "CAI", distance: 9561, weekly: 5 },
  { from: "KIX", to: "ARN", distance: 8088, weekly: 7 },
  { from: "KIX", to: "LAX", distance: 9222, weekly: 4 },
  { from: "HND", to: "SYD", distance: 7818, weekly: 7 },
  { from: "KIX", to: "DEN", distance: 9721, weekly: 4 },
  { from: "HND", to: "MNL", distance: 2996, weekly: 11 },
  { from: "HND", to: "DEN", distance: 9348, weekly: 4 },
  { from: "HND", to: "ARN", distance: 8167, weekly: 5 },
  { from: "HND", to: "FCO", distance: 9892, weekly: 4 },
  { from: "KIX", to: "DFW", distance: 10752, weekly: 6 },
  { from: "KIX", to: "SYD", distance: 7782, weekly: 4 },
  { from: "KIX", to: "YVR", distance: 7934, weekly: 4 },
  { from: "KIX", to: "PER", distance: 7650, weekly: 4 },
  { from: "HND", to: "LIS", distance: 11154, weekly: 3 },
  { from: "KIX", to: "DOH", distance: 7905, weekly: 4 },
  { from: "HND", to: "CPT", distance: 14721, weekly: 3 },
  { from: "KIX", to: "MAD", distance: 10678, weekly: 3 },
  { from: "HND", to: "LHR", distance: 9592, weekly: 3 },
  { from: "KIX", to: "KWI", distance: 7998, weekly: 4 },
  { from: "KIX", to: "FRA", distance: 9262, weekly: 3 },
  { from: "KIX", to: "KMG", distance: 3271, weekly: 7 },
  { from: "HND", to: "MSP", distance: 9604, weekly: 3 },
  { from: "KIX", to: "CDG", distance: 9625, weekly: 3 },
  { from: "KIX", to: "SFO", distance: 8692, weekly: 4 },
  { from: "KIX", to: "LHR", distance: 9533, weekly: 3 },
  { from: "KIX", to: "AKL", distance: 8935, weekly: 4 },
  { from: "KIX", to: "KEF", distance: 8900, weekly: 4 },
  { from: "HND", to: "LOS", distance: 13486, weekly: 3 },
  { from: "KIX", to: "SEA", distance: 8091, weekly: 3 },
  { from: "KIX", to: "YYZ", distance: 10639, weekly: 2 },
  { from: "HND", to: "DEL", distance: 5860, weekly: 5 },
  { from: "KIX", to: "HEL", distance: 7731, weekly: 3 },
  { from: "HND", to: "SVO", distance: 7494, weekly: 3 },
  { from: "HND", to: "ADD", distance: 10405, weekly: 3 },
  { from: "KIX", to: "FCO", distance: 9740, weekly: 3 },
  { from: "KIX", to: "PEK", distance: 1762, weekly: 8 },
  { from: "KIX", to: "ADD", distance: 10028, weekly: 3 },
  { from: "HND", to: "DPS", distance: 5561, weekly: 4 },
  { from: "HND", to: "YYZ", distance: 10346, weekly: 2 },
  { from: "KIX", to: "PHX", distance: 9718, weekly: 2 },
  { from: "MIA", to: "GRU", distance: 6573, weekly: 2 },
  { from: "KIX", to: "HKG", distance: 2475, weekly: 3 },
  { from: "HND", to: "BCN", distance: 10443, weekly: 1 },
  { from: "KIX", to: "TFU", distance: 3330, weekly: 3 },
  { from: "KIX", to: "SHE", distance: 1303, weekly: 3 },
  { from: "KIX", to: "SVO", distance: null, weekly: null },
  { from: "HND", to: "TNA", distance: 2025, weekly: 2 },
  { from: "HND", to: "AKL", distance: 8841, weekly: 0 },
];

const orbitRoutes = [
  { from: "KIX", to: "BKK", distance: 4161, weekly: 11 },
  { from: "KIX", to: "CAN", distance: 2455, weekly: 3 },
  { from: "KIX", to: "CGK", distance: 5417, weekly: 10 },
  { from: "KIX", to: "CGO", distance: 1958, weekly: 12 },
  { from: "KIX", to: "CKG", distance: 2736, weekly: 3 },
  { from: "KIX", to: "CTS", distance: 1083, weekly: 45 },
  { from: "KIX", to: "DEL", distance: 5477, weekly: 7 },
  { from: "KIX", to: "DPS", distance: 5246, weekly: 11 },
  { from: "KIX", to: "DXB", distance: 7577, weekly: 7 },
  { from: "KIX", to: "HAN", distance: 3229, weekly: 13 },
  { from: "KIX", to: "HKG", distance: 2475, weekly: 12 },
  { from: "KIX", to: "HND", distance: 432, weekly: 12 },
  { from: "KIX", to: "HRB", distance: 1459, weekly: 13 },
  { from: "KIX", to: "ICN", distance: 860, weekly: 34 },
  { from: "KIX", to: "KMG", distance: 3271, weekly: 7 },
  { from: "KIX", to: "MAA", distance: 6008, weekly: 14 },
  { from: "KIX", to: "MNL", distance: 2635, weekly: 9 },
  { from: "KIX", to: "PEK", distance: 1762, weekly: 14 },
  { from: "KIX", to: "SGN", distance: 3910, weekly: 5 },
  { from: "KIX", to: "SIN", distance: 4902, weekly: 22 },
  { from: "KIX", to: "SYD", distance: 7782, weekly: 7 },
  { from: "KIX", to: "TFU", distance: 2917, weekly: 6 },
  { from: "KIX", to: "XMN", distance: 1983, weekly: 3 },
];

const pacificaFleet = [
  { type: "Airbus A350-1000", code: "A35K", count: 32 },
  { type: "Airbus A350-900", code: "A359", count: 17 },
  { type: "Airbus A330-900", code: "A339", count: 5 },
];
const tsukiFleet = [
  { type: "Boeing 787-9 Dreamliner", code: "B789", count: 65 },
  { type: "Boeing 787-8 Dreamliner", code: "B788", count: 17 },
  { type: "Boeing 777-9", code: "B779", count: 16 },
];
const orbitFleet = [
  { type: "Airbus A321neo", code: "A21N", count: 31 },
  { type: "Airbus A321XLR", code: "A21N", count: 10 },
];

window.NPG_NETWORK_DATA = { airports, airportCoordinates, pacificaRoutes, pacificaFleet, tsukiRoutes, tsukiFleet, orbitRoutes, orbitFleet };

// Schedules and fares below are planning estimates.
const flights = [
  { from: "KIX", to: "SFO", brand: "pacifica", number: "GP 711", depart: "16:40", arrive: "10:45", arriveDay: "+1", duration: "10h 05m", stops: "Nonstop", price: 649 },
  { from: "KIX", to: "SFO", brand: "tsuki", number: "TA 113", depart: "11:20", arrive: "05:50", arriveDay: "+1", duration: "10h 30m", stops: "Nonstop", price: 598 },
  { from: "KIX", to: "SFO", brand: "pacifica", number: "GP 715", depart: "21:15", arrive: "15:35", arriveDay: "+1", duration: "10h 20m", stops: "Nonstop", price: 702 },
  { from: "KIX", to: "SEA", brand: "pacifica", number: "GP 421", depart: "17:25", arrive: "10:55", arriveDay: "+1", duration: "9h 30m", stops: "Nonstop", price: 612 },
  { from: "KIX", to: "SEA", brand: "tsuki", number: "TA 209", depart: "12:10", arrive: "06:00", arriveDay: "+1", duration: "9h 50m", stops: "Nonstop", price: 575 },
  { from: "KIX", to: "JFK", brand: "pacifica", number: "GP 801", depart: "15:55", arrive: "16:20", arriveDay: "+1", duration: "14h 25m", stops: "Nonstop", price: 788 },
  { from: "KIX", to: "JFK", brand: "tsuki", number: "TA 301", depart: "10:35", arrive: "11:10", arriveDay: "+1", duration: "14h 35m", stops: "Nonstop", price: 729 },
  { from: "KIX", to: "ICN", brand: "orbit", number: "TO 102", depart: "09:15", arrive: "11:05", arriveDay: "", duration: "1h 50m", stops: "Nonstop", price: 114 },
  { from: "KIX", to: "ICN", brand: "orbit", number: "TO 118", depart: "14:40", arrive: "16:35", arriveDay: "", duration: "1h 55m", stops: "Nonstop", price: 128 },
  { from: "KIX", to: "TPE", brand: "orbit", number: "TO 220", depart: "10:05", arrive: "12:35", arriveDay: "", duration: "3h 30m", stops: "Nonstop", price: 176 },
  { from: "KIX", to: "TPE", brand: "orbit", number: "TO 228", depart: "18:30", arrive: "21:05", arriveDay: "", duration: "3h 35m", stops: "Nonstop", price: 192 },
  { from: "KIX", to: "CTS", brand: "orbit", number: "TO 052", depart: "08:10", arrive: "10:05", arriveDay: "", duration: "1h 55m", stops: "Nonstop", price: 91 },
  { from: "KIX", to: "FUK", brand: "orbit", number: "TO 044", depart: "07:40", arrive: "08:55", arriveDay: "", duration: "1h 15m", stops: "Nonstop", price: 77 },
  { from: "KIX", to: "HND", brand: "orbit", number: "TO 031", depart: "06:55", arrive: "08:10", arriveDay: "", duration: "1h 15m", stops: "Nonstop", price: 89 },
  { from: "HND", to: "KIX", brand: "orbit", number: "TO 033", depart: "09:20", arrive: "10:35", arriveDay: "", duration: "1h 15m", stops: "Nonstop", price: 89 },
  { from: "NRT", to: "SFO", brand: "pacifica", number: "GP 713", depart: "17:05", arrive: "10:55", arriveDay: "+1", duration: "9h 50m", stops: "Nonstop", price: 631 },
  { from: "HND", to: "SEA", brand: "tsuki", number: "TA 211", depart: "16:30", arrive: "09:25", arriveDay: "+1", duration: "8h 55m", stops: "Nonstop", price: 542 },
  { from: "KIX", to: "SIN", brand: "orbit", number: "TO 411", depart: "10:30", arrive: "16:20", arriveDay: "", duration: "5h 50m", stops: "Nonstop", price: 242 },
  { from: "KIX", to: "HKG", brand: "orbit", number: "TO 322", depart: "11:05", arrive: "14:15", arriveDay: "", duration: "4h 10m", stops: "Nonstop", price: 205 },
  { from: "SFO", to: "KIX", brand: "pacifica", number: "GP 712", depart: "12:30", arrive: "16:15", arriveDay: "+1", duration: "11h 45m", stops: "Nonstop", price: 681 },
  { from: "SEA", to: "KIX", brand: "pacifica", number: "GP 422", depart: "12:05", arrive: "15:50", arriveDay: "+1", duration: "10h 45m", stops: "Nonstop", price: 634 },
  { from: "JFK", to: "KIX", brand: "pacifica", number: "GP 802", depart: "13:40", arrive: "17:15", arriveDay: "+1", duration: "14h 35m", stops: "Nonstop", price: 802 },
  { from: "ICN", to: "KIX", brand: "orbit", number: "TO 103", depart: "12:20", arrive: "14:05", arriveDay: "", duration: "1h 45m", stops: "Nonstop", price: 119 },
  { from: "TPE", to: "KIX", brand: "orbit", number: "TO 221", depart: "14:05", arrive: "17:35", arriveDay: "", duration: "2h 30m", stops: "Nonstop", price: 181 },
  { from: "SIN", to: "KIX", brand: "orbit", number: "TO 412", depart: "23:40", arrive: "07:10", arriveDay: "+1", duration: "6h 30m", stops: "Nonstop", price: 251 },
  { from: "HKG", to: "KIX", brand: "orbit", number: "TO 323", depart: "15:30", arrive: "20:10", arriveDay: "", duration: "3h 40m", stops: "Nonstop", price: 211 },
  { from: "CTS", to: "KIX", brand: "orbit", number: "TO 053", depart: "11:00", arrive: "13:05", arriveDay: "", duration: "2h 05m", stops: "Nonstop", price: 94 },
  { from: "FUK", to: "KIX", brand: "orbit", number: "TO 045", depart: "09:40", arrive: "10:55", arriveDay: "", duration: "1h 15m", stops: "Nonstop", price: 81 },
  { from: "SFO", to: "KIX", brand: "tsuki", number: "TA 114", depart: "12:10", arrive: "16:25", arriveDay: "+1", duration: "12h 15m", stops: "Nonstop", price: 623 },
  { from: "SEA", to: "KIX", brand: "tsuki", number: "TA 210", depart: "12:45", arrive: "16:35", arriveDay: "+1", duration: "10h 50m", stops: "Nonstop", price: 589 },
  { from: "JFK", to: "KIX", brand: "tsuki", number: "TA 302", depart: "14:15", arrive: "18:50", arriveDay: "+1", duration: "14h 35m", stops: "Nonstop", price: 751 },
  { from: "SEA", to: "HND", brand: "tsuki", number: "TA 212", depart: "13:10", arrive: "16:35", arriveDay: "+1", duration: "10h 25m", stops: "Nonstop", price: 558 },
  { from: "SFO", to: "NRT", brand: "pacifica", number: "GP 714", depart: "12:15", arrive: "16:10", arriveDay: "+1", duration: "11h 55m", stops: "Nonstop", price: 658 },
];

flights.push(
  { from: "KIX", to: "HNL", brand: "pacifica", number: "GP 521", depart: "20:40", arrive: "08:10", arriveDay: "+1", duration: "7h 30m", stops: "Nonstop", price: 569 },
  { from: "HNL", to: "KIX", brand: "pacifica", number: "GP 522", depart: "11:20", arrive: "15:50", arriveDay: "+1", duration: "8h 30m", stops: "Nonstop", price: 594 },
  { from: "KIX", to: "IAH", brand: "pacifica", number: "GP 531", depart: "19:20", arrive: "17:00", arriveDay: "+1", duration: "12h 40m", stops: "Nonstop", price: 828 },
  { from: "IAH", to: "KIX", brand: "pacifica", number: "GP 532", depart: "12:05", arrive: "16:40", arriveDay: "+1", duration: "13h 35m", stops: "Nonstop", price: 852 },
  { from: "KIX", to: "DFW", brand: "pacifica", number: "GP 541", depart: "18:40", arrive: "16:10", arriveDay: "+1", duration: "12h 30m", stops: "Nonstop", price: 813 },
  { from: "DFW", to: "KIX", brand: "pacifica", number: "GP 542", depart: "12:15", arrive: "16:40", arriveDay: "+1", duration: "13h 25m", stops: "Nonstop", price: 839 },
  { from: "KIX", to: "SAN", brand: "pacifica", number: "GP 551", depart: "17:55", arrive: "11:45", arriveDay: "+1", duration: "9h 50m", stops: "Nonstop", price: 631 },
  { from: "SAN", to: "KIX", brand: "pacifica", number: "GP 552", depart: "13:35", arrive: "17:10", arriveDay: "+1", duration: "11h 35m", stops: "Nonstop", price: 657 },
  { from: "KIX", to: "PDX", brand: "pacifica", number: "GP 561", depart: "18:15", arrive: "10:45", arriveDay: "+1", duration: "9h 30m", stops: "Nonstop", price: 605 },
  { from: "PDX", to: "KIX", brand: "pacifica", number: "GP 562", depart: "12:15", arrive: "15:50", arriveDay: "+1", duration: "10h 35m", stops: "Nonstop", price: 628 },
  { from: "KIX", to: "YVR", brand: "pacifica", number: "GP 571", depart: "18:10", arrive: "10:45", arriveDay: "+1", duration: "9h 35m", stops: "Nonstop", price: 612 },
  { from: "YVR", to: "KIX", brand: "pacifica", number: "GP 572", depart: "12:15", arrive: "15:55", arriveDay: "+1", duration: "10h 40m", stops: "Nonstop", price: 637 },
  { from: "KIX", to: "PHX", brand: "pacifica", number: "GP 581", depart: "18:35", arrive: "12:30", arriveDay: "+1", duration: "10h 55m", stops: "Nonstop", price: 672 },
  { from: "PHX", to: "KIX", brand: "pacifica", number: "GP 582", depart: "14:00", arrive: "17:45", arriveDay: "+1", duration: "11h 45m", stops: "Nonstop", price: 697 },
  { from: "KIX", to: "LAX", brand: "pacifica", number: "GP 591", depart: "17:45", arrive: "11:35", arriveDay: "+1", duration: "9h 50m", stops: "Nonstop", price: 618 },
  { from: "LAX", to: "KIX", brand: "pacifica", number: "GP 592", depart: "13:10", arrive: "16:40", arriveDay: "+1", duration: "10h 30m", stops: "Nonstop", price: 647 },
  { from: "KIX", to: "MSP", brand: "pacifica", number: "GP 601", depart: "18:05", arrive: "12:20", arriveDay: "+1", duration: "10h 15m", stops: "Nonstop", price: 661 },
  { from: "MSP", to: "KIX", brand: "pacifica", number: "GP 602", depart: "14:00", arrive: "17:40", arriveDay: "+1", duration: "11h 40m", stops: "Nonstop", price: 689 },
  { from: "KIX", to: "DEN", brand: "pacifica", number: "GP 611", depart: "18:45", arrive: "12:00", arriveDay: "+1", duration: "10h 15m", stops: "Nonstop", price: 649 },
  { from: "DEN", to: "KIX", brand: "pacifica", number: "GP 612", depart: "13:45", arrive: "17:30", arriveDay: "+1", duration: "11h 45m", stops: "Nonstop", price: 675 },
  { from: "HND", to: "SFO", brand: "tsuki", number: "TA 115", depart: "10:25", arrive: "04:50", arriveDay: "+1", duration: "10h 25m", stops: "Nonstop", price: 624 },
  { from: "SFO", to: "HND", brand: "tsuki", number: "TA 116", depart: "12:40", arrive: "16:10", arriveDay: "+1", duration: "11h 30m", stops: "Nonstop", price: 648 },
  { from: "HND", to: "HNL", brand: "pacifica", number: "GP 525", depart: "21:10", arrive: "09:35", arriveDay: "+1", duration: "7h 25m", stops: "Nonstop", price: 578 },
  { from: "HNL", to: "HND", brand: "pacifica", number: "GP 526", depart: "12:30", arrive: "16:55", arriveDay: "+1", duration: "8h 25m", stops: "Nonstop", price: 603 },
  { from: "NRT", to: "LAX", brand: "pacifica", number: "GP 721", depart: "17:55", arrive: "11:25", arriveDay: "+1", duration: "9h 30m", stops: "Nonstop", price: 619 },
  { from: "LAX", to: "NRT", brand: "pacifica", number: "GP 722", depart: "13:15", arrive: "16:50", arriveDay: "+1", duration: "11h 35m", stops: "Nonstop", price: 652 },
  { from: "KIX", to: "BKK", brand: "orbit", number: "TO 401", depart: "09:05", arrive: "13:25", arriveDay: "", duration: "6h 20m", stops: "Nonstop", price: 219 },
  { from: "BKK", to: "KIX", brand: "orbit", number: "TO 402", depart: "14:55", arrive: "22:10", arriveDay: "", duration: "5h 15m", stops: "Nonstop", price: 228 },
  { from: "HND", to: "ICN", brand: "orbit", number: "TO 110", depart: "08:20", arrive: "10:50", arriveDay: "", duration: "2h 30m", stops: "Nonstop", price: 121 },
  { from: "ICN", to: "HND", brand: "orbit", number: "TO 111", depart: "12:05", arrive: "14:30", arriveDay: "", duration: "2h 25m", stops: "Nonstop", price: 126 },
  { from: "HND", to: "TPE", brand: "orbit", number: "TO 230", depart: "10:40", arrive: "13:30", arriveDay: "", duration: "3h 50m", stops: "Nonstop", price: 183 },
  { from: "TPE", to: "HND", brand: "orbit", number: "TO 231", depart: "15:05", arrive: "19:10", arriveDay: "", duration: "3h 05m", stops: "Nonstop", price: 191 },
  { from: "KIX", to: "SGN", brand: "orbit", number: "TO 431", depart: "11:15", arrive: "15:55", arriveDay: "", duration: "5h 40m", stops: "Nonstop", price: 236 },
  { from: "SGN", to: "KIX", brand: "orbit", number: "TO 432", depart: "16:55", arrive: "23:25", arriveDay: "", duration: "5h 30m", stops: "Nonstop", price: 244 },
);

// Fill in regular schedules for Tsuki routes in the published network.
// Existing schedules are kept where they already exist.
const formatClock = (minutes) => `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
function scheduleHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomizedScheduleVariants(baseFlights, date) {
  const services = new Map();
  baseFlights.forEach((flight) => {
    const key = `${flight.brand}:${flight.from}:${flight.to}`;
    if (!services.has(key)) services.set(key, flight);
  });

  const prefixes = { pacifica: "GP", tsuki: "TA", orbit: "TO" };
  const variants = [];
  services.forEach((flight, key) => {
    const route = flight.brand === "tsuki"
      ? tsukiRoutes.find((item) => (item.from === flight.from && item.to === flight.to) || (item.from === flight.to && item.to === flight.from))
      : flight.brand === "pacifica"
        ? pacificaRoutes.find((item) => item.code === (flight.from === "KIX" ? flight.to : flight.from))
        : null;
    const weekly = route?.weekly ?? 7;
    const count = weekly >= 20 ? 3 : weekly >= 5 ? 2 : 1;
    const occupiedTimes = new Set(baseFlights.filter((item) => item.brand === flight.brand && item.from === flight.from && item.to === flight.to).map((item) => item.depart));
    const originalDeparture = Number(flight.depart.slice(0, 2)) * 60 + Number(flight.depart.slice(3, 5));
    const originalArrival = Number(flight.arrive.slice(0, 2)) * 60 + Number(flight.arrive.slice(3, 5));
    const originalArrivalDay = Number.parseInt(flight.arriveDay, 10) || 0;
    let localArrivalOffset = originalArrival + originalArrivalDay * 1440 - originalDeparture;
    if (localArrivalOffset <= 0) localArrivalOffset += 1440;

    for (let variant = 0; variant < count; variant += 1) {
      const seed = scheduleHash(`${key}:${date}:${variant}`);
      let departureMinutes = 5 * 60 + (seed % (18 * 12)) * 5;
      while (occupiedTimes.has(formatClock(departureMinutes))) departureMinutes = (departureMinutes + 55) % (24 * 60);
      const depart = formatClock(departureMinutes);
      occupiedTimes.add(depart);
      const directDistance = approximateFlightDistance(flight);
      const stopoverHubs = ["HNL", "ANC", "SFO", "SEA", "YVR", "LAX", "ICN", "TPE", "HKG", "SIN", "DOH", "DXB", "IST", "HEL"];
      const possibleStops = directDistance >= 2800
        ? stopoverHubs.filter((code) => code !== flight.from && code !== flight.to && airportCoordinates[code]
          && approximateFlightDistance({ from: flight.from, to: code }) + approximateFlightDistance({ from: code, to: flight.to }) <= directDistance * 1.42)
        : [];
      const stopover = seed % 8 === 0 && possibleStops.length
        ? possibleStops[(seed >>> 12) % possibleStops.length]
        : "";
      const connectionMinutes = stopover ? 75 + ((seed >>> 6) % 76) : 0;
      const arrivalMinutes = departureMinutes + localArrivalOffset + connectionMinutes;
      const arrivalDayOffset = Math.floor(arrivalMinutes / 1440);
      const durationMinutes = localArrivalOffset + connectionMinutes;
      variants.push({
        ...flight,
        number: `${prefixes[flight.brand]} ${String(100 + (seed % 900)).padStart(3, "0")}`,
        depart,
        arrive: formatClock(arrivalMinutes),
        arriveDay: arrivalDayOffset ? `+${arrivalDayOffset}` : "",
        duration: `${Math.floor(durationMinutes / 60)}h ${String(durationMinutes % 60).padStart(2, "0")}m`,
        stops: stopover ? `1 stop · ${airports[stopover].name}` : "Nonstop",
        stopover,
        price: Math.max(45, Math.round(flight.price * (stopover ? 0.88 + ((seed >>> 8) % 8) / 100 : 0.94 + ((seed >>> 8) % 13) / 100))),
      });
    }
  });
  return variants;
}

tsukiRoutes.filter((route) => route.weekly > 0).forEach((route, index) => {
  const durationMinutes = Math.round((route.distance / 850) * 60 + 65);
  const departureMinutes = 7 * 60 + ((index * 43) % (13 * 60));
  const samplePrice = Math.round(180 + route.distance * 0.061);
  const forwardExists = flights.some((flight) => flight.brand === "tsuki" && flight.from === route.from && flight.to === route.to);
  const reverseExists = flights.some((flight) => flight.brand === "tsuki" && flight.from === route.to && flight.to === route.from);
  const sampleFlight = (from, to, depart, number) => ({
    from, to, brand: "tsuki", number, depart,
    arrive: formatClock((Number(depart.slice(0, 2)) * 60) + Number(depart.slice(3, 5)) + durationMinutes),
    arriveDay: durationMinutes >= 8 * 60 ? "+1" : "",
    duration: `${Math.floor(durationMinutes / 60)}h ${String(durationMinutes % 60).padStart(2, "0")}m`,
    stops: "Nonstop", price: samplePrice,
  });
  if (!forwardExists) flights.push(sampleFlight(route.from, route.to, formatClock(departureMinutes), `TA ${String(601 + index * 2).padStart(3, "0")}`));
  if (!reverseExists) flights.push(sampleFlight(route.to, route.from, formatClock((departureMinutes + 570) % 1440), `TA ${String(602 + index * 2).padStart(3, "0")}`));
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const originSelect = $("#origin");
const destinationSelect = $("#destination");
const departInput = $("#depart-date");
const returnInput = $("#return-date");
const cabinSelect = $("#cabin-class");
const returnField = $("#return-field");
const passengerPopover = $("#passenger-popover");
const passengerTrigger = $("#passenger-trigger");
const passengerOutputs = {
  adults: $("#adult-count"),
  children: $("#child-count"),
  infants: $("#infant-count"),
};
const searchForm = $("#search-form");
const resultsEl = $("#results");
const searchMessage = $("#search-message");
const dialog = $("#booking-dialog");
const dialogContent = $("#dialog-content");

function populateAirportOptions() {
  const origin = originSelect.value;
  const destination = destinationSelect.value;
  const orderedAirports = Object.entries(airports).sort(([, first], [, second]) => first.name.localeCompare(second.name));
  const options = orderedAirports.map(([code, airport]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${airport.name} · ${code}`;
    return option;
  });
  originSelect.replaceChildren(...options.map((option) => option.cloneNode(true)));
  destinationSelect.replaceChildren(...options);
  originSelect.value = origin;
  destinationSelect.value = destination;
}

if (originSelect && destinationSelect) populateAirportOptions();

const passengerCounts = { adults: 1, children: 0, infants: 0 };
let tripType = "round";
let activeFlight = null;
let selectedCabin = "economy";
let accountDisplayName = "";
let pointsToRedeem = 0;
let pendingBooking = null;
let seatFlights = [];
let selectedSeatsByLeg = [];
let seatLegIndex = 0;

function localISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setDefaultDates() {
  const today = new Date();
  const departure = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  const returning = new Date(departure.getFullYear(), departure.getMonth(), departure.getDate() + 7);
  departInput.min = localISO(today);
  departInput.value = localISO(departure);
  returnInput.min = departInput.value;
  returnInput.value = localISO(returning);
}

function syncAirportLabels() {
  const from = airports[originSelect.value];
  const to = airports[destinationSelect.value];
  originSelect.closest(".field").querySelector(".field-sub").textContent = from.full;
  destinationSelect.closest(".field").querySelector(".field-sub").textContent = to.full;
}

function updatePassengerLabel() {
  const total = passengerTotal();
  $("#passenger-label").textContent = `${total} ${total === 1 ? "traveler" : "travelers"}`;
  Object.entries(passengerOutputs).forEach(([type, output]) => {
    output.value = passengerCounts[type];
    output.textContent = passengerCounts[type];
  });
  passengerPopover.querySelectorAll("[data-count]").forEach((button) => {
    const type = button.dataset.passenger;
    const isDown = button.dataset.count === "down";
    button.disabled = isDown
      ? passengerCounts[type] <= (type === "adults" ? 1 : 0)
      : total >= 8;
  });
}

function passengerTotal() {
  return Object.values(passengerCounts).reduce((total, count) => total + count, 0);
}

function passengerBreakdown() {
  return [
    `${passengerCounts.adults} ${passengerCounts.adults === 1 ? "adult" : "adults"}`,
    ...(passengerCounts.children ? [`${passengerCounts.children} ${passengerCounts.children === 1 ? "child" : "children"}`] : []),
    ...(passengerCounts.infants ? [`${passengerCounts.infants} ${passengerCounts.infants === 1 ? "infant" : "infants"}`] : []),
  ].join(" · ");
}

function closePassenger() {
  passengerPopover.hidden = true;
  passengerTrigger.setAttribute("aria-expanded", "false");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function brandIcon(brand) {
  const info = airlineInfo[brand];
  return `<span class="flight-brand-icon ${info.class}" aria-hidden="true">${info.mark}</span>`;
}

function formatDate(value) {
  if (!value) return "Selected date";
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getReturnFlight(flight) {
  if (tripType !== "round") return null;
  return flights.find((candidate) =>
    candidate.from === flight.to && candidate.to === flight.from && candidate.brand === flight.brand,
  ) || flights.find((candidate) => candidate.from === flight.to && candidate.to === flight.from) || null;
}

function fareTotal(flight) {
  const returning = getReturnFlight(flight);
  return Math.round((flight.price + (returning?.price || 0)) * cabinClasses[selectedCabin].multiplier);
}

function approximateFlightDistance(flight) {
  const from = airportCoordinates[flight.from];
  const to = airportCoordinates[flight.to];
  if (!from || !to) return 0;
  const radians = (degrees) => degrees * Math.PI / 180;
  const latitudeDelta = radians(to.lat - from.lat);
  const longitudeDelta = radians(to.lon - from.lon);
  const arc = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(radians(from.lat)) * Math.cos(radians(to.lat)) * Math.sin(longitudeDelta / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc)));
}

function aircraftForFlight(flight) {
  const distance = approximateFlightDistance(flight);
  if (flight.brand === "orbit") {
    return distance > 3500
      ? { name: "Airbus A321XLR", code: "A321XLR", layout: "a321xlr" }
      : { name: "Airbus A321neo", code: "A321neo", layout: "a321neo" };
  }
  if (flight.brand === "pacifica") {
    if (distance > 9800) return { name: "Airbus A350-1000", code: "A35K", layout: "a350-1000" };
    if (distance > 8200) return { name: "Airbus A350-900", code: "A359", layout: "a350-900" };
    return { name: "Airbus A330-900", code: "A339", layout: "a330-900" };
  }
  if (distance > 10500) return { name: "Boeing 777-9", code: "B779", layout: "b777-9" };
  if (distance < 5000) return { name: "Boeing 787-8 Dreamliner", code: "B788", layout: "b787-8" };
  return { name: "Boeing 787-9 Dreamliner", code: "B789", layout: "b787-9" };
}

function fareAmountBeforePoints() {
  return activeFlight ? fareTotal(activeFlight) * passengerTotal() : 0;
}

function buildNetworkMap(mapWidth = 1000) {
  // The basemap uses a Pacific-centered equirectangular projection: -20° is the left edge.
  const scale = 1000 / Math.max(mapWidth, 1);
  const project = ({ lat, lon }) => ({
    x: (((lon + 20) % 360 + 360) % 360) / 360 * 1000,
    y: (90 - lat) / 180 * 500,
  });
  const origin = project({ lat: 34.4347, lon: 135.2442 });
  const toVector = ({ lat, lon }) => {
    const latitude = lat * Math.PI / 180;
    const longitude = lon * Math.PI / 180;
    return [Math.cos(latitude) * Math.cos(longitude), Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude)];
  };
  const greatCirclePath = (destination) => {
    const start = toVector({ lat: 34.4347, lon: 135.2442 });
    const end = toVector(destination);
    const dot = Math.max(-1, Math.min(1, start[0] * end[0] + start[1] * end[1] + start[2] * end[2]));
    const angle = Math.acos(dot);
    const sinAngle = Math.sin(angle) || 1;
    const steps = 48;
    const points = Array.from({ length: steps + 1 }, (_, index) => {
      const progress = index / steps;
      const a = Math.sin((1 - progress) * angle) / sinAngle;
      const b = Math.sin(progress * angle) / sinAngle;
      const vector = [
        a * start[0] + b * end[0],
        a * start[1] + b * end[1],
        a * start[2] + b * end[2],
      ];
      const latitude = Math.atan2(vector[2], Math.hypot(vector[0], vector[1])) * 180 / Math.PI;
      const longitude = Math.atan2(vector[1], vector[0]) * 180 / Math.PI;
      return project({ lat: latitude, lon: longitude });
    });
    return points.map((point, index) => (index ? 'L ' : 'M ') + point.x.toFixed(2) + ' ' + point.y.toFixed(2)).join(' ');
  };
  const routeLines = pacificaRoutes.map((route) =>
    '<path class="network-route-line' + (route.weekly === 0 ? ' is-inactive' : '') + '" data-network-route="' + route.code + '" d="' + greatCirclePath(route) + '" />'
  ).join("");
  const routePins = pacificaRoutes.map((route) => {
    const point = project(route);
    const labelWidth = 34 * scale;
    const labelHeight = 19 * scale;
    const labelGapX = route.labelX * scale;
    const labelGapY = route.labelY * scale;
    const labelX = point.x + (route.labelX < 0 ? labelGapX - labelWidth : labelGapX);
    const labelY = point.y + (route.labelY < 0 ? labelGapY - labelHeight : labelGapY + 6 * scale);
    const labelCenterX = labelX + labelWidth / 2;
    const labelCenterY = labelY + labelHeight / 2;
    return '<g class="network-pin' + (route.weekly === 0 ? ' is-inactive' : '') + '" data-network-route="' + route.code + '" data-destination="' + route.code + '" role="button" tabindex="0" aria-label="' + route.city + ', ' + route.code + ', ' + route.weekly + ' flights per week">' +
      '<path class="pin-leader" d="M ' + point.x.toFixed(2) + ' ' + point.y.toFixed(2) + ' L ' + labelCenterX.toFixed(2) + ' ' + labelCenterY.toFixed(2) + '" />' +
      '<rect class="pin-label-bg" x="' + labelX.toFixed(2) + '" y="' + labelY.toFixed(2) + '" width="' + labelWidth.toFixed(2) + '" height="' + labelHeight.toFixed(2) + '" rx="' + (5 * scale).toFixed(2) + '" />' +
      '<text class="pin-label" x="' + labelCenterX.toFixed(2) + '" y="' + (labelCenterY + 4 * scale).toFixed(2) + '" text-anchor="middle" font-size="' + (10 * scale).toFixed(2) + '">' + route.code + '</text>' +
      '<circle class="pin-halo" cx="' + point.x.toFixed(2) + '" cy="' + point.y.toFixed(2) + '" r="' + (7 * scale).toFixed(2) + '" />' +
      '<circle class="pin-dot" cx="' + point.x.toFixed(2) + '" cy="' + point.y.toFixed(2) + '" r="' + (2.6 * scale).toFixed(2) + '" /></g>';
  }).join("");
  const originLabelX = origin.x + 12 * scale;

  return '<img class="world-map-base" src="world-map.svg" alt="" draggable="false" />' +
    '<svg class="network-map-svg" viewBox="0 0 1000 500" role="group" aria-labelledby="pacifica-map-title pacifica-map-description" preserveAspectRatio="none">' +
    '<title id="pacifica-map-title">Grand Pacifica Air routes on a full-world map</title>' +
    '<desc id="pacifica-map-description">A world map with the Pacific centered. Great-circle routes connect Kansai, Japan, to 14 destinations across North America and Hawaii. Select a city marker to highlight its route details.</desc>' +
    '<g class="network-routes">' + routeLines + '</g>' +
    '<g class="network-origin" aria-label="Kansai, KIX"><circle class="origin-halo" cx="' + origin.x.toFixed(2) + '" cy="' + origin.y.toFixed(2) + '" r="' + (9 * scale).toFixed(2) + '" /><circle class="origin-dot" cx="' + origin.x.toFixed(2) + '" cy="' + origin.y.toFixed(2) + '" r="' + (3.3 * scale).toFixed(2) + '" />' +
    '<text class="origin-code" x="' + originLabelX.toFixed(2) + '" y="' + (origin.y - 5 * scale).toFixed(2) + '" font-size="' + (11 * scale).toFixed(2) + '">KIX</text><text class="origin-city" x="' + originLabelX.toFixed(2) + '" y="' + (origin.y + 8 * scale).toFixed(2) + '" font-size="' + (7 * scale).toFixed(2) + '">KANSAI</text></g>' +
    '<g class="network-destinations">' + routePins + '</g></svg>';
}

function highlightNetworkRoute(code, scrollToCard = false) {
  $$("[data-network-route]").forEach((element) => {
    element.classList.toggle("is-highlighted", element.dataset.networkRoute === code);
  });
  if (scrollToCard) {
    $('[data-route-card="' + code + '"]')?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function renderNetwork() {
  const map = $("#pacifica-map");
  const fleet = $("#pacifica-fleet");
  const routes = $("#pacifica-routes");
  if (!map || !fleet || !routes) return;

  const bindMapPins = () => map.querySelectorAll(".network-pin").forEach((pin) => {
    const selectRoute = () => highlightNetworkRoute(pin.dataset.networkRoute, true);
    pin.addEventListener("click", selectRoute);
    pin.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRoute();
      }
    });
  });
  const drawMap = () => {
    const width = map.clientWidth || 1000;
    map.dataset.mapWidth = String(width);
    map.innerHTML = buildNetworkMap(width);
    bindMapPins();
  };
  drawMap();
  if ("ResizeObserver" in window) {
    const mapObserver = new ResizeObserver(() => {
      const width = map.clientWidth || 1000;
      if (Math.abs(width - Number(map.dataset.mapWidth)) > 1) drawMap();
    });
    mapObserver.observe(map);
  }
  fleet.innerHTML = pacificaFleet.map((aircraft) =>
    '<div class="fleet-row"><span class="fleet-aircraft-mark" aria-hidden="true">✈</span><div class="fleet-aircraft-type"><strong>' +
    aircraft.type + '</strong><small>' + aircraft.code + '</small></div><strong class="fleet-count">' + aircraft.count + '</strong></div>'
  ).join("");
  routes.innerHTML = pacificaRoutes.map((route) =>
    '<article class="route-card' + (route.weekly === 0 ? ' is-inactive' : '') + '" data-route-card="' + route.code + '" data-network-route="' + route.code + '">' +
      '<div class="route-card-head"><div><span class="route-cities">Osaka <i aria-hidden="true">↔</i> ' + route.city + '</span><span class="route-airports">KIX <span>→</span> ' + route.code + '</span></div><span class="route-badge">' + route.code + '</span></div>' +
      '<div class="route-stat-row"><span><small>DISTANCE</small><strong>' + route.distance.toLocaleString("en-US") + ' km</strong></span><span><small>WEEKLY</small><strong>' + (route.weekly === 0 ? '0 · paused' : route.weekly + ' flights') + '</strong></span></div>' +
      (route.weekly > 0
        ? '<button class="route-search" type="button" data-route-search="' + route.code + '">Search this route <span aria-hidden="true">↗</span></button>'
        : '<p class="route-paused">No weekly service is listed for this route.</p>') +
    '</article>'
  ).join("");

  routes.querySelectorAll(".route-card").forEach((card) => {
    card.addEventListener("pointerenter", () => highlightNetworkRoute(card.dataset.networkRoute));
    card.addEventListener("focusin", () => highlightNetworkRoute(card.dataset.networkRoute));
    card.addEventListener("pointerleave", () => highlightNetworkRoute(""));
    card.addEventListener("focusout", () => highlightNetworkRoute(""));
  });
  routes.querySelectorAll("[data-route-search]").forEach((button) => {
    button.addEventListener("click", () => {
      originSelect.value = "KIX";
      destinationSelect.value = button.dataset.routeSearch;
      document.querySelector('input[name="carrier"][value="pacifica"]').checked = true;
      syncAirportLabels();
      searchForm.requestSubmit();
    });
  });
}

function tsukiRouteId(route) {
  return `${route.from}-${route.to}`;
}

function buildTsukiNetworkMap(mapWidth = 1000) {
  const scale = 1000 / Math.max(mapWidth, 1);
  const project = ({ lat, lon }) => ({
    x: (((lon + 20) % 360 + 360) % 360) / 360 * 1000,
    y: (90 - lat) / 180 * 500,
  });
  const toVector = ({ lat, lon }) => {
    const latitude = lat * Math.PI / 180;
    const longitude = lon * Math.PI / 180;
    return [Math.cos(latitude) * Math.cos(longitude), Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude)];
  };
  const greatCirclePath = (start, destination) => {
    const first = toVector(start);
    const last = toVector(destination);
    const dot = Math.max(-1, Math.min(1, first[0] * last[0] + first[1] * last[1] + first[2] * last[2]));
    const angle = Math.acos(dot);
    const sinAngle = Math.sin(angle) || 1;
    const steps = 42;
    const points = Array.from({ length: steps + 1 }, (_, index) => {
      const progress = index / steps;
      const a = Math.sin((1 - progress) * angle) / sinAngle;
      const b = Math.sin(progress * angle) / sinAngle;
      const vector = [a * first[0] + b * last[0], a * first[1] + b * last[1], a * first[2] + b * last[2]];
      return project({
        lat: Math.atan2(vector[2], Math.hypot(vector[0], vector[1])) * 180 / Math.PI,
        lon: Math.atan2(vector[1], vector[0]) * 180 / Math.PI,
      });
    });
    return points.map((point, index) => (index ? "L " : "M ") + point.x.toFixed(2) + " " + point.y.toFixed(2)).join(" ");
  };

  const routeLines = tsukiRoutes.map((route) => {
    const id = tsukiRouteId(route);
    const origin = airportCoordinates[route.from];
    const destination = airportCoordinates[route.to];
    return `<path class="network-route-line tsuki-route-line${route.weekly === 0 ? " is-inactive" : route.weekly === null ? " is-unconfirmed" : ""}" data-tsuki-route="${id}" data-tsuki-destination="${route.to}" d="${greatCirclePath(origin, destination)}" />`;
  }).join("");
  const destinations = [...new Set(tsukiRoutes.map((route) => route.to))].map((code) => {
    const airport = airports[code];
    const point = project(airportCoordinates[code]);
    const labelX = point.x + 5 * scale;
    const labelY = point.y - 7 * scale;
    return `<g class="network-pin tsuki-map-pin" data-tsuki-destination="${code}" role="button" tabindex="0" aria-label="Highlight Tsuki routes serving ${airport.name}, ${code}"><title>${airport.name} · ${code}</title><circle class="pin-halo" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${(6 * scale).toFixed(2)}" /><circle class="pin-dot" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${(2 * scale).toFixed(2)}" /><rect class="pin-label-bg" x="${labelX.toFixed(2)}" y="${labelY.toFixed(2)}" width="${(24 * scale).toFixed(2)}" height="${(13 * scale).toFixed(2)}" rx="${(3 * scale).toFixed(2)}" /><text class="pin-label" x="${(labelX + 12 * scale).toFixed(2)}" y="${(labelY + 9 * scale).toFixed(2)}" text-anchor="middle" font-size="${(6.5 * scale).toFixed(2)}">${code}</text></g>`;
  }).join("");
  const origins = [...new Set(tsukiRoutes.map((route) => route.from))].map((code) => {
    const airport = airports[code];
    const point = project(airportCoordinates[code]);
    const labelX = point.x + 9 * scale;
    return `<g class="network-origin tsuki-origin" aria-label="${airport.name}, ${code}"><circle class="origin-halo" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${(9 * scale).toFixed(2)}" /><circle class="origin-dot" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${(3.3 * scale).toFixed(2)}" /><text class="origin-code" x="${labelX.toFixed(2)}" y="${(point.y - 4 * scale).toFixed(2)}" font-size="${(10 * scale).toFixed(2)}">${code}</text><text class="origin-city" x="${labelX.toFixed(2)}" y="${(point.y + 8 * scale).toFixed(2)}" font-size="${(6 * scale).toFixed(2)}">${airport.name.toUpperCase()}</text></g>`;
  }).join("");

  return '<img class="world-map-base" src="world-map.svg" alt="" draggable="false" />' +
    '<svg class="network-map-svg tsuki-map-svg" viewBox="0 0 1000 500" role="group" aria-labelledby="tsuki-map-title tsuki-map-description" preserveAspectRatio="none">' +
    '<title id="tsuki-map-title">Tsuki Airways routes on a full-world map</title>' +
    '<desc id="tsuki-map-description">A Pacific-centered full-world map showing Tsuki Airways routes from Tokyo Haneda, Kansai, and one Miami connection. Select a destination marker to highlight its route details.</desc>' +
    '<g class="network-routes">' + routeLines + '</g><g class="network-origins">' + origins + '</g><g class="network-destinations">' + destinations + '</g></svg>';
}

function highlightTsukiRoute(routeId, scrollToCard = false) {
  $$('[data-tsuki-route]').forEach((element) => {
    element.classList.toggle("is-highlighted", element.dataset.tsukiRoute === routeId);
  });
  const destination = tsukiRoutes.find((route) => tsukiRouteId(route) === routeId)?.to;
  $$(".tsuki-map-pin").forEach((pin) => pin.classList.toggle("is-highlighted", pin.dataset.tsukiDestination === destination));
  if (scrollToCard) {
    $('.tsuki-route-card[data-tsuki-route="' + routeId + '"]')?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function highlightTsukiDestination(code) {
  $$('[data-tsuki-route]').forEach((element) => {
    element.classList.toggle("is-highlighted", element.dataset.tsukiDestination === code);
  });
  $$(".tsuki-map-pin").forEach((pin) => pin.classList.toggle("is-highlighted", pin.dataset.tsukiDestination === code));
  const card = $('[data-tsuki-destination="' + code + '"].route-card:not([hidden])');
  card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderTsukiNetwork() {
  const map = $("#tsuki-map");
  const routes = $("#tsuki-routes");
  if (!map || !routes) return;

  const bindMapPins = () => map.querySelectorAll(".tsuki-map-pin").forEach((pin) => {
    const select = () => highlightTsukiDestination(pin.dataset.tsukiDestination);
    pin.addEventListener("click", select);
    pin.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select();
      }
    });
  });
  const drawMap = () => {
    const width = map.clientWidth || 1000;
    map.dataset.mapWidth = String(width);
    map.innerHTML = buildTsukiNetworkMap(width);
    bindMapPins();
  };
  drawMap();
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      const width = map.clientWidth || 1000;
      if (Math.abs(width - Number(map.dataset.mapWidth)) > 1) drawMap();
    });
    observer.observe(map);
  }

  routes.innerHTML = tsukiRoutes.map((route) => {
    const from = airports[route.from];
    const to = airports[route.to];
    const id = tsukiRouteId(route);
    return `<article class="route-card tsuki-route-card${route.weekly === 0 ? " is-inactive" : ""}" data-route-card="${id}" data-tsuki-route="${id}" data-tsuki-destination="${route.to}" data-tsuki-origin="${route.from}">
      <div class="route-card-head"><div><span class="route-cities">${from.name} <i aria-hidden="true">↔</i> ${to.name}</span><span class="route-airports">${route.from} <span>→</span> ${route.to}</span></div><span class="route-badge">${route.to}</span></div>
      <div class="route-stat-row"><span><small>DISTANCE</small><strong>${route.distance === null ? "Not listed" : `${route.distance.toLocaleString("en-US")} km`}</strong></span><span><small>WEEKLY</small><strong>${route.weekly === null ? "Not listed" : route.weekly === 0 ? "0 · paused" : `${route.weekly} flights`}</strong></span></div>
      ${route.weekly > 0 ? `<button class="route-search" type="button" data-tsuki-route-search="${id}">Search this route <span aria-hidden="true">↗</span></button>` : `<p class="route-paused">${route.weekly === 0 ? "No weekly service is listed for this route." : "Weekly service details are unavailable."}</p>`}
    </article>`;
  }).join("");

  routes.querySelectorAll(".route-card").forEach((card) => {
    card.addEventListener("pointerenter", () => highlightTsukiRoute(card.dataset.tsukiRoute));
    card.addEventListener("focusin", () => highlightTsukiRoute(card.dataset.tsukiRoute));
    card.addEventListener("pointerleave", () => highlightTsukiRoute(""));
    card.addEventListener("focusout", () => highlightTsukiRoute(""));
  });
  routes.querySelectorAll("[data-tsuki-route-search]").forEach((button) => {
    button.addEventListener("click", () => {
      const [from, to] = button.dataset.tsukiRouteSearch.split("-");
      originSelect.value = from;
      destinationSelect.value = to;
      document.querySelector('input[name="carrier"][value="tsuki"]').checked = true;
      syncAirportLabels();
      searchForm.requestSubmit();
    });
  });

  const search = $("#tsuki-route-search");
  const originFilter = $("#tsuki-origin-filter");
  const count = $("#tsuki-route-count");
  const empty = $("#tsuki-route-empty");
  const filterRoutes = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const origin = originFilter.value;
    let visible = 0;
    routes.querySelectorAll(".route-card").forEach((card) => {
      const matchesOrigin = origin === "all" || card.dataset.tsukiOrigin === origin;
      const matchesSearch = !query || card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !(matchesOrigin && matchesSearch);
      if (!card.hidden) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${tsukiRoutes.length} routes`;
    empty.hidden = visible > 0;
  };
  search.addEventListener("input", filterRoutes);
  originFilter.addEventListener("change", filterRoutes);
  filterRoutes();
}

function returnSegmentMarkup(flight) {
  const returning = getReturnFlight(flight);
  if (!returning) return "";

  return `<div class="dialog-return">
    <strong>RETURN · ${returning.from} <span aria-hidden="true">→</span> ${returning.to}</strong>
    <span>${airlineInfo[returning.brand].name} · ${returning.number} · ${formatDate(returnInput.value)}</span>
    <span>${returning.depart} — ${returning.arrive}${returning.arriveDay} · ${returning.duration} · ${returning.stops}</span>
  </div>`;
}

function renderFlights(items, from, to) {
  const fromName = airports[from]?.name || from;
  const toName = airports[to]?.name || to;
  const route = `${fromName} to ${toName}`;
  const heading = `${from} <span aria-hidden="true">→</span> ${to}`;

  if (!items.length) {
    resultsEl.innerHTML = `<div class="no-flights">No flights are listed for <strong>${escapeHTML(route)}</strong> with that airline choice. Try another destination or select all airlines to explore the NPG network.</div>`;
    return;
  }

  resultsEl.innerHTML = `
    <div class="results-head">
      <div><div class="results-kicker">AVAILABLE FLIGHTS · ${items.length} OPTIONS</div><h3>${heading}</h3></div>
      <div class="results-summary">${escapeHTML(departInput.value)}${tripType === "round" ? ` · return ${escapeHTML(returnInput.value)}` : " · one way"}<br />${passengerBreakdown()} · ${cabinClasses[selectedCabin].label}</div>
    </div>
    <div class="flight-list">${items.map((flight, index) => {
      const info = airlineInfo[flight.brand];
      const total = fareTotal(flight);
      const fareLabel = tripType === "round" ? "round-trip total" : "one-way fare";
      return `<article class="flight-card">
        <div class="flight-airline">${brandIcon(flight.brand)}<div><div class="flight-brand-name">${info.name}</div><div class="flight-number">${flight.number} · ${info.slogan}</div></div></div>
        <div class="flight-times"><div><strong>${flight.depart}</strong><small>${flight.from}</small></div><span class="flight-line" aria-hidden="true"></span><div><strong>${flight.arrive}<sup>${flight.arriveDay}</sup></strong><small>${flight.to}</small></div></div>
        <div class="flight-duration">${flight.duration}<small>${flight.stops} · ${cabinClasses[selectedCabin].label}</small></div>
        <div class="flight-price"><strong>$${total}</strong><small>${fareLabel} · per traveler</small></div>
        <button class="select-flight" type="button" data-flight="${index}">View itinerary</button>
      </article>`;
    }).join("")}</div>
    <p class="form-disclaimer"><span aria-hidden="true">ⓘ</span> Schedules and fares are planning estimates. This website does not process reservations or payments.</p>`;

  resultsEl.querySelectorAll("[data-flight]").forEach((button) => {
    button.addEventListener("click", () => openBooking(items[Number(button.dataset.flight)]));
  });
}

function checkoutSummaryMarkup() {
  const info = airlineInfo[activeFlight.brand];
  const total = fareTotal(activeFlight) * passengerTotal();
  const fareDescription = tripType === "round" ? "round-trip total" : "one-way fare";
  const travelerCount = passengerBreakdown();
  return `<div class="dialog-route">
    <div><strong>${activeFlight.from} <span aria-hidden="true">→</span> ${activeFlight.to}</strong><small>${info.name} · ${activeFlight.number}<br />${activeFlight.stopover ? `1 stop via ${airports[activeFlight.stopover].name}<br />` : "Nonstop<br />"}${cabinClasses[selectedCabin].label}<br />${formatDate(departInput.value)} · ${activeFlight.depart} — ${activeFlight.arrive}${activeFlight.arriveDay}</small></div>
    <div class="dialog-price">$${total}<small>${fareDescription} · ${travelerCount}</small></div>
  </div>${returnSegmentMarkup(activeFlight)}`;
}

function openBooking(flight) {
  activeFlight = flight;
  pointsToRedeem = 0;
  pendingBooking = null;
  dialog.classList.remove("has-seat-map");
  dialog.showModal();
  renderRegistrationStep();
}

function renderRegistrationStep(mode = "welcome") {
  dialog.classList.remove("has-seat-map");
  const profile = window.SoraWallet?.getActiveProfile();
  if (profile && mode === "welcome") {
    accountDisplayName = profile.name;
    dialogContent.innerHTML = `
      <div class="checkout-progress"><span class="is-current">01 · ACCOUNT</span><span>02 · PAYMENT</span><span>03 · SEATS</span></div>
      <div class="dialog-kicker">FLIGHT CHECKOUT · ACCOUNT</div>
      <h2 id="dialog-title">Welcome back, ${escapeHTML(profile.name)}.</h2>
      <p class="dialog-intro">Your profile is saved in this browser.</p>
      <div class="checkout-account-summary"><strong>${escapeHTML(profile.name)}</strong><span>${escapeHTML(profile.email)}</span></div>
      ${checkoutSummaryMarkup()}
      <button class="button button-red checkout-submit full-width" id="account-continue" type="button">Continue to payment <span aria-hidden="true">→</span></button>
      <button class="checkout-link-button" id="account-choose-profile" type="button">Use another profile or add one</button>
      <p class="checkout-safety">Profiles are stored in this browser. Use placeholder contact details only.</p>`;
    $("#account-continue").addEventListener("click", () => finishAccountStep(profile));
    $("#account-choose-profile").addEventListener("click", () => renderRegistrationStep("chooser"));
    return;
  }

  if (mode === "chooser") {
    const safeName = profile ? escapeHTML(profile.name) : "";
    dialogContent.innerHTML = `
      <div class="checkout-progress"><span class="is-current">01 · ACCOUNT</span><span>02 · PAYMENT</span><span>03 · SEATS</span></div>
      <div class="dialog-kicker">FLIGHT CHECKOUT · PROFILES</div>
      <h2 id="dialog-title">Choose a profile.</h2>
      <p class="dialog-intro">Switch profiles or add another one. Each profile keeps its own Sora Points balance in this browser.</p>
      ${profile ? `<button class="checkout-account-option" id="account-continue" type="button"><strong>Continue as ${safeName}</strong><span>${escapeHTML(profile.email)}</span></button>` : ""}
      <div class="checkout-profile-actions"><button class="button button-red" id="account-add-profile" type="button">Add another profile</button><button class="button button-dark" id="account-switch-profile" type="button">Sign into a saved profile</button></div>
      <button class="checkout-link-button" id="account-back" type="button">Back</button>
      <p class="checkout-safety">Profiles stay in this browser. Use example.test emails and unique placeholder passwords beginning with npg-.</p>`;
    if (profile) $("#account-continue").addEventListener("click", () => finishAccountStep(profile));
    $("#account-add-profile").addEventListener("click", () => renderRegistrationStep("create"));
    $("#account-switch-profile").addEventListener("click", () => renderRegistrationStep("signin"));
    $("#account-back").addEventListener("click", () => renderRegistrationStep(profile ? "welcome" : "create"));
    return;
  }

  if (mode === "signin") {
    dialogContent.innerHTML = `
      <div class="checkout-progress"><span class="is-current">01 · ACCOUNT</span><span>02 · PAYMENT</span><span>03 · SEATS</span></div>
      <div class="dialog-kicker">FLIGHT CHECKOUT · SAVED PROFILE</div>
      <h2 id="dialog-title">Sign in to your profile.</h2>
      <p class="dialog-intro">Use the email and password saved with this browser profile.</p>
      ${checkoutSummaryMarkup()}
      <form class="checkout-form" id="profile-signin-form" autocomplete="off">
        <label class="checkout-field full-width" for="profile-signin-email">Email<input id="profile-signin-email" name="email" type="text" inputmode="email" autocomplete="off" required /></label>
        <label class="checkout-field full-width" for="profile-signin-password">Password<input id="profile-signin-password" name="password" type="password" autocomplete="off" required /></label>
        <p id="registration-message" class="checkout-message full-width" role="status" aria-live="polite"></p>
        <button class="button button-red checkout-submit full-width" type="submit">Sign in and continue <span aria-hidden="true">→</span></button>
        <button class="checkout-link-button full-width" id="account-add-profile" type="button">Create another profile</button>
        <p class="checkout-safety full-width">Sign-in is stored in this browser and is not connected to an airline account service.</p>
      </form>`;
    $("#profile-signin-form").addEventListener("submit", continueWithSavedProfile);
    $("#account-add-profile").addEventListener("click", () => renderRegistrationStep("create"));
    $("#profile-signin-email").focus();
    return;
  }

  dialogContent.innerHTML = `
    <div class="checkout-progress"><span class="is-current">01 · ACCOUNT</span><span>02 · PAYMENT</span><span>03 · SEATS</span></div>
    <div class="dialog-kicker">FLIGHT CHECKOUT · NEW PROFILE</div>
    <h2 id="dialog-title">Create a profile.</h2>
    <p class="dialog-intro">Create a profile to return to for future trips. Add other profiles any time.</p>
    ${checkoutSummaryMarkup()}
    <form class="checkout-form" id="profile-create-form" autocomplete="off">
      <label class="checkout-field full-width" for="registration-name">Name<input id="registration-name" name="name" type="text" maxlength="40" placeholder="Traveler name" autocomplete="off" required /></label>
      <label class="checkout-field full-width" for="registration-email">Email<input id="registration-email" name="email" type="text" inputmode="email" placeholder="traveler@example.test" autocomplete="off" spellcheck="false" required /></label>
      <label class="checkout-field full-width" for="registration-password">Password<input id="registration-password" name="password" type="password" placeholder="Start with npg-" autocomplete="new-password" required /></label>
      <p id="registration-message" class="checkout-message full-width" role="status" aria-live="polite"></p>
      <button class="button button-red checkout-submit full-width" type="submit">Save profile and continue <span aria-hidden="true">→</span></button>
      <button class="checkout-link-button full-width" id="account-signin-existing" type="button">I already have a saved profile</button>
      <p class="checkout-safety full-width">Use an example.test email and a unique placeholder password beginning with npg-. Profile information stays in this browser. This site does not process reservations or payments.</p>
    </form>`;
  $("#profile-create-form").addEventListener("submit", createProfileForBooking);
  $("#account-signin-existing").addEventListener("click", () => renderRegistrationStep("signin"));
}

function finishAccountStep(profile) {
  accountDisplayName = profile.name;
  pointsToRedeem = 0;
  renderPaymentStep();
  $("#payment-card-number")?.focus();
}

async function createProfileForBooking(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = $("#registration-name").value.trim();
  const email = $("#registration-email").value.trim();
  const password = $("#registration-password").value;
  const status = $("#registration-message");
  const result = await window.SoraWallet?.createProfile({ name, email, password });
  if (!result?.ok) {
    status.textContent = result?.message || "The profile could not be saved.";
    form.querySelector(result?.message?.includes("password") ? "#registration-password" : result?.message?.includes("email") || result?.message?.includes("already") ? "#registration-email" : "#registration-name").focus();
    return;
  }
  finishAccountStep(result.profile);
}

async function continueWithSavedProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $("#registration-message");
  const result = await window.SoraWallet?.signIn({
    email: $("#profile-signin-email").value,
    password: $("#profile-signin-password").value,
  });
  if (!result?.ok) {
    status.textContent = result?.message || "The profile could not be opened.";
    return;
  }
  finishAccountStep(result.profile);
}

function renderPaymentStep() {
  dialog.classList.remove("has-seat-map");
  const total = fareTotal(activeFlight) * passengerTotal();
  const walletBalance = window.SoraWallet?.getWallet().balance || 0;
  const pointsPerDollar = window.SoraWallet?.pointsPerDollar || 100;
  const maxPoints = Math.floor(Math.min(walletBalance, total * pointsPerDollar) / pointsPerDollar) * pointsPerDollar;
  pointsToRedeem = Math.min(pointsToRedeem, maxPoints);
  dialogContent.innerHTML = `
    <div class="checkout-progress"><span class="is-complete">01 · ACCOUNT</span><span class="is-current">02 · PAYMENT</span><span>03 · SEATS</span></div>
    <div class="dialog-kicker">FLIGHT CHECKOUT · PAYMENT</div>
    <h2 id="dialog-title">Payment details.</h2>
    <p class="dialog-intro">Apply Sora Points if you like, then review your travel total.</p>
    ${checkoutSummaryMarkup()}
    <section class="sora-redeem-panel" aria-labelledby="sora-redeem-title">
      <div><strong id="sora-redeem-title">Use Sora Points</strong><small>${walletBalance.toLocaleString("en-US")} points available · ${pointsPerDollar} points = $1</small></div>
      <label for="points-to-redeem">Points to use</label>
      <input id="points-to-redeem" type="number" min="0" max="${maxPoints}" step="${pointsPerDollar}" value="${pointsToRedeem}" ${maxPoints === 0 ? "disabled" : ""} />
      <div id="points-redeem-feedback" class="sora-redeem-feedback" role="status" aria-live="polite"></div>
    </section>
    <div class="checkout-total-breakdown" id="payment-total-display" aria-live="polite">
      <span>Fare total <b id="payment-fare-total">$${total}</b></span>
      <span>Sora Points applied <b id="payment-points-discount">−$0</b></span>
      <strong>Amount due <b id="payment-amount-due">$${total}</b></strong>
    </div>
    <form class="checkout-form payment-form" id="payment-form" method="dialog" autocomplete="off">
      <label class="checkout-field full-width" data-payment-detail for="payment-cardholder">Cardholder name<input id="payment-cardholder" type="text" value="TEST TRAVELER" autocomplete="off" spellcheck="false" required /></label>
      <label class="checkout-field full-width" data-payment-detail for="payment-card-number">Card number<input id="payment-card-number" type="text" inputmode="numeric" value="0000 0000 0000 0000" maxlength="19" autocomplete="off" spellcheck="false" required /></label>
      <label class="checkout-field" data-payment-detail for="payment-expiry">Expiry<input id="payment-expiry" type="text" inputmode="numeric" value="00/00" maxlength="5" autocomplete="off" required /></label>
      <label class="checkout-field" data-payment-detail for="payment-cvc">Security code<input id="payment-cvc" type="text" inputmode="numeric" value="000" maxlength="3" autocomplete="off" required /></label>
      <label class="checkout-field full-width" data-payment-detail for="payment-postal">Billing postal code<input id="payment-postal" type="text" inputmode="numeric" value="00000" maxlength="5" autocomplete="off" required /></label>
      <label class="consent-row full-width" data-payment-detail><input id="payment-consent" type="checkbox" required /><span>I confirm I am using the sample card details shown above.</span></label>
      <p id="payment-message" class="checkout-message full-width" role="status" aria-live="polite"></p>
      <button class="button button-red checkout-submit full-width" id="payment-submit" type="submit">Continue to seats · $${total} <span aria-hidden="true">→</span></button>
      <p class="checkout-safety full-width">Use only the sample values shown. This site does not process payments or issue reservations. Profile and Sora Points activity stay in this browser.</p>
    </form>`;
  const pointsInput = $("#points-to-redeem");
  pointsInput?.addEventListener("input", () => {
    const raw = Number(pointsInput.value) || 0;
    pointsToRedeem = Math.floor(Math.max(0, raw) / pointsPerDollar) * pointsPerDollar;
    pointsToRedeem = Math.min(pointsToRedeem, maxPoints);
    pointsInput.value = String(pointsToRedeem);
    updatePaymentTotals(total, pointsPerDollar);
  });
  updatePaymentTotals(total, pointsPerDollar);
  $("#payment-form").addEventListener("submit", completePaymentSimulation);
}

function updatePaymentTotals(fare, pointsPerDollar) {
  const discount = Math.min(fare, Math.floor(pointsToRedeem / pointsPerDollar));
  const due = Math.max(0, fare - discount);
  $("#payment-fare-total").textContent = `$${fare}`;
  $("#payment-points-discount").textContent = `−$${discount} · ${pointsToRedeem.toLocaleString("en-US")} points`;
  $("#payment-amount-due").textContent = `$${due}`;
  $("#points-redeem-feedback").textContent = pointsToRedeem
    ? `${pointsToRedeem.toLocaleString("en-US")} points will cover $${discount} of this fare.`
    : "No points applied. Eligible flights can earn Sora Points.";
  $("#payment-submit").innerHTML = due > 0
    ? `Continue to seats · $${due} <span aria-hidden="true">→</span>`
    : "Confirm with Sora Points <span aria-hidden=\"true\">→</span>";
  dialogContent.querySelectorAll("[data-payment-detail]").forEach((field) => {
    field.hidden = due === 0;
    field.querySelector("input")?.toggleAttribute("required", due > 0);
  });
  $("#payment-points-only-note")?.remove();
  if (due === 0) {
    const note = document.createElement("p");
    note.id = "payment-points-only-note";
    note.className = "checkout-safety full-width";
    note.textContent = "Your points cover the full fare. This site does not process payments.";
    $("#payment-form").insertBefore(note, $("#payment-message"));
  }
}

function completePaymentSimulation(event) {
  event.preventDefault();
  const status = $("#payment-message");
  const pointsPerDollar = window.SoraWallet?.pointsPerDollar || 100;
  const total = fareTotal(activeFlight) * passengerTotal();
  const due = Math.max(0, total - Math.min(total, Math.floor(pointsToRedeem / pointsPerDollar)));
  if (due > 0) {
    const cardValues = [
      $("#payment-cardholder").value.trim(),
      $("#payment-card-number").value.trim(),
      $("#payment-expiry").value.trim(),
      $("#payment-cvc").value.trim(),
      $("#payment-postal").value.trim(),
    ];
    const expectedValues = ["TEST TRAVELER", "0000 0000 0000 0000", "00/00", "000", "00000"];
    if (cardValues.some((value, index) => value !== expectedValues[index])) {
      status.textContent = "For safety, checkout accepts only the sample card details shown above. Card payments are not processed by this site.";
      $("#payment-cardholder").value = expectedValues[0];
      $("#payment-card-number").value = expectedValues[1];
      $("#payment-expiry").value = expectedValues[2];
      $("#payment-cvc").value = expectedValues[3];
      $("#payment-postal").value = expectedValues[4];
      return;
    }
    if (!$("#payment-consent").checked) return;
  }

  const currentWallet = window.SoraWallet?.getWallet();
  const allowedPoints = Math.floor(Math.min(currentWallet?.balance || 0, total * pointsPerDollar) / pointsPerDollar) * pointsPerDollar;
  if (pointsToRedeem > allowedPoints) {
    status.textContent = "Your available points changed. Adjust the points amount and try again.";
    renderPaymentStep();
    $("#payment-message").textContent = "Your available points changed. Adjust the points amount and try again.";
    return;
  }
  pendingBooking = {
    reference: `NPG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    fareAmount: total,
    pointsUsed: pointsToRedeem,
  };
  seatFlights = [activeFlight];
  const returnFlight = getReturnFlight(activeFlight);
  if (tripType === "round" && returnFlight) seatFlights.push(returnFlight);
  selectedSeatsByLeg = seatFlights.map(() => []);
  seatLegIndex = 0;
  renderSeatSelectionStep();
}

function cabinSeatPlan(model) {
  const rows = (start, count) => Array.from({ length: count }, (_, index) => start + index);
  const singleAisle = [
    ["A", "B", "C"], ["D", "E", "F"],
  ];
  const twoTwo = [["A", "C"], ["D", "F"]];
  const oneTwoOne = [["A"], ["D", "G"], ["K"]];
  const twoFourTwo = [["A", "C"], ["D", "E", "F", "G"], ["H", "K"]];
  const twoThreeTwo = [["A", "C"], ["D", "E", "F"], ["H", "K"]];
  const threeThreeThree = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "K"]];
  const threeFourThree = [["A", "B", "C"], ["D", "E", "F", "G"], ["H", "J", "K"]];

  if (model.layout === "a321neo") {
    return [
      { key: "gold", label: "Class Gold · First Class", rows: rows(1, 2), banks: twoTwo },
      { key: "silver", label: "Class Silver · Business Class", rows: rows(3, 5), banks: twoTwo },
      { key: "premium", label: "Premium Economy", rows: rows(8, 5), banks: twoTwo },
      { key: "economy", label: "Economy", rows: rows(13, 19), banks: singleAisle },
    ];
  }
  if (model.layout === "a321xlr") {
    return [
      { key: "gold", label: "Class Gold · First Class", rows: rows(1, 2), banks: twoTwo },
      { key: "silver", label: "Class Silver · Business Class", rows: rows(3, 7), banks: twoTwo },
      { key: "premium", label: "Premium Economy", rows: rows(10, 5), banks: singleAisle },
      { key: "economy", label: "Economy", rows: rows(15, 23), banks: singleAisle },
    ];
  }
  if (model.layout === "a330-900") {
    return [
      { key: "gold", label: "Class Gold · First Class", rows: rows(1, 2), banks: oneTwoOne },
      { key: "silver", label: "Class Silver · Business Class", rows: rows(3, 8), banks: oneTwoOne },
      { key: "premium", label: "Premium Economy", rows: rows(11, 6), banks: twoThreeTwo },
      { key: "economy", label: "Economy", rows: rows(17, 25), banks: twoFourTwo },
    ];
  }
  if (model.layout === "a350-900" || model.layout === "a350-1000") {
    const larger = model.layout === "a350-1000";
    return [
      { key: "gold", label: "Class Gold · First Class", rows: rows(1, larger ? 3 : 2), banks: oneTwoOne },
      { key: "silver", label: "Class Silver · Business Class", rows: rows(larger ? 4 : 3, larger ? 9 : 8), banks: oneTwoOne },
      { key: "premium", label: "Premium Economy", rows: rows(larger ? 13 : 11, larger ? 7 : 6), banks: twoFourTwo },
      { key: "economy", label: "Economy", rows: rows(larger ? 20 : 17, larger ? 31 : 28), banks: threeThreeThree },
    ];
  }
  if (model.layout === "b777-9") {
    return [
      { key: "gold", label: "Class Gold · First Class", rows: rows(1, 2), banks: oneTwoOne },
      { key: "silver", label: "Class Silver · Business Class", rows: rows(3, 10), banks: oneTwoOne },
      { key: "premium", label: "Premium Economy", rows: rows(13, 8), banks: twoFourTwo },
      { key: "economy", label: "Economy", rows: rows(21, 34), banks: threeFourThree },
    ];
  }
  const shorterDreamliner = model.layout === "b787-8";
  return [
    { key: "gold", label: "Class Gold · First Class", rows: rows(1, 2), banks: oneTwoOne },
    { key: "silver", label: "Class Silver · Business Class", rows: rows(3, shorterDreamliner ? 6 : 8), banks: oneTwoOne },
    { key: "premium", label: "Premium Economy", rows: rows(shorterDreamliner ? 9 : 11, 6), banks: twoThreeTwo },
    { key: "economy", label: "Economy", rows: rows(shorterDreamliner ? 15 : 17, shorterDreamliner ? 24 : 27), banks: threeThreeThree },
  ];
}

function bookedSeatSet(flight, cabin, legIndex = 0) {
  const seats = cabin.rows.flatMap((row) => cabin.banks.flatMap((bank) => bank.map((letter) => `${row}${letter}`)));
  const selectedDate = legIndex === 0 ? departInput.value : returnInput.value;
  const seed = scheduleHash(`${flight.brand}:${flight.number}:${flight.from}:${flight.to}:${selectedDate}:${cabin.key}`);
  const occupancyRate = 0.12 + (seed % 10) / 100;
  const reserveForTravelers = passengerTotal() + 1;
  const count = Math.min(Math.max(1, Math.floor(seats.length * occupancyRate)), Math.max(0, seats.length - reserveForTravelers));
  return new Set(seats
    .map((seat) => ({ seat, score: scheduleHash(`${seed}:${seat}`) }))
    .sort((first, second) => first.score - second.score)
    .slice(0, count)
    .map(({ seat }) => seat));
}

function seatMapMarkup(flight, legIndex) {
  const model = aircraftForFlight(flight);
  const cabins = cabinSeatPlan(model);
  const selected = selectedSeatsByLeg[legIndex] || [];
  const serviceBay = (label) => `<div class="seat-service-bay" aria-hidden="true"><span class="seat-service-room">WC</span><div class="seat-service-core"><span>${label}</span><i></i></div><span class="seat-service-room">WC</span></div>`;
  const cabinMarkup = cabins.map((cabin) => {
    const bookedSeats = cabin.key === selectedCabin ? bookedSeatSet(flight, cabin, legIndex) : new Set();
    return `
    <section class="seat-cabin${cabin.key === selectedCabin ? " is-current" : " is-other-cabin"}" aria-label="${cabin.label}${cabin.key === selectedCabin ? " · seats available to select" : " · not selected"}">
      <div class="seat-cabin-heading"><strong>${cabin.label}</strong><span>${cabin.key === selectedCabin ? "YOUR CABIN" : ""}</span></div>
      ${cabin.rows.map((row) => `<div class="seat-map-row"><span class="seat-row-number">${row}</span>${cabin.banks.map((bank, bankIndex) => `${bankIndex ? '<span class="seat-aisle" aria-hidden="true"></span>' : ""}<div class="seat-bank">${bank.map((letter) => {
        const seat = `${row}${letter}`;
        const isSelected = selected.includes(seat);
        const isBooked = bookedSeats.has(seat);
        const canSelect = cabin.key === selectedCabin && !isBooked;
        return `<button type="button" class="seat-option${isSelected ? " is-selected" : ""}${isBooked ? " is-taken" : ""}" data-seat-choice="${legIndex}:${seat}" aria-label="Seat ${seat}${isBooked ? " unavailable" : isSelected ? " selected" : " available"}" aria-pressed="${isSelected}" ${canSelect ? "" : "disabled"}>${letter}</button>`;
      }).join("")}</div>`).join("")}</div>`).join("")}
    </section>`;
  }).join('<div class="seat-cabin-divider" aria-hidden="true"><i></i><span>SECTION DIVIDER</span><i></i></div>');
  return `<div class="seat-plane" aria-label="Top view seat layout of ${model.name}">
    <div class="seat-plane-nose"><span>FLIGHT DECK · FRONT</span><i aria-hidden="true"></i></div>
    <div class="seat-plane-cabin"><div class="seat-map-key"><span><i class="seat-key-open"></i> Available</span><span><i class="seat-key-taken"></i> Unavailable</span><span><i class="seat-key-locked"></i> Other cabin</span></div>${serviceBay("FORWARD GALLEY")}${cabinMarkup}${serviceBay("AFT GALLEY")}</div>
  </div>`;
}

function renderSeatSelectionStep() {
  dialog.classList.add("has-seat-map");
  const flight = seatFlights[seatLegIndex];
  const model = aircraftForFlight(flight);
  const legLabel = seatLegIndex === 0 ? "OUTBOUND" : "RETURN";
  const selected = selectedSeatsByLeg[seatLegIndex] || [];
  dialogContent.innerHTML = `
    <div class="checkout-progress"><span class="is-complete">01 · ACCOUNT</span><span class="is-complete">02 · PAYMENT</span><span class="is-current">03 · SEATS</span></div>
    <div class="dialog-kicker">SEAT SELECTION · ${legLabel}</div>
    <h2 id="dialog-title">Choose your seats.</h2>
    <p class="dialog-intro">Pick one seat per traveler (${passengerTotal()} total). Choose seats in the ${cabinClasses[selectedCabin].label} section.</p>
    <div class="seat-aircraft-heading"><div><span>${airlineInfo[flight.brand].name} · ${flight.number} · ${legLabel}</span><strong>${model.name}</strong></div><b>${model.code}</b></div>
    <div class="seat-map-scroll">${seatMapMarkup(flight, seatLegIndex)}</div>
    <div class="seat-selection-footer"><p id="seat-selection-count" role="status" aria-live="polite">${selected.length} of ${passengerTotal()} seats selected.</p><div class="seat-selection-buttons"><button class="button button-dark" id="seat-step-back" type="button">Back to payment</button>${seatLegIndex > 0 ? '<button class="button button-dark" id="seat-step-previous" type="button">Previous flight</button>' : ""}<button class="button button-red" id="seat-step-continue" type="button" disabled>${seatLegIndex < seatFlights.length - 1 ? "Continue to return seats" : "Confirm seats & print boarding pass"} <span aria-hidden="true">→</span></button></div></div>
    <p id="seat-selection-message" class="checkout-message" role="status" aria-live="polite"></p>
    <p class="checkout-safety">Seat availability is an on-page estimate. Your selections are stored in this browser; reservations are not processed here.</p>`;

  dialogContent.querySelectorAll("[data-seat-choice]").forEach((button) => button.addEventListener("click", () => {
    const [, seat] = button.dataset.seatChoice.split(":");
    const choices = selectedSeatsByLeg[seatLegIndex];
    if (choices.includes(seat)) choices.splice(choices.indexOf(seat), 1);
    else if (choices.length < passengerTotal()) choices.push(seat);
    else {
      $("#seat-selection-message").textContent = `You already chose ${passengerTotal()} seats. Select a chosen seat to replace it.`;
      return;
    }
    $("#seat-selection-message").textContent = "";
    updateSeatSelectionControls();
  }));
  $("#seat-step-back").addEventListener("click", renderPaymentStep);
  $("#seat-step-previous")?.addEventListener("click", () => { seatLegIndex -= 1; renderSeatSelectionStep(); });
  $("#seat-step-continue").addEventListener("click", () => {
    if (selectedSeatsByLeg[seatLegIndex].length !== passengerTotal()) return;
    if (seatLegIndex < seatFlights.length - 1) {
      seatLegIndex += 1;
      renderSeatSelectionStep();
    } else finalizeBookingRecord();
  });
  updateSeatSelectionControls();
}

function updateSeatSelectionControls() {
  const selected = selectedSeatsByLeg[seatLegIndex] || [];
  const complete = selected.length === passengerTotal();
  $("#seat-selection-count").textContent = `${selected.length} of ${passengerTotal()} seats selected${selected.length ? ` · ${selected.join(" · ")}` : ""}.`;
  $("#seat-step-continue").disabled = !complete;
  dialogContent.querySelectorAll("[data-seat-choice]").forEach((button) => {
    const seat = button.dataset.seatChoice.split(":")[1];
    const isSelected = selected.includes(seat);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute("aria-label", `Seat ${seat}${isSelected ? " selected" : ""}`);
  });
}

function finalizeBookingRecord() {
  const result = window.SoraWallet?.completeBooking({
    fareAmount: pendingBooking.fareAmount,
    pointsUsed: pendingBooking.pointsUsed,
    cabin: cabinClasses[selectedCabin].label,
    airline: airlineInfo[activeFlight.brand].name,
    from: activeFlight.from,
    to: activeFlight.to,
    reference: pendingBooking.reference,
    seatSegments: seatFlights.map((flight, index) => ({
      airline: airlineInfo[flight.brand].name,
      flightNumber: flight.number,
      aircraft: aircraftForFlight(flight).name,
      route: `${flight.from} → ${flight.to}`,
      seats: selectedSeatsByLeg[index],
    })),
  });
  if (!result?.ok) {
    $("#seat-selection-message").textContent = result?.message || "Your itinerary details could not be saved.";
    const backButton = $("#seat-step-back");
    backButton.textContent = "Return to payment";
    return;
  }
  pendingBooking.result = result;
  renderBookingConfirmation();
}

function renderBookingConfirmation() {
  dialog.classList.remove("has-seat-map");
  const info = airlineInfo[activeFlight.brand];
  const result = pendingBooking.result;
  const reference = pendingBooking.reference;
  const displayName = escapeHTML(accountDisplayName || "Traveler");
  const fromName = escapeHTML(airports[activeFlight.from]?.name || activeFlight.from);
  const toName = escapeHTML(airports[activeFlight.to]?.name || activeFlight.to);
  const seatRows = seatFlights.map((flight, index) => {
    const model = aircraftForFlight(flight);
    const label = index === 0 ? "OUTBOUND" : "RETURN";
    return `<div class="booking-seat-row"><span>${label} · ${flight.from} → ${flight.to}</span><strong>${model.name} · ${model.code}</strong><small>${selectedSeatsByLeg[index].join(" · ")} · ${selectedSeatsByLeg[index].length} traveler seats</small></div>`;
  }).join("");
  const pointsRows = [
    result.pointsUsed ? `<span>Redeemed <b>−${result.pointsUsed.toLocaleString("en-US")} points · $${result.discount} off</b></span>` : "",
    result.pointsEarned ? `<span>Earned <b>+${result.pointsEarned.toLocaleString("en-US")} Sora Points</b></span>` : "",
    result.pointsEarned ? `<small>Base ${result.cabinEarnRate} point/$ · cabin loyalty +${Math.round((result.loyaltyMultiplier - 1) * 100)}%${result.subscriptionMultiplier > 1 ? " · Sora Plus +25%" : ""} · ${result.status} lifetime total ${result.lifetimePoints.toLocaleString("en-US")} points</small>` : "",
    `<small>Updated balance · ${result.balance.toLocaleString("en-US")} points${result.saved ? "" : " · this visit only because browser storage is unavailable"}</small>`,
  ].filter(Boolean).join("");
  dialogContent.innerHTML = `
    <div class="dialog-kicker">TRAVEL ITINERARY</div>
    <div class="confirmation-mark" aria-hidden="true">✓</div>
    <h2 id="dialog-title">Your itinerary is ready, ${displayName}.</h2>
    <p class="dialog-intro">Your selected seats are on the boarding pass below.</p>
    <div class="boarding-reveal" role="img" aria-label="Your ${info.name} boarding pass for ${activeFlight.from} to ${activeFlight.to} is coming out of the scanner.">
      <article class="boarding-pass boarding-pass-${activeFlight.brand}">
        <div class="boarding-pass-head"><strong>${info.name}</strong><span>BOARDING PASS</span></div>
        <div class="boarding-pass-route"><div><small>FROM</small><strong>${activeFlight.from}</strong><em>${fromName}</em></div><span class="boarding-pass-arrow" aria-hidden="true">→</span><div><small>TO</small><strong>${activeFlight.to}</strong><em>${toName}</em></div></div>
        <div class="boarding-pass-details"><span><small>FLIGHT</small><strong>${activeFlight.number}</strong></span><span><small>DATE</small><strong>${formatDate(departInput.value)}</strong></span><span><small>SEATS</small><strong>${selectedSeatsByLeg[0].join(" · ")}</strong></span></div>
        <div class="boarding-pass-barcode" aria-hidden="true"></div>
      </article>
      <div class="boarding-scanner" aria-hidden="true"><div class="scanner-slot"><i></i></div><div class="scanner-front"><span class="scanner-light"></span><span>PASS PRINTED</span><b>✓</b></div></div>
    </div>
    <div class="confirmation-ref">TRAVEL REFERENCE<strong>${reference}</strong></div>
    <div class="booking-seat-receipt">${seatRows}</div>
    <div class="sora-points-receipt">${pointsRows}</div>
    <div class="dialog-route">
      <div><strong>${activeFlight.from} <span aria-hidden="true">→</span> ${activeFlight.to}</strong><small>${info.name} · ${activeFlight.number}<br />${activeFlight.stopover ? `1 stop via ${airports[activeFlight.stopover].name}<br />` : "Nonstop<br />"}${cabinClasses[selectedCabin].label}<br />${formatDate(departInput.value)} · ${activeFlight.depart} — ${activeFlight.arrive}${activeFlight.arriveDay}</small></div>
      <div class="dialog-price">$${result.amountDue}<small>TRIP TOTAL · ${passengerBreakdown().toUpperCase()}</small></div>
    </div>
    ${returnSegmentMarkup(activeFlight)}
    <p class="checkout-safety confirmation-note">This site does not issue tickets or process reservations or payments. Your profile, point balance, and seat choices stay in this browser.</p>
    <button class="button button-dark" id="done-button" type="button" style="width:100%;margin-top:12px">Done <span aria-hidden="true">✓</span></button>`;
  accountDisplayName = "";
  pendingBooking = null;
  $("#done-button").addEventListener("click", () => dialog.close());
}

function searchFlights(event) {
  event.preventDefault();
  selectedCabin = cabinSelect.value;
  searchMessage.textContent = "";

  if (originSelect.value === destinationSelect.value) {
    searchMessage.textContent = "Choose two different airports to find flights.";
    originSelect.focus();
    return;
  }
  if (tripType === "round" && returnInput.value && returnInput.value < departInput.value) {
    searchMessage.textContent = "Your return date should be after your departure date.";
    returnInput.focus();
    return;
  }

  const carrier = document.querySelector('input[name="carrier"]:checked').value;
  let found = flights.filter((flight) => flight.from === originSelect.value && flight.to === destinationSelect.value);
  if (carrier !== "all") found = found.filter((flight) => flight.brand === carrier);
  found = [...found, ...randomizedScheduleVariants(found, departInput.value)].sort((first, second) => first.depart.localeCompare(second.depart));
  renderFlights(found, originSelect.value, destinationSelect.value);
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupDates() {
  setDefaultDates();
  departInput.addEventListener("change", () => {
    returnInput.min = departInput.value;
    if (returnInput.value < departInput.value) returnInput.value = departInput.value;
  });
  returnInput.addEventListener("change", () => {
    if (returnInput.value < departInput.value) returnInput.value = departInput.value;
  });
}

function setupTripType() {
  const tabs = $$(".trip-tab");
  returnInput.required = true;
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-pressed", "true");
    tripType = tab.dataset.trip;
    returnField.classList.toggle("is-hidden", tripType === "oneway");
    returnInput.required = tripType === "round";
    returnInput.disabled = tripType === "oneway";
  }));
}

if (originSelect && destinationSelect && searchForm) {
originSelect.addEventListener("change", syncAirportLabels);
destinationSelect.addEventListener("change", syncAirportLabels);
searchForm.addEventListener("submit", searchFlights);
cabinSelect.addEventListener("change", () => {
  selectedCabin = cabinSelect.value;
  if (resultsEl.childElementCount) searchForm.requestSubmit();
});
renderNetwork();
renderTsukiNetwork();
setupDates();
setupTripType();
updatePassengerLabel();
syncAirportLabels();

$("#swap-airports").addEventListener("click", () => {
  const oldOrigin = originSelect.value;
  originSelect.value = destinationSelect.value;
  destinationSelect.value = oldOrigin;
  syncAirportLabels();
});

passengerTrigger.addEventListener("click", () => {
  const opening = passengerPopover.hidden;
  passengerPopover.hidden = !opening;
  passengerTrigger.setAttribute("aria-expanded", String(opening));
});

passengerPopover.querySelectorAll("[data-count]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.passenger;
    const change = button.dataset.count === "up" ? 1 : -1;
    const minimum = type === "adults" ? 1 : 0;
    if (change > 0 && passengerTotal() >= 8) return;
    passengerCounts[type] = Math.max(minimum, passengerCounts[type] + change);
    updatePassengerLabel();
  });
});

document.addEventListener("click", (event) => {
  if (!passengerPopover.hidden && !passengerPopover.contains(event.target) && !passengerTrigger.contains(event.target)) {
    closePassenger();
  }
});

$$('[data-prefill]').forEach((link) => link.addEventListener("click", () => {
  const brand = link.dataset.prefill;
  document.querySelector(`input[name="carrier"][value="${brand}"]`).checked = true;
  originSelect.value = "KIX";
  destinationSelect.value = brand === "orbit" ? "ICN" : "SFO";
  syncAirportLabels();
  setTimeout(() => searchForm.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
}));

const menuToggle = $(".menu-toggle");
const nav = $("#primary-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  activeFlight = null;
  accountDisplayName = "";
  pointsToRedeem = 0;
  pendingBooking = null;
  seatFlights = [];
  selectedSeatsByLeg = [];
  seatLegIndex = 0;
  dialog.classList.remove("has-seat-map");
  dialogContent.replaceChildren();
});
}
