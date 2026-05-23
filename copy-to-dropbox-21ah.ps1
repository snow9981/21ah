$ErrorActionPreference = "Stop"

$source = Split-Path -Parent $MyInvocation.MyCommand.Path
$destination = "D:\Dropbox\21ah"

if (-not (Test-Path -LiteralPath "D:\Dropbox")) {
  throw "D:\Dropbox 폴더를 찾을 수 없습니다."
}

New-Item -ItemType Directory -Force -Path $destination | Out-Null

robocopy $source $destination /E /XD ".git" "node_modules" /XF ".DS_Store" /R:2 /W:1
$exitCode = $LASTEXITCODE

if ($exitCode -le 7) {
  Write-Host ""
  Write-Host "완료: 현재 홈페이지 프로젝트를 D:\Dropbox\21ah 로 복사했습니다."
  Write-Host "Dropbox 동기화가 끝나면 맥북에서도 21ah 폴더로 이어서 작업할 수 있습니다."
  exit 0
}

throw "복사 중 오류가 발생했습니다. robocopy exit code: $exitCode"
