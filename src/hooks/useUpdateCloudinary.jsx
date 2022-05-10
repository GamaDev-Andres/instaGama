import { urlImgToFormatAuto } from '../adapters/urlImgToFormatAuto';
import { optionsCloudinary } from '../utilities/cloudinaryWidget';
import { useCallback, useEffect, useState } from 'react';

const useUpdateCloudinary = (multiple) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-undef
  const widget = cloudinary.createUploadWidget(
    optionsCloudinary(multiple),
    (err, result) => {
      if (!err) {
        if (result.event === 'queues-end') {
          const arrData = result.info.files;
          const arrFotos = arrData.map((data) => {
            return data.uploadInfo.secure_url;
          });
          setData(arrFotos);
        }
        if (result.event === 'abort' || result.event === 'close') {
          setLoading(false);
        }
      } else {
        setLoading(false);
        throw new Error('error subiendo archivos a clodinary');
      }
    }
  );

  const handleOpen = useCallback(() => {
    setLoading(true);
    widget.open();
  }, []);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return {
    data: data?.map((url) => urlImgToFormatAuto(url)),
    loading,
    handleOpen,
    setData,
  };
};

export default useUpdateCloudinary;
