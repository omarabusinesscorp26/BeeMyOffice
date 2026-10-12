# Bee My Office

A responsive Bee My Office website and client-platform preview, with a PHP/MySQL foundation for service listings and public inquiries.

## Local PHP/MySQL setup

The local XAMPP installation on this machine is configured and running:

- PHP 8.2 with PDO MySQL
- MariaDB 10.4 at `127.0.0.1:3306`
- Database `bee_my_office`, with the tables and ten service records imported
- Restricted PHP database account `bee_my_office_app`; its generated password is stored only in the ignored `.env` file

The restricted app account can read the service catalog and save public inquiries.

### Open the website

In VS Code, open **Run and Debug**, select **Bee My Office**, and press **F5**. The VS Code task starts MariaDB if needed, starts the PHP server on port 8000, and opens the site in Chrome. Stop the PHP server from the VS Code terminal when finished.

Or, from PowerShell in the project directory:

```powershell
& 'C:\xampp\php\php.exe' -S 127.0.0.1:8000 router.php
```

Open <http://127.0.0.1:8000/>. Keep the PHP server and local MariaDB server running while using the database-backed features.

The client workspace preview is available at `/#/platform`; its CRM pipeline is a browser-only preview and is not connected to the database.

This is ready for local preview and testing, not for public production use. Client registration, client sign-in, and database-backed client records are not implemented. Do not expose the local PHP development server directly to the internet.

### Re-create the schema on another installation

PHP 8.0+ with PDO MySQL and MySQL 8+ or a compatible MariaDB server are required. Import the schema as a database administrator. In Windows Command Prompt:

```cmd
C:\xampp\mysql\bin\mysql.exe -u root < D:\BeeMyOffice\database\schema.sql
```

Create a dedicated application account (choose a strong password), then grant only the API's required access:

```sql
CREATE USER 'bee_my_office_app'@'127.0.0.1' IDENTIFIED BY 'replace-with-a-strong-password';
GRANT SELECT ON bee_my_office.services TO 'bee_my_office_app'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE ON bee_my_office.service_inquiries TO 'bee_my_office_app'@'127.0.0.1';
```

For an existing installation, run `database/migrations/20261005_add_inquiry_ad_source.sql` once to add the optional ad-source field.

Copy `.env.example` to `.env` and enter those database credentials. Use the same app username you created for the dedicated database account, such as `bee_my_office_app`; do not use the MySQL administrator account in the application.

## Database-backed features

- `GET /api.php?resource=services` reads active offerings from MySQL.
- `POST /api.php?resource=inquiries` validates and saves the public contact form to `service_inquiries`.
- The contact form records an optional social-media ad source, the selected service, and the visitor's message.
- The Cal.com calendar stays beside the contact form so visitors can choose a time while entering their inquiry. The service dropdown starts at **Choose a service** and lists only service offerings; the inquiry is saved separately, while Cal.com manages the appointment and confirmation.
- The public service catalog loads from the API. If the backend is unavailable, the page reports the database status and retains the built-in catalog as a display fallback.
- A contact inquiry is shown as sent only after the API confirms it was saved. Failures are shown on the form; the inquiry is not stored as a browser-only success.

The schema creates the `bee_my_office` database and seeds the service catalog only. The remaining client-portal modules are an unauthenticated UI preview. New demo entries created there stay in browser memory and are not database-backed. Authentication, authorization, tenant isolation at the API layer, production email delivery, and live AI are not implemented.

## Security notes

- Keep `.env` private. It is ignored by Git and protected from direct access by the included Apache rules and PHP router.
- Use a dedicated MySQL account with only the privileges needed by the application.
- Do not expose the unauthenticated client-preview actions as production endpoints. Add authentication, authorization and organization scoping before connecting real client data.
