import { useState } from "react";
import contractABI from "./abi.json";
const ethers = require("ethers");

function App() {
  const contractAddress = "0xb08F1DBd3B2590C3E6fF17c01022FDD7C4b697f8";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [details, setDetails] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setNameAndAge() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        await contract.updateName(name);
        await contract.updateAge(age);
        console.log("Name and age set successfully");
      } catch (error) {
        console.error("Error setting name and age:", error);
      }
    } else {
      console.error("Metamask not installed");
    }
  }

  async function getDetails() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const data = await contract.getEntityDetails();
        const [entityName, entityAge] = data;
        setDetails(`Name: ${entityName}, Age: ${Number(entityAge)}`);
        console.log("Details fetched successfully");
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    } else {
      console.error("Metamask not installed");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={setNameAndAge}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Set Name & Age
        </button>
      </div>
      <button
        onClick={getDetails}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Details
      </button>
      <div className="text-lg">{details}</div>
    </div>
  );
}

export default App;