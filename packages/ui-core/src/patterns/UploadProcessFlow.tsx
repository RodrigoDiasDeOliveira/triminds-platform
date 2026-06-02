export interface UploadProcessFlowProps {
  title?: string;
  stepCount?: number;
}

export const UploadProcessFlow = {
  defaultProps: {
    title: 'Upload & Process',
    stepCount: 3
  } as Required<UploadProcessFlowProps>
};
