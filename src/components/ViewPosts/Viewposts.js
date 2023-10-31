import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

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
  const storage = getStorage(app);

  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

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

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="container mx-auto mt-[120px] p-10">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
          {posts.map((post) => (
            <div key={post.id} className="w-full">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4">
                  {imageList.map((url) => {
                    <img src={url} alt="error-load" />;
                  })}
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-2">
                    Description: {post.description}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Problem Type: {post.problem_type}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Location: {post.location}
                  </p>
                  <p className="text-gray-600 mb-2">Contact: {post.contact}</p>

                  <div className="flex justify-end">
                    {/* <span className="badge badge-primary mr-2">Fashion</span>
                    <span className="badge badge-primary">Products</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Viewposts;
