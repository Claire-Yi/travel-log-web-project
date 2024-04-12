import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface AddBlockDropdownProps {
  onImageUpload: (file: File) => void;
  onTextInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AddBlockDropdown: React.FC<AddBlockDropdownProps> = ({ onImageUpload, onTextInputChange }) => {
  const handleDropdownSelect = (eventKey: string) => {
    if (eventKey === 'Image') {
      // Trigger file input click
      document.getElementById('imageUpload')?.click();
    }
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onImageUpload(event.target.files[0]);
    }
  };

  return (
    <DropdownButton title="Add Block" onSelect={handleDropdownSelect}>
      <Dropdown.Item eventKey="Image">
        <label htmlFor="imageUpload">Upload Image</label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageInputChange}
          style={{ display: 'none' }}
        />
      </Dropdown.Item>
      <Dropdown.Item eventKey="Text">
        <textarea
          placeholder="Enter text..."
          onChange={onTextInputChange}
          style={{ width: '100%', resize: 'vertical' }}
        />
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default AddBlockDropdown;
