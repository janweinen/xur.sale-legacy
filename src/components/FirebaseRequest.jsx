import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRVpJJYpLK-rfh_felc9vDNr8u3K_8WI0",
  authDomain: "theix-3b6ee.firebaseapp.com",
  databaseURL: "https://theix-3b6ee.firebaseio.com",
  projectId: "theix-3b6ee",
  storageBucket: "theix-3b6ee.appspot.com",
  messagingSenderId: "739280273977",
  appId: "1:739280273977:web:d0adee2748cd5460"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.firestore();

export async function firebaseRequest(hash) {
  const request = database.ref(hash);

  const snapshot = await request.once("value");
  return snapshot.val();
}

export async function firestoreRequest() {
  const request = storage.collection("app").doc("xur");
  const snapshot = await request.get();
  return snapshot.data().location;
}

export const storeUser = data => {
  const userdata = storage
    .collection("users")
    .doc(
      data.Response.bungieNetUser.displayName +
        "-" +
        data.Response.bungieNetUser.uniqueName
    );
  userdata.set({ data });
};

export const storeInventory = data => {
  const inventory = storage.collection("app").doc("30-2019");
  inventory.set({
    hash: data.hash,
    name: data.displayProperties.name,
    icon: data.displayProperties.icon,
    type: data.itemTypeDisplayName,
    description: data.displayProperties.description
  });
};
