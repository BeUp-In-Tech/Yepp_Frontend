import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

const Tags = ({ setValue, initialTags = [] }) => {
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const func = () => {
            if (initialTags?.length) {
                setTags(initialTags);
                setValue("tags", initialTags);
            }
        }
        func();
    }, [initialTags, setValue]);

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        const updated = [...tags, tagInput.trim()];
        setTags(updated);
        setTagInput("");
        setValue("tags", updated);
    };

    const handleRemoveTag = (index) => {
        const updated = tags.filter((_, i) => i !== index);
        setTags(updated);
        setValue("tags", updated);
    };
    const notMatchHighlight = initialTags?.filter(value => !tags.includes(value));
    setValue("deletedTags", notMatchHighlight);
    
    return (
        <div>
            <label className="block text-base text-[#262626] font-medium mb-2">Tags</label>
            <p className="text-sm text-[#737373] mb-2">
                Add tags (e.g. discount, food, trending)
            </p>
            <div className="flex gap-2 items-center justify-center">
                <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tag"
                    className="w-full px-6 py-4 border border-gray-400 rounded-full outline-0"
                />
                <button
                    type="button"
                    onClick={handleAddTag}
                    className="p-1 w-8 h-8 cursor-pointer bg-[#bfc7c9] text-white rounded-full"
                >
                    <Plus />
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="text-red-500 font-bold"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Tags;