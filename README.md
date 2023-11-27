<p align="center">
  <img src="/assets/tazkeer_banner_dark.png" alt="Tazkeer Banner">
</p>

<div align="center">
    <h1>
        Tazkeer
    </h1>
    <div>
        This project was created as part of the <a href="https://www.tech-sisters.com/">Tech Sisters</a> hackathon 2023.
    </div>
  <br/>
  <br/>
    <strong> The Team </strong>
    <p>
     <a href="https://github.com/annoinspace">Aneesah Khan</a>,  
     <a href="https://github.com/mariberg">Marika Bergman</a>,
      <a href="https://github.com/rawanshisht">Rawan El-Shishtawy</a>, 
      <a href="https://github.com/hiboibrahim">Hibo Ibrahim</a> 
    </p>
</div>
 
  <div>
   <h1>
     Contents
   </h1>
<ul>
 <li><a href="#idea">The Idea</a></li>
    <li><a href="#audience">The Audience</a></li>
    <li><a href="#solution">The Solution</a></li>
    <li><a href="#prototype">The Prototype</a></li>
    <li><a href="#usage">Usage</a></li>
  
</ul>
  </div>
  <br/>
  <br/>
<div>
  <h2 id="idea">
    The Idea
  </h2>
  <p>
    A product that will be of benefit to the muslim community, focusing on Qur'an memorisation and a female audience.
  <p>
  <br/>
  <br/>
      <h2 id="audience">
    Why a female audience?
  </h2>
  <p>
    We intend to create a community around Qur'an memorisation, and believe that keeping our focus to Muslim women will allow us to create a community that is inline with our beliefs around hayā (modesty). Having this clear boundary will give our users comfort, and allows us to create an application that speaks to our audience, and informs our decisions.
<br/>
    <br/>
   Furthermore, women, particularly those with household or childcare responsibilities, might find it challenging to attend regular Quran study classes. An app allows them to learn and practice at their own pace and in the comfort of their homes. The community element of the application can keeps such women motivated and allows them to feel the same support and encouragement from attending live classes.
  <p>
  <br/>
  <br/>
  <h2 id="solution">
    The Solution
  </h2>
  <p>
  For many Muslims, memorizing the Quran is a deeply valued religious goal.
    <br/>
    <br/>
    We wanted to create an application that helped users to track their Qur'an memorisation, 
   and provided insights to their progress. This application is needed so that users can take 
    accountability for their memorisation and view their weak points, and improve them. This targeted approach can be more effective than general methods, as we remind users of their weak points.
    <br/>
    <br/>
    With the increasing use of technology in education, such an app aligns with modern learning trends, utilizing tools interactive tests and visual pointers to enhance the learning experience.
  
  <br/>
   <br/>
  With this in mind, we defined the following criteria for Tazkeer:
      <ul>
      <li>The user shall complete daily tests with a focus on their weaker Surahs.</li>
      <li>The user shall have the opportunity to take initiative and engage in their own self-initialised tests.</li>
      <li>The user shall have get personalised reports and insights of their Qur'an history.</li>
      <li>The user shall have be part of a community of like-minded Muslim women who are actively engaging in strengthening their memorisation.</li>
    </ul>
  <p>
  <br/>
  <br/>

  <h2 id="prototype">
    The Prototype
  </h2>
  <p>
  The prototype has been built and designed as a mobile-first fullstack web application, as this would make the transition to a mobile app much smoother.
<br/>
 <br/>


The following diagram illustrates the broader app flow. It was essential to create a smooth user experience, so we mapped out the user journey and designed a simple yet attractive interface.
<br/>
<br/>
<img src="/assets/app-flow-complete.png" alt="app flow complicated">

From this flow, we implemented the core functionality which is illustrated by this simplified diagram:
<br/>
<br/>
<img src="/assets/app-flow.png" alt="app flow">
<br/>
The below diagram provides an overview of the architectural design for our prototype. 
<br/>
<br/>
We made the decision to use Firebase for efficient user authentication, both on the frontend and backend.
<br/>
<br/>
React was implemented on the frontend for it's ability to create reusable components which make up much of the UI, and for it's compatibility with a larger ecosystem. We intend to launch Tazkeer as a mobile app, so the transition to React Native will be advantageous.
<br/>
<img src="/assets/architecture-diagram.png" alt="architecture diagram">
</div>
<br/>
<br/>

<h2 id="usage">
  🏁 Get up and running:
</h2> 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites:
You will need access to the database from the team if working with the a local backend.

### Installing:
Navigate to the frontend or backend directory.

For example, if working on the frontend:

1. `cd frontend-react` <br/>
2. `npm install` <br/>
3. `npm start`
<br/>
If working on the backend, you can use the command `npm run dev` to work with the development environment. 
<br/>
<strong>note: </strong>

### When running Git commands:

Ensure you're at the root directory of the project to execute Git commands. This step is crucial as Git operates based on the current directory.
