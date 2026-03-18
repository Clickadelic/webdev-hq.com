$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$body = @{
    email = "test@example.com"
    password = "password"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/login" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Content-Type: $($response.Headers['Content-Type'])"
    Write-Host "`nResponse Body:"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $_"
    Write-Host "`nResponse:"
    Write-Host $_.Exception.Response
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        Write-Host $reader.ReadToEnd()
    }
}
