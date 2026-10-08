<?php
declare(strict_types=1);

$root = __DIR__;
$requestedPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestedPath = is_string($requestedPath) ? rawurldecode($requestedPath) : '/';
if ($requestedPath === '/' || $requestedPath === '') {
    $requestedPath = '/index.html';
}
$resolvedPath = realpath($root . DIRECTORY_SEPARATOR . ltrim($requestedPath, '/\\'));

if ($requestedPath === '/api.php') {
    require $root . DIRECTORY_SEPARATOR . 'api.php';
    return true;
}

if ($resolvedPath === false || !str_starts_with($resolvedPath, $root . DIRECTORY_SEPARATOR)) {
    http_response_code(404);
    echo 'Not found';
    return true;
}

$relativePath = substr($resolvedPath, strlen($root));
if (preg_match('~(^|[\\\\/])(?:\.[^\\\\/]+|config|database|storage|logs)(?:[\\\\/]|$)~i', $relativePath)) {
    http_response_code(404);
    echo 'Not found';
    return true;
}

if (strtolower(pathinfo($resolvedPath, PATHINFO_EXTENSION)) === 'php') {
    http_response_code(404);
    echo 'Not found';
    return true;
}

if (is_file($resolvedPath)) {
    return false;
}

http_response_code(404);
echo 'Not found';
return true;
