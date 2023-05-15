Create a new directory for your project.
Open a terminal or command prompt, navigate to the project directory, and run the following command to initialize a new React project:
npx create-react-app word-frequency

Once the command completes, navigate into the project directory:cd word-frequency

the source code is written in src/App.js

Next, install the required dependencies. In the terminal, run: npm install axios recharts

start the development server: npm start

Now, you should see the React app running in your browser at http://localhost:3000. When you click the "Submit" button, it will fetch the contents of https://www.terriblytinytales.com/test.txt, calculate the word frequencies, and display a bar chart with the 20 most occurring words.
As I have also deployed my website on netlify  You can have a look on live website at https://word-frequency01.netlify.app/
