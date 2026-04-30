# Security Audit Notes

## Findings & Remediations

### Fixed in This PR

| Issue | Severity | Status |
|-------|----------|--------|
| CORS wildcard (`*`) on all API routes | High | Fixed — locked to explicit origins |
| Session cookie expiry bug (TTL vs timestamp) | High | Fixed — uses `Date.now() + TTL` |
| Missing HSTS header | Medium | Fixed — added to vercel.json |
| Error stack traces exposed in production | Medium | Fixed — gated behind `import.meta.env.DEV` |
| `.env.example` listed wrong DB protocol (postgresql vs mysql) | Low | Fixed |

### Existing Strengths

- Session cookies use `HttpOnly`, `Secure`, `SameSite=Lax`
- bcrypt password hashing for admin login
- Parameterized SQL queries throughout (no string concatenation)
- tRPC input validation via Zod on all router procedures
- Admin procedures gated behind `adminProcedure` middleware
- Security headers in vercel.json (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)

### Remaining Risks (Deferred)

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| JWT_SECRET reused for admin seed auth and session signing | Medium | Introduce separate `ADMIN_SEED_SECRET` env var |
| No rate limiting on `/api/auth/login` | Medium | Add upstash/ratelimit or similar |
| No rate limiting on `/api/subscribe` and `/api/pcn/signup` | Low | Add rate limiting |
| Stripe uses placeholder key in fallback | Low | Ensure STRIPE_SECRET_KEY always set in production |
| No CSP header | Low | Add Content-Security-Policy to vercel.json |
| Session TTL is 7 days | Low | Consider shorter TTL for admin sessions (e.g., 24h) |

### Dependency Audit

Run `pnpm audit` periodically. Dependabot is now configured to create weekly PRs for vulnerable dependencies.

### S3/Storage

File uploads go through the Forge API proxy (`BUILT_IN_FORGE_API_URL`). Presigned URL security depends on the proxy configuration. Verify:
- Short expiration times on presigned URLs
- Content-type and size constraints enforced server-side
- Bucket policy restricts public access
