# Technical Guide & FAQ

This guide provides technical insights into managing and maintaining the Event Management System.

## Database Migrations

We use TypeORM Migrations to manage schema changes safely.

### Commands

**Generate a Migration:**
```bash
npx typeorm-ts-node-commonjs migration:generate ./src/typeorm/migrations/<Name> -d ./src/typeorm/data-source.ts
```

**Run Migrations:**
```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/typeorm/data-source.ts
```

**Revert Last Migration:**
```bash
npx typeorm-ts-node-commonjs migration:revert -d ./src/typeorm/data-source.ts
```

## Security Best Practices

1. **Password Hashing**: We use `bcryptjs` (salt factor 12) for secure password storage in the `Client` entity.
2. **JWT Authentication**: Protected routes require a Bearer token. Ensure `JWT_SECRET` is strong and kept private.
3. **Input Sanitization**: Use `express-validator` or equivalent for additional input validation beyond TypeORM's built-in escaping.

## Troubleshooting Connection Issues

If you encounter IPv6 timeouts with Neon Postgres on certain networks:

1. Stop the dev server.
2. Disable IPv6 temporary (Linux/WSL):
   ```bash
   sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
   sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
   ```

## Swagger UI

The interactive documentation is automatically generated from JSDoc comments in the `src/routes/v1/` directory. If you add new routes, ensure you document them using `@swagger` tags.

Access at: `http://localhost:3000/api-docs`
