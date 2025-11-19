# Contributing to the Project

First and foremost, thank you for your interest in contributing! We are excited to welcome new contributors. This document provides a guide to help you get involved.

By participating, we expect you to follow our [**Code of Conduct**](CODE_OF_CONDUCT.md).

## How to Contribute

-   **Reporting Bugs**: If you find a bug, please open an issue using the **Bug Report** template.
-   **Suggesting Enhancements**: For new features or improvements, open an issue using the **Feature Request** template.
-   **Improving Documentation**: If you find any part of our documentation unclear or incomplete, feel free to suggest changes.

Before starting any implementation, please discuss the change you wish to make via the corresponding issue.

## Development Workflow

### Branching Strategy

Create a new branch from `main` for every new feature or bug fix. Use a descriptive prefix, such as:

-   `feat/new-feature`
-   `fix/bug-fix`
-   `docs/update-readme`
-   `chore/maintenance-task`

### Code Style and Quality

We enforce a consistent code style using automated tools. Please run them before committing your changes.

-   **Comments**: Add comments only when strictly necessary to explain complex logic.

#### Backend (Python / Django)

-   **Dependencies**: Managed with `uv` in `api/pyproject.toml`.
-   **Linting & Formatting**: Follow standard Django conventions and the **PEP 8** style guide.

#### Frontend (TypeScript / React)

-   **Dependencies**: Managed with `pnpm` in `app/package.json`.
-   **Linting & Formatting**: We use **Biome** for linting and formatting.

### Testing

Tests are mandatory.

-   **Backend Tests**: Written using Django's native test framework.
-   **Frontend Tests**: Written using **Vitest**.

## Pull Request (PR) Process

### Step 1: Pre-submission Checklist

Before opening a PR, please ensure you have completed the following:

-   [ ] The code is correctly formatted and passes all linter checks.
-   [ ] The application starts and runs without errors.
-   [ ] You have written new tests for your changes.
-   [ ] You have updated the `README.md` if you introduced changes to the interface or environment variables.
-   [ ] You have ensured that any new install or build dependencies are properly added to `pyproject.toml` or `package.json`.

### Step 2: Open the Pull Request

-   Push your branch to your fork and open a Pull Request against the `main` branch.
-   Provide a clear and descriptive title and explain the **why** and **what** of your change.

### Step 3: Code Review and Merging

-   The project maintainers will review your code.
-   Once your PR is approved, it will be merged.

Thank you for contributing!
