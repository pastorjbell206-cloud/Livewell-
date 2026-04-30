# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly. **Do not open a public issue.**

Email: pastorjbell206@gmail.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will acknowledge receipt within 48 hours and aim to provide a fix or
mitigation within 7 days for critical issues.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| main    | Yes       |

## Security Practices

- All dependencies are monitored via Dependabot
- CI runs on every PR (typecheck, test, build)
- Session cookies use HttpOnly, Secure, SameSite=Lax
- Admin endpoints require authentication
- All database queries use parameterized statements
