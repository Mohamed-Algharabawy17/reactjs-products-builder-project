interface IProps {
    imgUrl: string;
    alt: string;
    className: string;
}
const Image = ({alt, className, imgUrl}: IProps) => {    
    return (
        <img src={imgUrl} alt={alt} className={className} />
    );
};

export default Image;