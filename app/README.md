# App

This directory contains the frontend of the application, which is a [React](https://react.dev/) project created with [Vite](https://vitejs.dev/).

## Technologies

-   **Framework**: React
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **Package Manager**: pnpm
-   **Linting and Formatting**: Biome

## Getting Started

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Run the development server:
    ```bash
    pnpm dev
    ```

## Scripts

The `app/scripts` directory contains utility scripts to help with development:

-   `genenv.sh`: Generates the `.env` file from `.env.example`.
-   `setup.sh`: Performs initial project setup, including dependency installation.
-   `start.sh`: Starts the React development server.
-   `test.sh`: Runs the Vitest test suite.
