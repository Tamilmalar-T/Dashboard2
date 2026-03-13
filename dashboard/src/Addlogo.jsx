import React, { useState } from 'react';
import axios from 'axios';
import './Addform.css';

const AddLogo = () => {
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
const handleUpload = async (e) => {
  e.preventDefault();
  setMsg('');
  setError('');

  if (!image) {
    setError('❌ Please select a logo file');
    return;
  }

  const formData = new FormData();
formData.append('logo', image); // ✅ This must match multer field name


  try {
    await axios.post('http://localhost:5000/api/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setMsg('✅ Logo uploaded successfully');
    setImage(null);
    setPreview(null);
  } catch (err) {
    console.error(err);
    setError('❌ Upload failed');
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="new-user-form">
      <h3>Upload Logo</h3>

      {msg && <div className="success">{msg}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleUpload}>
        <div className="row mb-3">
          <label className="form-label">Select Logo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="text-center my-3">
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '200px', border: '1px solid #ddd', padding: '5px' }}
            />
          </div>
        )}

        <div className="buttons my-4 d-flex justify-content-center">
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddLogo;
