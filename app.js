/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects. 
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTrait(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person   A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user. 
 */
function mainMenu(person = personTemplate, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);  
    }
    // else if (people.length > 2){
    //     alert("Please try narrowing your search, mulitple results found. ")
    //     return app(people)
    // }
    // else (personTemplate = 1 (displayPeople))


    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily;  
            personFamily = findCurrentSpouse(person[0], people);
            personFamily = findParents(person[0], people);
            personFamily = findSiblings(person[0], people);
            personFamily = displayPeople(people[0]);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n` ;
    personInfo += `Weight: ${person.weight}\n` ;
    personInfo += `EyeColor: ${person.eyeColor}\n` ;
    personInfo += `Occupation: ${person.occupation}\n` ;
    personInfo += `Parents: ${person.parents}\n` ;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????
let personTemplate = 	
{
    "id": 0,
    "firstName": "",
    "lastName": "",
    "gender": "",
    "dob": "",
    "height": 0,
    "weight": 0,
    "eyeColor": "",
    "occupation": "",
    "parents": [],
    "currentSpouse": 0,
};
// function findPersonFamily(people = []) {
//     let personFamily;
//         personFamily = findCurrentSpouse(people[0]);
//         displayPeople(personFamily);
//         personFamily = findParents(people[0]);
//         displayPeople(personFamily);
//         personFamily = findSiblings(people[0]);
//         displayPeople(personFamily);
//         alert(personFamily);
// };


function findCurrentSpouse(poi = personTemplate[0], people = []) {
    let spouse = people.find(function (person) {
        if (poi.currentSpouse === person.id) return true;
    });
    alert(`Current Spouse: ${spouse.firstName} ${spouse.lastName}`);
};

function findParents(poi = personTemplate[0], people = []) {    
        let parent;
        parent = people.find(function(person) {
        if (poi.parents.includes(person.id)) 
            return true; 
    });
    alert(`Parent: ${parent.firstName} ${parent.lastName}`);
};


function findSiblings(poi = personTemplate[0], people = []){
    let sibling = people.find(function(people){
        if (poi.parents.includes([]) == people.parents.includes([])) return true; 
    });
    alert(`Siblings: ${sibling.firstName} ${sibling.lastName}`)
};


function searchByTrait(people) {
        let resultTrait;
        let searchTrait = promptFor("Please enter the trait you would like to search for gender/dob/height/weight/eyecolor/occupation ", chars).toLowerCase()
        switch(searchTrait){
            case 'gender':
                resultTrait = searchByGender(people);
                displayPeople(resultTrait);
            break;
            case 'dob':
                resultTrait = searchByDOB(people);
                displayPeople(resultTrait);
            break;
            case 'height':
                resultTrait = searchByHeight(people);
                displayPeople(resultTrait);
            break;
            case 'weight':
                resultTrait = searchByWeight(people);
                displayPeople(resultTrait);
            break;
            case 'eyecolor':
                resultTrait = searchByEyeColor(people);
                displayPeople(resultTrait);
            break;
            case 'occupation':
                resultTrait = searchByOccupation(people);
                displayPeople(resultTrait);
            break;
        }
    return resultTrait
};

function searchByGender(people) {
    let gender = promptFor("Please enter the gender of the person you are searching for ", chars)
    let foundPerson = people.filter(function(person) {
        if (person.gender === gender) {
            return true;
    }   else {
            return false;
    }      
    })
    return foundPerson;
};

function searchByDOB (people) {
    let dob = promptFor("Please enter the date of birth of the person you are searching for mm/dd/yyyy", chars)
    let foundPerson = people.filter(function(person) {
        if (person.dob === dob) {
            return true;
    }   else {
            return false;
    }
    })
    return foundPerson;
};

function searchByHeight (people) {
    let height = promptFor("Please enter the height (in inches) of the person you are searching for ", chars)
    let foundPerson = people.filter(function(person) {
        if (person.height == height) {
            return true;
    }   else {
            return false;
    }
    })
    return foundPerson;
};

function searchByWeight (people) {
    let weight = promptFor("Please enter the weight of the person you are searching for ", chars)
    let foundPerson = people.filter(function(person) {
        if (person.weight == weight) {
            return true;
    }   else {
            return false;
    }
    })
    return foundPerson;
};

function searchByEyeColor (people) {
    let eyeColor = promptFor("Please enter the eye color of the person you are searching for ", chars).toLowerCase()
    let foundPerson = people.filter(function(person) {
        if (person.eyeColor === eyeColor) {
            return true;
    }   else {
            return false;
    }
    })
    return foundPerson;
};

function searchByOccupation (people) {
    let occupation = promptFor("Please enter the occupation of the person you are searching for ", chars).toLowerCase()
    let foundPerson = people.filter(function(person) {
        if (person.occupation === occupation) {
            return true;
    }   else {
            return false;
    }
    })
    return foundPerson;
};
