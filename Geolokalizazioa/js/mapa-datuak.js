// mapa-datuak.js - Updated for your API structure

const API_BASE_URL = 'http://localhost:8081/lekuak/mapa';

// Map and data variables
let map = null;
let markers = [];
let allLocations = [];
let activeCategory = 'all';
let activeCity = null;

// Color mapping for categories
const kategoriaKolorea = {
    'denda': '#00ffff',      // Denda - Cyan
    'jatetxea': '#ff00ff'    // Jatetxea - Magenta
};


const kategoriaIzena = {
    'denda': 'Denda',
    'jatetxea': 'Jatetxea'
};

// Icon HTML for each category
const kategoriaIkonoak = {
    'denda': 'fa-store',
    'jatetxea': 'fa-utensils'
};

// Initialize Leaflet map
function initMap() {
    console.log('Initializing Leaflet map...');
    
    try {
        // Create map centered on Basque Country
        map = L.map('leafletMap').setView([43.0, -2.75], 8);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add scale control
        L.control.scale().addTo(map);
        
        // Load data from API
        loadDataFromAPI();
        
        console.log('Leaflet map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        updateApiStatus('Errorea mapa hastean', 'error');
    }
}

// Load data from REST API
async function loadDataFromAPI() {
    console.log('📡 Loading data from API:', API_BASE_URL);
    
    try {
        updateApiStatus('Konektatzen...', 'warning');
        
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📊 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ API response received:', data);
        console.log('📊 Data type:', Array.isArray(data) ? 'Array' : typeof data);
        
        if (Array.isArray(data) && data.length > 0) {
            console.log('📍 First location example:', data[0]);
            console.log('🔑 Location keys:', Object.keys(data[0]));
        }
        
        // Process the data
        processApiData(data);
        updateApiStatus('✅ Konektatuta', 'success');
        
    } catch (error) {
        console.error('❌ Error loading data from API:', error);
        console.log('🔄 API might have CORS issues or is not running');
        
        // Check if it's a CORS error
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
            console.log('⚠️ Detected CORS issue, trying alternative approach...');
            
            // Try alternative methods
            await tryAlternativeMethods();
        } else {
            updateApiStatus('❌ Errorea: ' + error.message, 'error');
            loadMockData();
        }
    }
}

