import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function CreateEmergencyContact() {
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
    emergency_service: "",
    calamity_type: "",
    helpline_number: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { emergency_service, calamity_type, helpline_number } = formData;

    const docRef = doc(db, "Emergency_contacts", formData.emergency_service);
    setDoc(docRef, {
      emergency_service: formData.emergency_service,
      calamity_type: formData.calamity_type,
      helpline_number: formData.helpline_number,
    })
      .then(() => {
        console.log("Document written with ID: ", docRef.id);
        setSuccessMessage(true);

        // Reset the form fields
        setFormData({
          emergency_service: "",
          calamity_type: "",
          helpline_number: "",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "helpline_number") {
      const phoneNumber = value.replace(/\D/, "").slice(0, 10);
      setFormData((prevInfo) => ({
        ...prevInfo,
        [name]: phoneNumber,
      }));
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <h1>Emergency Contact</h1>
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
              <span>Emergency Contact Created!</span>
            </div>
          )}
          <form class="card-body" onSubmit={handleSubmit}>
            <div class="form-control">
              <input
                type="text"
                placeholder="Emergency Service [Police, Ambulance....]"
                class="input input-bordered w-[330px]"
                name="emergency_service"
                value={formData.emergency_service}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <input
                type="text"
                placeholder="Calamity Type [Accident, Safety, fire....]"
                class="input input-bordered w-[330px]"
                name="calamity_type"
                value={formData.calamity_type}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control">
              <input
                type="text"
                placeholder="HelpLine Number"
                class="input input-bordered w-[330px]"
                name="helpline_number"
                value={formData.helpline_number}
                onChange={handleChange}
                required
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmergencyContact;
