import pkg from "react-reveal";

const { Fade } = pkg;

export const StackedImageCard = () => {
  return (
    <div className="relative">
      <Fade left distance="40%" duration={1500}>
        <img
          className="relative h-64 w-80 lg:h-72 lg:w-96 bg-green-300 object-cover"
          src="https://res.cloudinary.com/chankruze/image/upload/v1695579338/ewfl-pub/w3zsm0o5i1p8oovad8po.jpg"
          alt="broken controller in background"
          width={384}
          height={288}
        />
      </Fade>
      <Fade top distance="40%" duration={1500}>
        <img
          className="absolute h-80 w-56 inset-0 m-auto lg:h-96 lg:w-64 bg-gray-600 object-cover"
          src="https://res.cloudinary.com/chankruze/image/upload/v1695580851/ewfl-pub/o18ukee1pzhaad96wpg4.jpg"
          alt="broken tv on front"
          width={256}
          height={384}
        />
      </Fade>
    </div>
  );
};
