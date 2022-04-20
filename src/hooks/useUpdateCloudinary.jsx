import { useCallback, useEffect, useState } from 'react';
import { optionsCloudinary } from '../utilities/cloudinaryWidget';

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
          console.log(result.event);
          if (result.event === 'abort' || result.event === 'close') {
            setLoading(false);
            setopen(false);
            if (data) {
              console.log(data);
              console.log('cerro , cuado ya subio la foto');
            }
          }
        } else {
          console.log('error subiendo archivos a clodinary');

          setLoading(false);
          setopen(false);
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

  return { data, loading, handleOpen };
};

export default useUpdateCloudinary;
