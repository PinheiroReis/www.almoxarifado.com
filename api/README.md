# API

This directory contains the backend of the application, which is a [Django](https://www.djangoproject.com/) project.

## Technologies

-   **Framework**: Django
-   **Language**: Python
-   **Dependency Management**: uv

## Getting Started

1.  Install dependencies:
    ```bash
    uv sync
    ```
2.  Run the development server:
    ```bash
    uv run python manage.py runserver
    ```

## Scripts

The `api/scripts` directory contains utility scripts to help with development:

-   `genenv.sh`: Generates the `.env` file from `.env.example`.
-   `setup.sh`: Performs initial project setup, including dependency installation and database migrations.
-   `start.sh`: Starts the Django development server.
-   `test.sh`: Runs the Django test suite.
