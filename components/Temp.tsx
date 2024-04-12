import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Section {
    value: string | File;
  }
  
const LogContent: React.FC = () => {
const [sections, setSections] = useState<Section[]>([]);
  
const handleAddImageSection = (value: File) => {
    setSections([...sections, { value: new File([], '') }]);
    };

const handleAddTextSection = (value: string) => {
    setSections([...sections, { value: '' }]);
};

const handleTextSectionChange = (index: number, value: string) => {
    const newSections = [...sections];
    console.log("sections:", sections);
    newSections[index].value = value;
    setSections(newSections);
};

const handleImageSectionChange = (index: number, value: File) => {
    if (files && files.length > 0) {
        const newSections = [...sections];
        newSections[index].value = files[0];
        setSections(newSections);
      }
    };

const handleClearFile = (index: number) => {
    const newSections = [...sections];
    newSections[index].value = '';
    setSections(newSections);
    };

return (
    <div className="flex flex-col">
      <DropdownButton title="Add">
        <Dropdown.Item as="button" onClick={handleAddImageSection}>Image</Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleAddTextSection}>Text</Dropdown.Item>
      </DropdownButton>
      <div>
        {sections.map((section, index) => {
          if (section.value instanceof File) {
            return (
              <div key={index} className="flex flex-col bg-neutral-100">
                <input
                  type="file"
                  onChange={(e) => handleImageSectionChange(index, e.target.files)}
                />
                <button onClick={() => handleClearFile(index)}>Clear</button>
                {section.value && (
                  <img
                    src={URL.createObjectURL(section.value)}
                    alt={`Uploaded Image ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </div>
            );
          } else if (typeof section.value === 'string') {
            return (
              <input
                key={index}
                type="text"
                value={section.value}
                onChange={(e) => handleTextSectionChange(index, e.target.value)}
                className="flex flex-col bg-neutral-100"
              />
            );
          } else {
            return null; // Return null if section value is neither 'Image' nor 'Text'
          }
        })}
      </div>
    </div>
  );
};

export default LogContent;