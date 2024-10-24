import Upload from '../components/UploadPage/Uploading';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

const DataUpload = () => {
  return (
    <div className='h-screen'>
      <TopBar />
      <Sidebar />
      <div className='w-full md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full'>
      <Upload />
      </div>
    </div>
  );
};

export default DataUpload;
