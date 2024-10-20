## Security

Yol-Arkadasim takes security seriously and implements various measures to ensure the safety of user data and application integrity. Below are the security practices implemented in this project:

### 1. **Authentication & Authorization**

- **JWT (JSON Web Token)**: Used for secure authentication. Each user receives a token upon login, which is used to authenticate and authorize subsequent requests.
- **Role-Based Access Control (RBAC)**: Different user roles such as admin, driver, and passenger are assigned different levels of access to ensure proper authorization.

### 2. **Data Encryption**

- All sensitive user data, including passwords, is encrypted using industry-standard algorithms. Passwords are hashed using algorithms like **bcrypt** before being stored in the database.

### 3. **Environment Variables**

- Sensitive information such as database credentials and API keys are stored securely in environment variables and not hardcoded in the source code. Ensure you configure these variables in the `.env` file before running the application.

### 4. **Secure HTTP Headers**

- The application uses secure HTTP headers to protect against common web vulnerabilities:
  - **Content Security Policy (CSP)**: Helps mitigate cross-site scripting (XSS) attacks.
  - **X-Content-Type-Options**: Prevents browsers from interpreting files as a different MIME type.
  - **X-Frame-Options**: Protects the website from clickjacking attacks.

### 5. **Rate Limiting**

- The application implements rate limiting to prevent brute force attacks and denial-of-service (DoS) attacks by limiting the number of requests a user can make in a given time.

### 6. **Input Validation & Sanitization**

- Input validation and sanitization are performed on all forms and inputs to prevent SQL Injection and Cross-Site Scripting (XSS) attacks.

### 7. **HTTPS**

- The application enforces HTTPS to ensure secure communication between the server and the client, preventing man-in-the-middle (MITM) attacks.

### 8. **Regular Security Audits**

- The project follows regular code reviews and security audits to ensure no vulnerabilities exist in the codebase.

## Security Recommendations

- Ensure that you are always using the latest version of dependencies to avoid known vulnerabilities.
- Never expose sensitive data such as JWT tokens or API keys in the client-side code.
- Use strong passwords and enable multi-factor authentication (MFA) if possible.
