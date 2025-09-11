# Dev Container Configuration

This project includes configuration for running in a dev container, which provides a consistent development environment.

## Prerequisites

- Docker
- Visual Studio Code
- Remote - Containers extension for VS Code

## Using the Dev Container

1. Open the project in VS Code
2. When prompted, click "Reopen in Container", or:
   - Open the Command Palette (Ctrl+Shift+P)
   - Run "Dev Containers: Reopen in Container"

## What's Included

- Node.js 20
- Yarn package manager
- PNPM package manager
- All VS Code extensions needed for Vue development
- Pre-configured ESLint and Prettier
- Nginx server for testing production builds

## Available Scripts

Once inside the container, you can run:

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint:all` - Run all linters

## Ports

- 3100: Development server
- 8080: Alternative development server port
- 80: Nginx server for production preview

## Customization

You can modify the `.devcontainer/docker-compose.yml` file to change the container configuration.