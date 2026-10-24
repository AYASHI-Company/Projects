# Projects

## Data Watch for Android

A network-speed alarm with live readings, dark and light themes, and customizable sounds.

### [Download & install Data Watch](https://github.com/AYASHI-Company/Projects/releases/latest/download/DataWatch.apk)

Open the link on your **Android phone (Android 8+)**. No GitHub sign-in or ZIP extraction is needed.

**Upgrading from version 1:** uninstall the old app first. Its temporary signing key was not retained, so this release cannot install over it. Your old settings will reset.

1. Download **DataWatch.apk**, then open it.
2. If Android asks, allow installation from your browser or Files app and tap **Install**.
3. Open **Data Watch**, allow notifications, and adjust your phone’s **alarm volume**.
4. Tap **Manage** beside **Show over other apps** and grant Android's floating-alert permission.
5. Set your limit in **KB/s, MB/s, or GB/s**, choose mobile/all networks and download/upload/combined traffic, then tap **Start monitoring**.
6. Choose a phone sound or import your own audio file if desired.

The alarm starts only when the measured, unrounded rate is **strictly greater** than your saved threshold. Equal or close to the threshold stays silent. It stops at/below the threshold or after **20 seconds**. After timeout or mute, the same spike stays silent until traffic drops and crosses the limit again.

Checks run every second by default. Optional 100, 250, or 500 ms checks refresh a rolling one-second rate. Units are decimal (1 MB = 1,000,000 bytes). Monitoring starts only when you request it; opening the app or rebooting does not start monitoring.

[Release page and installation details](https://github.com/AYASHI-Company/Projects/releases/latest)

### Background monitoring

Allow unrestricted battery use for Data Watch in Android app settings. Monitoring uses battery and must be started again after a reboot or force stop. Phone sound settings and battery management can affect operation.

Some sensitive apps block overlays. Notification, sound, and battery settings can affect alerts.

No ads and no internet permission. Built and signature-verified on GitHub, with automated logic and Android emulator checks. Real-phone behavior has not yet been tested. The self-contained build workflow contains the Java sources and tests. Builds currently generate a temporary signing key; retain a private release key before adopting a regular update process.
