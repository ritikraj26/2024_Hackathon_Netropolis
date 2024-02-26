const HeroImage = () => {
  return (
    <div className="absolute top-0 left-0 -z-50 w-screen">
      <img
        src={process.env.PUBLIC_URL + "/japan-full.png"}
        alt="mockup"
        className="opacity-50 w-screen h-screen object-cover"
      />
    </div>
  );
};

export default HeroImage;
