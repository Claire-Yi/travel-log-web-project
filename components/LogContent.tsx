import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Section {
  id: number;
  value: string | File;
}

const LogContent: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  const handleAddImageSection = () => {
    setSections([...sections, { id: nextId, value: new File([], '') }]);
    setNextId(nextId + 1);
  };

  const handleAddTextSection = () => {
    setSections([...sections, { id: nextId, value: '' }]);
    setNextId(nextId + 1);
  };

  const handleTextSectionChange = (id: number, value: string) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, value } : section
    );
    setSections(updatedSections);
  };

  const handleImageSectionChange = (id: number, files: FileList | null) => {
    if (files && files.length > 0) {
      const updatedSections = sections.map((section) =>
        section.id === id ? { ...section, value: files[0] } : section
      );
      setSections(updatedSections);
    }
  };

  const handleClearFile = (id: number) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, value: '' } : section
    );
    setSections(updatedSections);
  };

  const handleDeleteSection = (id: number) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  return (
    <div className="flex flex-col">
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
        <DropdownButton title="Add">
            <Dropdown.Item as="button" onClick={handleAddImageSection}>Image</Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleAddTextSection}>Text</Dropdown.Item>
        </DropdownButton>
    </div>
      <div>
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col bg-neutral-100">
            {typeof section.value !== 'string' && (
              <>
              <input
                type="file"
                onChange={(e) => handleImageSectionChange(section.id, e.target.files)}
              />
              {section.value && (
                <img src={URL.createObjectURL(section.value)} alt={`Uploaded Image ${section.id}`} style={{ maxWidth: '300px', maxHeight: '300px' }} />
              )}
            </>
            )}
            {typeof section.value === 'string' && (
              <input
                type="text"
                value={section.value}
                onChange={(e) => handleTextSectionChange(section.id, e.target.value)}
              />
            )}
            <button onClick={() => handleClearFile(section.id)}>Clear</button>
            <button onClick={() => handleDeleteSection(section.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogContent;
