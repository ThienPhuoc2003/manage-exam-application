'use client';
import { useEffect, useState } from "react";
import React from "react";
import { Button,Card,Input, List, message, Image, Progress } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/f"ontawesome-svg-core/styles.css';
import { storage } from "@/libs/firebase";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";



const AddExamForm = () => {

    const [recipient, setRecipient] = useState("");
    const [truongBoMonUsers, setTruongBoMonUsers] = useState<any[]>([]);

    useEffect(() => {
        //nguoinhan
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

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = event.target.files?.[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//         }
//     };
//     const UploadFileToStorage=() => {
    const[iFile,SetiFile]=useState<File>()
    const [downloadURL,setDownloadURL]=useState('');
    const [isUploading,setIsUploading]=useState(false);
    const [progressUpload,setProgressUpload]=useState(0);
    const handleSelectedFile =(files:any )   => {

        if(files && files[0].size <100000000)
        {
            SetiFile(files[0]);
            console.log(files[0]);
        }else {
            message.error("File size to large");
        }
    };
    const handleUploadFile=() => {
        if(iFile)
        {   
            const name =iFile.name;
            const storageRef = ref(storage, `file/${name}`);
            const uploadTask = uploadBytesResumable(storageRef,iFile)
            uploadTask.on('state_changed',(snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                setProgressUpload(progress);
                console.log('Upload is '+ progress+'%done');
                switch(snapshot.state)
                {
                    case 'paused': console.log('Upload is paused'); break
                    case 'running': console.log('Upload is running'); break;
                }
            },
            (error) => {
                message.error(error.message);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                setDownloadURL(url);
                });
            }
            );
        }else{
            message.error("File not found");
        }
    }
    const handleRemoveFile=() => SetiFile(undefined);



    const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRecipient(event.target.value);
    };


return (
    <div className="container mt-5">
        <div className="col-lg-8 offset-lg-2">
            <Input
                type="file"
                placeholder="Select file to upload..."
                accept=".docx"
                onChange={files => handleSelectedFile(files.target.files)}
            />
             <div className="mb-4">
                <label htmlFor="recipient" className="block mb-1 font-medium">Người nhận</label>
                <select id="recipient" value={recipient} onChange={handleRecipientChange} className="border border-gray-300 p-2 w-full">
                    <option value="">Chọn người nhận</option>
                    {truongBoMonUsers.map((user) => (
                        <option key={user.id} value={user.id}>{user.name} - {user.email}</option>
                    ))}
                </select>
            </div>
            <div className="mt-5">
                <Card>
                    {iFile && (
                        <>
                                                <List.Item>
                            <List.Item.Meta
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{iFile.name}</span>
                                        <Button
                                            onClick={handleRemoveFile}
                                            type="text"
                                            icon={<FontAwesomeIcon icon={faTimes} />}
                                        />
                                    </div>
                                }
                                description={`${(iFile.size / 1024).toFixed(2)} KB`}
                            />
                        </List.Item>
                    <div className="text-right mt-3">
                    <Button loading={isUploading}
                     type="primary" onClick={handleUploadFile}>Upload</Button>  
                     <Progress percent={progressUpload}/>        
                    </div>
                        </>
                    )}
             {downloadURL && (
                            <div>
                                <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                                    {iFile?.name}
                                </a>
                                <p>{downloadURL}</p>
                            </div>
                        )}
             
                </Card>
            </div>
        </div>
    </div>
//             

    );
};
export default AddExamForm;
