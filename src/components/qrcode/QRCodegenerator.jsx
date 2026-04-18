import QRCode from "react-qr-code";
const QRCodegenerator = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-22.5">
                <QRCode
                    style={{ width: "100%", height: "auto" }}
                    value="https://coupon-code-six.vercel.app/app"
                />
            </div>
        </div>
    );
};

export default QRCodegenerator;