import React, { useState } from 'react';
import {
  User,
  FileText,
  Mic,
  Save,
  Clock,
  Tags,
  Headphones,
} from 'lucide-react';

const App = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    dob: '',
    mrn: '',
    physician: ''
  });
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [specialtyTags, setSpecialtyTags] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // Placeholder function for live audio recording
  const handleStartRecording = () => {
    setIsRecording(true);
    // Implement audio recording logic
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Implement stopping audio recording logic
    // After stopping, send audio to transcription
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    // TODO: Implement audio processing
  };

  const handleTranscriptionChange = (e) => {
    setTranscriptionText(e.target.value);
  };

  const handleAddSpecialtyTag = (tag) => {
    if (tag && !specialtyTags.includes(tag)) {
      setSpecialtyTags(prev => [...prev, tag]);
    }
  };

  const handleRemoveSpecialtyTag = (tagToRemove) => {
    setSpecialtyTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSaveTranscription = () => {
    // TODO: Implement document generation
    console.log('Saving transcription', { patientInfo, transcriptionText, specialtyTags });
    alert('Transcription saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Medical Transcription Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Patient Information Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-600" /> Patient Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={patientInfo.name}
                onChange={handlePatientInfoChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={patientInfo.dob}
                onChange={handlePatientInfoChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="mrn"
                placeholder="Medical Record Number"
                value={patientInfo.mrn}
                onChange={handlePatientInfoChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="physician"
                placeholder="Attending Physician"
                value={patientInfo.physician}
                onChange={handlePatientInfoChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Audio Transcription Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Mic className="mr-2 text-blue-600" /> Audio Transcription
            </h2>
            <div className="space-y-4">
              {/* Record Button */}
              <div className="flex gap-4">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`px-6 py-3 ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600`}
                >
                  {isRecording ? <Headphones className="mr-2" /> : <Mic className="mr-2" />}
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>

              {/* File Upload Button */}
              <div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                  id="audioUpload"
                />
                <label
                  htmlFor="audioUpload"
                  className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center cursor-pointer"
                >
                  <FileText className="mr-2" /> Upload Audio File
                </label>
                {audioFile && (
                  <div className="text-sm text-gray-600 bg-white p-2 rounded">
                    Selected: {audioFile.name}
                  </div>
                )}
              </div>

              {/* Transcription Text Area */}
              <textarea
                placeholder="Transcription Text"
                value={transcriptionText}
                onChange={handleTranscriptionChange}
                rows={6}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Specialty Tags Section */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Tags className="mr-2 text-blue-600" /> Specialty Tags
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Internal Medicine', 'Cardiology', 'Endocrinology', 'Neurology'].map(tag => (
              <button
                key={tag}
                onClick={() => handleAddSpecialtyTag(tag)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {specialtyTags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleRemoveSpecialtyTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleSaveTranscription}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Save className="mr-2" /> Save as Document
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="mr-2" /> Last Saved: Not Recently
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
