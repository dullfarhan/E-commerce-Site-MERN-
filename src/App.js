
import  NavComp  from './components/navbar';
import CardComp from './components/card';

<<<<<<< HEAD
function App() {
  const info ={price:'300', name:"Tops" , disp:"this is discription"}
=======




function App() { 
  const infos = [
    {
      id: 1,
      price: "300",
      name: "Tops",
      disp: "dsfjsidjfijivkhwktheruifhewuifhwfheruifhweivdfvn",
    },
    {
      id: 2,
      price: "300",
      name: "Jewl",
      disp: "dsfjsivdfjghdfjkg hhdkhwktheruifhewuifhwfheruifhweivdfvn",
    },
    {
      id: 3,
      price: "300",
      name: "neck",
      disp: "dsfjsidjfijivdfjghdfjkg hhdkhwktheruiruifhweivdfvn",
    },
    {
      id: 4,
      price: "300",
      name: "shoes",
      disp: "dsfjsidjfikhwktheruifhewuifhwfheruifhweivdfvn",
    },
    {
      id: 5,
      price: "300",
      name: "caps",
      disp: "dsfjsidjdfjghdfjkg hhdkhwktheruifhewuifhwfheruifhweivdfvn",
    },
  ];
>>>>>>> 17a876a89f5f4d01b85154727d88d9011363587c
  return (
    <div className="App">
      <NavComp />
      <div id="Body" className="body" style={{ marginLeft: "40px" }}>
        <div style={{ display: "flex" }} id="itemsList" className="itemsList">
          {infos.map((info) => (
            <CardComp key={info.id} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

