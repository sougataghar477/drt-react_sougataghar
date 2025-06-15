import { MultiSelect } from "@mantine/core";
import { JSX,useState,useContext } from "react";
import { SatelliteContext } from "./SatelliteContext";

export default function Form(): JSX.Element {
    
    const [applyFilters,setFilter]=useState<boolean>(false);
    const [objTypes,setObjtype]=useState<string[]>([]);
    const [orbCodes,setOrbcodes]=useState<string[]>([]);
    const [satName,setSatName] = useState<string>("");
    const [satNoradCatId,setSatNoradCatId] = useState<string>("");
    const {name,setName,noradCatId,setNoradCatId,setObjectTypes,setOrbitCodes} = useContext(SatelliteContext)!;
     
const formChange = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('submitted');
  setName(satName);
  setNoradCatId(satNoradCatId);
  
};
const fetchFilteredData = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(objTypes){
    setObjectTypes(objTypes) 
  }
  if(orbCodes){
    setOrbitCodes(orbCodes)
  }
  if(objTypes && orbCodes){
    setObjectTypes(objTypes) 
    setOrbitCodes(orbCodes)

  }
  
};
  return (
    <div className="max-w-[900px] mx-auto text-white">
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={formChange} >
      <div className="mb-4">
  <label htmlFor="name" className="block text-sm/6 font-medium text-white text-left">Name</label>
  <div className="mt-2">
    <div className="flex items-center rounded-md bg-[#222] pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
    
      <input value={satName} onChange={(e) => {
    const value = e.currentTarget.value;
    setSatName(value);
    if (value === "" && satNoradCatId === "") {
      setName("");
      setNoradCatId("");
    }
  }} required type="text" name="name" id="name" className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base  placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="0.00"/>
 
    </div>
  </div>
</div>

<div>
  <label htmlFor="noradCatId" className="block text-sm/6 font-medium text-white text-left">NoradCatId</label>
  <div className="mt-2">
    <div className="flex items-center rounded-md bg-[#222] pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
    
      <input value={satNoradCatId} onChange={e => {setSatNoradCatId(e.target?.value);
        if(satName==="" && e.target.value===""){
          console.log("both empty")

          setName("");
          setNoradCatId("")
      }
      }} required type="text" name="noradCatId" id="noradCatId" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base   placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="0.00"/>
 
    </div>
  </div>
</div>
<button className="mt-2 rounded-lg bg-black self-center p-4" type="submit">Search</button>
</form>

<form onSubmit={fetchFilteredData}>


<h1 className="text-4xl">Filters</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center">

<MultiSelect 
      className="mt-2"
      placeholder="Pick Object Type"
      onChange={(value) => {
  setObjtype(value);
  if (value.length === 0 && orbCodes.length === 0) {
    setObjectTypes([]);
    setOrbitCodes([]);
  }
}}
      data={["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"]}/>
 <MultiSelect 
 className="mt-2"
      onChange={value => {setOrbcodes(value);
        if(value.length===0 && objTypes.length===0){
        setObjectTypes([]);
        setOrbitCodes([]);
      }}}
      placeholder="Pick Orbit Code"
      data={[
  "LEO", "LEO1", "LEO2", "LEO3", "LEO4", "MEO", "GEO", "HEO",
  "IGO", "EGO", "NSO", "GTO", "GHO", "HAO", "MGO", "LMO", "UFO", "ESO", "UNKNOWN"
]}/>
 
<button onSubmit={fetchFilteredData} type="submit" className="mt-2 rounded-lg bg-black self-center p-4">Apply Filter</button>
 

</div>
 
 
    </form>
    {}
    </div>
  );
}
