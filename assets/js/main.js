//- Noscript
document.querySelectorAll('.noscript').forEach(elem => {
    elem.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    const plist = require('simple-plist');

    // Shortcut for querySelector
    const qs = selector => document.querySelector(selector);

    const fileInput = qs('#file-upload');
    const fileName = qs('#file-name');
    const resetButton = qs('#reset-button');
    const configForm = qs('.config-form');
    const identifierField = qs('#payloadIdentifier');

    function userConfig(item) {
        let field = configForm.querySelector(`#${item}`);
        return field.value || field.dataset.defaultval;
    }

    function refreshIdentifier() {
        identifierField.dataset.defaultval = 'com.example.font-' + randomString();
    }

    function updateFileCount() {
        const files = fileInput.files;
        let text = files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : 'No files selected';
        fileName.textContent = text;
    }

    function generateConfig() {
        const files = fileInput.files;

        // Checks
        if (files.length === 0) {
            alert('No files selected.\nUpload some files first.');
            return;
        }

        // Build a payload for each font file
        let promises = Array.from(files).map(file => new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function(event) {
                let buffer = Buffer.from(event.target.result);
                resolve({ result: buffer, name: file.name });
            };
            reader.onerror = function(error) {
                console.error(error);
                reject(error);
                alert('There was an error reading the files.\nMaybe they are too big, or no longer exist?');
            };
            reader.readAsArrayBuffer(file);
        }));

        // Build the profile
        Promise.all(promises).then(payloads => {
            let config = {
                PayloadContent: payloads.map(payload => ({
                    Font: payload.result,
                    PayloadIdentifier: userConfig('payloadIdentifier') + '.' + payload.name,
                    PayloadType: 'com.apple.font',
                    PayloadUUID: generateUUID(),
                    PayloadVersion: 1
                })),
                PayloadIdentifier: userConfig('payloadIdentifier'),
                PayloadType: 'Configuration',
                PayloadUUID: generateUUID(),
                PayloadVersion: 1
            };
            if (userConfig('payloadDescription')) {
                config.PayloadDescription = userConfig('payloadDescription');
            }
            if (userConfig('payloadDisplayName')) {
                config.PayloadDisplayName = userConfig('payloadDisplayName');
            }

            let prof = plist.stringify(config);

            downloadFile(prof, 'font.mobileconfig', "application/x-apple-aspen-config");
        });

        // Refresh the identifier if it was used
        refreshIdentifier();
    }

    function downloadFile(data, filename, type) {
        let blob = new Blob([data], {type: type});
        let url = URL.createObjectURL(blob);
        download(url, filename);
    }

    function download(url, filename) {
        let downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function randomString() {
        return [...Array(6)].map(() => (~~(Math.random()*16)).toString(16).toUpperCase()).join('');
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    updateFileCount();
    refreshIdentifier();

    fileInput.addEventListener('change', updateFileCount);

    resetButton.addEventListener('click', () => {
        configForm.reset();
        refreshIdentifier();
        updateFileCount();
    });

    configForm.addEventListener('submit', event => {
        event.preventDefault();
        generateConfig();
    });
});
