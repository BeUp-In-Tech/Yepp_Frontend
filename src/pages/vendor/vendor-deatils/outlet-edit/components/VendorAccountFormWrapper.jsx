import { useJsApiLoader } from "@react-google-maps/api";
import VendorAccountForm from "./VendorAccountForm";

const VendorAccountFormWrapper = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });
  if (!isLoaded) return <div className="text-center p-10">Loading Map...</div>;
  return <VendorAccountForm />;
};

export default VendorAccountFormWrapper;
