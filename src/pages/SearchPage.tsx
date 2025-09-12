import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Square, DollarSign, Filter, SortAsc } from 'lucide-react';
import { mockProperties, cities, districts, features } from '../data/mockData';
import { Property, SearchFilters, SortOption } from '../types';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState('newest');

  const sortOptions: SortOption[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Area: Large to Small' },
    { value: 'area-small', label: 'Area: Small to Large' },
  ];

  useEffect(() => {
    setProperties(mockProperties);
    
    // Parse URL parameters
    const urlFilters: SearchFilters = {};
    if (searchParams.get('type')) urlFilters.type = searchParams.get('type') as 'rent' | 'sale';
    if (searchParams.get('propertyType')) urlFilters.propertyType = searchParams.get('propertyType') as any;
    if (searchParams.get('minPrice')) urlFilters.minPrice = Number(searchParams.get('minPrice'));
    if (searchParams.get('maxPrice')) urlFilters.maxPrice = Number(searchParams.get('maxPrice'));
    if (searchParams.get('city')) urlFilters.city = searchParams.get('city');
    if (searchParams.get('district')) urlFilters.district = searchParams.get('district');
    if (searchParams.get('minRooms')) urlFilters.minRooms = Number(searchParams.get('minRooms'));
    if (searchParams.get('maxRooms')) urlFilters.maxRooms = Number(searchParams.get('maxRooms'));
    if (searchParams.get('minArea')) urlFilters.minArea = Number(searchParams.get('minArea'));
    if (searchParams.get('maxArea')) urlFilters.maxArea = Number(searchParams.get('maxArea'));
    
    setFilters(urlFilters);
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...properties];

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.city) {
      filtered = filtered.filter(p => p.location.city === filters.city);
    }
    if (filters.district) {
      filtered = filtered.filter(p => p.location.district === filters.district);
    }
    if (filters.minRooms) {
      filtered = filtered.filter(p => p.rooms >= filters.minRooms!);
    }
    if (filters.maxRooms) {
      filtered = filtered.filter(p => p.rooms <= filters.maxRooms!);
    }
    if (filters.minArea) {
      filtered = filtered.filter(p => p.area >= filters.minArea!);
    }
    if (filters.maxArea) {
      filtered = filtered.filter(p => p.area <= filters.maxArea!);
    }
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(p => 
        filters.features!.every(feature => p.features.includes(feature))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area-large':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'area-small':
        filtered.sort((a, b) => a.area - b.area);
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, filters, sortBy]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Update URL parameters
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    setSearchParams(params);
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFilters({ features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) => updateFilters({ type: e.target.value as 'rent' | 'sale' || undefined })}
                    className="input-field"
                  >
                    <option value="">All Types</option>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>

                {/* Property Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.propertyType || ''}
                    onChange={(e) => updateFilters({ propertyType: e.target.value as any || undefined })}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="studio">Studio</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={filters.city || ''}
                    onChange={(e) => updateFilters({ city: e.target.value || undefined })}
                    className="input-field"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={filters.district || ''}
                    onChange={(e) => updateFilters({ district: e.target.value || undefined })}
                    className="input-field"
                  >
                    <option value="">All Districts</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => updateFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={(e) => updateFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rooms
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minRooms || ''}
                      onChange={(e) => updateFilters({ minRooms: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxRooms || ''}
                      onChange={(e) => updateFilters({ maxRooms: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (m²)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minArea || ''}
                      onChange={(e) => updateFilters({ minArea: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxArea || ''}
                      onChange={(e) => updateFilters({ maxArea: e.target.value ? Number(e.target.value) : undefined })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {features.map(feature => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.features?.includes(feature) || false}
                          onChange={() => toggleFeature(feature)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredProperties.length} properties found
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden btn-secondary flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field w-auto"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.type === 'rent' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {property.title}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location.district}, {property.location.city}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{property.rooms} rooms</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>{property.area} m²</span>
                        </div>
                        <div className="flex items-center">
                          <span>{property.floor}/{property.totalFloors} floor</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-xl font-bold text-gray-900">
                            {property.price.toLocaleString()} {property.currency}
                            {property.type === 'rent' && <span className="text-sm text-gray-600">/month</span>}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/property/${property.id}`)}
                          className="btn-primary text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria to find more properties.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
