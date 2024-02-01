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

  async function inputName() {
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
        setName("");
        console.log("Name has been set successfully");
      } catch (error) {
        console.error("Error setting name:", error);
      }
    } else {
      console.error("Metamask not installed");
    }
  }

  async function inputAge() {
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
        await contract.updateAge(age);
        setAge("");
        console.log("Age has been set successfully");
      } catch (error) {
        console.error("Error setting age:", error);
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
    <div className="flex justify-center bg-gray-200 items-center h-screen space-y-4">
      <div className="border-2 bg-white text-black w-fit h-fit p-8 flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="font-medium text-2xl font-serif">Name</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 text-gray-900 text-lg rounded px-4 py-2"
            />
            <button
              onClick={inputName}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-28 rounded"
            >
              Set Name
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium text-2xl font-serif">Age</h2>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 text-gray-900 text-lg rounded px-4 py-2"
            />
            <button
              onClick={inputAge}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-28 rounded"
            >
              Set Age
            </button>
          </div>
        </div>
        <button
          onClick={getDetails}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Details
        </button>
        <div className="font-semibold text-2xl font-serif text-center">{details}</div>
      </div>
    </div>
  );
}

export default App;