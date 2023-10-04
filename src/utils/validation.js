const validationCheck = (value, type) => {
  if (!value) {
    return [true, ''];
  }
  switch(type) {
    case 'email':
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const result = emailRegex.test(value);
      return [result, (result ? '' : 'Email format is not correct!')];
    case 'phone': 
      // WIP
      return true;
    case 'username':
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      const nameCheck = usernameRegex.test(value);
      return [nameCheck, (nameCheck ? '' : 'Username should contains only letters and numbers!')];
    case 'password':
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const res = passwordRegex.test(value);
      return [res, (res ? '' : 'Password must be minimum 8 characters, at least 1 letter, 1 number and 1 special character')];
    default:
      return [true, ''];
  }
}

export { validationCheck };