// Try alternative methods for CORS issues
async function tryAlternativeMethods() {
    console.log('🔄 Trying alternative methods to access API...');
    
    // Method 1: Try different URL (localhost vs 127.0.0.1)
    const alternativeURLs = [
        'http://localhost:8081/lekuak/mapa',
        'http://127.0.0.1:8081/lekuak/mapa',
        'http://0.0.0.0:8081/lekuak/mapa'
    ];
    
    for (const url of alternativeURLs) {
        try {
            console.log(`🔄 Trying: ${url}`);
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Success with URL: ${url}`);
                processApiData(data);
                updateApiStatus('✅ Konektatuta (alternatiboa)', 'success');
                return;
            }
        } catch (error) {
            console.log(`❌ Failed with ${url}:`, error.message);
        }
    }
    
    // Method 2: Try with mode: 'no-cors' (limited)
    try {
        console.log('🔄 Trying with mode: no-cors');
        const response = await fetch(API_BASE_URL, { mode: 'no-cors' });
        console.log('no-cors response:', response);
    } catch (error) {
        console.log('no-cors failed:', error);
    }
    
    // Method 3: Try JSONP approach (if API supports it)
    try {
        console.log('🔄 Trying JSONP approach');
        await tryJSONP();
        return;
    } catch (error) {
        console.log('JSONP failed:', error);
    }
    
    // If all methods fail, use mock data
    console.log('❌ All alternative methods failed, using mock data');
    updateApiStatus('❌ CORS arazoa - Adibide datuak', 'warning');
    loadMockData();
}

// JSONP approach for CORS
async function tryJSONP() {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_callback_' + Date.now();
        
        window[callbackName] = function(data) {
            console.log('✅ JSONP data received:', data);
            processApiData(data);
            updateApiStatus('✅ Konektatuta (JSONP)', 'success');
            resolve();
            
            // Clean up
            delete window[callbackName];
            document.head.removeChild(script);
        };
        
        const script = document.createElement('script');
        script.src = API_BASE_URL + '?callback=' + callbackName;
        script.onerror = reject;
        
        document.head.appendChild(script);
    });
}

// Process API data - UPDATED FOR YOUR STRUCTURE
function processApiData(data) {
    console.log('🔄 Processing API data...');
    
    // Handle different response formats
    if (Array.isArray(data)) {
        // Your API returns array of LekuaMapDTO objects
        console.log(`✅ Received ${data.length} locations from API`);
        
        // Transform data to our format
        allLocations = data.map(item => ({
            izena: item.izena || item.nombre || item.name || 'Lekua',
            kategoria: (item.kategoria || item.category || item.mota || 'denda').toLowerCase(),
            latitude: item.latitude || item.lat || item.latitud,
            longitude: item.longitude || item.lng || item.longitud,
            helbidea: item.helbidea || item.address || item.direccion || '',
            hiria: item.hiria || item.city || item.ciudad || 'hiria',
            deskribapena: item.deskribapena || item.description || item.descripcion || '',
            webgunea: item.webgunea || item.website || item.sitioWeb || ''
        }));
        
        console.log('📍 Transformed locations:', allLocations);
        
    } else if (data && typeof data === 'object') {
        // Check for nested arrays
        const arrayProps = Object.keys(data).filter(key => Array.isArray(data[key]));
        if (arrayProps.length > 0) {
            console.log(`Found array property: ${arrayProps[0]}`);
            allLocations = data[arrayProps[0]];
        } else {
            console.error('No array found in response:', data);
            throw new Error('API format ezagutzen ez');
        }
    } else {
        console.error('Unexpected API response format:', typeof data);
        throw new Error('API format ezegokia');
    }
    
    // Update UI with loaded data
    updateUIWithData();
    
    // Display markers on map
    displayMarkers();
    
    // Update last update time
    updateLastUpdateTime();
}

// Display markers on the map
function displayMarkers() {
    console.log('📍 Displaying markers...');
    
    // Clear existing markers
    clearMarkers();
    
    // Filter locations based on active filters
    const filteredLocations = filterLocations();
    
    console.log(`📍 Displaying ${filteredLocations.length} filtered locations`);
    
    if (filteredLocations.length === 0) {
        console.log('⚠️ No locations to display after filtering');
        return;
    }
    
    // Create bounds for auto-zoom
    const bounds = L.latLngBounds();
    
    // Add each location as a marker
    filteredLocations.forEach((location, index) => {
        // Extract coordinates from your LekuaMapDTO structure
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        
        console.log(`📍 Location ${index}: ${location.izena}`, { lat, lng, category: location.kategoria });
        
        if (isNaN(lat) || isNaN(lng)) {
            console.warn(`❌ Invalid coordinates for location ${index}:`, location);
            return;
        }
        
        const latLng = [lat, lng];
        bounds.extend(latLng);
        
        // Determine category - your API returns kategoria field
        let category = (location.kategoria || 'denda').toLowerCase();
        
        // Normalize category names
        if (category.includes('jate') || category.includes('restaurant') || category.includes('cafe') || category.includes('kafe')) {
            category = 'jatetxea';
        } else if (category.includes('denda') || category.includes('store') || category.includes('shop')) {
            category = 'denda';
        }
        
        console.log(`📍 Category for ${location.izena}: ${category}`);
        
        // Create custom icon
        const icon = L.divIcon({
            html: `<i class="fas ${kategoriaIkonoak[category] || 'fa-map-marker'} fa-2x" 
                   style="color: ${kategoriaKolorea[category] || '#000000'}; 
                   text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"></i>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            className: 'custom-marker'
        });
        
        // Create marker
        const marker = L.marker(latLng, { 
            icon,
            locationData: location
        })
        .addTo(map)
        .bindPopup(createPopupContent(location));
        
        markers.push(marker);
    });
    
    // Fit map to show all markers
    if (markers.length > 0) {
        if (markers.length === 1) {
            map.setView(bounds.getCenter(), 14);
        } else {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
        console.log(`✅ Successfully displayed ${markers.length} markers from API`);
    } else {
        console.log('⚠️ No valid markers were created');
    }
}

