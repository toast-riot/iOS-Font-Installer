<h1 align="center">iOS Printer Installer</h1>
A minimalist webpage for installing IPP printers on iOS / iPadOS devices. Runs entirely client-side.

### [You can check it out here!](https://emilcarr.scot/iOS-Printer-Installer/)

## Instructions
1. **Get the printer address**
    - University of Glasgow Students can find their unique IPP address at [mobileprint.gla.ac.uk/](https://mobileprint.gla.ac.uk/driverprint.cfm?platform=macosx&printmode=3). Click on 'Driver Print'->Select Mac OSX->Find your unique printer address and resource location on this page.

2. **Paste it in**
    - Type all the info into the appropriate fields.
    - Remove ipp:// or ipps:// from the printer address, if this is relevant. iOS infers this from the 'Use TLS' value.
    - The 'Resource Location' will be everything after the first '/'.
    - University of Glasgow Students: Leave 'Use TLS' unchecked, port 631.

3. **Configure Profile (Optional)**
    - Optionally, define a name, description, and identifier for the font.
    - The name and description are for your reference, but the identifier will be used to determine whether to replace existing profiles.

4. **Generate and Install the Profile**
    - Click the **Generate profile** button.
    - **If using a desktop browser:** A configuration profile will be downloaded. Transfer the profile to the mobile device, then tap on it in the [Files](https://apps.apple.com/us/app/files/id1232058109) app.
    - **If using Safari:** You will be prompted to install the profile. Tap "Allow".
    - On the mobile device, open the Settings app. Tap "Profile Downloaded", then follow the installation instructions.