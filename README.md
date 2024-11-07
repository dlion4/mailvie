# Fullstack Mail Validation, Email Sending, and Domain Check

This project provides a full-stack solution for **email validation**, **email sending**, and **domain checking**. It includes services for validating email formats, checking domain availability, and sending emails through various services, with detailed integration and error handling. The solution can be run locally with multiple services running on different ports.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Ports and Services](#ports-and-services)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project is designed to handle multiple aspects of email validation and management:

- **Email Validation**: Checks whether the email address is valid (format validation) and whether the domain of the email address exists and can receive emails.
- **Domain Check**: Verifies the validity of an email domain using DNS and MX record checks.
- **Email Sending**: Allows sending emails through integrated services (e.g., Mailgun, SendGrid).
- **ZeroBounce Integration**: Provides deeper email validation via the ZeroBounce API for advanced checks like spam traps, disposable emails, and more.

This project is built using a full-stack approach with several independent services running on different ports.

---

## Ports and Services

The application is composed of multiple services, each running on a different port. Below is a list of the ports associated with each service:

### Service Breakdown:
---
#### Use the folling (number) as the port number to run the services
- **auth (5173)**: Authentication service for managing API access and user management.
- **mailvie (9003)**: Core mail validation service responsible for validating email formats, domains, and existence.
- **mailvie_dashboard (9001)**: Dashboard for viewing the results of email validations and managing the system status.
- **webhook (3000)**: Webhook listener for receiving validation results or callback notifications from external services.
- **zerobounceendpoint (8001)**: Endpoint for interacting with the ZeroBounce API for advanced email validation.
- **zerobounce (8003)**: ZeroBounce local validation service for deep email checks, including spam traps, disposable emails, etc.

---

## Installation Instructions

Follow these steps to set up and run the project on your local machine:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install dependencies**:
    The project may use multiple languages and services. Below are examples of installation commands for common stack components:
    - For Node.js services:
        ```bash
        npm install
        ```
    - For Python services (if any):
        ```bash
        pip install -r requirements.txt
        ```

3. **Configure environment variables**:
    Make sure to set up your environment variables for the required API keys, such as for **Mailgun** or **ZeroBounce**.
    Create a `.env` file in the root directory if necessary:
    ```bash
    MAILGUN_API_KEY=<your-api-key>
    ZERBOUNCE_API_KEY=<your-zerobounce-api-key>
    ```

4. **Start the services**:
    You can run each service individually or use Docker to start them all at once. For example:
    - To start the `auth` service:
        ```bash
        npm start
        ```
    - Alternatively, if using Docker Compose:
        ```bash
        docker-compose up
        ```

    Ensure each service is running on the specified port as mentioned above.

---

## Usage

Once the services are running, you can interact with the API endpoints for validation, email sending, and domain checks. You can use tools like **Postman**, **curl**, or directly interact via your frontend/dashboard.

Here are some of the available API endpoints:

### 1. **Email Validation**

- **POST `/validate-email`**: Validates an email address format and its domain.
  
  **Request**:
    ```json
    {
      "email": "test@example.com"
    }
    ```

  **Response**:
    ```json
    {
      "is_valid": true,
      "domain_check": "pass"
    }
    ```

### 2. **Send Email**

- **POST `/send-email`**: Send an email to a recipient.

  **Request**:
    ```json
    {
      "to": "recipient@example.com",
      "subject": "Test Email",
      "body": "This is a test email."
    }
    ```

  **Response**:
    ```json
    {
      "status": "sent",
      "message_id": "12345"
    }
    ```

### 3. **Domain Check**

- **GET `/check-domain`**: Check the validity of an email's domain by looking up its MX records.

  **Request**:
    ```json
    {
      "domain": "example.com"
    }
    ```

  **Response**:
    ```json
    {
      "is_valid_domain": true,
      "mx_records": ["mx1.example.com", "mx2.example.com"]
    }
    ```

### 4. **Webhook Notifications**

- **POST `/webhook`**: A webhook endpoint to receive notifications and validation results from external services.

  **Request**:
    ```json
    {
      "status": "success",
      "email": "test@example.com",
      "validation_result": "passed"
    }
    ```

  **Response**:
    ```json
    {
      "status": "received"
    }
    ```

---

## Contributing

We welcome contributions to improve the project. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your branch (`git push origin feature-name`).
5. Open a pull request on GitHub.

**Note**: Please ensure that you write tests for new features or bug fixes and follow the existing code style and practices.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