// Create popup content for markers
function createPopupContent(location) {
    console.log('📝 Creating popup for:', location.izena);
    
    // Determine category from your API data
    let category = (location.kategoria || 'denda').toLowerCase();
    
    // Normalize category
    if (category.includes('jate') || category.includes('restaurant') || category.includes('cafe') || category.includes('kafe')) {
        category = 'jatetxea';
    }
    
    const categoryName = kategoriaIzena[category] || category;
    
    return `
        <div class="popup-content" style="min-width: 250px;">
            <h5 style="margin: 0 0 10px 0; color: ${kategoriaKolorea[category] || '#000'}">
                <strong>${location.izena}</strong>
            </h5>
            <div style="margin-bottom: 8px;">
                <i class="fas ${kategoriaIkonoak[category] || 'fa-tag'}" style="color: #666; margin-right: 5px;"></i>
                ${categoryName}
            </div>
            ${location.helbidea ? `
            <div style="margin-bottom: 8px;">
                <i class="fas fa-map-marker-alt" style="color: #666; margin-right: 5px;"></i>
                ${location.helbidea}
            </div>` : ''}
            ${location.herria ? `
            <div style="margin-bottom: 8px;">
                <i class="fas fa-city" style="color: #666; margin-right: 5px;"></i>
                ${location.herria}
            </div>` : ''}
            ${location.deskribapena ? `
            <div style="margin-bottom: 8px; font-style: italic;">
                <i class="fas fa-info-circle" style="color: #666; margin-right: 5px;"></i>
                ${location.deskribapena}
            </div>` : ''}
            ${location.webgunea ? `
            <div style="margin-top: 10px;">
                <a href="${location.webgunea}" target="_blank" 
                   style="color: #007bff; text-decoration: none;">
                    <i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>
                    Webgunea
                </a>
            </div>` : ''}
        </div>
    `;
}

// Filter locations based on active filters
function filterLocations() {
    return allLocations.filter(location => {
        // Get category from your API data
        let category = (location.kategoria || 'denda').toLowerCase();
        
        // Normalize category
        if (category.includes('jate') || category.includes('restaurant') || category.includes('cafe') || category.includes('kafe')) {
            category = 'jatetxea';
        }
        
        // Get city from your API data
        const city = location.herria || '';
        
        // Category filter
        if (activeCategory !== 'all' && category !== activeCategory) {
            return false;
        }
        
        // City filter
        if (activeCity && !city.toLowerCase().includes(activeCity.toLowerCase())) {
            return false;
        }
        
        return true;
    });
}

