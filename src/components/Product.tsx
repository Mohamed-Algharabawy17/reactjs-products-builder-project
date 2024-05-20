import { IProduct } from "../interfaces";
import { cutText } from "../utils/functions";
import Image from "./Image";
import Button from "./UI/Button";
import CircleColor from "./UI/CircleColor";
interface IProps {
    product: IProduct;
    setProductEdit: (product: IProduct) => void;
    openEditModal: () => void;
    oenConfirmDialog: () => void;
    productToEditIdx: number
    setproductToEditIdx: (val:number) => void;
}
const Product = ({product,openEditModal, oenConfirmDialog, productToEditIdx, setproductToEditIdx,setProductEdit}: IProps) => { 

    const {title, imageURL, price, description, category, colors} = product

    const renderColorCircles = colors.map(color => <CircleColor color={color} key={color}/>)

    const onEdit = () => {
        setProductEdit(product)
        openEditModal()
        setproductToEditIdx(productToEditIdx);
        // console.log("prod", product);
    }

    const onRemove = () => {
        setProductEdit(product)
        oenConfirmDialog()
    }

    return (
      <div className="border p-3 rounded-lg flex flex-col mx-auto md:mx-0 max-w-sm md:max-w-lg">
        <Image
          imgUrl={imageURL}
          alt="Car"
          className="rounded-md mb-2 h-full w-full"
        />
        <h2>{title}</h2>

        <p className="text-xs">
          {cutText(description)}
        </p>

        <div className="flex flex-wrap space-x-2 my-3">
          {renderColorCircles}
        </div>

        <div className="flex items-center justify-between">
          <p>{price}</p>
          <div className="flex items-center space-x-2">
            <p>{category.name}</p>
            <Image
                imgUrl={category.imageURL}
                alt="Car"
                className="w-10 h-10 rounded-full object-bottom"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-3">
          <Button className="bg-yellow-700" onClick={ onEdit }>
            EDIT
          </Button>
          <Button className="bg-red-700" onClick={onRemove}>
            REMOVE
          </Button>
        </div>
      </div>
    );
};

export default Product;