import React, { useState } from 'react';
import { ArrowLeft, Folder, FolderOpen, File, Save, Settings, Search, RefreshCw, Terminal, Play } from 'lucide-react';

interface CodeEditorProps {
  onBackToWorkflow: () => void;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  isOpen?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onBackToWorkflow }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [projectStructure, setProjectStructure] = useState<FileNode[]>([
    {
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        {
          name: 'main',
          type: 'folder',
          isOpen: true,
          children: [
            {
              name: 'java',
              type: 'folder',
              isOpen: true,
              children: [
                {
                  name: 'com',
                  type: 'folder',
                  isOpen: true,
                  children: [
                    {
                      name: 'example',
                      type: 'folder',
                      isOpen: true,
                      children: [
                        {
                          name: 'ecommerce',
                          type: 'folder',
                          isOpen: true,
                          children: [
                            {
                              name: 'EcommerceApplication.java',
                              type: 'file',
                              content: `package com.example.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }
}`
                            },
                            {
                              name: 'controller',
                              type: 'folder',
                              isOpen: false,
                              children: [
                                {
                                  name: 'ProductController.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product existingProduct = productService.getProductById(id);
        if (existingProduct != null) {
            product.setId(id);
            return ResponseEntity.ok(productService.saveProduct(product));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}`
                                },
                                {
                                  name: 'UserController.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser != null) {
            user.setId(id);
            return ResponseEntity.ok(userService.saveUser(user));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}`
                                }
                              ]
                            },
                            {
                              name: 'model',
                              type: 'folder',
                              isOpen: false,
                              children: [
                                {
                                  name: 'Product.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Product() {}

    public Product(String name, String description, BigDecimal price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}`
                                },
                                {
                                  name: 'User.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Role {
        USER, ADMIN
    }

    // Constructors
    public User() {}

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}`
                                }
                              ]
                            },
                            {
                              name: 'service',
                              type: 'folder',
                              isOpen: false,
                              children: [
                                {
                                  name: 'ProductService.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
}`
                                },
                                {
                                  name: 'UserService.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.service;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        // Encrypt password before saving
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean authenticateUser(String email, String password) {
        User user = getUserByEmail(email);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }
}`
                                }
                              ]
                            },
                            {
                              name: 'repository',
                              type: 'folder',
                              isOpen: false,
                              children: [
                                {
                                  name: 'ProductRepository.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.repository;

import com.example.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategoryId(Long categoryId);
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    List<Product> findByStockQuantityGreaterThan(Integer quantity);
}`
                                },
                                {
                                  name: 'UserRepository.java',
                                  type: 'file',
                                  content: `package com.example.ecommerce.repository;

import com.example.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByEmail(String email);
    
    boolean existsByEmail(String email);
}`
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'test',
          type: 'folder',
          isOpen: false,
          children: [
            {
              name: 'java',
              type: 'folder',
              isOpen: false,
              children: [
                {
                  name: 'com',
                  type: 'folder',
                  isOpen: false,
                  children: [
                    {
                      name: 'example',
                      type: 'folder',
                      isOpen: false,
                      children: [
                        {
                          name: 'ecommerce',
                          type: 'folder',
                          isOpen: false,
                          children: [
                            {
                              name: 'EcommerceApplicationTests.java',
                              type: 'file',
                              content: `package com.example.ecommerce;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EcommerceApplicationTests {

    @Test
    void contextLoads() {
    }
}`
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'resources',
          type: 'folder',
          isOpen: false,
          children: [
            {
              name: 'application.properties',
              type: 'file',
              content: `# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Logging Configuration
logging.level.com.example.ecommerce=DEBUG
logging.level.org.springframework.web=DEBUG

# Security Configuration
jwt.secret=mySecretKey
jwt.expiration=86400000`
            }
          ]
        }
      ]
    },
    {
      name: 'pom.xml',
      type: 'file',
      content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.0</version>
        <relativePath/>
    </parent>
    <groupId>com.example</groupId>
    <artifactId>ecommerce</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>ecommerce</name>
    <description>E-commerce platform built with Spring Boot</description>
    <properties>
        <java.version>11</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.1</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
    },
    {
      name: 'README.md',
      type: 'file',
      content: `# E-commerce Platform

A comprehensive e-commerce platform built with Spring Boot.

## Features

- User registration and authentication
- Product catalog management
- Shopping cart functionality
- Order processing
- Admin panel for product management

## Technologies Used

- Spring Boot 2.7.0
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT for authentication
- Maven for dependency management

## Getting Started

### Prerequisites

- Java 11 or higher
- PostgreSQL database
- Maven 3.6+

### Installation

1. Clone the repository
2. Configure database settings in \`application.properties\`
3. Run \`mvn clean install\`
4. Start the application with \`mvn spring-boot:run\`

The application will be available at \`http://localhost:8080/api\`

## API Endpoints

### Products
- GET /api/products - Get all products
- GET /api/products/{id} - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product

### Users
- GET /api/users - Get all users
- GET /api/users/{id} - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/{id} - Update user
- DELETE /api/users/{id} - Delete user

## Database Schema

The application uses PostgreSQL with the following main entities:
- Users
- Products
- Categories
- Orders
- Order Items

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request`
    }
  ]);

  const toggleFolder = (path: string) => {
    const updateNode = (nodes: FileNode[], targetPath: string[]): FileNode[] => {
      return nodes.map(node => {
        if (targetPath.length === 1 && node.name === targetPath[0]) {
          return { ...node, isOpen: !node.isOpen };
        } else if (targetPath.length > 1 && node.name === targetPath[0] && node.children) {
          return {
            ...node,
            children: updateNode(node.children, targetPath.slice(1))
          };
        }
        return node;
      });
    };

    const pathArray = path.split('/');
    setProjectStructure(prev => updateNode(prev, pathArray));
  };

  const selectFile = (path: string, content: string) => {
    setSelectedFile(path);
    setFileContent(content);
  };

  const renderFileTree = (nodes: FileNode[], path: string = '') => {
    return nodes.map((node, index) => {
      const currentPath = path ? `${path}/${node.name}` : node.name;
      
      if (node.type === 'folder') {
        return (
          <div key={index} className="select-none">
            <div
              className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-700 cursor-pointer rounded text-sm"
              onClick={() => toggleFolder(currentPath)}
            >
              {node.isOpen ? (
                <FolderOpen size={16} className="text-blue-400 flex-shrink-0" />
              ) : (
                <Folder size={16} className="text-blue-400 flex-shrink-0" />
              )}
              <span className="text-gray-300 truncate">{node.name}</span>
            </div>
            {node.isOpen && node.children && (
              <div className="ml-4 border-l border-gray-600 pl-2">
                {renderFileTree(node.children, currentPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className={`flex items-center space-x-2 py-1 px-2 hover:bg-gray-700 cursor-pointer rounded text-sm ${
              selectedFile === currentPath ? 'bg-gray-700' : ''
            }`}
            onClick={() => selectFile(currentPath, node.content || '')}
          >
            <File size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-300 truncate">{node.name}</span>
          </div>
        );
      }
    });
  };

  const getFileLanguage = (filename: string) => {
    if (filename.endsWith('.java')) return 'java';
    if (filename.endsWith('.xml')) return 'xml';
    if (filename.endsWith('.properties')) return 'properties';
    if (filename.endsWith('.md')) return 'markdown';
    return 'text';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800 flex-shrink-0">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToWorkflow}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Back to Workflow</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Local Project</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <Search size={18} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <RefreshCw size={18} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <Settings size={18} className="text-gray-400" />
            </button>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-200">
              <Save size={16} />
              <span className="text-sm font-medium">Save All (0)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Explorer</h2>
              <Settings size={16} className="text-gray-500" />
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Local Project</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {renderFileTree(projectStructure)}
          </div>
          
          <div className="p-3 border-t border-gray-700 text-xs text-gray-500">
            {projectStructure.length} items
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {selectedFile ? (
            <>
              {/* Tab Bar */}
              <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <File size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-300">{selectedFile.split('/').pop()}</span>
                  <button className="text-gray-500 hover:text-gray-300 ml-2">
                    <X size={14} />
                  </button>
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1 bg-gray-950">
                <textarea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  className="w-full h-full bg-gray-950 text-gray-300 font-mono text-sm p-4 resize-none outline-none border-none"
                  style={{ 
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    lineHeight: '1.5',
                    tabSize: 4
                  }}
                  spellCheck={false}
                />
              </div>
            </>
          ) : (
            /* No File Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-950">
              <div className="text-center">
                <File size={64} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">No file selected</h3>
                <p className="text-gray-500">Select a file from the explorer to start editing</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between text-sm flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Terminal size={16} />
            <span>Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Play size={16} />
            <span>Local Project</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span>Spring Boot</span>
          <span>Java 11</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;