import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBox from '../InputBox';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISite } from '../../interfaces/ISite';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  siteValues: ISite;
  setShowModal: any;
  isLoading: boolean;
  updateSiteFn: (v: ISite) => void;
}

const isChanged = (pv: ISite, nv: ISite): boolean => {
  let result = false;
  let key: string;
  for (key in nv) {
    if (key !== 'auditLog' && nv[key] !== pv[key]) {
      result = true;
    }
  }
  return result;
};

const formattedTime = (date: Date) => {
  const d = new Date(date);
  const h = d.getHours();
  return (
    (h % 12 || 12) +
    ':' +
    d.getMinutes().toString().padStart(2, '0') +
    ' ' +
    (h < 12 ? 'A' : 'P') +
    'M'
  );
};

const formattedDate = (d: Date) => {
  const date = new Date(d);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();
  return day + '-' + month + '-' + year;
};

const SiteForm: React.FC<IProps> = ({
  siteValues,
  setShowModal,
  isLoading,
  updateSiteFn
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<ISite>({ defaultValues: siteValues });

  const submitHandler: SubmitHandler<ISite> = formData => {
    if (!isChanged(formData, siteValues))
      return toast.info('No changes detected');
    updateSiteFn(formData);
  };

  const errors: any = formErrors;
  let errorMessage: any = {};

  if (errors.name) {
    errorMessage.name = errors.name.message;
  }
  if (errors.city) {
    errorMessage.city = errors.city.message;
  }
  if (errors.description) {
    errorMessage.description = errors.description.message;
  }
  if (errors.latitude) {
    errorMessage.latitude = errors.latitude.message;
  }
  if (errors.longitude) {
    errorMessage.longitude = errors.longitude.message;
  }

  return (
    <>
      <Box className="text-center">
        <form
          id="siteForm"
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col py-2"
        >
          <Box className="text-left">
            <LoadingButton
              type="submit"
              className="mr-2"
              startIcon={<SaveIcon />}
              variant="outlined"
              loading={isLoading}
            >
              Save
            </LoadingButton>
            <LoadingButton
              className="ml-2"
              startIcon={<CloseIcon />}
              variant="outlined"
              color="inherit"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </LoadingButton>
          </Box>
          <Divider className="mt-4" />
          <Typography className="text-left my-3">
            Site ID: {siteValues._id}
          </Typography>
          <InputBox
            control={control}
            type="text"
            label="Name"
            name="name"
            rules={{ isRequired: true }}
            isError={!!errors?.name}
            errorMessage={errorMessage.name}
          />
          <InputBox
            control={control}
            type="text"
            label="City/Region"
            name="city"
            rules={{ isRequired: true }}
            isError={!!errors?.city}
            errorMessage={errorMessage.city}
            multiline={true}
            rows={2}
          />
          <InputBox
            control={control}
            type="text"
            label="Site Description"
            name="description"
            rules={{ isRequired: true }}
            isError={!!errors?.description}
            errorMessage={errorMessage.description}
            multiline={true}
            rows={2}
          />
          <Box className="flex justify-between">
            <InputBox
              control={control}
              type="number"
              label="Latitude"
              name="latitude"
              rules={{ isRequired: true }}
              isError={!!errors?.latitude}
              errorMessage={errorMessage.latitude}
            />
            <InputBox
              control={control}
              type="number"
              label="Longitude"
              name="longitude"
              rules={{ isRequired: true }}
              isError={!!errors?.longitude}
              errorMessage={errorMessage.longitude}
            />
          </Box>
          <Divider className="mt-4 mb-1" />

          <Box className="bg-gray-200 mt-4 py-2 px-3 text-gray-500 max-h-36 text-left overflow-y-auto	">
            <Typography className="my-2">Audit Log:</Typography>
            <Divider className="my-2" />

            {siteValues.auditLog
              .map(log => (
                <Typography key={log._id} className="text-xs my-2">
                  {log.operation} by {log.nickname} on {formattedDate(log.date)}{' '}
                  at {formattedTime(log.date)}
                </Typography>
              ))
              .reverse()}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SiteForm;
