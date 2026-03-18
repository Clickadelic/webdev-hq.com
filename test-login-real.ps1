$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$body = @{
    email = "click@clickadelic.de"
    password = "12345678"
} | ConvertTo-Json

Write-Host "Testing: http://localhost:8000/api/login"
Write-Host "Body: $body"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/login" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "✓ Status Code: $($response.StatusCode)"
    Write-Host "✓ Content-Type: $($response.Headers['Content-Type'])"
    Write-Host "`nResponse Body:"
    Write-Host $response.Content
} catch {
    Write-Host "✗ Error Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "✗ Error: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "`nResponse Body:"
        Write-Host $responseBody
    }
}
