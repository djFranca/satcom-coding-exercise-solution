# SatcomTest

## Requirements
This test should take approximately 30-45 min but you can take all the time needed to do it. 
You will be able to explain your technical choices and decision during the technical interview.

### Feature 1 : create a list
Fill the ListComponent with all the element provided by the `mockDataServicce`.
In the list, you should only display the **name** of the element.

The list is a mix of Product and Customers. There is no need to sort the list or to filters element of the list based on the type.

### Feature 2 : Display the component of the selected element of the list in the viewer component
When you click on an element, we need to load in the `ViewerComponent` the corresponding component with the correct metadata.
This component has a method allowing you to add dynamically the component linked to the object selected to the view.
The app component should not contains any logic.

### Feature 3 : Filters element of the list by the search input
When, the user type something in the search input, we want to filter the element of the list based on this search. 

- The search can apply to the name of the element or to the price of a product. 
- The premium product are never filtered
- The search can be a valid regex (no need to handle invalid regex error case).

**Remember to test the different features**

## How to use it?
### Install dependencies
Use the command `npm i` in the root folder of the project

### Run the project
Use the command `npm start` to launch the project.

### Run the tests
Use the command `npm test` to launch the test.
