const Loader = () => {
  return (
    <div className='flex justify-center items-center py-12'>
      <div className='relative'>
        <div className='w-16 h-16 border-4 border-indigo-200 dark:border-indigo-900 rounded-full'></div>
        <div className='w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0'></div>
      </div>
    </div>
  );
};

export default Loader;
