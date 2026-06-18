# 360 Viewer

A web-based 360° image viewer built with Angular, allowing users to load and interact with panoramic content through a responsive and modern interface.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (>= v22.22.3)
- Yarn
- Angular CLI (v22.0.0)

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

Example:

```typescript
export const environment = {
  projectsUrl: 'https://example.com/projects.json',
};
```

> The application may fail to start or function correctly if environment variables are missing or incomplete.

## Data Structure

The viewer loads data using a hierarchical structure:

```text
Environment
└── Projects List
    └── Project
        └── Config
            └── Scenes
                └── Media Source
```

### 1. Projects List

The environment configuration must define a reference to a projects list.

Example:

```typescript
export const environment = {
  projectsUrl: 'https://example.com/projects.json',
};
```

Example projects list:

```json
[
  {
    "id": "project-1",
    "name": "Demo Project",
    "configRef": "https://example.com/project-1/config.json"
  }
]
```

### 2. Project Configuration

Each project must contain a `config` reference that points to its configuration file.

Example:

```json
{
  "id": "project-1",
  "name": "Demo Project",
  "configRef": "https://example.com/project-1/config.json"
}
```

### 3. Config Structure

Each project configuration must define a `sceneRef`.

The `sceneRef` acts as the base location (prefix) for all scenes belonging to that project.

Example:

```json
{
  "sceneRef": "https://example.com/project-1/scenes"
}
```

### 4. Scene Resolution

All scenes for a project must be available under the configured `sceneRef`.

For example, given:

```json
{
  "sceneRef": "https://example.com/project-1/scenes"
}
```

A scene with ID `scene-001` must be accessible through one of the following:

#### Endpoint

```text
https://example.com/project-1/scenes/scene-001
```

#### JSON File

```text
https://example.com/project-1/scenes/scene-001.json
```

The viewer expects scenes to be retrievable from the configured scene location.

### 5. Scene Structure

Each scene must include a media source URL that points to the asset displayed by the viewer.

Example:

```json
{
  "id": "scene-001",
  "name": "Example Scene",
  "type": "panorama",
  "url": "https://cdn.example.com/panoramas/scene-001/{z}/{f}/{y}/{x}.jpg"
}
```

### Example Complete Flow

```text
environment.projectsUrl
        │
        ▼
projects.json
        │
        ▼
project.config
        │
        ▼
config.json
        │
        └── sceneRef = https://example.com/project-1/scenes
                     │
                     ▼
       https://example.com/project-1/scenes/scene-001.json
                     │
                     ▼
                scene.url
                     │
                     ▼
                  media
```

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
- Dynamic project and scene loading
- Project list landing page
- Project landing page with templates
- Environment-based configuration
- Remote scene resolution
- Responsive UI
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

Ensure:

- Environment files exist.
- `projectsUrl` is configured.
- `langs` and `defaultLang` are configured.
- Every project contains a valid `configRef` reference.
- Every config contains a valid `sceneRef`.
- Every scene is accessible from the configured `sceneRef`.
- Every scene contains a valid media source URL.

## Development Notes

- Use Yarn for dependency management.
- Keep environment files synchronized across development and production configurations.
- Do not commit sensitive configuration values to source control.
- Verify all referenced project, config, and scene endpoints are publicly accessible or properly authenticated.
