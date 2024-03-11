# Enhance 10x Genomics Page with Text-Based Fast Download and Log
![preview](https://github.com/aqlkzf/typoraimg/raw/main/img_office/2024/03/11/354cb96c7436eaa75c6f3cf8579009df-image-20240311203153670-4668fe.png)
## 使用说明

### 安装步骤

1. **安装 Tampermonkey 扩展**：
   - 首先，在你的浏览器中安装 Tampermonkey 扩展程序。你可以从 Chrome Web Store（对于 Chrome 浏览器）或 Firefox Add-ons（对于 Firefox 浏览器）搜索并安装。
   - 安装后，请确保 Tampermonkey 扩展已在浏览器中启用。

2. **获取脚本**：
   - 访问脚本的 GitHub 页面：[Enhance 10x Genomics Page Script](https://raw.githubusercontent.com/aqlkzf/download_10Xdata/main/download_script.js)

3. **复制脚本代码**：
   - 将显示的原始脚本代码全选（Ctrl+A 或 Cmd+A），然后复制（Ctrl+C 或 Cmd+C）到剪贴板。

4. **安装脚本到 Tampermonkey**：
   - 在浏览器中打开 Tampermonkey 扩展，并点击“添加新脚本”按钮。
   - 在打开的脚本编辑器中，粘贴（Ctrl+V 或 Cmd+V）之前复制的脚本代码。
   - 点击编辑器界面上的“文件”菜单，选择“保存”，或直接点击工具栏上的“保存”按钮（通常显示为磁盘图标）。

5. **使用脚本**：
   - 安装脚本后，当你访问 10x Genomics 网站时，脚本会自动运行，点击fast download给出下载数据更快的shell 脚本。



### 即将发布于 Greasy Fork




## Introduction
This Tampermonkey script is specifically designed for the 10x Genomics website, aiming to improve the data download process for researchers. By automating the clicking of "Batch download" and "curl" options and adding a "Fast Download" button, it provides an efficient way to generate and copy a bash script for downloading data files. This enhancement reduces the complexity of obtaining data, allowing users to focus more on their research.

## Features
- Automatically clicks on "Batch download" and "curl" options.
- Adds a "Fast Download" button for easy access.
- Displays a bash script for fast data download on button click.
- Includes a copy function for the bash script, facilitating easy use.

## How to Install
1. Ensure you have Tampermonkey installed in your browser.
2. Click on the script link ([link](https://raw.githubusercontent.com/aqlkzf/download_10Xdata/main/download_script.js)).
3. Tampermonkey should open a new tab asking if you want to install the script. Click on "Install".

## Usage
After installation, navigate to any product page on the 10x Genomics website. The script runs automatically:
- It clicks "Batch download" and "curl" for you.
- Click on the "Fast Download" button that appears.
- A bash script will be displayed, ready to be copied with a click and used for downloading data files.

## Support
For issues, suggestions, or contributions, please open an issue in the GitHub repository (link to your GitHub repository).

## Author
fuyao

## License
This script is released under the MIT License. See the LICENSE file in the repository for more details.
