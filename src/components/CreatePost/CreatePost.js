import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

function CreatePost() {
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

  useEffect(() => {
    // Fetch data from the "Posts" collection
    const fetchData = async () => {
      const postCollection = collection(db, "Posts");
      const querySnapshot = await getDocs(postCollection);

      const postList = [];
      querySnapshot.forEach((doc) => {
        postList.push({ id: doc.id, ...doc.data() });
      });

      setPosts(postList);
      console.log(postList);
      setLoading(false);
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    post_img: "",
    title: "",
    description: "",
    problem_type: "",
    location: "",
    contact: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const docRef = doc(db, "Posts", formData.title);
    setDoc(docRef, {
      post_img: formData.post_img,
      title: formData.title,
      description: formData.description,
      problem_type: formData.problem_type,
      location: formData.location,
      contact: formData.contact,
    })
      .then(() => {
        console.log("Document written with ID: ", docRef.id);
        setSuccessMessage(true);

        // Reset the form fields
        setFormData({
          post_img: "",
          title: "",
          description: "",
          problem_type: "",
          location: "",
          contact: "",
        });

        setTimeout(() => {
          // navigate("/");
          setSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contact") {
      const phoneNumber = value.replace(/\D/, "").slice(0, 10);
      setFormData((prevInfo) => ({
        ...prevInfo,
        [name]: phoneNumber,
      }));
    } else {
      setFormData((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
    console.log(formData);
  };

  // Code to fetch the records from firebase
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse mb-10">
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
              <span>Post Created!</span>
            </div>
          )}
          <form class="card-body" onSubmit={handleSubmit}>
            <input
              type="file"
              className="file-input file-input-ghost w-full max-w-xs"
              name="post_img"
              value={formData.post_img}
              onChange={handleChange}
            />
            <div class="form-control">
              <input
                type="text"
                placeholder="Problem Title"
                className="input w-full max-w-xs"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <textarea
                className="textarea textarea-bordered"
                placeholder="Problem Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div class="form-control">
              <select
                className="select w-full max-w-xs"
                onChange={handleChange}
                value={formData.problem_type}
                name="problem_type"
              >
                <option disabled selected>
                  Problem Type
                </option>
                <option value="Water">Water</option>
                <option value="Landslide">Landslide</option>
                <option value="Pothole">Pothole</option>
              </select>
            </div>
            <div class="form-control">
              <input
                type="text"
                placeholder="Location"
                className="input w-full max-w-xs"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <input
                type="text"
                placeholder="Contact Number"
                className="input w-full max-w-xs"
                name="contact"
                maxLength={10}
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
