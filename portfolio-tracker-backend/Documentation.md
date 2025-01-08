### Endpoints

#### 1. User Registration and Authentication

- **Register a new user**

  - **Endpoint**: `POST api/v1/user/signup`
  - **Description**: Creates a new user account and returns a JWT token for authentication.
  - **Request Body**:

    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

  - **Response**:
    - **201 Created**: User successfully registered.
    - **400 Bad Request**: Invalid input or user already exists.

- **User login**

  - **Endpoint**: `POST api/v1/user/signin`
  - **Description**: Authenticates a user and returns a JWT token.
  - **Request Body**:

    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

  - **Response**:
    - **200 OK**: Returns JWT token.
    - **401 Unauthorized**: Invalid credentials.

---

#### 2. Portfolio Management

- **Fetch stock data by ticker**

  - **Endpoint**: `GET api/v1/stock/data?ticker=`
  - **Description**: Get stock details by ticker.
  - **Query Parameters** :
    - `ticker`: Stock ticker symbol.
  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Response**:

    - **200 OK**: Data fetched successfully.
    - **401 Unauthorized**: Authentication required.

  - **Response Body**:

    ```json
    {
      "payload": {
        "stockData": {
          "ticker": "AAPL",
          "currentPrice": 241.12,
          "d": -2.79,
          "dp": -1.1388,
          "isUp": false
        }
      }
    }
    ```

- **Fetch stock data by ticker**

  - **Endpoint**: `GET api/v1/stock/search?q=`
  - **Description**: Get stock details by ticker or name.
  - **Query Parameters**:
    - `q`: Stock ticker symbol or name.
  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Response**:

    - **200 OK**: Data fetched successfully.
    - **401 Unauthorized**: Authentication required.
    - **404 Not Found**: Investment not found.

  - **Response Body**:

    ```json
    {
      "payload": {
        "stocksData": [
          {
            "description": "APPLE INC",
            "displaySymbol": "AAPL",
            "symbol": "AAPL",
            "type": "Common Stock"
          }
        ]
      }
    }
    ```

- **Get user portfolio**

  - **Endpoint**: `GET api/v1/stock/portfolio`
  - **Description**: Retrieves the authenticated user's investment portfolio.
  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Response**:

    - **200 OK**: Returns portfolio data.
    - **401 Unauthorized**: Authentication required.

  - **Response Body**:

    ```json
    {
      "payload": {
        "stocksData": [
          {
            "id": "81dc2139-fe78-4df7-aa7b-3a6885ecfeab",
            "stockName": "Amazon.com, Inc.",
            "ticker": "AMZN",
            "averagePrice": 200,
            "quantity": 1,
            "investedAmount": 200,
            "currentPrice": "222.11",
            "overall": "22.11",
            "isProfit": true
          }
        ]
      }
    }
    ```

- **Add an investment to portfolio**

  - **Endpoint**: `POST  api/v1/stock/add`
  - **Description**: Adds a new investment to the user's portfolio.
  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Request Body**:

    ```json
    {
      "stockName": "string",
      "ticker": "string",
      "quantity": "number",
      "averagePrice": "number"
    }
    ```

  - **Response**:

    - **201 Created**: Investment added successfully.
    - **400 Bad Request**: Invalid input.
    - **401 Unauthorized**: Authentication required.

  - **Response Body**:

    ```json
    {
      "payload": {
        "stockData": {
          "id": "d5270e6a-2208-4543-aca5-8b84ed5cb5ba",
          "stockName": "APPLE INC",
          "ticker": "AAPL",
          "averagePrice": 200,
          "quantity": 1,
          "investedAmount": 200,
          "currentPrice": "242.21",
          "overall": "42.21",
          "isProfit": true
        }
      }
    }
    ```

- **Update an investment**

  - **Endpoint**: `PUT api/v1/stock/update/:id`
  - **Description**: Updates details of an existing investment and return updated stock data.
  - **Request Parameters**:

    - `id`: ID of the investment to update.

  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Request Body**:

    ```json
    {
      "stockName": "string",
      "ticker": "string",
      "quantity": "number",
      "averagePrice": "number"
    }
    ```

  - **Response**:

    - **200 OK**: Investment updated successfully.
    - **400 Bad Request**: Invalid input.
    - **401 Unauthorized**: Authentication required.
    - **404 Not Found**: Investment not found.

  - **Response Body**:

    ```json
    {
      "payload": {
        "updatedStock": {
          "id": "d5270e6a-2208-4543-aca5-8b84ed5cb5ba",
          "stockName": "APPLE INC",
          "ticker": "AAPL",
          "averagePrice": 200,
          "quantity": 2,
          "investedAmount": 400,
          "currentPrice": "242.21",
          "overall": "84.42",
          "isProfit": true
        }
      }
    }
    ```

- **Delete an investment**

  - **Endpoint**: `DELETE api/v1/stock/delete/:id`
  - **Description**: Removes an investment from the user's portfolio.
  - **Request Parameters**:
    - `id`: ID of the investment to delete.
  - **Request header**:

    ```json
    {
      "authorization": "Bearer Token"
    }
    ```

  - **Response**:

    - **200 OK**: Investment deleted successfully.
    - **401 Unauthorized**: Authentication required.
    - **404 Not Found**: Investment not found.

  - **Response Body**:

    ```json
    {
      "payload": {
        "id": "d5270e6a-2208-4543-aca5-8b84ed5cb5ba" //deleted stock Id
      }
    }
    ```

---
