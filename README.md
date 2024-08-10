# iOS Font Installer
A minimalist webpage for installing fonts on iOS devices. Runs entirely client-side.

### [You can check it out here!](https://toast-riot.github.io/iOS-Font-Installer/)

## Instructions
1. **Download the Font**
    - Download the font you want to install. Recommended sources include [Google Fonts](https://fonts.google.com) or [Dafont](https://www.dafont.com).
    - Ensure the font files are in `.ttf` or `.otf` format. If not, you can convert them using an online tool such as [Convertio](https://convertio.co), [CloudConvert](https://cloudconvert.com), or [FontConverter](https://www.fontconverter.io).

2. **Select the Files**
    - Click the "Select files" button and select the font files.
    - If the font includes variations (e.g. Regular, Bold, Italic), select all of them.

3. **Configure Profile (Optional)**
    - Optionally, define a name, description, and identifier for the font.
    - The name and description are for your reference, but the identifier will be used to determine whether to replace existing profiles.

4. **Generate and Install the Profile**
    - Click the **Generate profile** button.
    - **If using a desktop browser:** A configuration profile will be downloaded. Transfer the profile to the mobile device, then tap on it in the [Files](https://apps.apple.com/us/app/files/id1232058109) app.
    - **If using Safari:** You will be prompted to install the profile. Tap "Allow".
    - On the mobile device, open the Settings app. Tap "Profile Downloaded", then follow the installation instructions.

## Disclaimer
This tool does *not* change the system font of the device. Changing the system font is not possible on iOS without exploits.

The fonts installed using this tool can only be used within apps that support custom fonts, such as many design apps (Procreate, Keynote, Pages) and text editors (Runestone, Textastic).
