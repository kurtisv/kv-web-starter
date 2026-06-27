param(
  [ValidateSet("LaunchReel", "HeroBackground", "HeroIntro", "StatsCounter", "FeatureReveal", "ThemeBackgrounds", "all")]
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
$themesDir    = Join-Path $outDir "themes"

if (-not (Test-Path $outDir))   { New-Item -ItemType Directory -Force -Path $outDir   | Out-Null }
if (-not (Test-Path $themesDir)){ New-Item -ItemType Directory -Force -Path $themesDir | Out-Null }

function Render-Composition {
  param([string]$id, [string]$outFile, [string]$propsJson)

  Write-Host ""
  Write-Host "[render] $id -> $outFile" -ForegroundColor Cyan

  # outFile may include a sub-path like "themes/x.mp4"
  $absOut   = Join-Path $outDir $outFile
  $remotion = Join-Path $videoPackage "node_modules\.bin\remotion.CMD"

  Push-Location $videoPackage
  try {
    if ($propsJson -ne "") {
      $propsFile = Join-Path $videoPackage ".remotion-props-tmp.json"
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

# All 7 theme IDs
$ALL_THEMES = @(
  "corporate-classic",
  "premium-saas",
  "luxury-auto",
  "local-business",
  "real-estate",
  "ecommerce-clean",
  "dark-tech-api"
)

switch ($Composition) {
  "LaunchReel"       { Render-Composition "LaunchReel"     "launch-reel.mp4"     "" }
  "HeroBackground"   { Render-Composition "HeroBackground" "hero-background.mp4" $themePropsJson }
  "HeroIntro"        { Render-Composition "HeroIntro"      "hero-intro.mp4"      $heroPropsJson }
  "StatsCounter"     { Render-Composition "StatsCounter"   "stats-counter.mp4"   $themePropsJson }
  "FeatureReveal"    { Render-Composition "FeatureReveal"  "feature-reveal.mp4"  $themePropsJson }

  "ThemeBackgrounds" {
    Write-Host ""
    Write-Host "Rendering HeroBackground for all 7 themes -> public/videos/themes/" -ForegroundColor Magenta
    foreach ($t in $ALL_THEMES) {
      $props = (@{ theme = $t } | ConvertTo-Json -Compress)
      Render-Composition "HeroBackground" "themes/$t-bg.mp4" $props
    }
    Write-Host ""
    Write-Host "All theme backgrounds rendered to apps/web/public/videos/themes/" -ForegroundColor Cyan
  }

  "all" {
    Render-Composition "HeroBackground" "hero-background.mp4" $themePropsJson
    Render-Composition "HeroIntro"      "hero-intro.mp4"      $heroPropsJson
    Render-Composition "StatsCounter"   "stats-counter.mp4"   $themePropsJson
    Render-Composition "FeatureReveal"  "feature-reveal.mp4"  $themePropsJson
    Write-Host ""
    Write-Host "All videos rendered to apps/web/public/videos/" -ForegroundColor Cyan
  }
}
