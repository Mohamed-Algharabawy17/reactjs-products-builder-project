
export const validateProduct = (product:{ title: string, description: string, imageURL: string, price: string }) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: ""
  };

  const validImageURL = /^(ftb|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if (!product.title || product.title.trim() === "" || product.title.length < 3 || product.title.length > 50) {
        errors.title = "Title must be between 3 and 50 characters";
    }

    if (!product.description || product.description.trim() === "" || product.description.length < 5 || product.description.length > 500) {
        errors.description = "Description must be between 5 and 500 characters";
    }

    if (!product.imageURL || product.imageURL.trim() === "" || !validImageURL) {
        errors.imageURL = "Image URL is required and must be in format http://example.png";
    }

    if (!product.price || product.price.trim() === "" || isNaN(Number(product.price))) {
        errors.price = "Price is required and must be a number";
    }


  return errors;
};
