# SauceLab Demo Automation Project
This repository contains the automation scripts in Playwright and TypeScript.

## Table of Contents
- [Environment Setup](#environment-setup)
- [IDE](#ide)
- [Execution](#execution)

## Environment Setup
- NodeJS version: v22+ (currently v22.14.0)

## IDE
- Visual Studio Code (VS Code)
- VSCode Playwright Extensions: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

## Execution
- All environment variables are defined in .env file located in `./settings/env` folder</br>
- Install necessary node packages:
    ``` bash
    npm install
    ```
- Install Playwright dependencies:
    ``` bash
    npx playwright install
    ```
- Execute all tests:
    ``` bash
    npx playwright test
    ```
- Execute test by tag:
    ``` bash
    # Run test by tag
    # Ex: npx playwright test -g "@home"
    npx playwright test -g "@tag-name"

    # Run test by excluding tag
    # Ex: npx playwright test --grep-invert "@obsolete"
    npx playwright test --grep-invert "@tag-name"
    ```
- View the executed result
    ```bash
    npx playwright show-report
    ```