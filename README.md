# Inventory Management API

## Description

The Inventory Management API is a simple RESTful API built with Node.js, Express, and MongoDB. This API allows users to manage product inventory by adding, updating, deleting, and viewing products. It ensures data integrity and includes validation and error handling for common scenarios like duplicate product names, negative quantities, and deleting products with non-zero quantities.

## Project Requirements

- **Add New Products:** Create products with a unique name, quantity, and category. Return an error if a product with the same name already exists.
- **Update Product Quantity:** Update an existing product's quantity, ensuring it is not set to a negative value.
- **Delete Products:** Delete a product if its quantity is zero; otherwise, return an error.
- **Retrieve Product List:** View a list of all products and retrieve individual products by their ID.
- **Validation & Error Handling:** Enforce data validation and provide meaningful error messages for scenarios like duplicate names, negative quantities, and invalid deletions.

### Bonus Features
- **Filter Products:** Filter products by category or by quantity range (e.g., less than 10)
- **Event Logging:** Track product additions, updates, and deletions, storing timestamps in the database
- **Pagination:** Paginate product retrievals to manage large datasets

## Tech Stack

- **Backend Framework:** Node.js, Express
- **Database:** MongoDB

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/KABANOFESTO/Inventory-Management-API.git
cd inventory-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following:
```bash
PORT=4000
MONGO_URI=<your-mongo-db-connection-string>
```

### 4. Start the Server
```bash
npm start
# or
npm run dev
```

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /products | Add a new product |
| PATCH | /products/:id/quantity | Update product quantity |
| DELETE | /products/:id | Delete a product |
| GET | /products | Retrieve all products |
| GET | /products/:id | Retrieve product by ID |

### Example Request Body
```json
{
  "name": "phone",
  "quantity": 0,
  "category": "Electronics"
}
```

## Validation & Error Handling

- **Duplicate Product Names:** Returns 400 Bad Request if a product with the same name exists
- **Invalid Quantity Updates:** Returns 400 Bad Request if quantity is negative
- **Delete Non-Zero Quantity Products:** Returns 400 Bad Request if trying to delete a product with quantity > 0

## Additional Features

### Filtering
Use query parameters to filter products:
- `category`: Filter by product category
- `minQuantity`: Filter by minimum quantity
- `maxQuantity`: Filter by maximum quantity

### Pagination
Use query parameters to paginate results:
- `page`: Page number
- `limit`: Items per page

### Event Logging
All product operations (create, update, delete) are automatically logged with timestamps in the database.

## Testing
Use Thunder Client, Postman, or any other API client to test the endpoints. Example endpoints:

```bash
# Add Product
POST http://localhost:4000/api/products

# Update Quantity
PATCH http://localhost:4000/api/products/:id/quantity

# Delete Product
DELETE http://localhost:4000/api/products/:id

# Retrieve All Products
GET http://localhost:4000/api/products

# Retrieve Product by ID
GET http://localhost:4000/api/products/:id
```