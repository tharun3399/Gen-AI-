# PostgreSQL Database Setup - Windows Alternative

## Render deployment

If you want the database hosted on **Render**, use a managed PostgreSQL service:

1. In Render, go to **New +** → **PostgreSQL**.
2. Choose a database name, region, and plan.
3. After it is created, open the database service and copy the **Internal Database URL** or the individual connection fields.

### Render field mapping

Use the values shown in the Render dashboard like this:

- **Hostname** → `DB_HOST`
- **Port** → `DB_PORT`
- **Database** → `DB_NAME`
- **Username** → `DB_USER`
- **Password** → `DB_PASSWORD`

If you use the single URL format, paste the **Internal Database URL** into `DATABASE_URL`.

### Option A: Use `DATABASE_URL` in the backend

Set this in the Render backend service environment variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

Then run the schema on the Render database using either:

- a local `psql` connection to the Render database URL, or
- the Render shell / external client if you have access.

If you use Render's individual fields, build the URL like this:

```text
postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
```

Example command from your machine:

```powershell
psql "postgresql://USER:PASSWORD@HOST:PORT/DATABASE" -f "backend/database.sql"
```

### Option B: Use separate connection fields

If you prefer the existing env vars, set these in Render instead:

```env
DB_HOST=...
DB_PORT=5432
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

### After importing the schema

Confirm the tables and starter data were created by running:

```sql
SELECT COUNT(*) FROM categories;
```

You should see the seeded categories from `backend/database.sql`.

## Migrating your existing data to Render

If your current data already exists in a local PostgreSQL database, export it and restore it into the Render database.

### Option 1: pg_dump / psql

Run these commands from your machine:

```powershell
# Export your current local database
pg_dump -U postgres -d ai_agent_platform -Fc -f ai_agent_platform.dump

# Restore into the Render database
pg_restore --no-owner --no-privileges -d "postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME" ai_agent_platform.dump
```

If you prefer plain SQL instead of a custom dump:

```powershell
pg_dump -U postgres -d ai_agent_platform --clean --if-exists --no-owner --no-privileges -f ai_agent_platform.sql
psql "postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME" -f ai_agent_platform.sql
```

### Option 2: pgAdmin export/import

1. Open pgAdmin and connect to your current local database.
2. Right-click the database → **Backup**.
3. Choose **Format: Custom** and save the dump file.
4. Connect pgAdmin to the Render database.
5. Right-click the Render database → **Restore**.
6. Select the backup file and restore it.

### What to migrate

Usually you want to move:

- `categories`
- `projects`
- any uploaded file references stored in the database

Uploaded files themselves are **not** stored in PostgreSQL; if you have images in `backend/uploads`, copy those files separately to your deployment storage.

Your PostgreSQL service has startup issues. Use **pgAdmin GUI** instead:

## Step 1: Open pgAdmin

1. Search for **"pgAdmin 4"** in Windows Start Menu
2. Open it (will open in browser at `http://localhost:5050`)
3. Default login: `pgadmin4@pgadmin.org` / `admin`

## Step 2: Create Database via GUI

1. In pgAdmin left sidebar, right-click **Databases**
2. Select **Create → Database**
3. Fill in:
   - **Database name**: `ai_agent_platform`
   - Click **Save**

## Step 3: Load Schema

1. Expand the database in left sidebar
2. Right-click `ai_agent_platform` → **Query Tool**
3. Copy entire contents of `backend/database.sql`
4. Paste into query editor
5. Click **Execute** (or F5)
6. Should see: `INSERT 0 10` confirming categories loaded

## Alternative: Command Line with Password

If pgAdmin doesn't work, use:

```powershell
# Set your PostgreSQL password (if needed)
$env:PGPASSWORD = "postgres"

# Create database
& "C:\Program Files\PostgreSQL\18\bin\createdb.exe" -U postgres ai_agent_platform

# Load schema
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ai_agent_platform -f "backend/database.sql"

# Clear password
$env:PGPASSWORD = ""
```

## Troubleshooting Service Issue

If service won't start, restart the Windows PostgreSQL Service:

```powershell
# Open Services.msc
services.msc

# Find "postgresql-x64-18"
# Right-click → Restart
```

Or use this PowerShell (as Administrator):

```powershell
# List PostgreSQL services
Get-Service | Where-Object {$_.DisplayName -like "*PostgreSQL*"}

# Restart service (run as admin)
Restart-Service -Name "postgresql-x64-18" -Force
```

## Verify Database Created

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ai_agent_platform -c "SELECT COUNT(*) FROM categories;"
```

Should return: `count | 10` (10 categories loaded)

---

**Note**: Once database is set up via pgAdmin, continue with normal frontend/backend startup!
