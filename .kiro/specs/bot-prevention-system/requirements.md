# Requirements Document

## Introduction

This document specifies requirements for a comprehensive bot prevention system to protect all submission forms in the Next.js application from automated spam submissions. The system currently has robust protection on the contact form but needs to be extended to the application form and made reusable for future forms. The system must detect and block spam submissions with random character patterns (e.g., name "Fxq62X1tt0", message "FvjicV4JmEcTQCnKptI0Zc1LyFrarPMxKlBO3XWffmBEx3RznK55lUy") while maintaining a smooth user experience for legitimate users.

## Glossary

- **Bot_Prevention_System**: The comprehensive security system that protects all forms from automated spam submissions
- **Form_Guard**: The reusable security module that can be applied to any form endpoint
- **Contact_Form**: The existing contact form at `/contact` with current security implementation
- **Application_Form**: The property application form at `/apply` that needs bot prevention
- **Turnstile**: Cloudflare's human verification challenge service
- **Attestation_Token**: A cryptographically signed token that proves a form was loaded from the legitimate application
- **Bot_Score**: A numerical value (0-100) representing the likelihood that a submission is automated spam
- **Quarantine_System**: A mechanism to flag suspicious submissions for manual review without blocking them
- **Rate_Limiter**: A component that restricts the number of submissions from a single source within a time window
- **Honeypot_Field**: A hidden form field that legitimate users won't fill but bots will
- **Timing_Analysis**: Evaluation of form submission speed to detect automated submissions
- **Heuristic_Analyzer**: A component that examines submission content for spam patterns
- **Request_Signals**: HTTP headers and metadata used to identify the submission source (IP, User-Agent, Origin, Referer)

## Requirements

### Requirement 1: Extend Bot Prevention to Application Form

**User Story:** As a property owner, I want to submit my application through a secure form, so that my legitimate submission is processed while spam is blocked.

#### Acceptance Criteria

1. WHEN the Application_Form page loads, THE Bot_Prevention_System SHALL generate an Attestation_Token
2. WHEN the Application_Form page loads, THE Bot_Prevention_System SHALL initialize a Turnstile challenge widget
3. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL validate the Attestation_Token
4. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL verify the Turnstile challenge response
5. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL apply Rate_Limiter checks
6. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL evaluate Timing_Analysis
7. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL check the Honeypot_Field
8. WHEN a user submits the Application_Form, THE Bot_Prevention_System SHALL calculate a Bot_Score
9. IF the Bot_Score exceeds the rejection threshold, THEN THE Bot_Prevention_System SHALL reject the submission
10. IF the Bot_Score is in the quarantine range, THEN THE Bot_Prevention_System SHALL accept the submission but flag it for review

### Requirement 2: Create Reusable Form Guard Module

**User Story:** As a developer, I want a reusable security module, so that I can easily protect new forms without duplicating code.

#### Acceptance Criteria

1. THE Form_Guard SHALL provide a function to generate Attestation_Tokens for any form
2. THE Form_Guard SHALL provide a function to validate Attestation_Tokens for any form
3. THE Form_Guard SHALL provide a function to verify Turnstile challenges
4. THE Form_Guard SHALL provide a function to apply rate limiting with configurable limits
5. THE Form_Guard SHALL provide a function to evaluate submission timing
6. THE Form_Guard SHALL provide a function to calculate Bot_Scores with configurable heuristics
7. THE Form_Guard SHALL accept configuration parameters for thresholds and limits
8. THE Form_Guard SHALL return structured validation results with success status and reason codes
9. THE Form_Guard SHALL support multiple form types through a form identifier parameter
10. THE Form_Guard SHALL maintain separate rate limit counters for different form types

### Requirement 3: Enhance Bot Score Heuristics

**User Story:** As a system administrator, I want improved spam detection, so that submissions with random character patterns are automatically blocked.

#### Acceptance Criteria

1. WHEN analyzing a name field, THE Heuristic_Analyzer SHALL detect low vowel ratios (below 0.2)
2. WHEN analyzing a name field, THE Heuristic_Analyzer SHALL detect excessive case transitions (above 0.45)
3. WHEN analyzing a name field, THE Heuristic_Analyzer SHALL detect base64-like patterns
4. WHEN analyzing a message field, THE Heuristic_Analyzer SHALL detect single-token messages without spaces
5. WHEN analyzing a message field, THE Heuristic_Analyzer SHALL detect high entropy values (above 4.25)
6. WHEN analyzing a message field, THE Heuristic_Analyzer SHALL detect high symbol-to-letter ratios (above 0.35)
7. WHEN analyzing any text field, THE Heuristic_Analyzer SHALL detect repeated character runs (5+ consecutive identical characters)
8. WHEN analyzing any text field, THE Heuristic_Analyzer SHALL detect unusually long single tokens (24+ characters without spaces)
9. THE Heuristic_Analyzer SHALL assign weighted scores to each detected pattern
10. THE Heuristic_Analyzer SHALL return a total Bot_Score and list of detected patterns

