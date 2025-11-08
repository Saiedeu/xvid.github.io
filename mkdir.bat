@echo off
SET ROOT=E:\x\TSX

REM =========================
REM Create directories
REM =========================
mkdir "%ROOT%\attached_assets"
mkdir "%ROOT%\client"
mkdir "%ROOT%\public"
mkdir "%ROOT%\src\components\examples"
mkdir "%ROOT%\src\components\ui"
mkdir "%ROOT%\src\hooks"
mkdir "%ROOT%\src\lib"
mkdir "%ROOT%\src\pages"
mkdir "%ROOT%\server"
mkdir "%ROOT%\shared"

REM =========================
REM Create files in public
REM =========================
type nul > "%ROOT%\public\favicon.png"

REM =========================
REM Create files in src/components
REM =========================
type nul > "%ROOT%\src\components\FAQItem.tsx"
type nul > "%ROOT%\src\components\FeatureCard.tsx"
type nul > "%ROOT%\src\components\Footer.tsx"
type nul > "%ROOT%\src\components\Header.tsx"
type nul > "%ROOT%\src\components\HowItWorksStep.tsx"
type nul > "%ROOT%\src\components\VideoDownloader.tsx"
type nul > "%ROOT%\src\components\VideoPreview.tsx"

REM UI components
for %%f in (
accordion.tsx alert-dialog.tsx alert.tsx aspect-ratio.tsx avatar.tsx badge.tsx breadcrumb.tsx
button.tsx calendar.tsx card.tsx carousel.tsx chart.tsx checkbox.tsx collapsible.tsx command.tsx
context-menu.tsx dialog.tsx drawer.tsx dropdown-menu.tsx form.tsx hover-card.tsx input-otp.tsx
input.tsx label.tsx menubar.tsx navigation-menu.tsx pagination.tsx popover.tsx progress.tsx
radio-group.tsx resizable.tsx scroll-area.tsx select.tsx separator.tsx sheet.tsx sidebar.tsx
skeleton.tsx slider.tsx switch.tsx table.tsx tabs.tsx textarea.tsx toast.tsx toaster.tsx
toggle-group.tsx toggle.tsx tooltip.tsx
) do (
    type nul > "%ROOT%\src\components\ui\%%f"
)

REM =========================
REM Create files in hooks
REM =========================
type nul > "%ROOT%\src\hooks\use-mobile.tsx"
type nul > "%ROOT%\src\hooks\use-toast.ts"

REM =========================
REM Create files in lib
REM =========================
type nul > "%ROOT%\src\lib\queryClient.ts"
type nul > "%ROOT%\src\lib\utils.ts"

REM =========================
REM Create files in pages
REM =========================
type nul > "%ROOT%\src\pages\Home.tsx"
type nul > "%ROOT%\src\pages\not-found.tsx"
type nul > "%ROOT%\src\pages\App.tsx"
type nul > "%ROOT%\src\pages\index.css"
type nul > "%ROOT%\src\pages\main.tsx"

REM =========================
REM Create root files
REM =========================
type nul > "%ROOT%\index.html"
type nul > "%ROOT%\.env.example"
type nul > "%ROOT%\.gitignore"
type nul > "%ROOT%\components.json"
type nul > "%ROOT%\design_guidelines.md"
type nul > "%ROOT%\drizzle.config.ts"
type nul > "%ROOT%\postcss.config.js"
type nul > "%ROOT%\replit.md"
type nul > "%ROOT%\tailwind.config.ts"
type nul > "%ROOT%\tsconfig.json"
type nul > "%ROOT%\vite.config.ts"
type nul > "%ROOT%\package-lock.json"
type nul > "%ROOT%\package.json"
type nul > "%ROOT%\.replit"

REM =========================
REM Create files in server
REM =========================
type nul > "%ROOT%\server\index.ts"
type nul > "%ROOT%\server\routes.ts"
type nul > "%ROOT%\server\storage.ts"
type nul > "%ROOT%\server\vite.ts"

REM =========================
REM Create files in shared
REM =========================
type nul > "%ROOT%\shared\schema.ts"

echo Project directories and files created successfully at %ROOT%!
pause