// Clear all markers from map
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Update UI with loaded data
function updateUIWithData() {
    console.log('📊 Updating UI with data...');
    
    if (allLocations.length === 0) {
        console.warn('⚠️ No locations to display');
        document.getElementById('totalStores').textContent = '0';
        document.getElementById('statsTotal').textContent = '0';
        document.getElementById('countAll').textContent = '0';
        return;
    }
    
    console.log(`📊 Total locations: ${allLocations.length}`);
    
    // Update total count
    document.getElementById('totalStores').textContent = allLocations.length;
    document.getElementById('statsTotal').textContent = allLocations.length;
    document.getElementById('countAll').textContent = allLocations.length;
    
    // Count by category
    const categoryCounts = {
        'denda': 0,
        'jatetxea': 0
    };
    
    allLocations.forEach(loc => {
        let category = (loc.kategoria || 'denda').toLowerCase();
        
        // Normalize category
        if (category.includes('jate') || category.includes('restaurant') || category.includes('cafe') || category.includes('kafe')) {
            categoryCounts.jatetxea++;
        } else {
            categoryCounts.denda++;
        }
    });
    
    console.log(`📊 Category counts:`, categoryCounts);
    
    // Update category counts
    document.getElementById('countDenda').textContent = categoryCounts.denda;
    document.getElementById('countJatetxea').textContent = categoryCounts.jatetxea;
    
    // Count unique cities
    const cities = new Set();
    allLocations.forEach(loc => {
        const city = loc.herria;
        if (city) cities.add(city);
    });
    
    console.log(`📊 Unique cities: ${cities.size}`, Array.from(cities));
    
    document.getElementById('totalCities').textContent = cities.size;
    document.getElementById('statsCities').textContent = cities.size;
    
    // Count unique categories
    const uniqueCategories = new Set();
    allLocations.forEach(loc => {
        let category = (loc.kategoria || 'denda').toLowerCase();
        
        if (category.includes('jate') || category.includes('restaurant') || category.includes('cafe') || category.includes('kafe')) {
            uniqueCategories.add('jatetxea');
        } else {
            uniqueCategories.add('denda');
        }
    });
    
    document.getElementById('totalCategories').textContent = uniqueCategories.size;
    document.getElementById('statsCategories').textContent = uniqueCategories.size;
    
    console.log(`✅ UI updated: ${allLocations.length} locations, ${cities.size} cities, ${uniqueCategories.size} categories`);
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString('eu-EU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = formattedTime;
}

// Update API status display
function updateApiStatus(message, type = 'info') {
    const apiStatusElement = document.getElementById('apiStatus');
    if (apiStatusElement) {
        apiStatusElement.textContent = message;
        
        // Remove existing classes
        apiStatusElement.classList.remove('text-success', 'text-warning', 'text-danger', 'text-info');
        
        // Add appropriate class
        switch(type) {
            case 'success':
                apiStatusElement.classList.add('text-success');
                break;
            case 'warning':
                apiStatusElement.classList.add('text-warning');
                break;
            case 'error':
                apiStatusElement.classList.add('text-danger');
                break;
            default:
                apiStatusElement.classList.add('text-info');
        }
    }
}

// Filter by category
function filterByCategory(category) {
    activeCategory = category;
    displayMarkers();
    updateActiveFilterButtons();
}

// Filter by city
function filterByCity(city) {
    activeCity = city === activeCity ? null : city;
    displayMarkers();
    updateActiveCityButtons();
}

// Update active filter buttons
function updateActiveFilterButtons() {
    document.querySelectorAll('[data-category]').forEach(button => {
        const category = button.getAttribute('data-category');
        
        button.classList.remove('btn-custom', 'active');
        button.classList.add('btn-outline-custom');
        
        if (category === activeCategory) {
            button.classList.remove('btn-outline-custom');
            button.classList.add('btn-custom', 'active');
        }
    });
}

// Update active city buttons
function updateActiveCityButtons() {
    document.querySelectorAll('[data-city]').forEach(button => {
        const city = button.getAttribute('data-city');
        
        button.classList.remove('btn-custom');
        button.classList.add('btn-outline-custom');
        
        if (city === activeCity) {
            button.classList.remove('btn-outline-custom');
            button.classList.add('btn-custom');
        }
    });
}

// Mock data that matches your API structure
function loadMockData() {
    console.log('🔄 Loading mock data that matches your API structure...');
    
    // Mock data matching your LekuaMapDTO structure
    allLocations = [
        {
            izena: "Bilboko Friki Denda",
            kategoria: "denda",
            latitude: 43.2630,
            longitude: -2.9340,
            helbidea: "Bilbo, Kale Nagusia 123",
            herria: "Bilbo",
            deskribapena: "Friki produktu anitzak, jokoak eta komikiak",
            webgunea: "https://example.com"
        },
        {
            izena: "Gasteizko Jatetxea",
            kategoria: "jatetxea",
            latitude: 42.8465,
            longitude: -2.6722,
            helbidea: "Gasteiz, Jatetxe Kalea 45",
            herria: "Gasteiz",
            deskribapena: "Friki giroko jatetxea",
            webgunea: ""
        },
        {
            izena: "Donostiako Denda",
            kategoria: "denda",
            latitude: 43.3183,
            longitude: -1.9812,
            helbidea: "Donostia, Denda Kalea 67",
            herria: "Donostia",
            deskribapena: "Bideojoko eta mahai-joko denda",
            webgunea: "https://denda.eus"
        },
        {
            izena: "Iruñeko Jatetxea",
            kategoria: "jatetxea",
            latitude: 42.8125,
            longitude: -1.6458,
            helbidea: "Iruñea, Plaza Nagusia 89",
            herria: "Iruñea",
            deskribapena: "Friki kafetegia eta jatetxea",
            webgunea: ""
        }
    ];
    
    updateUIWithData();
    displayMarkers();
    updateLastUpdateTime();
}

// Setup event listeners
function setupEventListeners() {
    console.log('🔌 Setting up event listeners...');
    
    // Category filter buttons
    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // City filter buttons
    document.querySelectorAll('[data-city]').forEach(button => {
        button.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            filterByCity(city);
        });
    });
    
    // Action buttons
    if (document.getElementById('zoomToAll')) {
        document.getElementById('zoomToAll').addEventListener('click', function() {
            if (markers.length > 0) {
                const bounds = L.latLngBounds();
                markers.forEach(marker => bounds.extend(marker.getLatLng()));
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        });
    }
    
    if (document.getElementById('locateUser')) {
        document.getElementById('locateUser').addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = [position.coords.latitude, position.coords.longitude];
                        map.setView(userLocation, 13);
                        
                        const userIcon = L.divIcon({
                            html: '<i class="fas fa-user fa-2x" style="color: #ff0000;"></i>',
                            iconSize: [30, 30],
                            iconAnchor: [15, 30]
                        });
                        
                        L.marker(userLocation, { icon: userIcon })
                            .addTo(map)
                            .bindPopup('<strong>Zure kokapena</strong>')
                            .openPopup();
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        alert('Ezin izan da zure kokapena lortu');
                    }
                );
            } else {
                alert('Zure nabigatzaileak ez du geolokalizaziorik onartzen');
            }
        });
    }
    
    if (document.getElementById('refreshData')) {
        document.getElementById('refreshData').addEventListener('click', loadDataFromAPI);
    }
    
    console.log('✅ Event listeners setup complete');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded, initializing map...');
    
    // Initialize map when Dendak page is active
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const activePage = document.querySelector('.page-content.active');
                if (activePage && activePage.id === 'dendak') {
                    console.log('📍 Dendak page activated');
                    
                    setTimeout(() => {
                        if (!map) {
                            initMap();
                            setupEventListeners();
                        }
                    }, 300);
                }
            }
        });
    });
    
    const pageContents = document.querySelectorAll('.page-content');
    pageContents.forEach(page => {
        observer.observe(page, { attributes: true });
    });
    
    const activePage = document.querySelector('.page-content.active');
    if (activePage && activePage.id === 'dendak') {
        console.log('📍 Initial Dendak page');
        setTimeout(() => {
            initMap();
            setupEventListeners();
        }, 500);
    }
    
    console.log('✅ Map initialization setup complete');
});

// Debug function - Add this to your HTML with a button
window.debugAPI = function() {
    console.log('=== DEBUG API ===');
    console.log('Current API URL:', API_BASE_URL);
    console.log('All locations:', allLocations);
    console.log('Markers on map:', markers.length);
    console.log('Active category:', activeCategory);
    console.log('Active city:', activeCity);
    
    // Test API directly
    fetch(API_BASE_URL)
        .then(response => {
            console.log('Direct fetch status:', response.status);
            return response.text();
        })
        .then(text => {
            console.log('Raw response (first 500 chars):', text.substring(0, 500));
        })
        .catch(error => {
            console.log('Direct fetch error:', error);
        });
};