'use client';
import { useEffect, useState } from "react";

const AddExamForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [truongBoMonUsers, setTruongBoMonUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchTruongBoMonUsers = async () => {
            try {
                const response = await fetch("/api/getTruongBoMonUsers");
                if (response.ok) {
                    const data = await response.json();
                    setTruongBoMonUsers(data);
                } else {
                    console.error("Failed to fetch truong bo mon users");
                }
            } catch (error) {
                console.error("Error fetching truong bo mon users:", error);
            }
        };

        fetchTruongBoMonUsers();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecipient(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Create FormData object to send file and other data
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("description", description);
        formData.append("recipient", recipient);

        try {
            const response = await fetch("/api/addExam", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log("Exam added successfully!");
                // Clear form fields or show success message
            } else {
                console.error("Failed to add exam");
            }
        } catch (error) {
            console.error("Error adding exam:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="file" className="block mb-1 font-medium">Thêm Word.doc</label>
                <input type="file" id="file" onChange={handleFileChange} className="border border-gray-300 p-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-1 font-medium">Mô tả</label>
                <textarea id="description" value={description} onChange={handleDescriptionChange} className="border border-gray-300 p-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="recipient" className="block mb-1 font-medium">Người nhận</label>
                <select id="recipient" value={recipient} onChange={handleRecipientChange} className="border border-gray-300 p-2 w-full">
                    <option value="">Chọn người nhận</option>
                    {truongBoMonUsers.map((user) => (
                        <option key={user.id} value={user.id}>{user.name} - {user.email}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Gửi</button>
            </div>
        </form>
    );
};

export default AddExamForm;
