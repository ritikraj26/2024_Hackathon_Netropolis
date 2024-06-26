const HeroSection = () => {
  return (
    <div className="hero-section relative p-5 basis-4/5 self-center">
      <div className="grid max-w-screen-xl px-5 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-12">
          <img
            src={process.env.PUBLIC_URL + "/logo.jpeg"}
            className="mx-auto h-[300px] border rounded-full mb-4 max-sm:max-w-screen max-sm:h-auto"
            alt="Logo"
          />
          <h1 className="text-center pointer-events-none max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Japan Explore
          </h1>
          <p className="text-center pointer-events-none max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join us in shaping a digital world where collaboration and
            innovation flourish
          </p>
          <div className="flex justify-center">
            <a
              href="/signup"
              className="inline-flex justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get Started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="/login"
              className="bg-white inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