### Requirement 4: Implement Multi-Layer Rate Limiting

**User Story:** As a system administrator, I want rate limiting on multiple dimensions, so that spam bots cannot overwhelm the system even if they rotate IPs or user agents.

#### Acceptance Criteria

1. THE Rate_Limiter SHALL enforce a per-IP limit of 5 submissions per minute
2. THE Rate_Limiter SHALL enforce a per-IP limit of 30 submissions per hour
3. THE Rate_Limiter SHALL enforce a per-IP-and-User-Agent limit of 20 submissions per hour
4. THE Rate_Limiter SHALL enforce a per-email limit of 3 submissions per hour
5. WHEN any rate limit is exceeded, THE Rate_Limiter SHALL reject the submission with a 429 status code
6. THE Rate_Limiter SHALL use sliding time windows for accurate rate calculation
7. THE Rate_Limiter SHALL clean up expired rate limit entries automatically
8. THE Rate_Limiter SHALL support configurable limits through environment variables
9. THE Rate_Limiter SHALL maintain separate counters for different form types
10. THE Rate_Limiter SHALL log rate limit violations with Request_Signals for monitoring

### Requirement 5: Implement Attestation Token System

**User Story:** As a security engineer, I want cryptographically signed form tokens, so that submissions can only come from legitimate form loads.

#### Acceptance Criteria

1. WHEN a form page loads, THE Bot_Prevention_System SHALL generate an Attestation_Token with a timestamp
2. WHEN a form page loads, THE Bot_Prevention_System SHALL include a nonce in the Attestation_Token
3. WHEN a form page loads, THE Bot_Prevention_System SHALL include a User-Agent hash in the Attestation_Token
4. THE Bot_Prevention_System SHALL sign the Attestation_Token with HMAC-SHA256
5. WHEN validating a submission, THE Bot_Prevention_System SHALL verify the Attestation_Token signature
6. WHEN validating a submission, THE Bot_Prevention_System SHALL verify the Attestation_Token has not expired (30 minute TTL)
7. WHEN validating a submission, THE Bot_Prevention_System SHALL verify the User-Agent hash matches
8. IF the Attestation_Token is missing, THEN THE Bot_Prevention_System SHALL reject the submission
9. IF the Attestation_Token signature is invalid, THEN THE Bot_Prevention_System SHALL reject the submission
10. IF the Attestation_Token is expired, THEN THE Bot_Prevention_System SHALL reject the submission

### Requirement 6: Implement Turnstile Challenge Integration

**User Story:** As a user, I want to complete a human verification challenge, so that I can prove I'm not a bot while submitting the form.

#### Acceptance Criteria

1. WHEN a form page loads, THE Bot_Prevention_System SHALL load the Turnstile JavaScript SDK
2. WHEN a form page loads, THE Bot_Prevention_System SHALL render a Turnstile challenge widget
3. WHEN a user completes the challenge, THE Bot_Prevention_System SHALL receive a challenge token
4. WHEN a user submits the form, THE Bot_Prevention_System SHALL include the challenge token in the submission
5. WHEN validating a submission, THE Bot_Prevention_System SHALL verify the challenge token with Cloudflare's API
6. WHEN validating a submission, THE Bot_Prevention_System SHALL include the client IP in the verification request
7. IF the challenge token is missing, THEN THE Bot_Prevention_System SHALL reject the submission
8. IF the challenge token is invalid, THEN THE Bot_Prevention_System SHALL reject the submission
9. IF the Turnstile API is unavailable and fail-open is disabled, THEN THE Bot_Prevention_System SHALL reject the submission
10. THE Bot_Prevention_System SHALL support configurable fail-open behavior for development environments

### Requirement 7: Implement Honeypot Field Protection

**User Story:** As a security engineer, I want hidden honeypot fields, so that simple bots that auto-fill all fields are detected.

#### Acceptance Criteria

