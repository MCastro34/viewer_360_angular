# 360 Viewer

A web-based 360° image viewer built with Angular, allowing users to load and interact with panoramic content through a responsive and modern interface.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (>= v22.22.3)
- Yarn
- Angular CLI (v22.0.0.0)

Verify installations:

```bash
node --version
yarn --version
ng version
```

## Installation

Clone the repository and install dependencies using Yarn:

```bash
git clone <repository-url>
cd <project-folder>
yarn install
```

## Environment Configuration

Before starting the application, ensure all environment files exist and are properly configured.

Required files:

```text
src/environments/environment.ts
src/environments/environment.development.ts
```

Verify that all required configuration values are populated, including:

- API endpoints
- Feature flags
- Authentication settings
- Viewer configuration options

Example:

```typescript
export const environment = {
  projectsUrl: '',
};
```

> The application may fail to start or function correctly if environment variables are missing or incomplete.

## Running the Application

Start the development server using either of the following commands:

### Angular Serve

```bash
ng serve
```

### Angular Dev

```bash
ng dev
```

The application will be available at:

```text
http://localhost:4200
```

## Building

Create a production build:

```bash
ng build
```

Build artifacts will be generated in the `dist/` directory.

## Project Structure

```text
public/
src/
├── app/
├── environments/
├── styles/
├── styles.css
└── main.ts
```

## Features

- 360° panoramic image viewing
- Smooth navigation controls
- Responsive UI
- Environment-based configuration
- Angular standalone architecture support

## Troubleshooting

### Missing Dependencies

If dependencies are not installed correctly:

```bash
rm -rf node_modules
rm yarn.lock
yarn install
```

### Environment Errors

Ensure all required environment files exist and contain valid configuration values.

## Development Notes

- Use Yarn for dependency management.
- Keep environment files synchronized across development and production configurations.
- Do not commit sensitive configuration values to source control.
