In this project let's build a **Covid19 Dashboard** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a **class component**, displaying that data, using **component lifecycle** methods, **routing** concepts and adding responsiveness to the website.

This is an individual assessment. All work must be your own. You will also be given feedback by code reviewers after your project submission.

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view the UI Prerequisites</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">Website</a>.
- Create a Free account in Figma
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a Free Figma account.
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in the Figma screen.
- Export Images in Figma screen
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from the Figma screen.
  - Check <a href="https://help.trydesignlab.com/hc/en-us/articles/360011010634-How-do-I-export-images-and-PDFs-from-Sketch-or-Figma-in-my-short-course-" target="_blank">this</a> reference docs to export images in Figma screen.

</details>


#### Design Files

<details>
<summary>Click to view the Design Files</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/lGl9tRXcsmxicjTITM2A8P/Covid19_Dashboard?node-id=0%3A1" target="_blank" >here</a>.

</details>

### Project Set Up Instructions

<details>
<summary>Click to view the Set Up Instructions</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Project Completion Instructions

<details>
<summary>Click to view the Functionality to be added</summary>

#### Add Functionality

The app must have the following functionalities

- Users should be able to navigate to Home, About routes using links in Navbar.
- Users should be able to view the website responsively in mobile view, tablet view as well.
- Home Route
  - Users should be able to see stats of confirmed, active, recovered, deceased cases in India.
  - Users should be able to navigate to home route when clicking on **COVID19INDIA** logo.
  - Users should be able to see state wise confirmed, active, recovered,deceased cases in a table.
  - Users should be able to sort the stats based on States/UT.
  - Users should be able to see Home with highlighted text in Navbar.
  - Users should be able to see the footer as shown in figma.
- Search Functionality
  - Users should be able to search across all states in India and see the suggestions as a dropdown.
  - Users should be able to navigate to a State Specific Page after clicking on the suggestion.
  - When the users clicks on a state suggestion, it should open a new page with respective state details.
- State Specific Route
  - Users should be able to see the state name and last updated date.
  - Users should be able to see stats of confirmed, active, recovered, deceased cases in specific states.
  - Users should be able to see the tested count.
  - Users should be able to see Top districts for confirmed, active, recovered,deceased cases.
  - Users should be able to see spread trends for both cumulative and daily.
  - Users should be able to see dropdown in spread trends to select different districts.
  - Users should be able to see the footer as shown in figma.
- About Route
  - Users should be able to see faqs.
  - Users should be able to see About with highlighted text in Navbar.
  - Users should be able to see the footer as shown in figma.


</details>

### Stretch Goals

If you complete the main features of the project you can try out the below features as well. 

**Note:** Just a reminder the additional functionality is just extra practice using the tools we have learned. These are not required. If you do not reach the stretch goals, don't worry.

<details>
<summary>Click to view the Additional Functionality that can be added</summary>

- Users should be able to see Themes (Light & Dark) in Navbar.
- State Specific Route
  - Users should be able to see India maps with highlighting states.
- Vaccination Details Route
  - Users should be able to see dropdowns to select state and district.
  - Users should be able to see Sites Conducting Vaccination, Total Registrations, Total Vaccination Doses sections.
  - Users should be able to see Vaccination Trends for both by doses and ages section.
  - Users should be able to see Vaccination Details with highlighted text in Navbar.
</details>

### Quick Tips

<details>
<summary>Click to view the list of Quick Tips</summary>

- Use React Charts package to implement given charts
  - React charts <a href="https://www.npmjs.com/package/recharts" target="_blank" >Documentation</a>.
  - Line chart implementation <a href="https://codesandbox.io/s/dark-theme-switch-forked-6keo4?file=/src/Dashboard/Chart.js" target="_blank">CodeSandbox</a>.
  - Multi area chart implementation <a href="https://codesandbox.io/s/react-chartjs-2-line-chart-example-forked-kzspl?file=/src/App.js" target="_blank">CodeSandbox</a>.
- Implement Select fields using this package
  - React select <a href="https://www.npmjs.com/package/react-select/v/2.4.3" target="_blank">Documentation</a>.
  - React select implementation <a href="https://codesandbox.io/s/react-select-dropdown-example-forked-su3x2?file=/package.json:253-258" target="_blank">CodeSandbox</a>.
- Usage of extracting date wise stats <a href="https://codepen.io/nagendra1037/pen/xxqyjgW?editors=0111" target="_blank">Codepen</a>.
</details>


### Data Fetch URLs

<details>
<summary>Data fetch URLs</summary>


- Home Route:
  - Get stats of confirmed, active, recovered, deceased cases in India:

    ```js
    "https://api.covid19india.org/v4/min/data.min.json"
    ```

  - Get stats of confirmed, active, recovered, deceased cases state wise:

    ```js
    "https://api.covid19india.org/v4/min/data.min.json"
    ```

- State-Specific Route: 
  - Get tested count, last updated:

    ```js
    "https://api.covid19india.org/v4/min/data.min.json" 
    //(use state code)
    ```
  - Get stats of confirmed, active,recovered, deceased cases in specific states:

    ```js
    "https://api.covid19india.org/v4/min/data.min.json" 
    //(use state code)
    ```
  - Get districts (sort to show Top Districts):

    ```js
    "https://api.covid19india.org/v4/min/data.min.json" 
    //(use state code)
    ```
  - Get timelines to show spread trends:

    ```js
    "https://api.covid19india.org/v4/min/timeseries-AP.min.json" 
    //(change state code in URL for other states)
        //(or)
      "https://api.covid19india.org/v4/min/timeseries.min.json" 
      //(use state code)
    ```
- About Route:
  - Get faqs:

    ```js
    "https://api.covid19india.org/website_data.json"
    ```
- Vaccination Details Route:
  - Get states data:

    ```js
    "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    ```
  - Get Districts data (state specific):

    ```js
    "https://cdn-api.co-vin.in/api/v2/admin/location/districts/2"
    //(change state id in URL)
    ```
  - Get sites conducting vaccination, total registrations, total vaccination, vaccination trends, vaccination - category, vaccination by age Details:

    ```js
    "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=1&district_id=&date=2021-06-12"
    //(change date in URL)
    ```


</details>

### Deployment

Use the command `ccbp publish RJSCPAUCLT sample.ccbp.tech` to deploy your project.

	
### Project Submission Instructions

- You dont need to submit this project. This will be done at your own pace.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a
>   look at the Cheat Sheets.