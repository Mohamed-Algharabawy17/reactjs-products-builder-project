import { useState } from "react";
import "./App.css";
import Product from "./components/Product";
import { formInputsList, productList } from "./data";
import AlertDialog from "./components/UI/AlertDialog";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";

function App() {
  const renderListDate = productList.map(product => <Product product={product} key={product.id}/>)

  /**
   * States
  */
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Handlers
  */

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const renderDialogFormInputs = formInputsList.map(input => (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type={input.type} name={input.name} id={input.id}/>
      </div>
  ))

  return (
    <main className="container">
      <AlertDialog isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        {renderDialogFormInputs}
        <div className="mt-4 flex space-x-5">
          <Button onClick={closeModal} className="bg-red-600">Cancel</Button>
          <Button className="bg-indigo-500">Submit</Button>
        </div>
      </AlertDialog>

      <Button onClick={openModal} className="bg-green-600 w-50">Open Dialog</Button>

      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderListDate}
      </div>
    </main>
  );
}

export default App;
