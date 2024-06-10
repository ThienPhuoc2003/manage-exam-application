'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUserRoleForm = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/updateRole', { email, role: role });
            toast.success('Role updated successfully');
            setEmail('');
            setRole('');
        } catch (error: any) { // hoặc (error: Error)
            toast.error(error.response?.data?.message || 'Failed to update role');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select role</option>
                    <option value="GIANGVIEN">Giảng viên</option>
                    <option value="TRUONGBOMON">Trưởng bộ môn</option>
                    <option value="GIAOVUKHOA">Giáo vụ khoa</option>
                </select>
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Update Role'}
            </button>
        </form>
    );
};

export default UpdateUserRoleForm;
