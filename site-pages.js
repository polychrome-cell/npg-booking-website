(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const data = window.NPG_NETWORK_DATA;
  if (!data) return;

  const mapPage = document.querySelector("#routes-page");
  if (mapPage) setupRoutePage(data);
  const fleetPage = document.querySelector("#fleet-page");
  if (fleetPage) setupFleetPage(data);
  const journeysPage = document.querySelector("#tsuki-journeys-page");
  if (journeysPage) setupJourneyPlanner();
})();

function setupRoutePage({ airports, airportCoordinates, pacificaRoutes, tsukiRoutes, orbitRoutes }) {
  const map = document.querySelector("#route-map");
  const cards = document.querySelector("#route-cards");
  const tabs = [...document.querySelectorAll("[data-airline-map]")];
  const title = document.querySelector("#route-map-title");
  const badge = document.querySelector("#route-map-badge");
  const listTitle = document.querySelector("#route-list-title");
  const listDescription = document.querySelector("#route-list-description");
  const search = document.querySelector("#route-search");
  const originFilter = document.querySelector("#route-origin-filter");
  const count = document.querySelector("#route-count");
  const empty = document.querySelector("#route-empty");
  const logoMarks = { pacifica: "✳", tsuki: "月", orbit: "◉" };
  let activeAirline = "pacifica";
  let activeRoutes = [];

  const project = ({ lat, lon }) => ({
    x: (((lon + 20) % 360 + 360) % 360) / 360 * 1000,
    y: (90 - lat) / 180 * 500,
  });
  const vector = ({ lat, lon }) => {
    const latitude = lat * Math.PI / 180;
    const longitude = lon * Math.PI / 180;
    return [Math.cos(latitude) * Math.cos(longitude), Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude)];
  };
  const pathFor = (startCode, destinationCode) => {
    const start = vector(airportCoordinates[startCode]);
    const end = vector(airportCoordinates[destinationCode]);
    const dot = Math.max(-1, Math.min(1, start[0] * end[0] + start[1] * end[1] + start[2] * end[2]));
    const angle = Math.acos(dot);
    const sinAngle = Math.sin(angle) || 1;
    return Array.from({ length: 43 }, (_, index) => {
      const progress = index / 42;
      const a = Math.sin((1 - progress) * angle) / sinAngle;
      const b = Math.sin(progress * angle) / sinAngle;
      const point = project({
        lat: Math.atan2(a * start[2] + b * end[2], Math.hypot(a * start[0] + b * end[0], a * start[1] + b * end[1])) * 180 / Math.PI,
        lon: Math.atan2(a * start[1] + b * end[1], a * start[0] + b * end[0]) * 180 / Math.PI,
      });
      return `${index ? "L" : "M"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    }).join(" ");
  };
  const routeCodes = (route) => activeAirline === "pacifica" ? { from: "KIX", to: route.code, id: route.code } : { from: route.from, to: route.to, id: `${route.from}-${route.to}` };

  function buildMap() {
    const destinations = [...new Set(activeRoutes.map((route) => routeCodes(route).to))];
    const origins = [...new Set(activeRoutes.map((route) => routeCodes(route).from))];
    const lines = activeRoutes.map((route) => {
      const { from, to, id } = routeCodes(route);
      return `<path class="network-route-line" data-route-id="${id}" data-route-destination="${to}" d="${pathFor(from, to)}" />`;
    }).join("");
    const pins = destinations.map((code) => {
      const point = project(airportCoordinates[code]);
      const airport = airports[code];
      const labelX = Math.min(point.x + 5, 968);
      const labelY = Math.max(point.y - 7, 2);
      return `<g class="network-pin tsuki-map-pin" data-route-pin="${code}" role="button" tabindex="0" aria-label="Highlight routes to ${airport.name}, ${code}"><title>${airport.name} · ${code}</title><circle class="pin-halo" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="6" /><circle class="pin-dot" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="2.2" /><rect class="pin-label-bg" x="${labelX.toFixed(2)}" y="${labelY.toFixed(2)}" width="24" height="13" rx="3" /><text class="pin-label" x="${(labelX + 12).toFixed(2)}" y="${(labelY + 9).toFixed(2)}" text-anchor="middle" font-size="6.5">${code}</text></g>`;
    }).join("");
    const originMarks = origins.map((code) => {
      const point = project(airportCoordinates[code]);
      const airport = airports[code];
      const x = Math.min(point.x + 11, 940);
      const originName = activeAirline === "orbit" && code === "KIX" ? "OSAKA" : airport.name.toUpperCase();
      return `<g class="network-origin tsuki-origin"><circle class="origin-halo" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="9" /><circle class="origin-dot" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3.2" /><text class="origin-code" x="${x.toFixed(2)}" y="${(point.y - 4).toFixed(2)}" font-size="10">${code}</text><text class="origin-city" x="${x.toFixed(2)}" y="${(point.y + 8).toFixed(2)}" font-size="6">${originName}</text></g>`;
    }).join("");
    const airlineName = { pacifica: "Grand Pacifica Air", tsuki: "Tsuki Airways", orbit: "Tsuki Orbit" }[activeAirline];
    map.innerHTML = `<img class="world-map-base" src="world-map.svg" alt="" draggable="false" /><svg class="network-map-svg route-page-map-svg" viewBox="0 0 1000 500" role="img" aria-label="${airlineName} routes on a full-world map" preserveAspectRatio="none"><g class="network-routes">${lines}</g><g class="network-origins">${originMarks}</g><g class="network-destinations">${pins}</g></svg>`;
    map.querySelectorAll("[data-route-pin]").forEach((pin) => {
      const select = () => highlightDestination(pin.dataset.routePin);
      pin.addEventListener("click", select);
      pin.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select();
        }
      });
    });
  }

  function renderCards() {
    cards.innerHTML = activeRoutes.map((route) => {
      const { from, to, id } = routeCodes(route);
      const distance = route.distance === null ? "Not listed" : `${route.distance.toLocaleString("en-US")} km`;
      const weekly = route.weekly === null ? "Not listed" : route.weekly === 0 ? "0 · paused" : `${route.weekly} flights`;
      const originName = activeAirline === "orbit" && from === "KIX" ? "Osaka" : airports[from].name;
      return `<article class="route-card${route.weekly === 0 ? " is-inactive" : ""}" data-route-card-id="${id}" data-route-destination="${to}" data-route-origin="${from}"><div class="route-card-head"><div><span class="route-cities">${originName} <i aria-hidden="true">↔</i> ${airports[to].name}</span><span class="route-airports">${from} <span>→</span> ${to}</span></div><span class="route-badge">${to}</span></div><div class="route-stat-row"><span><small>DISTANCE</small><strong>${distance}</strong></span><span><small>WEEKLY</small><strong>${weekly}</strong></span></div>${route.weekly === 0 ? `<p class="route-paused">No weekly service is listed for this route.</p>` : route.weekly === null ? `<p class="route-paused">Weekly service details are unavailable.</p>` : ""}</article>`;
    }).join("");
    cards.querySelectorAll("[data-route-card-id]").forEach((card) => {
      const select = () => highlightRoute(card.dataset.routeCardId, card.dataset.routeDestination);
      card.addEventListener("pointerenter", select);
      card.addEventListener("focusin", select);
      card.addEventListener("pointerleave", () => highlightRoute("", ""));
      card.addEventListener("focusout", () => highlightRoute("", ""));
    });
    applyFilters();
  }

  function highlightRoute(id, destination) {
    map.querySelectorAll("[data-route-id]").forEach((line) => line.classList.toggle("is-highlighted", line.dataset.routeId === id));
    cards.querySelectorAll("[data-route-card-id]").forEach((card) => card.classList.toggle("is-highlighted", card.dataset.routeCardId === id));
    map.querySelectorAll("[data-route-pin]").forEach((pin) => pin.classList.toggle("is-highlighted", pin.dataset.routePin === destination));
  }

  function highlightDestination(code) {
    map.querySelectorAll("[data-route-id]").forEach((line) => line.classList.toggle("is-highlighted", line.dataset.routeDestination === code));
    map.querySelectorAll("[data-route-pin]").forEach((pin) => pin.classList.toggle("is-highlighted", pin.dataset.routePin === code));
    cards.querySelectorAll("[data-route-card-id]").forEach((card) => card.classList.remove("is-highlighted"));
    const firstCard = cards.querySelector(`[data-route-destination="${code}"]:not([hidden])`);
    if (firstCard) {
      firstCard.classList.add("is-highlighted");
      firstCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function applyFilters() {
    const query = search.value.trim().toLocaleLowerCase();
    const origin = originFilter.value;
    let visible = 0;
    cards.querySelectorAll("[data-route-card-id]").forEach((card) => {
      const shown = (origin === "all" || card.dataset.routeOrigin === origin) && (!query || card.textContent.toLocaleLowerCase().includes(query));
      card.hidden = !shown;
      if (shown) visible += 1;
    });
    count.textContent = `Showing ${visible} of ${activeRoutes.length} routes`;
    empty.hidden = visible > 0;
  }

  function selectAirline(airline, updateHash = false) {
    activeAirline = airline;
    activeRoutes = { pacifica: pacificaRoutes, tsuki: tsukiRoutes, orbit: orbitRoutes }[airline];
    map.classList.toggle("tsuki-map", airline === "tsuki");
    map.classList.toggle("orbit-map", airline === "orbit");
    tabs.forEach((tab) => {
      const active = tab.dataset.airlineMap === airline;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    const name = { pacifica: "Grand Pacifica Air", tsuki: "Tsuki Airways", orbit: "Tsuki Orbit" }[airline];
    title.textContent = { pacifica: "Our routes from Kansai", tsuki: "Tsuki’s routes across the world", orbit: "Tsuki Orbit routes across the world" }[airline];
    badge.innerHTML = `<span class="network-badge-logo" aria-hidden="true">${logoMarks[airline]}</span> ${name}`;
    listTitle.textContent = { pacifica: "From Kansai to the Pacific", tsuki: "Tsuki Airways destinations", orbit: "Tsuki Orbit destinations" }[airline];
    listDescription.textContent = airline === "orbit" ? "23 Osaka routes with weekly service. Schedules shown here are illustrative and do not represent live availability." : "Explore route distances and weekly service. Schedules shown here are illustrative and do not represent live availability.";
    const origins = [...new Set(activeRoutes.map((route) => routeCodes(route).from))];
    originFilter.replaceChildren(new Option("All departure airports", "all"), ...origins.map((code) => new Option(`${airline === "orbit" && code === "KIX" ? "Osaka" : airports[code].name} · ${code}`, code)));
    search.value = "";
    originFilter.value = "all";
    buildMap();
    renderCards();
    if (updateHash) history.replaceState(null, "", `#${airline}`);
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => selectAirline(tab.dataset.airlineMap, true)));
  search.addEventListener("input", applyFilters);
  originFilter.addEventListener("change", applyFilters);
  const initial = location.hash === "#tsuki" || location.hash === "#orbit" ? location.hash.slice(1) : "pacifica";
  selectAirline(initial);
}

function setupFleetPage({ pacificaFleet, tsukiFleet, orbitFleet }) {
  const tabs = [...document.querySelectorAll("[data-fleet-airline]")];
  const showcase = document.querySelector("#fleet-showcase");
  const names = { pacifica: "Grand Pacifica Air", tsuki: "Tsuki Airways", orbit: "Tsuki Orbit" };
  const logoMarks = { pacifica: "✳", tsuki: "月", orbit: "◉" };
  function selectAirline(airline) {
    tabs.forEach((tab) => {
      const active = tab.dataset.fleetAirline === airline;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    const name = names[airline];
    if (airline === "pacifica") {
      const total = pacificaFleet.reduce((sum, type) => sum + type.count, 0);
      showcase.innerHTML = `<div class="fleet-showcase-heading"><div><span class="network-kicker">${name.toUpperCase()} FLEET</span><h2>${name}</h2><p>Long-range aircraft connecting Japan with the Pacific and beyond.</p></div><span class="fleet-showcase-mark pacifica-mark" aria-hidden="true">${logoMarks[airline]}</span></div><div class="fleet-showcase-total"><strong>${total}</strong><span>aircraft<br />across ${pacificaFleet.length} types</span></div><div class="fleet-showcase-list">${pacificaFleet.map((aircraft) => `<article class="fleet-showcase-row"><span class="fleet-aircraft-mark" aria-hidden="true">✈</span><div class="fleet-aircraft-type"><strong>${aircraft.type}</strong><small>${aircraft.code}</small></div><strong class="fleet-showcase-count">${aircraft.count}</strong></article>`).join("")}</div><p class="fleet-note">Fleet figures are from your airline-simulator screenshots.</p>`;
    } else if (airline === "tsuki") {
      const total = tsukiFleet.reduce((sum, type) => sum + type.count, 0);
      showcase.innerHTML = `<div class="fleet-showcase-heading"><div><span class="network-kicker">${name.toUpperCase()} FLEET</span><h2>${name}</h2><p>A long-haul fleet built around the Dreamliner and Boeing 777 family.</p></div><span class="fleet-showcase-mark tsuki-mark" aria-hidden="true">${logoMarks[airline]}</span></div><div class="fleet-showcase-total"><strong>${total}</strong><span>aircraft<br />across ${tsukiFleet.length} types</span></div><div class="fleet-showcase-list">${tsukiFleet.map((aircraft) => `<article class="fleet-showcase-row"><span class="fleet-aircraft-mark" aria-hidden="true">✈</span><div class="fleet-aircraft-type"><strong>${aircraft.type}</strong><small>${aircraft.code}</small></div><strong class="fleet-showcase-count">${aircraft.count}</strong></article>`).join("")}</div><p class="fleet-note">Fleet figures are from your airline-simulator screenshots.</p>`;
    } else {
      const total = orbitFleet.reduce((sum, type) => sum + type.count, 0);
      showcase.innerHTML = `<div class="fleet-showcase-heading"><div><span class="network-kicker">${name.toUpperCase()} FLEET</span><h2>${name}</h2><p>A short and medium-haul fleet centered on the Airbus A321 family.</p></div><span class="fleet-showcase-mark orbit-mark" aria-hidden="true">${logoMarks[airline]}</span></div><div class="fleet-showcase-total"><strong>${total}</strong><span>aircraft<br />across ${orbitFleet.length} types</span></div><div class="fleet-showcase-list">${orbitFleet.map((aircraft) => `<article class="fleet-showcase-row"><span class="fleet-aircraft-mark" aria-hidden="true">✈</span><div class="fleet-aircraft-type"><strong>${aircraft.type}</strong><small>${aircraft.code}</small></div><strong class="fleet-showcase-count">${aircraft.count}</strong></article>`).join("")}</div><p class="fleet-note">Fleet figures are from your airline-simulator screenshots.</p>`;
    }
  }
  tabs.forEach((tab) => tab.addEventListener("click", () => selectAirline(tab.dataset.fleetAirline)));
  selectAirline("pacifica");
}

function setupJourneyPlanner() {
  const form = document.querySelector("#journey-planner-form");
  const destinationSelect = document.querySelector("#journey-destination");
  const tierSelect = document.querySelector("#journey-tier");
  const durationSelect = document.querySelector("#journey-duration");
  const departureInput = document.querySelector("#journey-departure");
  const hotelSelect = document.querySelector("#journey-hotel");
  const travelersSelect = document.querySelector("#journey-travelers");
  const itinerary = document.querySelector("#journey-itinerary");
  const summary = document.querySelector("#journey-summary");
  const dialog = document.querySelector("#journey-booking-dialog");
  const dialogContent = document.querySelector("#journey-dialog-content");
  const dialogClose = dialog.querySelector(".dialog-close");

  const destinations = {
    japan: {
      name: "Traditional Japan",
      hotels: ["Tsuki Lantern Ryokan · Kyoto (fictional)", "Maple Courtyard House · Kyoto (fictional)"],
      eliteHotels: ["Tsuki Imperial Garden Resort · Kyoto (fictional)", "Moon Pavilion Onsen Retreat · Hakone (fictional)"],
      dailyRates: { escape: 165, signature: 245, voyage: 405, elite: 690 },
      days: [
        ["Arrive in Kyoto", "Private airport transfer, hotel check-in, and a gentle first walk through Gion."],
        ["Higashiyama and Kiyomizu-dera", "Explore Kiyomizu-dera, its hillside approach, and the preserved lanes of Sannenzaka."],
        ["Fushimi Inari", "Walk beneath the thousands of red torii gates at Fushimi Inari Taisha, then visit a local tea house."],
        ["Golden Pavilion", "See Kinkaku-ji reflected in its garden pond and take a quiet walk through Ryoan-ji."],
        ["Nara day trip", "Meet the Great Buddha at Tōdai-ji and wander the paths of Nara Park."],
        ["Arashiyama", "Visit the Arashiyama bamboo grove and Tenryū-ji’s historic garden."],
        ["A Kyoto tradition", "Browse Nishiki Market, then enjoy a guided tea ceremony and a free evening."],
        ["Osaka Castle", "Travel to Osaka for the castle grounds, a relaxed lunch, and an evening in Dōtonbori."],
        ["A day at your pace", "Choose a final garden visit, a craft workshop, or a restful day at the ryokan."],
        ["Depart Kansai", "Enjoy a slow breakfast before your transfer to Kansai International Airport."],
      ],
    },
    dubai: {
      name: "Dubai",
      hotels: ["Dune & Crescent House · Downtown (fictional)", "Palm Lantern Retreat · Jumeirah (fictional)"],
      eliteHotels: ["Tsuki Palm Royal Resort · Palm Jumeirah (fictional)", "Crescent Dunes Desert Sanctuary · Dubai (fictional)"],
      dailyRates: { escape: 225, signature: 340, voyage: 585, elite: 980 },
      days: [
        ["Arrive in Dubai", "Airport transfer, hotel check-in, and an easy evening around Downtown Dubai."],
        ["Above the city", "Visit Burj Khalifa and explore the Dubai Mall and its waterfront promenade."],
        ["Old Dubai and the Creek", "Discover Al Fahidi Historical Neighbourhood and cross Dubai Creek by traditional abra."],
        ["The city’s modern icons", "See the Museum of the Future and Dubai Frame, with time for the surrounding gardens."],
        ["Jumeirah and the Palm", "Visit the Jumeirah Mosque and take in views of Palm Jumeirah from the waterfront."],
        ["Souk Madinat and the coast", "Wander the waterways of Souk Madinat Jumeirah and enjoy a relaxed coastal afternoon."],
        ["Desert evening", "Spend the late afternoon among the dunes and watch the desert sunset before dinner."],
        ["Dubai Marina", "Follow the marina promenade and choose a leisurely lunch with views across the water."],
        ["A final day at your pace", "Revisit a favourite neighbourhood or take a quiet morning at the hotel."],
        ["Depart Dubai", "Enjoy breakfast before your transfer to Dubai International Airport."],
      ],
    },
    singapore: {
      name: "Singapore",
      hotels: ["Orchid Quay House · Marina Bay (fictional)", "Moonlit Shophouse Hotel · Chinatown (fictional)"],
      eliteHotels: ["Tsuki Marina Grand Resort · Marina Bay (fictional)", "Orchid Crown Sentosa Resort · Sentosa (fictional)"],
      dailyRates: { escape: 185, signature: 285, voyage: 485, elite: 820 },
      days: [
        ["Arrive in Singapore", "Hotel transfer and a gentle first evening along the Marina Bay waterfront."],
        ["Gardens by the Bay", "Explore the Flower Dome and Cloud Forest, then see the Supertree Grove at dusk."],
        ["Marina Bay icons", "Visit Merlion Park, admire the Marina Bay skyline, and explore the ArtScience Museum."],
        ["Chinatown and heritage", "Walk through Chinatown and visit the Buddha Tooth Relic Temple and Museum."],
        ["Kampong Glam", "Explore the Sultan Mosque, Arab Street, and the colourful lanes of this historic quarter."],
        ["A garden city", "Spend a peaceful morning at the Singapore Botanic Gardens and National Orchid Garden."],
        ["Sentosa by the sea", "Visit Fort Siloso and enjoy a slower afternoon along Sentosa’s waterfront."],
        ["Jewel and the city", "See the Rain Vortex at Jewel Changi and take an easy final stroll through the city."],
        ["A day at your pace", "Return to a favourite neighbourhood, browse local shops, or relax at the hotel."],
        ["Depart Singapore", "Enjoy breakfast before your transfer to Changi Airport."],
      ],
    },
    europe: {
      name: "Europe",
      hotels: ["Tsuki Grand Stay Collection · London, Paris & Rome (fictional)", "Maison Tsuki Collection · Paris & Rome (fictional)"],
      eliteHotels: ["Tsuki Palace Collection · London, Paris & Rome (fictional)", "Grand Moonlight Resorts · Paris & Rome (fictional)"],
      dailyRates: { escape: 310, signature: 465, voyage: 735, elite: 1260 },
      departureDays: {
        5: ["Depart Paris", "Enjoy breakfast before your transfer to the airport for your journey home."],
      },
      days: [
        ["Arrive in London", "Settle into your hotel, then take an easy walk around Westminster and Big Ben."],
        ["London landmarks", "See Tower Bridge and the Tower of London before a free afternoon by the Thames."],
        ["Onward to Paris", "Travel by rail to Paris, check in, and take an evening walk beside the Seine."],
        ["Paris, in full view", "Visit the Eiffel Tower and explore the Tuileries and the Louvre’s public galleries."],
        ["Onward to Rome", "Fly to Rome, settle in, and enjoy a first evening near the historic centre."],
        ["Ancient Rome", "Explore the Colosseum and Roman Forum with time to take in the surrounding ruins."],
        ["Vatican City", "Visit St Peter’s Square and the historic centre, including the Pantheon and Trevi Fountain."],
        ["A slower Roman day", "Choose a neighbourhood walk, a local food experience, or a restful morning."],
        ["One last European chapter", "Enjoy a final day for galleries, cafés, and the piazzas of Rome."],
        ["Depart Rome", "A private transfer takes you to the airport for your journey home."],
      ],
    },
  };
  const tiers = {
    escape: { name: "Tsuki Escape", cabin: "Economy", included: "Return Tsuki flights, hotel stay, airport transfers, and a destination guide." },
    signature: { name: "Tsuki Signature", cabin: "Premium Economy", included: "Premium Economy flights, selected hotel, airport transfers, and curated experiences." },
    voyage: { name: "Tsuki Grand Voyage", cabin: "Business Class", included: "Business Class flights, selected stays, private transfers, and a complete itinerary." },
    elite: { name: "Tsuki Elite Resort Class", cabin: "First Class", included: "First Class flights, luxury resort stays, private chauffeured transfers, and signature guided experiences." },
  };
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const formatDate = (date) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  departureInput.min = isoDate(today);
  const suggestedDeparture = new Date(today);
  suggestedDeparture.setDate(suggestedDeparture.getDate() + 30);
  departureInput.value = isoDate(suggestedDeparture);

  function currentSelection() {
    const destination = destinations[destinationSelect.value];
    const tier = tiers[tierSelect.value];
    const days = Number(durationSelect.value);
    const travelers = Number(travelersSelect.value);
    const departure = new Date(`${departureInput.value}T12:00:00`);
    const returnDate = new Date(departure);
    returnDate.setDate(returnDate.getDate() + days - 1);
    const finalDay = destination.departureDays?.[days] ?? destination.days.at(-1);
    const itineraryDays = destination.days.slice(0, days - 1).concat([finalDay]);
    const perTraveler = Math.round((destination.dailyRates[tierSelect.value] * days) / 50) * 50;
    return {
      destination, tier, days, travelers, departure, returnDate, itineraryDays,
      hotel: hotelSelect.value,
      perTraveler,
      total: perTraveler * travelers,
    };
  }

  function updateHotels() {
    const destination = destinations[destinationSelect.value];
    const options = tierSelect.value === "elite" ? destination.eliteHotels : destination.hotels;
    const previous = hotelSelect.value;
    hotelSelect.replaceChildren(...options.map((hotel) => new Option(hotel, hotel)));
    if (options.includes(previous)) hotelSelect.value = previous;
  }

  function renderPlanner() {
    updateHotels();
    const selection = currentSelection();
    itinerary.innerHTML = `<div class="journey-itinerary-heading"><div><span class="journeys-kicker">${selection.destination.name.toUpperCase()} · ${selection.tier.cabin.toUpperCase()}</span><h3>Your ${selection.days}-day travel plan</h3></div><span>${formatDate(selection.departure)} – ${formatDate(selection.returnDate)}</span></div><div class="journey-days">${selection.itineraryDays.map((day, index) => `<article class="journey-day"><span class="journey-day-number">${String(index + 1).padStart(2, "0")}</span><div><strong>${day[0]}</strong><p>${day[1]}</p></div></article>`).join("")}</div>`;
    summary.innerHTML = `<div class="journey-summary-brand"><b aria-hidden="true">月</b> TSUKI: JOURNEYS</div><h3 class="journey-summary-title">${selection.destination.name}</h3><ul class="journey-summary-list"><li><span>Package</span><strong>${selection.tier.name}</strong></li><li><span>Flight cabin</span><strong>${selection.tier.cabin}</strong></li><li><span>Duration</span><strong>${selection.days} days</strong></li><li><span>Stay</span><strong>${selection.hotel}</strong></li><li><span>Travelers</span><strong>${selection.travelers}</strong></li><li><span>Dates</span><strong>${formatDate(selection.departure)} – ${formatDate(selection.returnDate)}</strong></li></ul><div class="journey-estimate"><span>FICTIONAL ESTIMATE · USD</span><strong>${money.format(selection.total)}</strong></div><p class="journey-estimate-note">${money.format(selection.perTraveler)} per traveler · illustrative package estimate only</p><button class="button journey-reserve-button" type="submit">Review this booking <span aria-hidden="true">→</span></button>`;
  }

  function packageSummaryMarkup(selection) {
    return `<ul class="journey-dialog-summary"><li><span>Journey</span><strong>${selection.destination.name}</strong></li><li><span>Package tier</span><strong>${selection.tier.name} · ${selection.tier.cabin}</strong></li><li><span>Dates</span><strong>${formatDate(selection.departure)} – ${formatDate(selection.returnDate)} · ${selection.days} days</strong></li><li><span>Hotel</span><strong>${selection.hotel}</strong></li><li><span>Travelers</span><strong>${selection.travelers}</strong></li><li><span>Includes</span><strong>${selection.tier.included}</strong></li><li><span>Fictional estimate</span><strong>${money.format(selection.total)} USD</strong></li></ul>`;
  }

  form.addEventListener("change", renderPlanner);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const selection = currentSelection();
    dialogContent.innerHTML = `<div class="dialog-kicker">TSUKI: JOURNEYS · BOOKING REVIEW</div><h2 id="journey-dialog-title">Review your journey.</h2><p class="journey-dialog-intro">Check the trip details before confirming this fictional roleplay booking.</p>${packageSummaryMarkup(selection)}<div class="fictional-alert">Fictional service. Do not enter real information. This confirmation stays on this page; nothing is sent, saved, or charged.</div><div class="journey-dialog-buttons"><button class="button journey-dialog-secondary" type="button" data-journey-dismiss>Back to plan</button><button class="button button-dark" id="journey-confirm-booking" type="button">Confirm fictional booking <span aria-hidden="true">→</span></button></div>`;
    dialog.showModal();
    dialogContent.querySelector("[data-journey-dismiss]").addEventListener("click", () => dialog.close());
    dialogContent.querySelector("#journey-confirm-booking").addEventListener("click", () => {
      const reference = `TSK-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      dialogContent.innerHTML = `<span class="journey-confirmation-mark" aria-hidden="true">✓</span><div class="dialog-kicker">FICTIONAL ROLEPLAY CONFIRMATION</div><h2 id="journey-dialog-title">Your journey is planned.</h2><p class="journey-dialog-intro">${selection.destination.name} · ${selection.days} days · ${selection.tier.name}</p><p class="journey-confirmation-code">REFERENCE ${reference}</p>${packageSummaryMarkup(selection)}<div class="fictional-alert">This is a fictional confirmation only. No actual flight or hotel has been booked, and no personal or payment details were collected.</div><button class="button button-dark" id="journey-done" type="button" style="width:100%;justify-content:space-between">Done <span aria-hidden="true">✓</span></button>`;
      dialogContent.querySelector("#journey-done").addEventListener("click", () => dialog.close());
    });
  });
  dialogClose.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll("[data-journey-destination]").forEach((button) => button.addEventListener("click", () => {
    destinationSelect.value = button.dataset.journeyDestination;
    if (button.dataset.journeyTier) tierSelect.value = button.dataset.journeyTier;
    renderPlanner();
    document.querySelector("#planner").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelectorAll("[data-journey-tier]").forEach((button) => button.addEventListener("click", () => {
    tierSelect.value = button.dataset.journeyTier;
    renderPlanner();
    document.querySelector("#planner").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderPlanner();
}