1. THE Contact_Form SHALL include a hidden field named "companyWebsite" with max length 0
2. THE Application_Form SHALL include a hidden field named "referralSource" with max length 0
3. THE Bot_Prevention_System SHALL position honeypot fields off-screen using CSS
4. THE Bot_Prevention_System SHALL set honeypot fields to tabIndex -1
5. THE Bot_Prevention_System SHALL set honeypot fields to autoComplete "off"
6. WHEN validating a submission, THE Bot_Prevention_System SHALL check if the honeypot field contains any value
7. IF the honeypot field contains any value, THEN THE Bot_Prevention_System SHALL reject the submission
8. THE Bot_Prevention_System SHALL use field names that appear legitimate to bots
9. THE Bot_Prevention_System SHALL validate honeypot fields before other expensive checks
10. THE Bot_Prevention_System SHALL log honeypot violations with Request_Signals

### Requirement 8: Implement Timing Analysis

**User Story:** As a security engineer, I want submission timing validation, so that forms submitted too quickly or from stale pages are rejected.

#### Acceptance Criteria

1. WHEN a form page loads, THE Bot_Prevention_System SHALL record the current timestamp
2. WHEN a user submits the form, THE Bot_Prevention_System SHALL include the form start timestamp
3. WHEN validating a submission, THE Bot_Prevention_System SHALL calculate the elapsed time
4. IF the elapsed time is less than 4 seconds, THEN THE Bot_Prevention_System SHALL reject the submission
5. IF the elapsed time is greater than 12 hours, THEN THE Bot_Prevention_System SHALL reject the submission
6. THE Bot_Prevention_System SHALL support configurable minimum and maximum time thresholds
7. THE Bot_Prevention_System SHALL include elapsed time in rejection logs
8. THE Bot_Prevention_System SHALL validate the timestamp is a positive integer
9. THE Bot_Prevention_System SHALL validate the timestamp is not in the future
10. THE Bot_Prevention_System SHALL use server-side time for all calculations

### Requirement 9: Implement Quarantine System

**User Story:** As a system administrator, I want suspicious submissions quarantined for review, so that potential false positives don't lose legitimate leads.

#### Acceptance Criteria

1. WHEN a submission has a Bot_Score between 35 and 54, THE Bot_Prevention_System SHALL quarantine the submission
2. WHEN quarantining a submission, THE Bot_Prevention_System SHALL store the submission data
3. WHEN quarantining a submission, THE Bot_Prevention_System SHALL store the Bot_Score and detected patterns
4. WHEN quarantining a submission, THE Bot_Prevention_System SHALL store hashed Request_Signals
5. WHEN quarantining a submission, THE Bot_Prevention_System SHALL return a success response to the user
6. WHEN quarantining a submission, THE Bot_Prevention_System SHALL NOT send notification emails
7. THE Bot_Prevention_System SHALL maintain a quarantine list with a maximum of 250 entries
8. THE Bot_Prevention_System SHALL provide an admin endpoint to view quarantined submissions
9. THE Bot_Prevention_System SHALL include quarantine status in metrics
10. THE Bot_Prevention_System SHALL log quarantine events with full context

### Requirement 10: Implement Origin and Referer Validation

**User Story:** As a security engineer, I want origin validation, so that submissions can only come from the legitimate application domain.

#### Acceptance Criteria

1. THE Bot_Prevention_System SHALL maintain a list of allowed origins
2. THE Bot_Prevention_System SHALL support configuring allowed origins through environment variables
3. WHEN validating a submission, THE Bot_Prevention_System SHALL check the Origin header
4. WHEN validating a submission, THE Bot_Prevention_System SHALL check the Referer header
5. IF both Origin and Referer headers are missing, THEN THE Bot_Prevention_System SHALL reject the submission
6. IF the Origin header is present and not in the allowed list, THEN THE Bot_Prevention_System SHALL reject the submission
7. IF the Referer header is present and its origin is not in the allowed list, THEN THE Bot_Prevention_System SHALL reject the submission
8. THE Bot_Prevention_System SHALL normalize origins by removing trailing slashes and converting to lowercase
9. THE Bot_Prevention_System SHALL include localhost origins in development environments
10. THE Bot_Prevention_System SHALL log origin validation failures with the rejected origin

### Requirement 11: Implement Comprehensive Logging and Metrics

**User Story:** As a system administrator, I want detailed logging and metrics, so that I can monitor bot prevention effectiveness and tune thresholds.

#### Acceptance Criteria

1. THE Bot_Prevention_System SHALL log all accepted submissions with Bot_Score and Request_Signals
2. THE Bot_Prevention_System SHALL log all rejected submissions with rejection reason and Request_Signals
3. THE Bot_Prevention_System SHALL log all quarantined submissions with Bot_Score and detected patterns
4. THE Bot_Prevention_System SHALL maintain counters for total submissions, accepted, quarantined, and blocked
5. THE Bot_Prevention_System SHALL maintain counters for each rejection reason
6. THE Bot_Prevention_System SHALL maintain counters for rate limit hits and challenge failures
7. THE Bot_Prevention_System SHALL provide a metrics endpoint protected by admin authentication
8. THE Bot_Prevention_System SHALL include current threshold configuration in metrics
9. THE Bot_Prevention_System SHALL include quarantine list in metrics response
10. THE Bot_Prevention_System SHALL hash all PII (email, IP) in logs and metrics

