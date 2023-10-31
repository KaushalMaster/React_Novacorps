import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

function EmergencyContacts() {
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

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Emergency_contacts records from the firbase collection
  useEffect(() => {
    const fetchData = async () => {
      const emergencyContactsCollection = collection(db, "Emergency_contacts");
      const querySnapshot = await getDocs(emergencyContactsCollection);

      const emergencyContactsList = [];
      querySnapshot.forEach((doc) => {
        emergencyContactsList.push({ id: doc.id, ...doc.data() });
      });

      setEmergencyContacts(emergencyContactsList);
      console.log(emergencyContactsList);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {emergencyContacts.map((emergencyContact) => (
            <li key={emergencyContact.id}>
              <div className="container mt-12">
                <div className="row">
                  {/* Repeat this card structure for each post */}
                  <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card w-[320px] bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">
                          {emergencyContact.emergency_service}
                        </h2>
                        <p className="card-text">
                          {emergencyContact.calamity_type}
                        </p>
                        <p className="card-text">
                          {emergencyContact.helpline_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </>
      )}
    </div>
  );
}

export default EmergencyContacts;
