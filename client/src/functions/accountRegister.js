import axios from 'axios';

const accountRegister = async (email, firstName, lastName, phone, birth, setError,navigate) => {
  try {
    const response = await axios.post("http://localhost:3000/api/saveUser", {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      birth: birth,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      navigate("/");
    }

  } catch (error) {    
    if (setError) {
      const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred';
      setError(errorMessage);
    }

  }
};

export default accountRegister;
