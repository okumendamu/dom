# Apartment Platform - Frontend Web App

A modern, responsive web application for apartment rental and sales platform similar to krisha.kz. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 Property Management
- **Property Listings**: Browse and search through thousands of properties
- **Detailed Views**: Comprehensive property details with image galleries
- **Advanced Search**: Filter by type, location, price, rooms, area, and features
- **Add Properties**: Easy-to-use form for property owners to list their properties

### 🔍 Search & Filtering
- **Smart Search**: Search by keywords, location, or property type
- **Advanced Filters**: Filter by price range, number of rooms, area, features
- **Sorting Options**: Sort by price, area, date, and more
- **Location-based**: Search by city and district

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Performance**: Optimized for speed and efficiency
- **Accessibility**: Built with accessibility best practices

### 🎨 Design Features
- **Beautiful Gallery**: Image carousel with thumbnails
- **Interactive Maps**: Location-based property discovery
- **Contact Forms**: Easy communication between buyers and sellers
- **Professional Layout**: Clean, modern design inspired by leading platforms

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload, ESLint, TypeScript

## Getting Started

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd apartment-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with search
│   ├── SearchPage.tsx  # Search results and filters
│   ├── PropertyDetailPage.tsx  # Individual property view
│   └── AddPropertyPage.tsx     # Add new property form
├── types/              # TypeScript type definitions
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## Key Components

### HomePage
- Hero section with search filters
- Featured properties showcase
- Statistics and company information
- Quick search functionality

### SearchPage
- Advanced filtering sidebar
- Property grid with sorting options
- Responsive design for all screen sizes
- URL-based filter persistence

### PropertyDetailPage
- Image gallery with navigation
- Comprehensive property information
- Contact forms and owner details
- Related properties suggestions

### AddPropertyPage
- Multi-step property listing form
- Image upload functionality
- Feature selection
- Contact information collection

## Features in Detail

### Search & Filtering
- **Property Type**: Rent or Sale
- **Category**: Apartment, House, Studio, Commercial
- **Location**: City and District selection
- **Price Range**: Min/Max price filtering
- **Property Details**: Rooms, area, floor
- **Features**: Balcony, Parking, Elevator, etc.

### Property Display
- **Image Gallery**: Multiple photos with navigation
- **Detailed Information**: All property specifications
- **Contact Options**: Phone, email, inquiry form
- **Location Details**: Address and map integration
- **Feature Tags**: Visual feature indicators

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhanced**: Full desktop functionality
- **Touch-Friendly**: Easy touch interactions

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles

### Data
Mock data is located in `src/data/mockData.ts`. Replace with your API endpoints:
- Property listings
- Cities and districts
- Available features
- User data

### Configuration
Update configuration in:
- `vite.config.ts` - Build settings
- `tsconfig.json` - TypeScript settings
- `package.json` - Dependencies and scripts

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Favorites and saved searches
- [ ] Real-time chat between users
- [ ] Advanced map integration
- [ ] Property comparison tool
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Multi-language support
- [ ] SEO optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
