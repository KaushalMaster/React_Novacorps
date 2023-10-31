import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

const Login = () => {
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
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const docRef = doc(db, "users", formData.email);
    setDoc(docRef, {
      email: formData.email,
      password: formData.password,
    })
      .then(() => {
        console.log("Document written with ID: ", docRef.id);
        setSuccessMessage(true);
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
    // <div class="m-[120px] w-[50%]">
    //   <form>
    //     <div>
    //       <label
    //         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         for="user_avatar"
    //       >
    //         Upload file
    //       </label>
    //       <input
    //         class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    //         aria-describedby="user_avatar_help"
    //         id="user_avatar"
    //         type="file"
    //       />
    //     </div>
    //     <div class="relative z-0 w-full mb-6 group"></div>
    //     <div class="relative z-0 w-full mb-6 group">
    //       <input
    //         type="password"
    //         name="floating_password"
    //         id="floating_password"
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder=" "
    //         required
    //       />
    //       <label
    //         for="floating_password"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Password
    //       </label>
    //     </div>
    //     <div class="relative z-0 w-full mb-6 group">
    //       <input
    //         type="password"
    //         name="repeat_password"
    //         id="floating_repeat_password"
    //         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder=" "
    //         required
    //       />
    //       <label
    //         for="floating_repeat_password"
    //         class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Confirm password
    //       </label>
    //     </div>
    //     <div class="grid md:grid-cols-2 md:gap-6">
    //       <div class="relative z-0 w-full mb-6 group">
    //         <input
    //           type="text"
    //           name="floating_first_name"
    //           id="floating_first_name"
    //           class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //         />
    //         <label
    //           for="floating_first_name"
    //           class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           First name
    //         </label>
    //       </div>
    //       <div class="relative z-0 w-full mb-6 group">
    //         <input
    //           type="text"
    //           name="floating_last_name"
    //           id="floating_last_name"
    //           class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //         />
    //         <label
    //           for="floating_last_name"
    //           class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           Last name
    //         </label>
    //       </div>
    //     </div>
    //     <div class="grid md:grid-cols-2 md:gap-6">
    //       <div class="relative z-0 w-full mb-6 group">
    //         <input
    //           type="tel"
    //           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    //           name="floating_phone"
    //           id="floating_phone"
    //           class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //         />
    //         <label
    //           for="floating_phone"
    //           class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           Phone number (123-456-7890)
    //         </label>
    //       </div>
    //       <div class="relative z-0 w-full mb-6 group">
    //         <input
    //           type="text"
    //           name="floating_company"
    //           id="floating_company"
    //           class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //           placeholder=" "
    //           required
    //         />
    //         <label
    //           for="floating_company"
    //           class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //         >
    //           Company (Ex. Google)
    //         </label>
    //       </div>
    //     </div>
    //     <button
    //       type="submit"
    //       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form class="card-body" onSubmit={handleSubmit}>
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
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Don't Have An Account?
                </a>
              </label>
            </div>
          </form>
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
              <span>Your purchase has been confirmed!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
