const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-gray-800 dark:bg-gray-950 text-white py-6 mt-12'>
      <div className='container mx-auto px-4 text-center'>
        <p className='text-black-300'>ProShop &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
