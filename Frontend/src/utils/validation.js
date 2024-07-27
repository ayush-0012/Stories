// async function userExists(userName) {
//   const response = await fetch(
//     `/signup?userName=${encodeURIComponent(userName)}`
//   );
//   const data = await response.json();
//   return data.exists;
// }

export function checkUserName(userName) {
  const errors = [];

  if (userName.length === 0) {
    errors.push("User Name is required");
  }

  if (userName.length < 5) {
    errors.push("User Name is too short");
  }

  // validation if user already exists, then will throw an error
  // if (await userExists(userName)) {
  //   errors.push("User Name has already taken");
  // }
  return { errors };
}

export function checkEmail(email) {
  const errors = [];

  if (email.length === 0) {
    errors.push("Email is required");
  }

  if (!email.endsWith("@gmail.com")) {
    errors.push("Must end with @gmail.com");
  }

  return { errors };
}

export function checkPassword(password) {
  const errors = [];

  if (password.length === 0) {
    errors.push("Password is required");
  }

  if (password.length < 6) {
    errors.push("Atleast 6 characters are required");
  }

  return { errors };
}
