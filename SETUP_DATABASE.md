# PostgreSQL Database Setup - Windows Alternative

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
