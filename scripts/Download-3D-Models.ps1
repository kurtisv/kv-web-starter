param(
    [string]$OutputDir = "apps/web/public",
    [switch]$Optimize
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Models = @(
    @{
        Slot     = "phone"
        Label    = "Smartphone"
        Primary  = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/iphone-15-pro/model.glb"
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
        Dest     = "phone/default.glb"
    },
    @{
        Slot     = "laptop"
        Label    = "Laptop"
        Primary  = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/macbook/model.glb"
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
        Dest     = "laptop/default.glb"
    },
    @{
        Slot     = "car"
        Label    = "Voiture"
        Primary  = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bmw-m4-2021/model.glb"
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
        Dest     = "car/default.glb"
    }
)

function Test-GlbMagic([string]$Path) {
    $bytes = [System.IO.File]::ReadAllBytes($Path) | Select-Object -First 4
    return ($bytes[0] -eq 0x67 -and $bytes[1] -eq 0x6C -and $bytes[2] -eq 0x54 -and $bytes[3] -eq 0x46)
}

function Download-Url([string]$Url, [string]$Dest) {
    Write-Host "  GET $Url" -ForegroundColor DarkGray
    try {
        Invoke-WebRequest -Uri $Url -OutFile $Dest -UseBasicParsing -TimeoutSec 120
        return $true
    } catch {
        Write-Host "  -> Error: $_" -ForegroundColor DarkYellow
        return $false
    }
}

$baseDir = [System.IO.Path]::GetFullPath((Join-Path (Join-Path (Join-Path $PSScriptRoot "..") $OutputDir) "models/3d"))

Write-Host ""
Write-Host "Downloading 3D models to: $baseDir" -ForegroundColor Cyan
Write-Host "License: CC0 (public domain, safe for commercial use)" -ForegroundColor DarkGray
Write-Host ""

$allOk = $true

foreach ($m in $Models) {
    $destPath = Join-Path $baseDir $m.Dest
    $destDir  = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force $destDir | Out-Null }

    Write-Host "[$($m.Slot.ToUpper())] $($m.Label)" -ForegroundColor White

    $ok = Download-Url $m.Primary $destPath

    if ($ok -and (Test-Path $destPath) -and -not (Test-GlbMagic $destPath)) {
        Write-Host "  -> Primary is not a valid GLB. Trying fallback..." -ForegroundColor DarkYellow
        $ok = $false
    }

    if (-not $ok) {
        Write-Host "  Fallback: $($m.Fallback)" -ForegroundColor DarkGray
        $ok = Download-Url $m.Fallback $destPath
        if ($ok -and (Test-Path $destPath) -and -not (Test-GlbMagic $destPath)) {
            Write-Host "  -> Fallback also invalid." -ForegroundColor Red
            $ok = $false
        }
    }

    if ($ok -and (Test-Path $destPath)) {
        $sizeMb = [Math]::Round((Get-Item $destPath).Length / 1048576, 2)
        Write-Host ("  OK  " + $m.Dest + " (" + $sizeMb + " MB)") -ForegroundColor Green

        if ($Optimize) {
            $gltfpack = Get-Command "gltfpack" -ErrorAction SilentlyContinue
            if ($gltfpack) {
                $tmp = $destPath + ".tmp.glb"
                Write-Host "  Optimizing with gltfpack..." -ForegroundColor DarkGray
                & gltfpack -i $destPath -o $tmp -cc -tc 2>$null
                if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) {
                    $newMb = [Math]::Round((Get-Item $tmp).Length / 1048576, 2)
                    Move-Item $tmp $destPath -Force
                    Write-Host ("  Compressed " + $sizeMb + " MB -> " + $newMb + " MB") -ForegroundColor Green
                } else {
                    if (Test-Path $tmp) { Remove-Item $tmp -Force }
                    Write-Host "  gltfpack failed, keeping original." -ForegroundColor DarkYellow
                }
            } else {
                Write-Host "  gltfpack not found. Install: winget install meshoptimizer.gltfpack" -ForegroundColor DarkYellow
            }
        }
    } else {
        Write-Host ("  FAILED: " + $m.Dest) -ForegroundColor Red
        Write-Host "  Manual: download a CC0 GLB from https://sketchfab.com or https://polyhaven.com" -ForegroundColor DarkGray
        Write-Host ("  Place at: " + $destPath) -ForegroundColor DarkGray
        $allOk = $false
    }

    Write-Host ""
}

if ($allOk) {
    Write-Host "Done. Start pnpm dev and open /demo/components to verify." -ForegroundColor Green
} else {
    Write-Host "Some downloads failed. See manual steps above." -ForegroundColor Yellow
}

Write-Host ""
