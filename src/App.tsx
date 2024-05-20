import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import Product from "./components/Product";
import { categories, colors, formInputsList, productList } from "./data";
import AlertDialog from "./components/UI/AlertDialog";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { validateProduct } from "./components/validations/ProductValidation";
import ErrorMessage from "./components/UI/ErrorMessage";
import CircleColor from "./components/UI/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./components/UI/SelectMenu";
import { productName } from "./types";
import toast, { Toaster } from 'react-hot-toast';
import { CheckCheck } from 'lucide-react';
import logo from './assets/logo.png';

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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [errors, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelected] = useState(categories[3])
  const [productEditModal, setProductEdit] = useState<IProduct>(defaultProduct);
  const [productToEditIdx, setproductToEditIdx] = useState<number>(0);  

  /**
   * Handlers
  */

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const openEditModal = () => setIsOpenEditModal(true)
  const closeEditModal = () => setIsOpenEditModal(false)
  const openConfirmModal = () => setIsOpenConfirmModal(true)
  const closeConfirmModal = () => setIsOpenConfirmModal(false)

  
  /********* Add Dialog ********/

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
      
      setProducts(prev => [{...product, id:uuid(), colors: tempColor, category: selectedCategory}, ...prev])
      setProduct(defaultProduct);
      setTempColor([]);
      closeModal();
  }


  /******** Edit Diaolg ********/

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    // console.log(name, value);
    setProductEdit({
      ...productEditModal,
      [name] : value
    })

    setError({
      ...errors,
      [name] : ''
    })
  }

  const onSubmitEditFormHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const errorMessages = validateProduct({
        title: productEditModal.title,
        description: productEditModal.description,
        imageURL: productEditModal.imageURL,
        price: productEditModal.price
      });
      // console.log(errorMessages);
      const isValid = Object.values(errorMessages).some(value => value == '') && Object.values(errorMessages).every(value => value == '')

      if(!isValid){
        setError(errorMessages)
        return
      } 
      

      const updatedProduct = [...products];
      updatedProduct[productToEditIdx] = {...productEditModal, colors: tempColor.concat(productEditModal.colors)}
      setProducts(updatedProduct)
      toast(`Your Product Updated successfully`, {icon: <CheckCheck />, style: {backgroundColor: "#90EE90", color: "white", fontWeight: "bold"},});

      setProductEdit(defaultProduct);
      setTempColor([]);
      closeEditModal  ();
  }

  const onCancel = () => {
    // setProduct(defaultProduct);
    closeModal();
  }

  const onCloseConfirmModal = () => {
    closeConfirmModal();
  }

  const renderDialogFormInputs = formInputsList.map(input => (
      <div key={input.id} className="flex flex-col">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} placeholder={input.placeholder}/>
        <ErrorMessage message={errors[input.name]}/>
      </div>
  ))

  const renderListDate = products.map((product, idx) => <Product productToEditIdx={idx} setproductToEditIdx={setproductToEditIdx} product={product} key={product.id} setProductEdit={setProductEdit} oenConfirmDialog={openConfirmModal} openEditModal={openEditModal}/>)

  const renderColorCircles = colors.map(color => <CircleColor color={color} key={color} onClick={() => {
    if(tempColor.includes(color)){
      setTempColor(prev => prev.filter(item => item != color))
      return
    }
    
    if(productEditModal.colors.includes(color)){
      setTempColor(prev => prev.filter(item => item != color))
      return
    }
      setTempColor(prev => [...prev, color])
    }
  }/>)


  const renderEditFormInputsWithErrors = (id: string, label: string, name: productName) => {
    return (
      <div className="flex flex-col">
          <label htmlFor={id}>{label}</label>
          <Input type="text" name={name} id={id} value={productEditModal[name]} onChange={onChangeEditHandler}/>
          <ErrorMessage message={errors[name]}/>
        </div>
    );
  }


  const removeProductHandler = () => {
    console.log(productEditModal.id);
    const filteredProduct = products.filter(item => item.id != productEditModal.id)
    setProducts(filteredProduct)
    closeConfirmModal()
    toast(`Your Product removed successfully`, {icon: <CheckCheck />, style: {backgroundColor: "#90EE90", color: "white", fontWeight: "bold"},});
  }

  return (
    <main className="container">

      {/* ADD PRODUCT ALERT DIALOG */}
      <AlertDialog isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={onSubmitFormHandler}>
          {renderDialogFormInputs}
          <SelectMenu selected={selectedCategory} setSelected={setSelected}/>
          <div className="flex space-x-1 my-3 flex-wrap">
            {renderColorCircles}
          </div>
          <div className="flex flex-wrap">
            {tempColor.map(color => 
              
               <span className="ml-1 rounded-lg text-xs mt-1 p-1 text-white" style={{ backgroundColor: color }} key={color}>{color}</span>
            )}
          </div>
          <div className="mt-4 flex space-x-5">
            <Button className="bg-indigo-500">Submit</Button>
            <Button className="bg-red-600" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </AlertDialog>

      {/* EDIT PRODUCT ALERT DIALOG */}
      <AlertDialog isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT Product">
        <form className="space-y-3" onSubmit={onSubmitEditFormHandler}>
          {renderEditFormInputsWithErrors('title', 'Product Title', 'title')}
          {renderEditFormInputsWithErrors('description', 'Product Title', 'description')}
          {renderEditFormInputsWithErrors('imageURL', 'Product Title', 'imageURL')}
          {renderEditFormInputsWithErrors('price', 'Product Title', 'price')}
          <SelectMenu selected={productEditModal.category} setSelected={(value) => setProductEdit({...productEditModal, category: value})}/>
          <div className="flex space-x-1 my-3 flex-wrap">
            {renderColorCircles}
          </div>
          <div className="flex flex-wrap">
            {tempColor.concat(productEditModal.colors).map(color => 
               <span className="ml-1 rounded-lg text-xs mt-1 p-1 text-white" style={{ backgroundColor: color }} key={color}>{color}</span>
            )}
          </div>
          <div className="mt-4 flex space-x-5">
            <Button className="bg-indigo-500">Submit</Button>
          </div>
        </form>
      </AlertDialog>

      {/* CONFIRM REMOVE ALERT DIALOG */}
      <AlertDialog isOpen={isOpenConfirmModal} closeModal={closeConfirmModal} title="Are You Sure ?">
          <p className="text-gray-500 text-xs">
            Remember that this product will be removed permanently, and You willl not be able to retreive it,
            So be carefull about that :) .
          </p>
          <div className="mt-4 flex space-x-5">
            <Button className="bg-red-500" onClick={removeProductHandler}>Yes,Remove</Button>
            <Button className="bg-slate-400" onClick={onCloseConfirmModal}>Cancel</Button>
          </div>
      </AlertDialog>

      <div className="flex mt-10 items-center justify-between">
        <img src={logo} className="w-60 m-0 h-full" alt="logo" />
        <div>
          <Button onClick={openModal} className="bg-blue-800">ADD Product</Button>
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderListDate}
      </div>
      <Toaster />
    </main>

  );
}

export default App;
