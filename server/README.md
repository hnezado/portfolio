# Portfolio

    My Creative Hub: Where All of My Projects Come Together

---

## Instructions to add a project

Fill every attribute in /server/data/projects.json following the next template:

{
"name": "<project-name>",
"fullName": "<project-name-to-display>",
"description": "<full-description>",
"url": "<url-to-app>",
"imgs": {
"name": "<image-base-filename>",
"numberOfImgs": <total-number-of-images>
}
}

Details:

- description will be taken as HTML so tags will work
- imgs will create x paths using the image base filename, "-" and a number. Example -> Having imgs.name=img and imgs.numberOfImgs=4 will create: ["path/img-1", "path/img-2", "path/img-3", "path/img-4"]

### Example:

{
"name": "myProject",
"fullName": "My Project",
"description": "This a description of all the project features.",
"url": "https://my-project.org",
"imgs": {
"name": "pr",
"numberOfImgs": 4
}
}
