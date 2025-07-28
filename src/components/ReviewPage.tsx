import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, FileText, Code, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface ReviewPageProps {
  onBackToWorkflow: () => void;
  selectedAgents: string[];
}

const ReviewPage: React.FC<ReviewPageProps> = ({ onBackToWorkflow, selectedAgents }) => {
  const [editableContent, setEditableContent] = useState(`# Business Requirements Document

## Project Overview
This document outlines the requirements for developing a comprehensive e-commerce platform that will serve as the primary sales channel for our retail business.

## Functional Requirements

### User Management
- User registration and authentication
- Profile management
- Password recovery functionality
- Role-based access control

### Product Catalog
- Product listing and categorization
- Search and filtering capabilities
- Product details and specifications
- Inventory management

### Shopping Cart
- Add/remove items from cart
- Quantity adjustments
- Cart persistence across sessions
- Guest checkout option

### Order Management
- Order placement and confirmation
- Order tracking and status updates
- Order history for registered users
- Cancellation and refund processing

### Payment Processing
- Multiple payment gateway integration
- Secure payment processing
- Payment confirmation and receipts
- Refund processing capabilities

## Non-Functional Requirements

### Performance
- Page load time < 3 seconds
- Support for 1000+ concurrent users
- 99.9% uptime availability

### Security
- SSL encryption for all transactions
- PCI DSS compliance
- Data protection and privacy
- Regular security audits

### Scalability
- Horizontal scaling capabilities
- Database optimization
- CDN integration for static assets

## Technical Specifications
- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: JWT tokens
- Payment: Stripe integration`);

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDocumentExpanded, setIsDocumentExpanded] = useState(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    frontend: false,
    backend: false,
    database: false
  });

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate regeneration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add some modifications to show regeneration
    const updatedContent = editableContent + `\n\n## Updated Requirements (Regenerated)
- Enhanced mobile responsiveness
- Advanced analytics integration
- AI-powered product recommendations
- Multi-language support
- Social media integration`;
    
    setEditableContent(updatedContent);
    setIsRegenerating(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generatePreviewStructure = () => {
    return {
      frontend: {
        structure: [
          'src/',
          '  components/',
          '    Header.tsx',
          '    ProductCard.tsx',
          '    ShoppingCart.tsx',
          '    UserProfile.tsx',
          '  pages/',
          '    HomePage.tsx',
          '    ProductPage.tsx',
          '    CheckoutPage.tsx',
          '  utils/',
          '    api.ts',
          '    auth.ts'
        ],
        code: `// ProductCard.tsx
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} alt={product.name} />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-green-600">\${product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};`,
        explanation: "React components for the user interface including product display, shopping cart functionality, and user authentication forms."
      },
      backend: {
        structure: [
          'server/',
          '  routes/',
          '    products.js',
          '    users.js',
          '    orders.js',
          '  models/',
          '    Product.js',
          '    User.js',
          '    Order.js',
          '  middleware/',
          '    auth.js',
          '    validation.js'
        ],
        code: `// products.js
const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;`,
        explanation: "Express.js API routes handling business logic for products, users, orders, and authentication with proper error handling and validation."
      },
      database: {
        structure: [
          'database/',
          '  migrations/',
          '    001_create_users.sql',
          '    002_create_products.sql',
          '    003_create_orders.sql',
          '  seeds/',
          '    products.sql',
          '    users.sql'
        ],
        code: `-- 002_create_products.sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  stock_quantity INTEGER DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_price ON products(price);`,
        explanation: "PostgreSQL database schema with proper indexing, foreign key relationships, and data integrity constraints for scalable data storage."
      }
    };
  };

  const previewStructure = generatePreviewStructure();

  const getPreviewText = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
        <div className="h-20 px-4">
          <div className="float-left pt-4">
            <button
              onClick={onBackToWorkflow}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="text-lg font-medium">Back to Workflow</span>
            </button>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 pt-6">
            <h1 className="text-3xl font-bold tracking-wide">Review Results</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            
            {/* Left Column - Uploaded Document */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <FileText size={24} className="text-blue-500" />
                  <h2 className="text-xl font-bold text-white">Uploaded Document</h2>
                </div>
                <button
                  onClick={() => setIsDocumentExpanded(!isDocumentExpanded)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {isDocumentExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className="flex-1 p-6">
                {isDocumentExpanded ? (
                  <div className="h-full flex flex-col">
                    <textarea
                      value={editableContent}
                      onChange={(e) => setEditableContent(e.target.value)}
                      className="flex-1 w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                      placeholder="Edit your document here..."
                    />
                    <button
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isRegenerating
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
                      <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap font-sans">
                      {getPreviewText(editableContent, 300)}
                    </pre>
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setIsDocumentExpanded(true)}
                        className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                      >
                        Click to expand and edit document
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Preview Document */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <Eye size={24} className="text-green-500" />
                  <h2 className="text-xl font-bold text-white">Preview Document</h2>
                </div>
                <button
                  onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {isPreviewExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-hidden">
                {isPreviewExpanded ? (
                  <div className="h-full overflow-y-auto space-y-6">
                      
                      {/* Frontend Structure */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white flex items-center">
                            <Code size={20} className="mr-2 text-blue-500" />
                            Frontend Structure
                          </h3>
                          <button
                            onClick={() => toggleSection('frontend')}
                            className="text-gray-400 hover:text-white"
                          >
                            {expandedSections.frontend ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                          <pre className="text-gray-300 text-sm font-mono">
                            {previewStructure.frontend.structure.join('\n')}
                          </pre>
                        </div>
                        
                        {expandedSections.frontend && (
                          <>
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                              <h4 className="text-white font-semibold mb-2">Sample Code:</h4>
                              <pre className="text-gray-300 text-xs font-mono overflow-x-auto">
                                {previewStructure.frontend.code}
                              </pre>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                              <h4 className="text-white font-semibold mb-2">Explanation:</h4>
                              <p className="text-gray-300 text-sm">
                                {previewStructure.frontend.explanation}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Backend Structure */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white flex items-center">
                            <Code size={20} className="mr-2 text-green-500" />
                            Backend Structure
                          </h3>
                          <button
                            onClick={() => toggleSection('backend')}
                            className="text-gray-400 hover:text-white"
                          >
                            {expandedSections.backend ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                          <pre className="text-gray-300 text-sm font-mono">
                            {previewStructure.backend.structure.join('\n')}
                          </pre>
                        </div>
                        
                        {expandedSections.backend && (
                          <>
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                              <h4 className="text-white font-semibold mb-2">Sample Code:</h4>
                              <pre className="text-gray-300 text-xs font-mono overflow-x-auto">
                                {previewStructure.backend.code}
                              </pre>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                              <h4 className="text-white font-semibold mb-2">Explanation:</h4>
                              <p className="text-gray-300 text-sm">
                                {previewStructure.backend.explanation}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Database Structure */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white flex items-center">
                            <Code size={20} className="mr-2 text-purple-500" />
                            Database Structure
                          </h3>
                          <button
                            onClick={() => toggleSection('database')}
                            className="text-gray-400 hover:text-white"
                          >
                            {expandedSections.database ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                          <pre className="text-gray-300 text-sm font-mono">
                            {previewStructure.database.structure.join('\n')}
                          </pre>
                        </div>
                        
                        {expandedSections.database && (
                          <>
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                              <h4 className="text-white font-semibold mb-2">Sample SQL:</h4>
                              <pre className="text-gray-300 text-xs font-mono overflow-x-auto">
                                {previewStructure.database.code}
                              </pre>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                              <h4 className="text-white font-semibold mb-2">Explanation:</h4>
                              <p className="text-gray-300 text-sm">
                                {previewStructure.database.explanation}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                  </div>
                ) : (
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white font-semibold mb-2">Structure Overview:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Code size={16} className="mr-2 text-blue-500" />
                            Frontend: React components and pages
                          </li>
                          <li className="flex items-center">
                            <Code size={16} className="mr-2 text-green-500" />
                            Backend: Express API routes and models
                          </li>
                          <li className="flex items-center">
                            <Code size={16} className="mr-2 text-purple-500" />
                            Database: PostgreSQL schema and migrations
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Preview:</h4>
                        <pre className="text-gray-300 text-xs font-mono">
{`Frontend Structure:
src/
  components/
    Header.tsx
    ProductCard.tsx
    ShoppingCart.tsx
  pages/
    HomePage.tsx
    ProductPage.tsx

Backend Structure:
server/
  routes/
    products.js
    users.js
  models/
    Product.js
    User.js`}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setIsPreviewExpanded(true)}
                        className="text-green-500 hover:text-green-400 text-sm font-medium"
                      >
                        Click to expand and view detailed structure
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;