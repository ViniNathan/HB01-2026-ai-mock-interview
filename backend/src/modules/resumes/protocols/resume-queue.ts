export interface IResumeQueue {
  add(params: { resumeId: string }): Promise<void>;
}
