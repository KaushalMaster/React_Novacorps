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
    <div className="container mx-auto mt-[120px] p-10">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((emergencyContact) => (
            <li key={emergencyContact.id}>
              <div className="w-full">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Emergency Service: {emergencyContact.emergency_service}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Calamity-Type:{emergencyContact.calamity_type}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Contact: {emergencyContact.helpline_number}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmergencyContacts;
