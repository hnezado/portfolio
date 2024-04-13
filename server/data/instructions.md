# Instructions to add a new project

File to Edit:

    /server/data/projects.json

## Template

```json
{
  "name": "<app-name>",
  "fullName": "<app-name-to-display>",
  "description": "<full-description>",
  "url": "<url-to-app>",
  "github": "<github-repo-url>",
  "imgsQty": <number-of-images>,
  "technologies": ["<used-technologies>"]
}
```

## Description

- **name**: [string] Short app name.
- **fullName**: ["string"] Full application name to be displayed.
- **description**: ["string"] Full description of your application's features. This field supports HTML code for formatting.
- **url**: [string] App hosting URL, or leave empty if it's a downloadable app (e.g., zip file with an executable).
- **github**: [string] GitHub repository URL.
- **imgsQty**: [integer] Number of GIF images included in _/client/data/projects/project-name/_ folder. Any additional images beyond 'imgsQty' will be disregarded.
- **technologies**: [list-of-strings] List of technologies used in your app.

## Example:

```json
{
  "name": "myApp",
  "fullName": "My App",
  "description": "This a description of all the app features.",
  "url": "https://my-hosted-app.org",
  "github": "https://github.com/username/myApp",
  "imgsQty": 5,
  "technologies": ["Python", "Flask", "HTML", "CSS"]
}
```
