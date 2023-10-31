import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function Signup() {
  const firebaseConfig = {
    apiKey: "AIzaSyAwAVB02gY3_62dBdgAzCXwnalbWFpO4nM",
    authDomain: "novacorps-2721b.firebaseapp.com",
    projectId: "novacorps-2721b",
    storageBucket: "novacorps-2721b.appspot.com",
    messagingSenderId: "843985520778",
    appId: "1:843985520778:web:de760c4e10f3d0ed254573",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password, c_password } = formData;

    // Check password conditions (e.g., minimum length)
    if (password.length < 8) {
      // Display an error message or handle it as needed
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Check if password and confirm password match
    if (password !== c_password) {
      // Display an error message or handle it as needed
      alert("Password and Confirm Password do not match.");
      return;
    }

    const docRef = doc(db, "SignUp", formData.email);
    setDoc(docRef, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    })
      .then(() => {
        console.log("Document written with ID: ", docRef.id);
        setSuccessMessage(true);

        // Reset the form fields
        setFormData({
          username: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          // navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {successMessage && (
            <div class="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Account Registered</span>
            </div>
          )}
          <form class="card-body" onSubmit={handleSubmit}>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                class="input input-bordered"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                class="input input-bordered"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                class="input input-bordered"
                name="c_password"
                value={formData.c_password}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" onClick={handleSubmit}>
                Register Account
              </button>
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Don't Have An Account?
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
