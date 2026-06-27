param(
  [ValidateSet("LaunchReel", "HeroBackground", "HeroIntro", "StatsCounter", "FeatureReveal", "all")]
  [string]$Composition = "all",

  [ValidateSet("corporate-classic","premium-saas","luxury-auto","local-business","real-estate","ecommerce-clean","dark-tech-api")]
  [string]$Theme = "premium-saas",

  [string]$Title       = "",
  [string]$Subtitle    = "",
  [string]$Eyebrow     = "",

  [int]$Fps            = 30,
  [string]$Codec       = "h264"
)

$videoPackage = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\packages\video"))
$outDir       = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\apps\web\public\videos"))

if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

function Render-Composition {
  param([string]$id, [string]$outFile, [string]$propsJson)

  Write-Host ""
  Write-Host "[render] $id -> $outFile" -ForegroundColor Cyan

  $absOut   = Join-Path $outDir $outFile
  $remotion = Join-Path $videoPackage "node_modules\.bin\remotion.CMD"

  Push-Location $videoPackage
  $propsFile = $null
  try {
    if ($propsJson -ne "") {
      # Use a path inside the video package so Remotion finds it (forward slashes for Node.js)
      $propsFile = Join-Path $videoPackage ".remotion-props-tmp.json"
      # UTF8Encoding($false) = no BOM; System.Text.Encoding.UTF8 has BOM in .NET
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($propsFile, $propsJson, $utf8NoBom)
      $propsFileUnix = $propsFile -replace '\\', '/'
      & $remotion render src/Root.tsx $id $absOut "--codec=$Codec" "--fps=$Fps" "--props=$propsFileUnix"
    } else {
      & $remotion render src/Root.tsx $id $absOut "--codec=$Codec" "--fps=$Fps"
    }

    if ($LASTEXITCODE -ne 0) {
      Write-Host "[error] Render failed for $id" -ForegroundColor Red
      exit 1
    }
    Write-Host "[done]  $id rendered successfully" -ForegroundColor Green
  } finally {
    Pop-Location
    $tmpProps = Join-Path $videoPackage ".remotion-props-tmp.json"
    if (Test-Path $tmpProps) { Remove-Item $tmpProps -Force }
  }
}

# Build props JSON for HeroIntro when overrides are provided
$heroPropsJson = ""
if ($Title -ne "" -or $Subtitle -ne "" -or $Eyebrow -ne "" -or $Theme -ne "premium-saas") {
  $heroProps = @{ theme = $Theme }
  if ($Title    -ne "") { $heroProps.title    = $Title }
  if ($Subtitle -ne "") { $heroProps.subtitle = $Subtitle }
  if ($Eyebrow  -ne "") { $heroProps.eyebrow  = $Eyebrow }
  $heroPropsJson = $heroProps | ConvertTo-Json -Compress
}

$themePropsJson = (@{ theme = $Theme } | ConvertTo-Json -Compress)

switch ($Composition) {
  "LaunchReel"     { Render-Composition "LaunchReel"     "launch-reel.mp4"     "" }
  "HeroBackground" { Render-Composition "HeroBackground" "hero-background.mp4" $themePropsJson }
  "HeroIntro"     { Render-Composition "HeroIntro"     "hero-intro.mp4"      $heroPropsJson }
  "StatsCounter"  { Render-Composition "StatsCounter"  "stats-counter.mp4"   $themePropsJson }
  "FeatureReveal" { Render-Composition "FeatureReveal" "feature-reveal.mp4"  $themePropsJson }
  "all" {
    Render-Composition "HeroBackground" "hero-background.mp4" $themePropsJson
    Render-Composition "HeroIntro"      "hero-intro.mp4"      $heroPropsJson
    Render-Composition "StatsCounter"   "stats-counter.mp4"   $themePropsJson
    Render-Composition "FeatureReveal"  "feature-reveal.mp4"  $themePropsJson
    Write-Host ""
    Write-Host "All videos rendered to apps/web/public/videos/" -ForegroundColor Cyan
  }
}
