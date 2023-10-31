import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

function Viewposts() {
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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {posts.map((post) => (
            <li key={post.id}>
              <div className="container mt-12">
                <div className="row">
                  {/* Repeat this card structure for each post */}
                  <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card w-[320px] bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">
                          {post.title}
                          {/* <div className="badge badge-secondary">NEW</div> */}
                        </h2>
                        <p>{post.description}</p>
                        <p>Problem Type: {post.problem_type}</p>
                        <p>Location: {post.location}</p>
                        <p>Contact: {post.contact}</p>

                        <div className="card-actions justify-end">
                          <div className="badge badge-outline">Fashion</div>
                          <div className="badge badge-outline">Products</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Repeat the above card structure for each post */}
                </div>
              </div>
            </li>
          ))}
        </>
      )}
    </div>
  );
}

export default Viewposts;
