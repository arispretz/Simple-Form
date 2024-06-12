import React, { useState } from 'react';
import "./styles/styles.css";
import validator from 'validator';

const options = [
  { value: '', label: '-- Select Country--' },
  { value: 'Finland', label: 'Finland' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Denmark', label: 'Denmark' },
];

const selectOptions = options.map(({ value, label }) => (
  <option key={value} value={value}>
    {label}
  </option>
));

const App = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    tel: '',
    dateOfBirth: '',
    favoriteColor: '',
    weight: '',
    gender: '',
    file: '',
    bio: '',
    skills: {
      html: false,
      css: false,
      javascript: false,
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      country: false,
      tel: false,
      dateOfBirth: false,
      favoriteColor: false,
      weight: false,
      gender: false,
      bio: false,
      file: false,
    },
    errors: {},
  });

  const validate = (state) => {
    const errors = {};
    if (state.touched.firstName && (state.firstName.length < 3 || state.firstName.length > 12)) {
      errors.firstName = 'First name must be between 3 and 12 characters';
    }
    if (state.touched.lastName && (state.lastName.length < 3 || state.lastName.length > 12)) {
      errors.lastName = 'Last name must be between 3 and 12 characters';
    }
    if (state.touched.email && !validator.isEmail(state.email)) {
      errors.email = 'Invalid email address';
    }
    if (state.touched.country && state.country === '') {
      errors.country = 'Country is required';
    }
    if (state.touched.tel && !validator.isMobilePhone(state.tel)) {
      errors.tel = 'Invalid telephone number';
    }
    if (state.touched.dateOfBirth && !state.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
    if (state.touched.favoriteColor && state.favoriteColor === '#rrggbb') {
      errors.favoriteColor = 'Favorite color is required';
    }
    if (state.touched.weight && !validator.isNumeric(state.weight)) {
      errors.weight = 'Weight must be a number';
    }
    if (state.touched.gender && state.gender === '') {
      errors.gender = 'Gender is required';
    }
    if (state.touched.bio && state.bio.length < 10) {
      errors.bio = 'Bio must be at least 10 characters';
    }
    if (state.touched.file && !state.file) {
      errors.file = 'Please choose a file';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(state);
    setState((prevState) => ({ ...prevState, errors }));
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data
      const {
        firstName,
        lastName,
        email,
        country,
        gender,
        tel,
        dateOfBirth,
        favoriteColor,
        weight,
        bio,
        file,
        skills,
      } = state;
      const formattedSkills = Object.keys(skills).filter((skill) => skills[skill]);
      const data = {
        firstName,
        lastName,
        email,
        country,
        gender,
        tel,
        dateOfBirth,
        favoriteColor,
        weight,
        bio,
        file,
        skills: formattedSkills,
      };
      console.log(data);
    }
  };

  const { errors } = state;

  return (
    <>
    <div className="App">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} noValidate>
          <div className='row'>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                value={state.firstName}
                onChange={(e) => setState({...state, firstName: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, firstName: true}})}
                placeholder='First Name'
              />
              <br />
              {errors.firstName && <small>{errors.firstName}</small>}
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name </label>
              <input
                type='text'
                name='lastName'
                value={state.lastName}
                onChange={(e) => setState({...state, lastName: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, lastName: true}})}
                placeholder='Last Name'
              />
              {errors.lastName && <small>{errors.lastName}</small>}
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email </label>
              <input
                type='email'
                name='email'
                value={state.email}
                onChange={(e) => setState({...state, email: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, email: true}})}
                placeholder='Email'
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='tel'>Telephone </label>
            <input
              type='tel'
              name='tel'
              value={state.tel}
              onChange={(e) => setState({...state, tel: e.target.value})}
              onBlur={(e) => setState({...state, touched: {...state.touched, tel: true}})}
              placeholder='Tel'
            />
            {errors.tel && <small>{errors.tel}</small>}
          </div>
          <div className='form-group'>
            <label htmlFor='dateOfBirth'>Date of birth </label>
            <input
              type='date'
              name='dateOfBirth'
              value={state.dateOfBirth}
              onChange={(e) => setState({...state, dateOfBirth: e.target.value})}
              onBlur={(e) => setState({...state, touched: {...state.touched, dateOfBirth: true}})}
              placeholder='Date of Birth'
            />
            {errors.dateOfBirth && <small>{errors.dateOfBirth}</small>}
          </div>
          <div className='form-group'>
            <label htmlFor='favoriteColor'>Favorite Color</label>
            <input
              type='color'
              id='favoriteColor'
              name='favoriteColor'
              value={
                state.favoriteColor}
                onChange={(e) => setState({...state, favoriteColor: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, favoriteColor: true}})}
                placeholder='Favorite Color'
              />
              {errors.favoriteColor && <small>{errors.favoriteColor}</small>}
            </div>
            <div className='form-group'>
              <label htmlFor='weight'>Weight </label>
              <input
                type='number'
                id='weight'
                name='weight'
                value={state.weight}
                onChange={(e) => setState({...state, weight: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, weight: true}})}
                placeholder='Weight in Kg'
              />
              {errors.weight && <small>{errors.weight}</small>}
            </div>
            <div>
              <label htmlFor='country'>Country</label> <br />
              <select
                name='country'
                value={state.country}
                onChange={(e) => setState({...state, country: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, country: true}})}
                id='country'
              >
                {selectOptions}
              </select>
              {errors.country && <small>{errors.country}</small>}
            </div>
            <div>
              <p>Gender</p>
              <div>
                <input
                  type='radio'
                  id='female'
                  name='gender'
                  value='Female'
                  onChange={(e) => setState({...state, gender: e.target.value})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, gender: true}})}
                  checked={state.gender === 'Female'}
                />
                <label htmlFor='female'>Female</label>
              </div>
              <div>
                <input
                  id='male'
                  type='radio'
                  name='gender'
                  value='Male'
                  onChange={(e) => setState({...state, gender: e.target.value})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, gender: true}})}
                  checked={state.gender === 'Male'}
                />
                <label htmlFor='male'>Male</label>
              </div>
              <div>
                <input
                  id='other'
                  type='radio'
                  name='gender'
                  value='Other'
                  onChange={(e) => setState({...state, gender: e.target.value})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, gender: true}})}
                  checked={state.gender === 'Other'}
                />
                <label htmlFor='other'>Other</label>
              </div>
              {errors.gender && <small>{errors.gender}</small>}
            </div>
            <div>
              <p>Select your skills</p>
              <div>
                <input
                  type='checkbox'
                  id='html'
                  name='html'
                  onChange={(e) => setState({...state, skills: {...state.skills, html: e.target.checked}})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, html: true}})}
                />
                <label htmlFor='html'>HTML</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='css'
                  name='css'
                  onChange={(e) => setState({...state, skills: {...state.skills, css: e.target.checked}})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, css: true}})}
                />
                <label htmlFor='css'>CSS</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='javascript'
                  name='javascript'
                  onChange={(e) => setState({...state, skills: {...state.skills, javascript: e.target.checked}})}
                  onBlur={(e) => setState({...state, touched: {...state.touched, javascript: true}})}
                />
                <label htmlFor='javascript'>JavaScript</label>
              </div>
            </div>
            <div>
              <label htmlFor='bio'>Bio</label> <br /> <br />
              <textarea
                id='bio'
                name='bio'
                value={state.bio}
                onChange={(e) => setState({...state, bio: e.target.value})}
                onBlur={(e) => setState({...state, touched: {...state.touched, bio: true}})}
                cols='120'
                rows='10'
                placeholder='Write about yourself ...'
              />
              {errors.bio && <small>{errors.bio}</small>}
            </div>
            <div>
              <input
                type='file'
                name='file'
                onChange={(e) => setState({...state, file: e.target.files[0]})}
                onBlur={(e) => setState({...state, touched: {...state.touched, file: true}})}
              />
              {errors.file && <small>{errors.file}</small>}
            </div>
            <div>
              <button>Submit</button>
            </div>
          </form>
        </div>
        <footer className="footer">
        <p>Created by Ariana Spretz</p>
        </footer>
        </>
      );
  }
  
  export default App;
