// Assignment code here
let generatePassword = () => {
  // Init vars
  let passwordLength = "",
    passwordLengthNum,
    useLower,
    useUpper,
    useNum,
    useSpecial;

  alert("Welcome to password generator!");

  // Get password length
  // Keep asking until a valid number is inputed
  while (
    isNaN(passwordLengthNum) ||
    passwordLengthNum < 8 ||
    passwordLengthNum > 128
  ) {
    passwordLength = prompt(
      "How many characters do you want your password to be? Password must be between 8 and 128 characters."
    );
    passwordLengthNum = parseInt(passwordLength);
  }

  alert(
    `Great! Your password will be ${passwordLength} characters long. Which types of characters would you like to include?`
  );

  // Get character types
  // Keep asking until at least one type is selected
  while (true) {
    useLower = confirm("Inlcude lowercase characters?");
    useUpper = confirm("Include uppercase characters?");
    useNum = confirm("Use numeric characters?");
    useSpecial = confirm("Use special characters (such as !,#,$)");

    if (useLower || useUpper || useNum || useSpecial) {
      break;
    }

    alert("You must select at least one character type! Please try again.");
  }

  // Return final password string
  return generatePasswordText(
    passwordLengthNum,
    useLower,
    useUpper,
    useNum,
    useSpecial
  );
};

let generatePasswordText = (length, useLower, useUpper, useNum, useSpecial) => {
  // init vars
  let passwordText = "";

  // Loop for every character addition
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * 4);

    // If any char type evaluates to false, overflow into next case
    switch (rand) {
      case 0:
        if (useLower) {
          passwordText = passwordText + getRandomLower();
          break;
        }
      case 1:
        if (useUpper) {
          let lowerChar = "" + getRandomLower();
          passwordText = passwordText + lowerChar.toUpperCase();
          break;
        }
      case 2:
        if (useNum) {
          passwordText = passwordText + getRandomNum();
          break;
        }
      case 3:
        if (useSpecial) {
          passwordText = passwordText + getRandomSpecial();
          break;
        }
        /* if useSpecial is false, do not overflow into the default case
           instead, decrement counter by 1 and break current iteration
           Essentially tries current loop again */
        i--;
        break;
      default:
        console.log(`Something is broken: ${rand}`);
        break;
    }
  }

  return passwordText;
};

let getRandomLower = () => {
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

let getRandomNum = () => {
  return Math.floor(Math.random() * 10);
};

let getRandomSpecial = () => {
  let specials = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  return specials[Math.floor(Math.random() * specials.length)];
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
