import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/navbar';
import axios from 'axios';

// Ensure cookies (httpOnly) are sent for both fetch and update
axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.withCredentials = true;

export default function SettingsPage() {
  // Retrieve user_id from sessionStorage, same as ProfilePage
  const userId = sessionStorage.getItem('user_id');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null); // holds selected file
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [bio,setBio] = useState('');

  // refs to store original values for change detection
  const origName = useRef('');
  const origEmail = useRef('');
  const origImage = useRef(null);
  const origBio = useRef('');

  // Load existing profile on mount using your profile API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) throw new Error('No user_id in sessionStorage');
        // GET current profile; matches your ProfilePage endpoint
        const res = await axios.get(`/api/auth/profile/${userId}`);
        const { username, fullName, imageUrl } = res.data;

        // Populate form fields
        setName(fullName || '');        // map fullName to name
        setEmail(username || '');       // map username (email) to email

        // Store original refs for change comparison
        origName.current = fullName || '';
        origEmail.current = username || '';
        origImage.current = imageUrl || null;

        // Preview existing image
        if (imageUrl) {
          setPreview(imageUrl);
        }
      } catch (err) {
        console.error('Failed to load profile', err);
        setMessage({ type: 'error', text: 'Could not load profile.' });
      }
    };

    fetchProfile();
  }, []);

  // Generate preview when a new file is selected
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!userId) throw new Error('No user_id in sessionStorage');
      // Build payload for updateProfile
      const formData = new FormData();
      formData.append('user_id', userId);

      // Only send changed values
      if (name !== origName.current) formData.append('name', name);
      if (email !== origEmail.current) formData.append('email', email);
      if (password) formData.append('password', password);
      if (file) formData.append('profile_pic', file); // match backend field name

      // POST to update endpoint
      const response = await axios.post('/api/auth/updateProfile', formData);

      // Success feedback
      setMessage({ type: 'success', text: 'Profile updated successfully.' });

      // Update original refs
      origName.current = name;
      origEmail.current = email;
      if (file) origImage.current = response.data.user.image; // backend returns image key
      setFile(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Update failed.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="col-span-full">
        <Navbar />
      </div>

      <div className="flex-1 overflow-y-auto px-[3vw] py-[4vh]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[var(--postcolor)] p-[2vw] max-w-[800px] mx-auto text-[var(--bgcolorlight)]"
        >
          <h1 className="text-[2vw] font-bold mb-[3vh] border-b border-[var(--bgcolorlight)] pb-[1.5vh]">
            Account Settings
          </h1>

          {message && (
            <div className={`mb-4 p-3 rounded-xl ${
              message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
            `}>
              {message.text}
            </div>
          )}

          {/* Profile picture upload */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-32 w-32 object-cover rounded-full"
              />
            )}
          </div>

          {/* Full Name field */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
            />
          </div>

          {/* Email Address field */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
            />
          </div>

          {/* Password change field */}
          <div className="mb-[3vh]">
            <label className="block text-[1.2vw] mb-[1vh]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-[1vh] rounded-xl bg-[var(--bgcolorlight)] text-[var(--postcolor)]"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="px-[1.5vw] py-[0.5vh] bg-[var(--bgcolorlight)] text-[var(--postcolor)] rounded-xl hover:bg-[var(--optionsiconhovercolor)] transition-all"
          >
            {loading ? 'Saving...' : 'Apply Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
