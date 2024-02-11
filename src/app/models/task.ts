export interface ITask {
  id? : number,
  title: string,
  description: string,
  isChecked?: boolean,
  isEditMode?: boolean,
  createdAt?: string,
}
