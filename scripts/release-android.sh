#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

npm run check

# An installable APK for testers, signed with the keystore EAS keeps for this app.
# The first run asks to create that keystore, so it stays interactive. The build link and QR code install it on a phone.
npx eas-cli build -p android --profile apk --no-wait
