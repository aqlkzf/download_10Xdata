// ==UserScript==
// @name         Enhance 10x Genomics Page with Text-Based Fast Download and Log
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks "Batch download", "curl", adds "Fast Download" button, and displays bash script on click with a copy function.
// @author       fuyao  
// @match        https://www.10xgenomics.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let curlButtonId = '';
    function replaceCurlContentWithBashScript(bashScriptContent) {
        // Find the active tab panel
        const activeTabPanel = document.querySelector('.react-tabs__tab-panel.Active');

        // Within the active panel, find the div that contains the curl commands
        const curlCommandsDiv = activeTabPanel.querySelector('div.css-l3s524');
        console.log(curlCommandsDiv)

        if (curlCommandsDiv) {
            // Replace the div's content with the bash script content
            curlCommandsDiv.innerHTML = `${bashScriptContent}`;
        } else {
            console.error('Could not find the curl commands div.');
        }
    }


    function extractFolderNameFromUrl(url) {
        const match = url.match(/\/([^\/]+)\/[^\/]*$/);
        if (match && match.length > 1) {
            return match[1];
        }
        return '10x_data';
    }

    function extractUrlsFromCurlCommands(commandsText) {
        const urlRegex = /curl -O (\S+)/g;
        let match;
        const urls = [];
        while ((match = urlRegex.exec(commandsText)) !== null) {
            urls.push(match[1]);
        }
        return urls;
    }

    function generateBashScript(urls) {
        const folderName = extractFolderNameFromUrl(urls[0]);
        let script = `#!/bin/bash

# 定义下载文件夹的名称
folder_name="${folderName}"

# 创建文件夹并进入
mkdir -p "$folder_name"
cd "$folder_name"

# 下载文件列表
`;

        urls.forEach(url => {
            script += `curl -O "${url}" &\n`;
        });

        script += `
# 等待所有后台下载任务完成
wait

echo "所有文件已下载完成。"
`;
        return script;
    }

    function addFastDownloadButton(bashScriptText) {
        const tabList = document.querySelector('.css-7hd0xg ul[role="tablist"]');
        if (!tabList) return;

        const fastDownloadLi = document.createElement('li');
        fastDownloadLi.textContent = 'Fast Download';
        fastDownloadLi.className = 'css-2kkjgs';
        fastDownloadLi.style.cursor = 'pointer';
        fastDownloadLi.style.alignItems = 'center';
        fastDownloadLi.setAttribute('role', 'tab');
        fastDownloadLi.setAttribute('aria-selected', 'false');
        fastDownloadLi.setAttribute('aria-disabled', 'false');
        fastDownloadLi.setAttribute('aria-controls', 'react-tabs-custom-fast-download');
        fastDownloadLi.setAttribute('data-rttab', 'true');
        tabList.appendChild(fastDownloadLi);

        const newTabPanelId = 'react-tabs-custom-fast-download';
        const newTabPanel = document.createElement('div');


        fastDownloadLi.addEventListener('click', function () {
            // Using the recorded 'curl' button id to find and click the 'curl' button
            if (curlButtonId) {
                const curlBtn = document.getElementById(curlButtonId);
                if (curlBtn) {
                    curlBtn.click();
                    setTimeout(() => {
                        replaceCurlContentWithBashScript(bashScriptText);
                    }, 500);
                } else {
                    console.error('"curl" button not found with the recorded id.');
                }
            } else {
                console.error('No "curl" button id recorded.');
            }
        });
    }

    // Your existing window.addEventListener('load', ...) function here
    window.addEventListener('load', () => {
        setTimeout(() => {
            const batchDownloadBtn = Array.from(document.querySelectorAll('li')).find(li => li.textContent.trim() === 'Batch download');
            if (!batchDownloadBtn) {
                console.error('"Batch download" button not found.');
                return;
            }

            batchDownloadBtn.click();
            console.log('"Batch download" clicked.');

            setTimeout(() => {
                const curlBtn = Array.from(document.querySelectorAll('.css-7hd0xg ul[role="tablist"] li')).find(li => li.textContent.trim() === 'curl');
                if (!curlBtn) {
                    console.error('"curl" button not found.');
                    return;
                }

                curlButtonId = curlBtn.getAttribute('id');


                curlBtn.click();
                console.log('"curl" clicked.');

                setTimeout(() => {
                    const activePanel = document.querySelector('.react-tabs__tab-panel.Active');
                    if (!activePanel || !activePanel.querySelector('div.css-l3s524')) {
                        console.error('"# Input Files" text not found.');
                        return;
                    }

                    const commandsText = activePanel.querySelector('div.css-l3s524').innerText;
                    const urls = extractUrlsFromCurlCommands(commandsText);
                    const bashScriptText = generateBashScript(urls);
                    addFastDownloadButton(bashScriptText);
                }, 2000); // Adjust timing as necessary for "curl" content to load
            }, 2000); // Adjust timing as necessary for Batch download content to load
        }, 1000); // Start after ensuring the page has loaded
    });
})();



