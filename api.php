<?php
declare(strict_types=1);

require_once __DIR__ . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'database.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function textLength(string $value): int
{
    $length = preg_match_all('/./us', $value);
    return $length === false ? strlen($value) : $length;
}

function readJsonBody(): array
{
    $contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
    if ($contentType !== 'application/json') {
        respond(415, ['error' => 'Content-Type must be application/json.']);
    }

    $input = fopen('php://input', 'rb');
    if ($input === false) {
        respond(400, ['error' => 'Unable to read the request body.']);
    }
    $rawBody = stream_get_contents($input, 16385);
    fclose($input);
    if ($rawBody === false || strlen($rawBody) > 16384) {
        respond(413, ['error' => 'Request body is missing or too large.']);
    }

    try {
        $data = json_decode($rawBody, false, 16, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(400, ['error' => 'Request body must contain valid JSON.']);
    }

    if (!is_object($data)) {
        respond(400, ['error' => 'Request body must be a JSON object.']);
    }

    return get_object_vars($data);
}

$resource = $_GET['resource'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = databaseConnection();

    if ($resource === 'services' && $method === 'GET') {
        $statement = $pdo->query(
            'SELECT slug, name, category, description, icon
             FROM services
             WHERE status = "active"
             ORDER BY sort_order, name'
        );
        respond(200, ['data' => $statement->fetchAll()]);
    }

    if ($resource === 'inquiries' && $method === 'POST') {
        $data = readJsonBody();
        $name = trim((string) ($data['name'] ?? ''));
        $email = trim((string) ($data['email'] ?? ''));
        $serviceSlug = trim((string) ($data['service_slug'] ?? ''));
        $adSource = trim((string) ($data['ad_source'] ?? ''));
        $message = trim((string) ($data['message'] ?? ''));
        $honeypot = trim((string) ($data['website'] ?? ''));
        $allowedAdSources = [
            'facebook',
            'instagram',
            'tiktok',
            'linkedin',
            'youtube',
            'x',
            'whatsapp',
            'other-social-media',
            'other'
        ];

        if ($honeypot !== '') {
            respond(422, ['error' => 'The inquiry could not be accepted.']);
        }
        if ($name === '' || textLength($name) > 120) {
            respond(422, ['error' => 'Enter your name (up to 120 characters).']);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || textLength($email) > 254) {
            respond(422, ['error' => 'Enter a valid email address.']);
        }
        if ($message === '' || textLength($message) > 5000) {
            respond(422, ['error' => 'Enter a message (up to 5,000 characters).']);
        }
        if ($serviceSlug !== '' && !preg_match('/^[a-z0-9-]{1,100}$/', $serviceSlug)) {
            respond(422, ['error' => 'Choose a valid service.']);
        }
        if ($adSource !== '' && !in_array($adSource, $allowedAdSources, true)) {
            respond(422, ['error' => 'Choose a valid ad source.']);
        }

        $serviceId = null;
        if ($serviceSlug !== '') {
            $serviceQuery = $pdo->prepare(
                'SELECT id
                 FROM services
                 WHERE slug = :slug AND status = "active"
                 LIMIT 1'
            );
            $serviceQuery->execute(['slug' => $serviceSlug]);
            $serviceId = $serviceQuery->fetchColumn();
            if ($serviceId === false) {
                respond(422, ['error' => 'That service is not available. Refresh and choose another service.']);
            }
        }

        $insert = $pdo->prepare(
            'INSERT INTO service_inquiries (
                service_id, contact_name, contact_email, ad_source, message, status
            ) VALUES (
                :service_id, :contact_name, :contact_email, :ad_source, :message, "new"
            )'
        );
        $insert->execute([
            'service_id' => $serviceId,
            'contact_name' => $name,
            'contact_email' => $email,
            'ad_source' => $adSource !== '' ? $adSource : null,
            'message' => $message
        ]);

        respond(201, ['data' => ['id' => (int)$pdo->lastInsertId(), 'status' => 'received']]);
    }

    if ($resource !== 'services' && $resource !== 'inquiries') {
        respond(404, ['error' => 'API resource not found.']);
    }

    header('Allow: ' . ($resource === 'services' ? 'GET' : 'POST'));
    respond(405, ['error' => 'Method not allowed.']);
} catch (Throwable $error) {
    error_log('[Bee My Office API] ' . $error->getMessage());
    respond(503, ['error' => 'The database is unavailable. Check the PHP server log and database configuration.']);
}
