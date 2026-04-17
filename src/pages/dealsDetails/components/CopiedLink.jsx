import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { images } from '../../../assets/image';
import { Share2 } from 'lucide-react';

const CopiedLink = ({_id}) => {
    const [open, setOpen] = useState(false);
    const link = `${window.location.origin}/deal-details/${_id}`;
    const handleShare = (platform) => {
        let url = "";
        if (platform === "whatsapp") {
            url = `https://wa.me/?text=${encodeURIComponent(link)}`;
        }
        if (platform === "messenger") {
            url = `https://m.me/?link=${encodeURIComponent(link)}`;
        }
        if (platform === "x") {
            url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
        }
        if (platform === "copy") {
            navigator.clipboard.writeText(link);
            toast.success("Link copied!");
            setOpen(false);
            return;
        }
        if (url) {
            window.open(url, "_blank");
            setOpen(false);
        }
    };
    return (
        <div className="relative flex gap-3">
            {/* Share Button */}
            <button
                onClick={() => setOpen(!open)}
                className="p-1.5 border rounded-full hover:bg-gray-50 text-[#525252] cursor-pointer"
            >
                <Share2 size={18} />
            </button>

            {open && (
                <div className="absolute top-9 right-10 flex gap-3 p-3 rounded-lg">

                    <img
                        onClick={() => handleShare("whatsapp")}
                        className="h-6 w-7 object-fill cursor-pointer"
                        src={images.whatapp}
                        alt="whatsapp share"
                    />

                    <img
                        onClick={() => handleShare("messenger")}
                        className="h-6 w-6 object-fill cursor-pointer"
                        src={images.messanger}
                        alt="messenger share"
                    />

                    <img
                        onClick={() => handleShare("copy")}
                        className="h-6 w-7 object-fill cursor-pointer"
                        src={images.copy}
                        alt="copy link"
                    />

                </div>
            )}
        </div>
    );
};

export default CopiedLink;