### Requirement 12: Implement Configuration Management

**User Story:** As a system administrator, I want configurable security thresholds, so that I can tune the system without code changes.

#### Acceptance Criteria

1. THE Bot_Prevention_System SHALL support configuring allowed origins through CONTACT_ALLOWED_ORIGINS environment variable
2. THE Bot_Prevention_System SHALL support configuring attestation token TTL through CONTACT_FORM_TOKEN_TTL_MS environment variable
3. THE Bot_Prevention_System SHALL support configuring minimum submit time through CONTACT_MIN_SUBMIT_MS environment variable
4. THE Bot_Prevention_System SHALL support configuring maximum submit time through CONTACT_MAX_SUBMIT_MS environment variable
5. THE Bot_Prevention_System SHALL support configuring bot score rejection threshold through CONTACT_BOT_SCORE_REJECT_THRESHOLD environment variable
6. THE Bot_Prevention_System SHALL support configuring bot score quarantine threshold through CONTACT_BOT_SCORE_QUARANTINE_THRESHOLD environment variable
7. THE Bot_Prevention_System SHALL support configuring rate limits through environment variables (per-minute, per-hour, per-email)
8. THE Bot_Prevention_System SHALL support configuring Turnstile secret through TURNSTILE_SECRET_KEY environment variable
9. THE Bot_Prevention_System SHALL support configuring fail-open behavior through CONTACT_CHALLENGE_FAIL_OPEN environment variable
10. THE Bot_Prevention_System SHALL use sensible defaults when environment variables are not set

### Requirement 13: Implement Server-Side API Endpoint Protection

**User Story:** As a developer, I want protected API endpoints, so that form submissions are validated before processing.

#### Acceptance Criteria

1. THE Application_Form API endpoint SHALL validate all Form_Guard checks before processing
2. THE Application_Form API endpoint SHALL return 400 status for validation errors
3. THE Application_Form API endpoint SHALL return 403 status for security violations
4. THE Application_Form API endpoint SHALL return 429 status for rate limit violations
5. THE Application_Form API endpoint SHALL return generic error messages to clients
6. THE Application_Form API endpoint SHALL log detailed error information server-side
7. THE Application_Form API endpoint SHALL process submissions only after all security checks pass
8. THE Application_Form API endpoint SHALL include quarantine status in success responses
9. THE Application_Form API endpoint SHALL support async email sending for accepted submissions
10. THE Application_Form API endpoint SHALL handle errors gracefully without exposing internal details

### Requirement 14: Implement Client-Side Form Integration

**User Story:** As a user, I want clear feedback on security requirements, so that I understand why I need to complete verification steps.

#### Acceptance Criteria

1. THE Application_Form SHALL display a loading indicator while the Turnstile challenge loads
2. THE Application_Form SHALL disable the submit button until the Turnstile challenge is completed
3. THE Application_Form SHALL display an error message if the Turnstile challenge fails to load
4. THE Application_Form SHALL display an error message if submission is rejected
5. THE Application_Form SHALL display a success message if submission is accepted
6. THE Application_Form SHALL reset the Turnstile challenge after submission
7. THE Application_Form SHALL include the Attestation_Token in the submission payload
8. THE Application_Form SHALL include the form start timestamp in the submission payload
9. THE Application_Form SHALL include the Turnstile challenge token in the submission payload
10. THE Application_Form SHALL provide accessible labels and instructions for the verification challenge

### Requirement 15: Maintain Backward Compatibility

**User Story:** As a developer, I want the existing Contact_Form to continue working, so that the refactoring doesn't break production functionality.

#### Acceptance Criteria

1. THE Contact_Form SHALL continue to use all existing security features
2. THE Contact_Form SHALL continue to accept submissions with valid security tokens
3. THE Contact_Form SHALL continue to reject submissions that fail security checks
4. THE Contact_Form SHALL continue to quarantine suspicious submissions
5. THE Contact_Form SHALL continue to send notification emails for accepted submissions
6. THE Contact_Form SHALL continue to send auto-reply emails for accepted submissions
7. THE Contact_Form SHALL continue to log all submissions with the same format
8. THE Contact_Form SHALL continue to return the same response structure
9. THE Contact_Form SHALL continue to support all existing configuration options
10. THE Contact_Form SHALL continue to provide the metrics endpoint with the same format
