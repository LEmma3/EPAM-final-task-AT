# EPAM-final-task-AT
This repository contains end-to-end automated tests for the Sauce Demo web application, focusing on inventory sorting validation and cart state management. The tests are implemented using WebDriverIO (WDIO) with the Page Object Model (POM) pattern, and they run in parallel on Firefox and Edge.

# Sorting Validation Test (UC-1)

## Overview
This test validates the **sorting functionality** of the product inventory page on [https://www.saucedemo.com/](https://www.saucedemo.com/).

The goal is to ensure that when a user selects **"Price (low to high)"**, the displayed product prices are correctly sorted in ascending order.

## Test Flow

1. Open the application
2. Log in using valid credentials:
   - Username: `standard_user`
   - Password: `secret_sauce`
3. Wait for the inventory page to load
4. Select sorting option:
   - **"Price (low to high)"**
5. Extract all product prices from the page
6. Convert prices from string format (e.g. `$29.99`) to numbers
7. Validate that the list is sorted in ascending order

## Validation Logic

### Step 1: Collect Prices

All price elements are located and stored:

const priceElements = await $$('//div[@data-test="inventory-item-price"]');

### Step 2: Convert Prices

Each price is read as text, the $ symbol is removed and converted to a number.

### Step 3: Verify Sorting

The test checks that each price is less than or equal to the next one.
