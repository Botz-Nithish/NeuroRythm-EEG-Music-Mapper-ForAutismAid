import React, { createContext, useContext, useState } from 'react';

const ProcessingContext = createContext(undefined);

const initialState = {
  fileId: null,
  jobId: null,
  status: 'IDLE',
  progress: 0,
  error: null,
  outputFiles: null,
  processingTime: null,
};

export const ProcessingProvider = ({ children }) => {
  const [processingState, setProcessingState] = useState(initialState);

  const setFileId = (fileId) => {
    setProcessingState(prev => ({ ...prev, fileId }));
  };

  const setJobId = (jobId) => {
    setProcessingState(prev => ({ ...prev, jobId }));
  };

  const setStatus = (status) => {
    setProcessingState(prev => ({ ...prev, status }));
  };

  const setProgress = (progress) => {
    setProcessingState(prev => ({ ...prev, progress }));
  };

  const setError = (error) => {
    setProcessingState(prev => ({ ...prev, error }));
  };

  const setOutputFiles = (outputFiles) => {
    setProcessingState(prev => ({ ...prev, outputFiles }));
  };

  const setProcessingTime = (time) => {
    setProcessingState(prev => ({ ...prev, processingTime: time }));
  };

  const resetProcessingState = () => {
    setProcessingState(initialState);
  };

  return (
    <ProcessingContext.Provider
      value={{
        processingState,
        setFileId,
        setJobId,
        setStatus,
        setProgress,
        setError,
        setOutputFiles,
        setProcessingTime,
        resetProcessingState,
      }}
    >
      {children}
    </ProcessingContext.Provider>
  );
};

export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (context === undefined) {
    throw new Error('useProcessing must be used within a ProcessingProvider');
  }
  return context;
};

