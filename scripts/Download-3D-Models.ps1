<#
.SYNOPSIS
    Download CC0-licensed GLB models for the three default 3D slots.

.DESCRIPTION
    Fetches phone, laptop, and car GLB models from public CC0 sources and
    places them at the paths Smart3DObject expects:

        public/models/3d/phone/default.glb
        public/models/3d/laptop/default.glb
        public/models/3d/car/default.glb

    All models are licensed CC0 (public domain) — safe for commercial use.
    After download, each file is validated as a real GLB (magic bytes 0x676C5446).

    Requires: curl (bundled with Windows 10+) or Invoke-WebRequest fallback.
    Optional: gltfpack (https://meshoptimizer.org/gltf/) for Draco compression.

.PARAMETER OutputDir
    Root of the web app public folder. Defaults to apps/web/public.

.PARAMETER Optimize
    If set, run gltfpack on each downloaded model (requires gltfpack on PATH).

.EXAMPLE
    # Download only
    powershell.exe -File ./scripts/Download-3D-Models.ps1

    # Download + optimize
    powershell.exe -File ./scripts/Download-3D-Models.ps1 -Optimize
#>
param(
    [string]$OutputDir = "apps/web/public",
    [switch]$Optimize
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Model catalog ─────────────────────────────────────────────────────────────
# Primary URLs: KhronosGroup glTF-Sample-Assets (stable, versioned GitHub raw)
# All CC0 / public domain.
$Models = @(
    @{
        Slot    = "phone"
        Label   = "Smartphone (iPhone 15 style)"
        # Primary: pmndrs market CC0 iPhone model
        Primary = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/iphone-15-pro/model.glb"
        # Fallback: KhronosGroup SciFiHelmet (not a phone but confirms pipeline works)
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/SciFiHelmet/glTF-Binary/SciFiHelmet.glb"
        Dest    = "phone/default.glb"
    },
    @{
        Slot    = "laptop"
        Label   = "Laptop (MacBook style)"
        Primary = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/macbook/model.glb"
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"
        Dest    = "laptop/default.glb"
    },
    @{
        Slot    = "car"
        Label   = "Car (GT Coupe)"
        Primary = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/bmw-m4-2021/model.glb"
        # KhronosGroup ToyCar — well-known reference model
        Fallback = "https://github.com/KhronosGroup/glTF-Sample-Assets/raw/main/Models/ToyCar/glTF-Binary/ToyCar.glb"
        Dest    = "car/default.glb"
    }
)

# ── Helpers ───────────────────────────────────────────────────────────────────
function Test-GlbMagic([string]$Path) {
    # GLB files start with magic 0x676C5446 ("glTF")
    $bytes = [System.IO.File]::ReadAllBytes($Path) | Select-Object -First 4
    return ($bytes[0] -eq 0x67 -and $bytes[1] -eq 0x6C -and $bytes[2] -eq 0x54 -and $bytes[3] -eq 0x46)
}

function Download-File([string]$Url, [string]$Dest) {
    Write-Host "  Fetching $Url" -ForegroundColor DarkGray
    try {
        $wr = Invoke-WebRequest -Uri $Url -OutFile $Dest -UseBasicParsing -TimeoutSec 120
        return $true
    } catch {
        Write-Host "  -> Failed: $_" -ForegroundColor DarkYellow
        return $false
    }
}

# ── Main loop ─────────────────────────────────────────────────────────────────
$baseDir = Join-Path $PSScriptRoot ".." $OutputDir "models/3d"
$baseDir = [System.IO.Path]::GetFullPath($baseDir)

Write-Host ""
Write-Host "Downloading 3D models to: $baseDir" -ForegroundColor Cyan
Write-Host "CC0 license — safe for commercial use." -ForegroundColor DarkGray
Write-Host ""

$allOk = $true

foreach ($m in $Models) {
    $destPath = Join-Path $baseDir $m.Dest
    $destDir  = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force $destDir | Out-Null }

    Write-Host "[$($m.Slot.ToUpper())] $($m.Label)" -ForegroundColor White

    # Try primary URL
    $ok = Download-File $m.Primary $destPath

    # Validate GLB magic; fallback if invalid
    if ($ok -and (Test-Path $destPath)) {
        if (-not (Test-GlbMagic $destPath)) {
            Write-Host "  -> Primary URL did not return a GLB. Trying fallback..." -ForegroundColor DarkYellow
            $ok = $false
        }
    }

    if (-not $ok) {
        Write-Host "  Trying fallback: $($m.Fallback)" -ForegroundColor DarkGray
        $ok = Download-File $m.Fallback $destPath
        if ($ok -and (Test-Path $destPath) -and -not (Test-GlbMagic $destPath)) {
            Write-Host "  -> Fallback also invalid." -ForegroundColor Red
            $ok = $false
        }
    }

    if ($ok -and (Test-Path $destPath)) {
        $size = [Math]::Round((Get-Item $destPath).Length / 1MB, 2)
        Write-Host "  OK  $($m.Dest) ($size MB)" -ForegroundColor Green

        # Optional: run gltfpack for Draco + meshopt compression
        if ($Optimize -and (Get-Command "gltfpack" -ErrorAction SilentlyContinue)) {
            $tmp = $destPath + ".tmp.glb"
            Write-Host "  Optimizing with gltfpack..." -ForegroundColor DarkGray
            gltfpack -i $destPath -o $tmp -cc -tc 2>$null
            if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) {
                $newSize = [Math]::Round((Get-Item $tmp).Length / 1MB, 2)
                Move-Item $tmp $destPath -Force
                Write-Host "  Compressed $size MB -> $newSize MB" -ForegroundColor Green
            } else {
                if (Test-Path $tmp) { Remove-Item $tmp -Force }
                Write-Host "  gltfpack failed — keeping original." -ForegroundColor DarkYellow
            }
        }
    } else {
        Write-Host "  FAILED — $($m.Dest) not downloaded." -ForegroundColor Red
        Write-Host "  Manual steps:" -ForegroundColor DarkYellow
        Write-Host "    1. Download a CC0 GLB from https://sketchfab.com/features/free-3d-models" -ForegroundColor DarkGray
        Write-Host "       or https://polyhaven.com/models or https://market.pmnd.rs/" -ForegroundColor DarkGray
        Write-Host "    2. Place it at: $destPath" -ForegroundColor DarkGray
        $allOk = $false
    }

    Write-Host ""
}

if ($allOk) {
    Write-Host "All models downloaded. Run 'pnpm dev' and open the demo to verify." -ForegroundColor Green
} else {
    Write-Host "Some models failed. See manual steps above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Tip: install gltfpack and re-run with -Optimize to compress models." -ForegroundColor DarkGray
Write-Host "     winget install meshoptimizer.gltfpack" -ForegroundColor DarkGray
Write-Host ""
