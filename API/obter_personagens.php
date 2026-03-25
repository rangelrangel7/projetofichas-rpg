<?php
$arquivo = "personagens.json";

if (!file_exists($arquivo)) {
    echo json_encode([]);
    exit;
}

echo file_get_contents($arquivo);
?>