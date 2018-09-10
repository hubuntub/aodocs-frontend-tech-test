# AODocs front-end technical test

This project is about assessing front-end developers abilities.

## Getting Started

### Prerequisites

For this project you should have the latest Long Term Support version of [Node.js and npm](https://nodejs.org/en/) installed on your computer. Don't hesitate to use `nvm` for a quick update.
Then you can clone this repository and navigate to its root folder.

### Installing

In the root folder, run
```
npm install
```
to install all the npm packages needed for the project.

Then run
```
npm run serve
```
to start the local server which will serve the project.
It should open a tab in you browser on http://localhost:3000/.

## Test Objectives

The applicant should try to complete the objectives below in the listed order.

* List the first 25 [Files](https://developers.google.com/drive/api/v3/reference/files) from Drive for the current user.
* Display Files as a list with the following informations: Title / Modification Date (relative time) / Thumbnail.<sup>[1](#myfootnote1)</sup>
* It should be possible to open Files in new tab by clicking on thumbnail.
* It should be possible to select one or more Files in the list.
* Add an option to star/unstar selected Files.
* Add pagination with next/previous pages.
* Add a way to download the selected files as a ZIP archive.

<a name="myfootnote1">1</a>: You will need to use the fields parameter to retrieve the Modification date and the Thumbnail url.
## Useful link

* Link to Drive API: https://developers.google.com/drive/api/v3/reference/

## Notes

You can use either the main.js or main.ts file depending on your familiarity with Typescript.
By default the main.js file is used. If you want to use Typescript, open the index.html file and comment the main.js / uncomment the main.ts file.

You can use all the packages you want for this test.

