import { urlImgToFormatAuto } from '../adapters/urlImgToFormatAuto';
import { optionsCloudinary } from '../utilities/cloudinaryWidget';
import { useCallback, useEffect, useState } from 'react';

const useUpdateCloudinary = (multiple) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const handleOpen = useCallback(() => {
    setopen(true);
  }, []);

  useEffect(() => {
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
            setopen(false);
          }
        } else {
          setLoading(false);
          setopen(false);
          throw new Error('error subiendo archivos a clodinary');
        }
      }
    );
    if (open) {
      setLoading(true);

      widget.open();
    }

    return () => {
      setLoading(false);
    };
  }, [open]);

  return {
    data: data?.map((url) => urlImgToFormatAuto(url)),
    loading,
    handleOpen,
  };
};

export default useUpdateCloudinary;
