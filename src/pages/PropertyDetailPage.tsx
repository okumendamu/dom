import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Square, Phone, Mail, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (id) {
      const foundProperty = mockProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
    }
  }, [id]);

  const nextImage = () => {
    if (property && currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact form data to your backend
    alert('Thank you for your interest! We will contact you soon.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      disabled={currentImageIndex === property.images.length - 1}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location.address}, {property.location.district}, {property.location.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">
                    {property.price.toLocaleString()} {property.currency}
                    {property.type === 'rent' && <span className="text-lg text-gray-600">/month</span>}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    property.type === 'rent' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {property.description}
              </p>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.rooms}</div>
                  <div className="text-sm text-gray-600">Rooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">m²</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.floor}</div>
                  <div className="text-sm text-gray-600">Floor</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.totalFloors}</div>
                  <div className="text-sm text-gray-600">Total Floors</div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {property.contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{property.contact.name}</div>
                      <div className="text-sm text-gray-600">Property Owner</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${property.contact.phone}`} className="text-primary-600 hover:text-primary-700">
                      {property.contact.phone}
                    </a>
                  </div>
                  {property.contact.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${property.contact.email}`} className="text-primary-600 hover:text-primary-700">
                        {property.contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Inquiry</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="input-field h-24 resize-none"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${property.contact.phone}`}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="w-full btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID:</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed:</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updated:</span>
                    <span className="font-medium">
                      {new Date(property.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${property.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {property.isActive ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
