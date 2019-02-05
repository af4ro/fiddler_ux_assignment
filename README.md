# Fiddler Labs UX assignment


## Prerequisites
- NodeJS
- Python 3

## Usage
Navigate to the home directory and run the run_flask.sh script:

``` bash
./run_flask.sh
```
In another terminal window navigate to the React directory called plotter-frontend, within the home directory, and spin up the frontend:
```bash
cd plotter-frontend
npm start
```
The frontend should be available on the local port [localhost:3000/](http://localhost:3000/)

## Assumptions
- The backend is available at [127.0.0.1:5000](http://127.0.0.1:5000/) and is hardcoded in the frontend to make calls (ideally I would store the port as an environment variable) so please make sure that port is available. 
- The workflow and design might be slightly different but is definitely intuitive.
- There exists only one test.csv file at the moment and it's hardcoded but can be easily changed.
- The plot is only visible for valid integer/floating point values.
- I made this in a couple hours so it's definitely not perfect.

## Some things I like
- I disabled some buttons initially to have a more clear workflow for the user
- The labels on the Y-axis can change angles if the data tick labels are too big and would otherwise get truncated
- The plot is resizable and depends on the size of the screen
- Toasts that make sure you get some form of feedback after clicking a button.