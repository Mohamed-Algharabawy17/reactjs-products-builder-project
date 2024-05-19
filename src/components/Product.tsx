import { IProduct } from "../interfaces";
import { cutText } from "../utils/functions";
import Image from "./Image";
import Button from "./UI/Button";
interface IProps {
    product: IProduct
}
const Product = ({product}: IProps) => { 

    const {title, imageURL, price, description, category} = product

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

        <div className="flex space-x-2 my-3">
          <div className="w-5 h-5 bg-fuchsia-500 rounded-full" />
          <div className="w-5 h-5 bg-yellow-400 rounded-full" />
          <div className="w-5 h-5 bg-green-600 rounded-full" />
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
          <Button className="bg-yellow-700" onClick={ () => alert("clicked") }>
            EDIT
          </Button>
          <Button className="bg-red-700">
            DELETE
          </Button>
        </div>
      </div>
    );
};

export default Product;