import QRCode from 'react-qr-code';

const CuponQrCode = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="max-w-50">
                <QRCode
                    style={{ width: "100%", height: "auto" }}
                    value="ABC123"
                />
            </div>
        </div>
    );
};

export default CuponQrCode;