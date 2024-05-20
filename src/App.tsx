import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import Product from "./components/Product";
import { formInputsList, productList } from "./data";
import AlertDialog from "./components/UI/AlertDialog";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { validateProduct } from "./components/validations/ProductValidation";
import ErrorMessage from "./components/UI/ErrorMessage";

function App() {

  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    category: {
      imageURL: "",
      name: ""
    },
    colors: [],
    price: ""
  }

  /**
   * States
  */
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [errors, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /**
   * Handlers
  */

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    // console.log(name, value);
    setProduct({
      ...product,
      [name] : value
    })

    setError({
      ...errors,
      [name] : ''
    })
  }

  const onSubmitFormHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const errorMessages = validateProduct({
        title: product.title,
        description: product.description,
        imageURL: product.imageURL,
        price: product.price
      });
      // console.log(errorMessages);
      const isValid = Object.values(errorMessages).some(value => value == '') && Object.values(errorMessages).every(value => value == '')

      if(!isValid){
        setError(errorMessages)
        return
      }      
  }




  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  }

  const renderDialogFormInputs = formInputsList.map(input => (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} placeholder={input.placeholder}/>
        <ErrorMessage message={errors[input.name]}/>
      </div>
  ))

  const renderListDate = productList.map(product => <Product product={product} key={product.id}/>)

  return (
    <main className="container">
      <AlertDialog isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={onSubmitFormHandler}>
          {renderDialogFormInputs}
          <div className="mt-4 flex space-x-5">
            <Button className="bg-indigo-500">Submit</Button>
            <Button className="bg-red-600" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </AlertDialog>

      <Button onClick={openModal} className="bg-green-600 w-50">Open Dialog</Button>

      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderListDate}
      </div>
    </main>
  );
}

export default App;
