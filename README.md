# SauceLab Demo Automation Project
Welcome to SauceLab Demo Automation Project !!! <br>
This is a sample project which is developed in Playwright and TypeScript.

## Table of Contents
- [Structure](#structure)
- [Environment Setup](#environment-setup)
- [IDE](#ide)
- [Execution commands](#execution)

## Structure
This project applied Page Object Model (POM) with 3A pattern (Arrange - Action - Assert).
The structure is below
```
Project Name
│── pages
|   |__ cart: contains cartPage which defines UI elements for Cart page.
│   ├── components: defines each common component, for example, header, menu.
│   ├── fixtures: defines the inital setup.
|   |__ products: contains product pages.
│   ├── page-name: contains each page to be used.
│── settings
│   ├── env
│   │   ├── env.local: defines the local environment variables.
│── testcases: contains the list of test cases in Excel file.
│── tests: contains the list of automation tests.
│── readme: the instructions
```

## Environment Setup
- NodeJS version: v22+ (currently v22.14.0)

## IDE
- Visual Studio Code (VS Code)
- VSCode Playwright Extensions: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

## Execution
- All environment variables are defined in .env file located in `./settings/env` folder</br>
- Install necessary node packages:
    ```
    npm install
    ```
- Install Playwright dependencies:
    ```
    npx playwright install
    ```
- Execute all tests:
    ```
    npx playwright test
    ```
- Execute test by tag:
    ```
    npx playwright test -g "@login"
    ```
- View the executed result
    ```
    npx playwright show-report
    ```