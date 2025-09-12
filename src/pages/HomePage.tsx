import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bed, Square, DollarSign } from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { SearchFilters } from '../types';

const HomePage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    type: undefined,
    propertyType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    city: undefined,
  });

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.propertyType) queryParams.append('propertyType', filters.propertyType);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
    if (filters.city) queryParams.append('city', filters.city);

    navigate(`/search?${queryParams.toString()}`);
  };

  const featuredProperties = mockProperties.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover thousands of rental and sale properties across Kazakhstan
            </p>
          </div>

          {/* Search Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value as 'rent' | 'sale' || undefined })}
                    className="input-field"
                  >
                    <option value="">All Types</option>
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>

                {/* Property Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.propertyType || ''}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value as any || undefined })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    value={filters.city || ''}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value || undefined })}
                    className="input-field"
                  >
                    <option value="">All Cities</option>
                    <option value="Almaty">Almaty</option>
                    <option value="Nur-Sultan">Nur-Sultan</option>
                    <option value="Shymkent">Shymkent</option>
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="input-field"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="input-field"
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
              >
                <Search className="w-5 h-5" />
                <span>Search Properties</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600">
              Discover our handpicked selection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
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

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/search')}
              className="btn-secondary"
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
